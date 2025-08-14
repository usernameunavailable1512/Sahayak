"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useInterviewContext,
  Interview,
  Question,
} from "@/context/InterviewContext";
import { generateFeedbackAction } from "@/app/actions/interviewActions";
import { transcribeAudioAction } from "@/app/actions/transcribeActions";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Mic, StopCircle, MicOff, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Status = 'IDLE' | 'GETTING_PERMISSION' | 'PERMISSION_DENIED' | 'RECORDING' | 'PROCESSING' | 'ANSWER_SUBMITTED';

export default function InterviewPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { getInterviewById, updateInterview, isLoading } = useInterviewContext();
  const { toast } = useToast();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [status, setStatus] = useState<Status>('IDLE');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isLoading && id) {
      const foundInterview = getInterviewById(id as string);
      if (foundInterview) {
        if (foundInterview.status === 'completed') {
            router.replace(`/feedback/${foundInterview.id}`);
        } else {
            setInterview(foundInterview);
            setTimeLeft(foundInterview.timeLimit);
            setAnswers(foundInterview.studentAnswers || Array(foundInterview.questions.length).fill(''));
        }
      } else {
        router.replace("/student");
      }
    }
  }, [id, isLoading, getInterviewById, router]);
  
  useEffect(() => {
     if (interview) {
       setStatus('IDLE');
       setTimeLeft(interview.timeLimit);
     }
  }, [currentQuestionIndex, interview]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback((duration: number) => {
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer();
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const handleStartRecording = async () => {
    if (status !== 'IDLE' && status !== 'ANSWER_SUBMITTED') return;
    setStatus('GETTING_PERMISSION');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({ variant: 'destructive', title: 'Error', description: 'Media devices API not supported on your browser.' });
      setStatus('IDLE');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus('RECORDING');
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
          setStatus('PROCESSING');
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            const { transcript, error } = await transcribeAudioAction(base64Audio);

            if (error || !transcript) {
              toast({ variant: 'destructive', title: 'Transcription Failed', description: error || 'Could not process audio.' });
              setStatus('IDLE');
              return;
            }
            
            setAnswers((prev) => {
              const newAnswers = [...prev];
              newAnswers[currentQuestionIndex] = transcript;
              return newAnswers;
            });
            setStatus('ANSWER_SUBMITTED');
          };
      };

      mediaRecorderRef.current.start();
      startTimer(interview?.timeLimit || 120);
    } catch (err) {
      console.error('Error getting media stream:', err);
      setStatus('PERMISSION_DENIED');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      stopTimer();
    }
  };


  const handleNextQuestion = () => {
    if (status === 'RECORDING') {
      handleStopRecording();
    }
    
    if (interview && currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishInterview();
    }
  };

  const handleFinishInterview = async () => {
    if (status === 'RECORDING') {
      handleStopRecording();
    }
    if (!interview) return;

    setIsGeneratingFeedback(true);
    try {
      const questionsAndAnswers = interview.questions.map((q, i) => ({
        question: q.question,
        answer: answers[i] || "",
      }));

      const { feedbackReport } = await generateFeedbackAction({
        topic: interview.topic,
        questionsAndAnswers,
      });

      updateInterview(interview.id, {
        status: "completed",
        studentAnswers: answers,
        feedbackReport,
      });

      toast({
        title: "Interview Complete!",
        description: "Your feedback report is ready.",
      });
      router.push(`/feedback/${interview.id}`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Feedback",
        description: "Something went wrong. Please try again later.",
      });
      setIsGeneratingFeedback(false);
    }
  };
  
  const currentQuestion: Question | undefined = interview?.questions[currentQuestionIndex];
  const progress = interview
    ? ((currentQuestionIndex + 1) / interview.questions.length) * 100
    : 0;

  if (isLoading || !interview) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isGeneratingFeedback) {
    return (
       <div className="flex flex-col justify-center items-center h-[80vh] gap-4 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Generating Your Feedback Report</h2>
        <p className="text-muted-foreground">Our AI is analyzing your answers. This may take a moment.</p>
      </div>
    )
  }

  const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
        <AlertDialog open={status === 'PERMISSION_DENIED'}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2"><AlertCircle className="text-destructive"/>Microphone Access Denied</AlertDialogTitle>
                    <AlertDialogDescription>
                       To record your answer, please allow microphone access in your browser settings and refresh the page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => router.refresh()}>Refresh Page</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle>Interview: {interview.topic}</CardTitle>
          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </p>
            <div className="w-24 text-center">
                <p className="text-lg font-mono font-semibold">{timeLeft}s</p>
                <Progress value={(timeLeft / interview.timeLimit) * 100} className="h-2"/>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-secondary rounded-lg min-h-[100px]">
            <p className="text-xl font-semibold text-foreground">
              {currentQuestion?.question}
            </p>
          </div>
          
          {status === 'ANSWER_SUBMITTED' && (
              <Alert variant="default" className="border-green-500 text-green-700">
                  <AlertCircle className="h-4 w-4 !text-green-500"/>
                  <AlertTitle>Answer Submitted!</AlertTitle>
                  <AlertDescription>
                    {answers[currentQuestionIndex] || "Your transcript will appear here."}
                  </AlertDescription>
              </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
             <Button
                onClick={status === 'RECORDING' ? handleStopRecording : handleStartRecording}
                className={`w-full ${status === 'RECORDING' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                disabled={status === 'PROCESSING' || status === 'GETTING_PERMISSION'}
              >
                {status === 'RECORDING' && <><StopCircle className="mr-2 h-4 w-4" /> Stop Recording</>}
                {(status === 'IDLE' || status === 'ANSWER_SUBMITTED') && <><Mic className="mr-2 h-4 w-4" /> Start Recording</>}
                {status === 'PROCESSING' && <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>}
                {status === 'GETTING_PERMISSION' && <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Getting Mic...</>}
                {status === 'PERMISSION_DENIED' && <><MicOff className="mr-2 h-4 w-4" /> Mic Denied</>}
              </Button>
            <Button onClick={handleNextQuestion} variant="outline" className="w-full" disabled={status === 'RECORDING' || status === 'PROCESSING'}>
              {isLastQuestion ? "Finish Interview" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
