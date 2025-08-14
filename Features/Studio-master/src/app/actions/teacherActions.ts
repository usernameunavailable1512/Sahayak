"use server";

import { z } from "zod";
import { generateInterviewQuestions } from "@/ai/flows/generate-interview-questions";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  numberOfQuestions: z.coerce
    .number()
    .int()
    .min(1, "Please enter at least 1 question.")
    .max(10, "You can create a maximum of 10 questions."),
  timeLimit: z.coerce
    .number()
    .int()
    .min(30, "Time limit must be at least 30 seconds.")
    .max(300, "Time limit cannot exceed 300 seconds."),
});

type FormValues = z.infer<typeof formSchema>;

export async function createInterviewAction(values: FormValues) {
  return await generateInterviewQuestions(values);
}
