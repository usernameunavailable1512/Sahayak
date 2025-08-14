"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { useInterviewContext } from "@/context/InterviewContext";
import { createInterviewAction } from "@/app/actions/teacherActions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { BookCopy, Loader2, PlusCircle, ArrowRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

export type FormValues = z.infer<typeof formSchema>;

export default function TeacherPage() {
  const { interviews, addInterview, isLoading } = useInterviewContext();
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      numberOfQuestions: 3,
      timeLimit: 120,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsCreating(true);
    try {
      const result = await createInterviewAction(values);
      if (result && result.questions) {
        addInterview({
          ...values,
          questions: result.questions,
          status: "pending",
        });
        toast({
          title: "Interview Created!",
          description: `Successfully created an interview on "${values.topic}".`,
        });
        form.reset();
      } else {
        throw new Error("Failed to get questions from AI.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create interview. Please try again.",
      });
    } finally {
      setIsCreating(false);
    }
  }

  const sortedInterviews = [...interviews].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6" />
            Create New Interview
          </CardTitle>
          <CardDescription>
            Fill in the details to generate an AI-powered interview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React Hooks" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main subject of the interview.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (per question)</FormLabel>
                    <FormControl>
                      <Input type="number" step="10" {...field} />
                    </FormControl>
                    <FormDescription>In seconds (e.g., 120).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isCreating} className="w-full">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Create Interview"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookCopy className="h-6 w-6"/>
            Existing Interviews
        </h2>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {isLoading ? (
                Array.from({length: 4}).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                             <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))
            ) : sortedInterviews.length > 0 ? (
            sortedInterviews.map((interview) => (
              <Card key={interview.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="truncate">{interview.topic}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Created {formatDistanceToNow(new Date(interview.createdAt), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{interview.numberOfQuestions} Questions</span>
                      <span>{interview.timeLimit}s per question</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge variant={interview.status === 'completed' ? 'secondary' : 'outline'}>
                    {interview.status}
                  </Badge>
                  {interview.status === 'completed' && (
                    <Button asChild variant="link">
                      <Link href={`/feedback/${interview.id}`}>
                        View Feedback <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-2 text-center py-12">
              <CardContent>
                <h3 className="text-xl font-semibold">No interviews yet!</h3>
                <p className="text-muted-foreground mt-2">
                  Create your first interview to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
