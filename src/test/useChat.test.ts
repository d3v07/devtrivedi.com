/**
 * useChat hook — comprehensive test suite
 *
 * Coverage:
 * 1.  Empty input silently ignored
 * 2.  Whitespace-only input silently ignored
 * 3.  Input > 500 chars is trimmed to 500 before sending
 * 4.  Valid input adds user message optimistically
 * 5.  Successful API response adds assistant message
 * 6.  429 response sets "Too many requests" error
 * 7.  401 response sets "Service temporarily unavailable" error
 * 8.  Generic non-ok response sets "Something went wrong" error
 * 9.  On hard error, optimistic user message is removed
 * 10. clearMessages resets messages and error
 * 11. Rate limiting — 5th request allowed, 6th blocked
 * 12. isLoading is true during API call, false after
 * 13. AbortError is silently swallowed (no error state)
 * 14. ragContext is injected into system prompt
 * 15. Last 6 messages are sent as context in the API call body
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useChat } from "@/hooks/use-chat";

// ── Environment ────────────────────────────────────────────────────────────────

vi.stubEnv("VITE_OPENROUTER_API_KEY", "test-key");

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Build a minimal ok fetch response that returns an assistant message. */
function makeOkResponse(content = "Hello from Sir Turing.") {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        choices: [{ message: { role: "assistant", content } }],
      }),
  } as Response);
}

/** Build a non-ok fetch response with a given HTTP status. */
function makeErrorResponse(status: number) {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve({}),
  } as Response);
}

/**
 * Pre-populate localStorage with `count` timestamps that are all recent
 * (within the 2-minute rate-limit window).
 */
function seedRateTimestamps(count: number) {
  const now = Date.now();
  const timestamps = Array.from({ length: count }, (_, i) => now - i * 1000);
  localStorage.setItem("chat_timestamps", JSON.stringify(timestamps));
}

// ── Suite ──────────────────────────────────────────────────────────────────────

