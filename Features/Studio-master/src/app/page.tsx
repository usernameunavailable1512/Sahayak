import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookUser, GraduationCap, ArrowRight } from 'lucide-react';
import { Icons } from '@/components/Icons';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Icons.logo className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            InterviewPrepAI
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Elevate your interview skills with AI-powered practice. Teachers create custom interviews, and students get instant feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookUser className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Teachers</CardTitle>
                <CardDescription>
                  Craft and manage mock interviews.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Define interview topics, set question counts, and specify time
              limits. Let our AI generate relevant questions and provide
              detailed feedback on student performance.
            </p>
            <Button asChild className="w-full">
              <Link href="/teacher">
                Go to Teacher Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Students</CardTitle>
                <CardDescription>
                  Practice and improve your skills.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Take interviews tailored to your learning goals. Use your voice
              to answer questions and receive an instant, comprehensive
              feedback report to identify your strengths and weaknesses.
            </p>
            <Button asChild variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/student">
                Go to Student Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>Built for the modern learning experience.</p>
        <p>&copy; {new Date().getFullYear()} InterviewPrepAI. All rights reserved.</p>
      </footer>
    </main>
  );
}
