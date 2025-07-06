"use client";

import { ReactNode } from "react";
import { useChat } from "../../../hooks/useChat";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type ChatShellProps = {
  children: ReactNode;
};

export const ChatShell = ({ children }: ChatShellProps) => {
  const { clearChat } = useChat();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header clearChat={clearChat}/>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </>
  );
};
