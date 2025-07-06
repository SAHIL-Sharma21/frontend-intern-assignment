'use clinet'

import { useEffect } from "react"
import { useChat } from "../../../hooks/useChat"
import { MessageInput } from "./MessageInput"
import { MessageList } from "./MessageList"
import { TypingIndicator } from "./TypingIndicator"
import {toast} from 'sonner';


export const ChatContainer = () => {
    const {isTyping, messages, sendMessage, retryMessage, clearChat} = useChat();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" ){
                e.preventDefault();
                clearChat();
                toast("Chat cleared", {description: "All messages have been removed from the chat."})
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [clearChat]);


    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <MessageList messages={messages} onRetry={retryMessage} />
                {isTyping && <TypingIndicator />}
            </div>

            <div className="p-4 border-t">
                <MessageInput onSend={sendMessage} isLoading={isTyping} />
            </div>
        </div>
    );
}
