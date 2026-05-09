/**
 * useChat — chat hook for the portfolio AI assistant.
 *
 * Security:
 * - Provider credentials stay server-side behind /api/chat
 * - Input length capped at 500 chars
 * - Rate limiting via localStorage (5 req / 2 min)
 * - Raw errors never surfaced to user
 * - System prompt enforces strict topic guardrails — nothing outside Dev Trivedi allowed
 */

import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ── Rate limiter ──────────────────────────────────────────────────────────────

const RATE_KEY = "chat_timestamps";
const RATE_LIMIT = 5;
const RATE_WINDOW = 120_000; // 2 minutes

function isRateLimited(): boolean {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter(t => now - t < RATE_WINDOW);
    if (recent.length >= RATE_LIMIT) return true;
    localStorage.setItem(RATE_KEY, JSON.stringify([...recent, now]));
    return false;
  } catch {
    return false;
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(ragContext: string): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim().slice(0, 500);
    if (!trimmed || isLoading) return;

    setError(null);

    if (isRateLimited()) {
      setError("Patience! Max 5 messages per 2 minutes. Sir Turing is thinking.");
      return;
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          ragContext,
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) throw new Error("Too many requests. Please wait a moment.");
        if (status === 401 || status === 503) throw new Error("Service temporarily unavailable.");
        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();
      const assistantContent = data.message ?? "I couldn't generate a response.";

      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: assistantContent,
      }]);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages(prev => prev.filter(m => m.id !== userMsg.id));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, ragContext]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}
