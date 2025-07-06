'use client'

import { useState } from "react";
import { Button } from "../ui/button"
import {Input}from '@/components/ui/input'

type MessageData = {
    onSend : (message: string) => void;
    isLoading?: boolean;
}

export const MessageInput = ({onSend, isLoading}: MessageData) => {
    const [textInput, setTextInput] = useState("");


    const handleSend = () => {
        if(!textInput.trim()) return;
        onSend(textInput.trim());
        setTextInput("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === "Enter"){
            handleSend();
        }
    }
    

    return (
        <div className="flex gap-2 border-t pt-2">
            <Input 
            aria-label="Type a message"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Type your message..."
            className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !textInput.trim()}>Send</Button>
        </div>
    );
}