"use client";

import { useWebSocket } from "../../../hooks/useWebSocket";
import { Button } from "../ui/button";
import { toast } from "sonner";

type HeaderProp = {
  clearChat: () => void;
};

export const Header = ({ clearChat }: HeaderProp) => {
  const { status } = useWebSocket();

  const handleClear = () => {
    clearChat();
    toast("Chat Cleared", { description: "All messages have been removed." });
  };

  const statusColor =
    status === "connected"
      ? "text-green-500"
      : status === "reconnecting"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between">
      <h1 className="text-xl font-semibold">AI Chat Interface</h1>
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${statusColor}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <Button variant="outline" size="sm" onClick={handleClear}>
          Clear Chat
        </Button>
      </div>
    </header>
  );
};
