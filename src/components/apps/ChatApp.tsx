import { useEffect, useRef, useState } from "react";
import MiniWindow from "./MiniWindow";

interface ChatAppProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  onSend: (message: string) => void;
  messages: Array<{ role: "user" | "assistant"; content: string; id: string }>;
  isLoading: boolean;
  error?: string | null;
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1.5 border border-border bg-background self-start max-w-[85%]">
      <span
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
        style={{ animation: "thinking-dot 1.2s ease-in-out infinite 0ms" }}
      />
      <span
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
        style={{ animation: "thinking-dot 1.2s ease-in-out infinite 200ms" }}
      />
      <span
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
        style={{ animation: "thinking-dot 1.2s ease-in-out infinite 400ms" }}
      />
      <style>{`
        @keyframes thinking-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function ChatApp({
  onClose,
  onFocus,
  zIndex,
  onSend,
  messages,
  isLoading,
  error,
}: ChatAppProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastMessageIsUser =
    messages.length > 0 && messages[messages.length - 1].role === "user";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <MiniWindow
      title="turing — ask about dev"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialX={600}
      initialY={80}
      width={360}
      height={440}
    >
      {/* Header bar */}
      <div className="shrink-0 flex items-center justify-between px-3 py-1.5 border-b-2 border-foreground bg-card">
        <span className="font-mono-code text-[9px] uppercase tracking-[0.22em] text-primary font-bold">
          TURING
        </span>
        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="font-mono-code text-[9px] text-muted-foreground">
                thinking...
              </span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono-code text-[9px] text-muted-foreground">
                online
              </span>
            </>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 bg-card flex flex-col gap-2"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-mono-code text-[10px] text-muted-foreground text-center px-4">
              Ask me anything about Dev's work, skills, or projects.
            </p>
          </div>
        ) : (
          messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-2.5 py-1.5 font-body text-[11px] max-w-[80%]">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-start">
                <div className="border border-border bg-background px-2.5 py-1.5 font-body text-[11px] max-w-[85%]">
                  {msg.content}
                </div>
              </div>
            )
          )
        )}

        {/* Loading indicator */}
        {isLoading && lastMessageIsUser && <ThinkingDots />}
      </div>

      {/* Error display */}
      {error && (
        <div className="shrink-0 px-3 py-1.5 border-t border-border/30 bg-card">
          <p className="font-mono-code text-[9px] text-red-500">{error}</p>
        </div>
      )}

      {/* Input bar */}
      <div className="shrink-0 border-t-2 border-foreground px-3 py-2 flex gap-2 bg-card">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 bg-transparent font-mono-code text-xs border border-border px-2 py-1.5 focus:border-primary outline-none placeholder:text-muted-foreground disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ""}
          className="bg-primary text-primary-foreground px-3 py-1.5 font-mono-code text-xs disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>
    </MiniWindow>
  );
}