describe("useChat", () => {
  beforeEach(() => {
    // Reset fetch mock and localStorage before each test
    vi.restoreAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── 1. Empty input ──────────────────────────────────────────────────────────

  it("silently ignores empty input — no fetch call, no message added", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("");
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });

  // ── 2. Whitespace-only input ────────────────────────────────────────────────

  it("silently ignores whitespace-only input — no fetch call, no message added", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("   \t\n  ");
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });

  // ── 3. Input trimmed to 500 chars ───────────────────────────────────────────

  it("trims input longer than 500 chars to exactly 500 before sending", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    const { result } = renderHook(() => useChat("context"));

    const longInput = "a".repeat(600);

    await act(async () => {
      await result.current.sendMessage(longInput);
    });

    expect(fetchSpy).toHaveBeenCalledOnce();

    const body = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    // Last message in the messages array is the user message
    const userMsg = body.messages[body.messages.length - 1];
    expect(userMsg.content).toHaveLength(500);
    expect(userMsg.content).toBe("a".repeat(500));
  });

  // ── 4. Optimistic user message ──────────────────────────────────────────────

  it("adds user message optimistically before API resolves", async () => {
    // Use a deferred fetch so we can inspect state mid-flight
    let resolveFetch!: (v: Response) => void;
    const pendingFetch = new Promise<Response>(r => { resolveFetch = r; });
    vi.spyOn(globalThis, "fetch").mockReturnValue(pendingFetch as any);

    const { result } = renderHook(() => useChat("context"));

    act(() => {
      result.current.sendMessage("Hello");
    });

    // Flush microtasks up to (but not including) fetch resolution
    await act(async () => {
      await Promise.resolve();
    });

    // User message should already be in state
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe("user");
    expect(result.current.messages[0].content).toBe("Hello");

    // Resolve fetch to avoid unhandled promise warnings
    resolveFetch(makeOkResponse() as unknown as Response);
    await act(async () => { await pendingFetch; });
  });

  // ── 5. Successful response adds assistant message ───────────────────────────

  it("adds assistant message after successful API call", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse("Quite right, old chap.") as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("Tell me about Dev");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].role).toBe("assistant");
    expect(result.current.messages[1].content).toBe("Quite right, old chap.");
  });

  // ── 6. 429 → Too many requests ──────────────────────────────────────────────

  it("sets 'Too many requests' error on 429 HTTP response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeErrorResponse(429) as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.error).toBe("Too many requests. Please wait a moment.");
  });

  // ── 7. 401 → Service unavailable ───────────────────────────────────────────

  it("sets 'Service temporarily unavailable' error on 401 HTTP response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeErrorResponse(401) as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.error).toBe("Service temporarily unavailable.");
  });

  // ── 8. Generic error ────────────────────────────────────────────────────────

  it("sets 'Something went wrong' error on unrecognised non-ok HTTP status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeErrorResponse(500) as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.error).toBe("Something went wrong. Please try again.");
  });

  // ── 9. Optimistic message removed on error ──────────────────────────────────

  it("removes the optimistic user message when the API call fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeErrorResponse(500) as any
    );

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("This will fail");
    });

    // After error, messages should be empty — optimistic message rolled back
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.error).toBeTruthy();
  });

  // ── 10. clearMessages resets state ─────────────────────────────────────────

  it("clearMessages resets messages array and error to null", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeErrorResponse(500) as any
    );

    const { result } = renderHook(() => useChat("context"));

    // Trigger an error to get non-null error state
    await act(async () => {
      await result.current.sendMessage("Hello");
    });
    expect(result.current.error).toBeTruthy();

    // Now clear
    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  // ── 11a. Rate limiting — 5th request is allowed ────────────────────────────

  it("allows the 5th request within the 2-minute window", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    // Pre-seed 4 timestamps so this send is the 5th
    seedRateTimestamps(4);

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("5th message");
    });

    // No rate-limit error; assistant reply should appear
    expect(result.current.error).toBeNull();
    expect(result.current.messages.some(m => m.role === "assistant")).toBe(true);
  });

  // ── 11b. Rate limiting — 6th request is blocked ────────────────────────────

  it("blocks the 6th request within the 2-minute window with the correct error", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    // Pre-seed 5 timestamps — window is full
    seedRateTimestamps(5);

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("6th message — should be blocked");
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.error).toBe(
      "Patience! Max 5 messages per 2 minutes. Sir Turing is thinking."
    );
    // No messages should have been added
    expect(result.current.messages).toHaveLength(0);
  });

  // ── 12. isLoading state ─────────────────────────────────────────────────────

  it("isLoading is true during the API call and false after it resolves", async () => {
    let resolveFetch!: (v: Response) => void;
    const pendingFetch = new Promise<Response>(r => { resolveFetch = r; });
    vi.spyOn(globalThis, "fetch").mockReturnValue(pendingFetch as any);

    const { result } = renderHook(() => useChat("context"));

    act(() => {
      result.current.sendMessage("Hello");
    });

    // Allow optimistic state update to flush
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(true);

    // Resolve the fetch
    resolveFetch(makeOkResponse() as unknown as Response);
    await act(async () => {
      await pendingFetch;
      // Extra tick for json() and state updates
      await new Promise(r => setTimeout(r, 0));
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  // ── 13. AbortError is silently swallowed ────────────────────────────────────

  it("does not set error state when fetch throws an AbortError", async () => {
    // Create an error whose `.name` is exactly "AbortError" — matching the
    // hook's `err.name === "AbortError"` guard. Using a plain Error with the
    // name overridden is the most reliable approach across jsdom/happy-dom
    // because DOMException's constructor name argument is not consistently
    // honoured in all environments.
    const abortError = Object.assign(new Error("The user aborted a request."), {
      name: "AbortError",
    });
    vi.spyOn(globalThis, "fetch").mockRejectedValue(abortError);

    const { result } = renderHook(() => useChat("context"));

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(result.current.error).toBeNull();
    // Optimistic message is also rolled back on non-abort errors, but for
    // AbortError the early `return` means the filter never runs; however
    // the optimistic message was already added before the throw. The hook
    // returns early on AbortError, so messages are NOT rolled back — this
    // is intentional (the controller gets re-created on the next send).
    // The critical assertion is: no error is surfaced.
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  // ── 14. ragContext injected into system prompt ──────────────────────────────

  it("injects ragContext into the system prompt sent to the API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse() as any
    );

    const ragContext = "Dev Trivedi is a senior engineer who loves Rust.";
    const { result } = renderHook(() => useChat(ragContext));

    await act(async () => {
      await result.current.sendMessage("Tell me about Dev");
    });

    expect(fetchSpy).toHaveBeenCalledOnce();

    const body = JSON.parse(
      (fetchSpy.mock.calls[0][1] as RequestInit).body as string
    );

    const systemMessage = body.messages.find(
      (m: { role: string; content: string }) => m.role === "system"
    );

    expect(systemMessage).toBeDefined();
    expect(systemMessage.content).toContain(ragContext);
    // Template placeholder should be gone
    expect(systemMessage.content).not.toContain("{{RAG_CONTEXT}}");
  });

  // ── 15. Last 6 messages sent as context ────────────────────────────────────

  it("includes up to the last 6 prior messages as context in the API call body", async () => {
    // We need a hook that already has 8 messages in state.
    // We will drive it through 4 successful round-trips (each adds user +
    // assistant = 2 messages → 8 total) and then inspect the 5th call.
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeOkResponse("ok") as any
    );

    // Seed 0 rate timestamps so we have headroom for 5 sends
    const { result } = renderHook(() => useChat("ctx"));

    // Drive 4 complete round-trips
    for (let i = 1; i <= 4; i++) {
      await act(async () => {
        await result.current.sendMessage(`Message ${i}`);
      });
    }

    // 4 user + 4 assistant = 8 messages in state
    expect(result.current.messages).toHaveLength(8);

    // Clear the call history so we isolate the 5th send
    fetchSpy.mockClear();
    fetchSpy.mockResolvedValue(makeOkResponse("final ok") as any);

    await act(async () => {
      await result.current.sendMessage("Message 5");
    });

    expect(fetchSpy).toHaveBeenCalledOnce();

    const body = JSON.parse(
      (fetchSpy.mock.calls[0][1] as RequestInit).body as string
    );

    // body.messages = [system, ...context, userMsg]
    // The context portion should be at most 6 prior messages.
    const [systemMsg, ...rest] = body.messages;
    // Last entry is the current user message
    const contextMessages = rest.slice(0, -1);
    const currentUserMsg = rest[rest.length - 1];

    expect(systemMsg.role).toBe("system");
    expect(currentUserMsg.role).toBe("user");
    expect(currentUserMsg.content).toBe("Message 5");
    // Hook uses messages.slice(-6); with 8 messages in state, that is 6
    expect(contextMessages).toHaveLength(6);
  });
});
