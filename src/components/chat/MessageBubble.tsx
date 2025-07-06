import { Message } from "../../../types/chat";
import { Button } from "../ui/button";

type BubbleProps = {
  message: Message;
  onRetry?: (msg: Message) => void;
};

export const MessageBubble = ({ message, onRetry}: BubbleProps) => {
  const isUser = message.sender === "user";

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className={`transition-all duration-300 max-w-md rounded-lg px-4 py-2 text-sm shadow-md whitespace-pre-wrap ${
          isUser
            ? "ml-auto bg-primary text-primary-foreground"
            : "mr-auto bg-muted text-muted-foreground"
        }`}
      >
        {message.message}
        <div className="mt-1 text-xs text-right opacity-60">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
      {message.status === "failed" && (
        <Button
        variant="destructive"
        size="sm"
        onClick={() => onRetry?.(message)}
        >Retry</Button>
      )}
    </div>
  );
};
