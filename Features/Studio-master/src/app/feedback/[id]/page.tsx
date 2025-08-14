"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useInterviewContext,
  Interview,
} from "@/context/InterviewContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Star, BarChart, ListChecks } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { getInterviewById, isLoading } = useInterviewContext();
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    if (!isLoading && id) {
      const foundInterview = getInterviewById(id as string);
      if (foundInterview && foundInterview.status === 'completed') {
        setInterview(foundInterview);
      } else {
        // Redirect if not found or not completed
        router.replace("/student");
      }
    }
  }, [id, isLoading, getInterviewById, router]);

  if (isLoading || !interview) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/student">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
             <Star className="h-8 w-8 text-primary"/>
             <div>
                <CardTitle className="text-3xl">Feedback Report</CardTitle>
                <CardDescription className="text-lg">For your interview on "{interview.topic}"</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                    <BarChart className="h-6 w-6 text-accent"/>
                    AI-Generated Feedback
                </h3>
                <div className="text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
                    {interview.feedbackReport}
                </div>
            </div>

            <Separator className="my-8"/>

            <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <ListChecks className="h-6 w-6 text-accent"/>
                    Your Answers
                </h3>
                 <Accordion type="single" collapsible className="w-full">
                    {interview.questions.map((q, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left hover:no-underline">
                                <span className="font-semibold">Question {index + 1}:</span> {q.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-muted-foreground whitespace-pre-wrap p-4 bg-background rounded-md border">
                                    {interview.studentAnswers?.[index] || <span className="italic">No answer provided.</span>}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
