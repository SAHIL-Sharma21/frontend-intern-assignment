'use client'

import { useEffect, useRef } from 'react'
import {Message} from '../../../types/chat'
import { MessageBubble } from './MessageBubble';

type MessageList = {
    messages: Message[];
    onRetry?: (msg: Message) => void
}

export const MessageList = ({messages, onRetry}: MessageList) => {
    const bottomRef = useRef<HTMLDivElement | null >(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <div className='flex flex-col gap-2 overflow-y-auto px-2'>
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onRetry={onRetry} />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}