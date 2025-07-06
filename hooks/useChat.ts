"use client";

import { useEffect, useState } from "react";
import { Message } from "../types/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIstyping] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const response = await fetch("/api/chat/history");
      const data = await response.json();
      setMessages(data.messages);
      setConversationId(data.conversationId);
    };

    loadHistory();
  }, []);

  const sendMessage = async (text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      message: text,
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      setIstyping(true);
      const response = await fetch("/api/chat/send", {
        method: "POST",
        body: JSON.stringify({ message: text, conversationId }),
      });

      const aiReply = await response.json();
      const aiId = crypto.randomUUID();
      const streamMsg: Message = {
        id: aiId,
        sender: "ai",
        message: "",
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== newMessage.id),
        { ...newMessage, status: "sent" },
        streamMsg,
      ]);

      for (let i = 0; i < aiReply.message.length; i++) {
        const char = aiReply.message[i];
        await new Promise((res) => setTimeout(res, 10));
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiId ? { ...msg, message: msg.message + char } : msg
          )
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
        )
      );
    } finally {
      setIstyping(false);
    }
  };

  const retryMessage = async (failedMsg: Message) => {
    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        body: JSON.stringify({ message: failedMsg.message, conversationId }),
      });

      const aiReply = await response.json();

      setMessages((prev) =>
        prev
          .map((msg) =>
            msg.id === failedMsg.id ? { ...msg, status: "sent" as const } : msg
          )
          .concat(aiReply)
      );
    } catch (err) {
      console.error("Retry Failed again");
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    retryMessage,
    clearChat,
  };
};
