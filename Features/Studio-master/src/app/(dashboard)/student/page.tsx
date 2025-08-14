"use client";

import Link from "next/link";
import { useInterviewContext } from "@/context/InterviewContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GraduationCap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentPage() {
  const { interviews, isLoading } = useInterviewContext();

  const sortedInterviews = [...interviews].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        Student Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <Card key={interview.id} className="flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="truncate">{interview.topic}</CardTitle>
                <CardDescription>
                  {interview.numberOfQuestions} Questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created {formatDistanceToNow(new Date(interview.createdAt), { addSuffix: true })}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge variant={interview.status === 'completed' ? 'secondary' : 'default'} className={interview.status === 'completed' ? '' : 'bg-accent text-accent-foreground'}>
                  {interview.status}
                </Badge>
                {interview.status === "pending" && (
                  <Button asChild>
                    <Link href={`/interview/${interview.id}`}>
                      Start Interview <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {interview.status === "completed" && (
                  <Button asChild variant="outline">
                    <Link href={`/feedback/${interview.id}`}>
                      View Feedback <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
            <CardContent>
              <h3 className="text-2xl font-semibold">No interviews available.</h3>
              <p className="text-muted-foreground mt-2">
                Ask your teacher to create an interview for you.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
