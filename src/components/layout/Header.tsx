"use client"

import { Button } from "../ui/button";
import {toast} from 'sonner';

type HeaderProp = {
    clearChat: () => void;
}

export const Header = ({clearChat}: HeaderProp) => {

    const handleClear = () => {
        clearChat();
        toast("Chat Cleared", {description: "All messages have been removed."})
    }

    return <header className="h-16 px-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Chat interface</h1>
        <Button
        variant="outline"
        size="sm"
        onClick={handleClear}
        className="cursor-pointer"
        >
            Clear Chat
        </Button>
    </header>
}