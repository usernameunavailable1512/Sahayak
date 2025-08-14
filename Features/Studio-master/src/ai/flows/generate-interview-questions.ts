'use server';

/**
 * @fileOverview A flow to generate interview questions based on a topic, number of questions, and time limit specified by a teacher.
 *
 * - generateInterviewQuestions - A function that generates interview questions.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic of the interview.'),
  numberOfQuestions: z
    .number()
    .int()
    .min(1)
    .describe('The number of questions to generate.'),
  timeLimit: z
    .number()
    .int()
    .min(1)
    .describe('The time limit for the interview in minutes.'),
});
export type GenerateInterviewQuestionsInput = z.infer<
  typeof GenerateInterviewQuestionsInputSchema
>;

const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The interview question.'),
      answerKey: z.string().describe('The answer key for the question.'),
    })
  ).describe('The generated interview questions and answer keys.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<
  typeof GenerateInterviewQuestionsOutputSchema
>;

export async function generateInterviewQuestions(
  input: GenerateInterviewQuestionsInput
): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewQuestionsPrompt',
  input: {schema: GenerateInterviewQuestionsInputSchema},
  output: {schema: GenerateInterviewQuestionsOutputSchema},
  prompt: `You are an expert interview question generator. Given the topic,
the number of questions, and the time limit, generate a set of relevant
interview questions with corresponding answer keys in a structured format.

Topic: {{{topic}}}
Number of Questions: {{{numberOfQuestions}}}
Time Limit: {{{timeLimit}}} minutes

Format your response as a JSON array of objects, where each object has a
"question" field and an "answerKey" field.
`,
});

const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
