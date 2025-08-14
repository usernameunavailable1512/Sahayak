"use server";

import { generateFeedbackReport } from "@/ai/flows/generate-feedback-report";

export async function generateFeedbackAction(data: {
  topic: string;
  questionsAndAnswers: { question: string; answer: string }[];
}) {
  return await generateFeedbackReport(data);
}
