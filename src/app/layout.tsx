import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: "AI chat Interface",
  description: "A real-time AI-powered chat interface built with Next.js"
}


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
