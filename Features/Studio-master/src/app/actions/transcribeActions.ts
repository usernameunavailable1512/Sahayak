"use server";

import {transcribeAudio} from "@/ai/flows/transcribe-audio";

export async function transcribeAudioAction(audioDataUri: string) {
    try {
        const {transcript} = await transcribeAudio({audioDataUri});
        return {transcript};
    } catch (error: any) {
        console.error("Error transcribing audio:", error);
        return {error: error.message || "Failed to transcribe audio."};
    }
}
