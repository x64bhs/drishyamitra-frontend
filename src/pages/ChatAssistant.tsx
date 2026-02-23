import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { mockMessages } from "@/lib/mock-data";
import { Send, Sparkles } from "lucide-react";

const suggestions = [
  "Show me photos from last weekend",
  "Who appears most in my photos?",
  "Create an album of landscapes",
  "Find photos with sunsets",
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { id: `m${Date.now()}`, role: "user" as const, content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `m${Date.now() + 1}`, role: "assistant", content: "That's a great question! I'm analyzing your photo library now. This feature will be fully functional once the backend is connected." },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Chat Assistant</h1>
        <p className="text-muted-foreground mt-1">Ask anything about your photos.</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="gradient-primary rounded-full p-5">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">How can I help?</h3>
              <p className="text-sm text-muted-foreground mt-1">Try one of these suggestions:</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {suggestions.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => send(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <ChatMessage key={m.id} role={m.role} content={m.content} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {/* Suggestions (when there are messages) */}
      {messages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
          {suggestions.map((s) => (
            <Button
              key={s}
              variant="outline"
              size="sm"
              className="rounded-full text-xs whitespace-nowrap shrink-0"
              onClick={() => send(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t border-border mt-2">
        <Input
          placeholder="Ask about your photos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          className="bg-muted/50 border-0"
        />
        <Button
          className="gradient-primary text-primary-foreground rounded-full shrink-0"
          size="icon"
          onClick={() => send(input)}
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
