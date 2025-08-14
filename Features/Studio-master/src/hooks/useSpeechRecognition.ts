
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  error: string | null;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

const getSpeechRecognition = () => {
  if (typeof window !== 'undefined') {
    return window.SpeechRecognition || window.webkitSpeechRecognition;
  }
  return null;
}

const SpeechRecognitionAPI = getSpeechRecognition();

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (isListening || !SpeechRecognitionAPI) {
      return;
    }

    stopListening(); // Ensure any previous instance is stopped
    
    setTranscript('');
    setError(null);
    
    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
          let errorMessage = `Speech recognition error: ${event.error}`;
          if (event.error === 'network') {
            errorMessage += ". Please check your internet connection.";
          } else if (event.error === 'no-speech') {
            errorMessage = "No speech was detected. Please try again.";
          }
          setError(errorMessage);
          stopListening();
      };
      
      recognition.onend = () => {
        // The onend event can fire for various reasons, including errors or manual stops.
        // We only want to set isListening to false here if it wasn't already done by an error handler.
        if (recognitionRef.current) {
           setIsListening(false);
        }
      };
      
      recognition.start();
      setIsListening(true);
    } catch(e) {
        setError("Speech recognition could not be started.");
        setIsListening(false);
    }
  }, [isListening, stopListening]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!SpeechRecognitionAPI,
    error,
    setTranscript,
  };
};
