import { Message } from "../../../types/chat";
import { Button } from "../ui/button";

type MessageBubble = {
  message: Message;
  onRetry?: (message: Message) => void;
};

export const MessageBubble = ({ message, onRetry }: MessageBubble) => {
  const isUser = message.sender === "user";

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className={`max-w-md rounded-lg px-4 py-2 text-sm shadow-md whitespace-pre-wrap ${
          isUser
            ? "ml-auto bg-primary text-primary-foreground"
            : "mr-auto bg-muted text-muted-foreground"
        } `}
      >
        {message.message}
        <div className="mt-1 text-xs text-right opacity-60">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>

      {message.status === "failed" && onRetry && (
        <Button
        variant="destructive"
        size="sm"
        onClick={() => onRetry(message)}
        className="ml-auto"
        >
          Retry
        </Button>
      )}
    </div>
  );
};
