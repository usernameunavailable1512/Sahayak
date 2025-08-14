"use client";

import { InterviewProvider } from "@/context/InterviewContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <InterviewProvider>
        {children}
        <Toaster />
      </InterviewProvider>
    </TooltipProvider>
  );
}
