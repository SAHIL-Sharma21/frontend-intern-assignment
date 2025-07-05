'use client'

import { useEffect, useState } from "react"
import { Message } from "../types/chat";

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIstyping] = useState<boolean>(false)
    const [conversationId, setConversationId] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            const response = await fetch("/api/chat/history")
            const data = await response.json();
            sendMessage(data.messages);
            setConversationId(data.conversationId);
        }

        loadHistory();
    }, []);



    const sendMessage = async(text: string) => {
        const newMessage:Message = {
            id: Date.now().toString(),
            sender: "user",
            message: text,
            timeStamp: new Date().toISOString(),
            status: "sending"
        };

        setMessages(prev => [...prev, newMessage]);

        try{
            setIstyping(true);
            const response = await fetch("/api/chat/send", {
                method: 'POST',
                body: JSON.stringify({messages: text, conversationId})
            });

            const aiReply = await response.json();
            setMessages(prev => [
                ...prev.filter(m => m.id !== newMessage.id),
                {...newMessage, status: 'sent'},
                aiReply,
            ]);
        } catch (err){
            setMessages(prev => prev.map(m => m.id === newMessage.id ? {...m, status: 'failed'} : m))
        } finally{
            setIstyping(false);
        }
    }

    return {
        messages,
        isTyping,
        sendMessage
    }

}