import { NextRequest, NextResponse } from "next/server";
import {Message} from '../../../../types/chat'

export async function POST(req: NextRequest){
    const {message, conversationId} = await req.json();

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      const aiReplies = [
    "That's an interesting question! Let me think about it...",
    "I understand what you're asking. Here's my perspective:",
    "Based on what you've shared, I would suggest:",
    "That's a great point. Here are some thoughts:",
  ]

  const aiResponses: Message = {
    id: crypto.randomUUID(),
    message: aiReplies[Math.random() * aiReplies.length] + `(Replying to: "${message.slice(0, 50)}...")`,
    timeStamp: new Date().toISOString(),
    sender: "ai",
    status:"sent",
  }

  return NextResponse.json(aiResponses);
}