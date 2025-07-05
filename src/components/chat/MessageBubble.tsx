import { Message } from "../../../types/chat";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`max-w-md rounded-lg px-4 py-2 text-sm shadow-md whitespace-pre-wrap ${
        isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted text-muted-foreground"
      } `}
    >
      {message.message}
      <div className="mt-1 text-xs text-right opacity-60">
        {new Date(message.timeStamp).toLocaleTimeString()}
      </div>
    </div>
  );
};
