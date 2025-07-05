export type Sender = "user" | "ai";
export type Status = "sending" | 'sent' | 'failed';

export interface Message {
    id: string;
    sender : Sender;
    message: string;
    timeStamp: string;
    status: Status;
}

export interface Conversation {
    conversationId: string;
    messages: Message[];
}