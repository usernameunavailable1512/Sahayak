import { config } from 'dotenv';
config();

import '@/ai/flows/generate-feedback-report.ts';
import '@/ai/flows/generate-interview-questions.ts';
import '@/ai/flows/validate-student-answers.ts';
import '@/ai/flows/transcribe-audio.ts';
