"use client";

import { Cpu, Dna, FlaskConical, Atom } from "lucide-react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SIMULATIONS = [
  {
    name: "Projectile Motion",
    icon: Cpu,
    description: "Launch objects and see their trajectory.",
    href: "/simu1.html",
    color: "text-purple-400",
    shadow: "shadow-purple-400/20",
  },
  {
    name: "Photosynthesis",
    icon: Dna,
    description: "Explore how plants convert light into energy.",
    href: "/simu2.html",
    color: "text-blue-400",
    shadow: "shadow-blue-400/20",
  },
  {
    name: "Pendulum",
    icon: FlaskConical,
    description: "Observe the motion of a simple pendulum.",
    href: "/simu3.html",
    color: "text-green-400",
    shadow: "shadow-green-400/20",
  },
  {
    name: "Rotational Torque",
    icon: Atom,
    description: "Understand the forces that cause rotation.",
    href: "/simu4.html",
    color: "text-pink-400",
    shadow: "shadow-pink-400/20",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background font-sans animate-in fade-in duration-1000">
      <div className="w-full max-w-5xl space-y-12">
        <header className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Atom className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Interactive Simulations Hub
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Your portal to engaging and interactive learning experiences.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIMULATIONS.map((sim, index) => (
            <Link href={sim.href} key={sim.name} passHref>
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-secondary/50 border-border/50 animate-in fade-in zoom-in-95 h-full flex flex-col",
                  sim.shadow,
                )}
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", sim.color)}>
                    <sim.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{sim.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{sim.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
