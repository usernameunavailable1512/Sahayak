"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Question {
  question: string;
  answerKey: string;
}

export interface Interview {
  id: string;
  topic: string;
  numberOfQuestions: number;
  timeLimit: number; // in seconds per question
  questions: Question[];
  status: "pending" | "completed";
  studentAnswers?: string[];
  feedbackReport?: string;
  createdAt: number;
}

interface InterviewContextType {
  interviews: Interview[];
  addInterview: (interview: Omit<Interview, 'id' | 'createdAt'>) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  getInterviewById: (id: string) => Interview | undefined;
  isLoading: boolean;
}

const InterviewContext = createContext<InterviewContextType | null>(null);

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewContext must be used within an InterviewProvider");
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'interviewprep-ai-interviews';

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedInterviews = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedInterviews) {
        setInterviews(JSON.parse(savedInterviews));
      }
    } catch (error) {
      console.error("Failed to load interviews from local storage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if(!isLoading){
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(interviews));
        } catch (error) {
            console.error("Failed to save interviews to local storage", error);
        }
    }
  }, [interviews, isLoading]);

  const addInterview = (interview: Omit<Interview, 'id' | 'createdAt'>) => {
    const newInterview: Interview = {
      ...interview,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setInterviews((prev) => [...prev, newInterview]);
  };

  const updateInterview = (id: string, updates: Partial<Interview>) => {
    setInterviews((prev) =>
      prev.map((interview) =>
        interview.id === id ? { ...interview, ...updates } : interview
      )
    );
  };

  const getInterviewById = (id: string) => {
    return interviews.find((interview) => interview.id === id);
  };

  const value = { interviews, addInterview, updateInterview, getInterviewById, isLoading };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};
