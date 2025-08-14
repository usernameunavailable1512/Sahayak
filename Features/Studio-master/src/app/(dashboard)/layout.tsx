"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { BookUser, GraduationCap, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
              <Link href="/">
                <Icons.logo />
              </Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/teacher")}
                  tooltip="Teacher Portal"
                >
                  <Link href="/teacher">
                    <BookUser />
                    <span>Teacher Portal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/student")}
                  tooltip="Student Portal"
                >
                  <Link href="/student">
                    <GraduationCap />
                    <span>Student Portal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip="Back to Home">
                        <Link href="/">
                            <LogOut />
                            <span>Back to Home</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="max-w-full">
            <header className="p-4 flex items-center gap-4 md:hidden">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                    <Icons.logo className="h-6 w-6 text-primary"/>
                    <h1 className="text-lg font-semibold">InterviewPrepAI</h1>
                </div>
            </header>
            <main className="p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
