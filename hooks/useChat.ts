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
            setMessages(data.messages);
            setConversationId(data.conversationId);
        }

        loadHistory();
    }, []);



    const sendMessage = async(text: string) => {
        const newMessage:Message = {
            id: crypto.randomUUID(),
            sender: "user",
            message: text,
            timestamp: new Date().toISOString(),
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


    const retryMessage = async(failedMsg: Message) => {
        try {
            const response = await fetch("/api/chat/send", {
                method: "POST",
                body: JSON.stringify({messages: failedMsg.message, conversationId})
            });

            const aiReply = await response.json();

            setMessages(prev => 
                prev.map(msg => 
                    msg.id === failedMsg.id ? {...msg, status: 'sent' as const}  : msg
                ).concat(aiReply)
            )
        } catch (err) {
            console.error("Retry Failed again");
        }
    }


    const clearChat = () => {
        setMessages([]);
    }

    return {
        messages,
        isTyping,
        sendMessage,
        retryMessage,
        clearChat
    }

}