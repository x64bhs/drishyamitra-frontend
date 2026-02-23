import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3 animate-fade-in", role === "user" ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          "text-xs font-bold",
          role === "assistant" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {role === "assistant" ? <Camera className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          role === "user"
            ? "gradient-primary text-primary-foreground rounded-tr-md"
            : "bg-muted text-foreground rounded-tl-md"
        )}
      >
        {content}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="gradient-primary text-primary-foreground">
          <Camera className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
