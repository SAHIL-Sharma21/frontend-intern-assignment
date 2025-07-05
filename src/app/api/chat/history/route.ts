import { NextResponse } from "next/server";
import {Message} from '../../../../../types/chat'


export async function GET(){
    const mockHistory: Message[] = [
        {
            id: '1',
            message: "Hello, How can i help you today?",
            timeStamp: new Date(Date.now() - 60000).toISOString(),
            sender: "ai",
            status: 'sent',
        },
    ]

    return NextResponse.json({
        conversationId: crypto.randomUUID(),
        messages: mockHistory,
    })

}
