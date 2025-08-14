'use server';

/**
 * @fileOverview A flow for validating student answers against answer keys and assessing the quality of responses.
 *
 * - validateStudentAnswers - A function that handles the validation process.
 * - ValidateStudentAnswersInput - The input type for the validateStudentAnswers function.
 * - ValidateStudentAnswersOutput - The return type for the validateStudentAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateStudentAnswersInputSchema = z.object({
  questions: z.array(z.string()).describe('The list of interview questions asked.'),
  studentAnswers: z.array(z.string()).describe('The list of student answers provided.'),
  answerKeys: z.array(z.string()).describe('The list of answer keys corresponding to the questions.'),
  topic: z.string().describe('The topic of the interview.'),
});
export type ValidateStudentAnswersInput = z.infer<typeof ValidateStudentAnswersInputSchema>;

const ValidateStudentAnswersOutputSchema = z.object({
  validationResults: z.array(z.string()).describe('The list of validation results for each answer.'),
  overallFeedback: z.string().describe('Overall feedback on the student performance.'),
});
export type ValidateStudentAnswersOutput = z.infer<typeof ValidateStudentAnswersOutputSchema>;

export async function validateStudentAnswers(input: ValidateStudentAnswersInput): Promise<ValidateStudentAnswersOutput> {
  return validateStudentAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateStudentAnswersPrompt',
  input: {schema: ValidateStudentAnswersInputSchema},
  output: {schema: ValidateStudentAnswersOutputSchema},
  prompt: `You are an expert interview evaluator. Given the interview questions, the student's answers, and the answer keys, you will validate each answer and provide an overall feedback.

Topic: {{{topic}}}

Questions:
{{#each questions}}
  {{@index + 1}}. {{this}}
{{/each}}

Student Answers:
{{#each studentAnswers}}
  {{@index + 1}}. {{this}}
{{/each}}

Answer Keys:
{{#each answerKeys}}
  {{@index + 1}}. {{this}}
{{/each}}

Provide a validation result for each answer, assessing its correctness, completeness, and clarity. Then, provide an overall feedback on the student's performance, highlighting strengths and areas for improvement.

Output should contain validationResults (an array of strings) and overallFeedback (a single string).`,
});

const validateStudentAnswersFlow = ai.defineFlow(
  {
    name: 'validateStudentAnswersFlow',
    inputSchema: ValidateStudentAnswersInputSchema,
    outputSchema: ValidateStudentAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
