import "./globals.css";
import { ReactNode } from "react";
import {Metadata} from 'next'
import {Toaster} from '@/components/ui/sonner';
import { ChatShell } from "@/components/layout/ChatShell";


export const metadata: Metadata = {
  title: "AI chat Interface",
  description: "A real-time AI-powered chat interface built with Next.js"
}


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden">
        <Toaster />
        <ChatShell>{children}</ChatShell>
      </body>
    </html>
  );
}
