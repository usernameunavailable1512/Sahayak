'use server';

/**
 * @fileOverview A feedback report generation AI agent.
 *
 * - generateFeedbackReport - A function that handles the feedback report generation process.
 * - GenerateFeedbackReportInput - The input type for the generateFeedbackReport function.
 * - GenerateFeedbackReportOutput - The return type for the generateFeedbackReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFeedbackReportInputSchema = z.object({
  topic: z.string().describe('The topic of the interview.'),
  questionsAndAnswers: z.array(
    z.object({
      question: z.string().describe('The interview question.'),
      answer: z.string().describe('The student\u2019s answer to the question.'),
    })
  ).describe('An array of questions and the student\u2019s answers.'),
});
export type GenerateFeedbackReportInput = z.infer<typeof GenerateFeedbackReportInputSchema>;

const GenerateFeedbackReportOutputSchema = z.object({
  feedbackReport: z.string().describe('A comprehensive feedback report highlighting strengths and areas for improvement.'),
});
export type GenerateFeedbackReportOutput = z.infer<typeof GenerateFeedbackReportOutputSchema>;

export async function generateFeedbackReport(input: GenerateFeedbackReportInput): Promise<GenerateFeedbackReportOutput> {
  return generateFeedbackReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFeedbackReportPrompt',
  input: {schema: GenerateFeedbackReportInputSchema},
  output: {schema: GenerateFeedbackReportOutputSchema},
  prompt: `You are an AI-powered interview feedback generator. You will receive the topic of the interview, as well as the questions and the student's answers.

  Based on the information provided, you will generate a comprehensive feedback report for the student, highlighting their strengths and areas for improvement.

  Interview Topic: {{{topic}}}

  {{#each questionsAndAnswers}}
  Question: {{{this.question}}}
  Answer: {{{this.answer}}}
  {{/each}}

  Provide a detailed feedback report, including specific examples from the student's answers.
  The feedback report should be structured and easy to understand, so the student can identify their key strengths and areas for improvement.
`,
});

const generateFeedbackReportFlow = ai.defineFlow(
  {
    name: 'generateFeedbackReportFlow',
    inputSchema: GenerateFeedbackReportInputSchema,
    outputSchema: GenerateFeedbackReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
