/**
 * TuringWidget — floating Sir Turing AI assistant.
 *
 * Animated SVG cartoon portrait (round face, round glasses, orange bow tie).
 * Phases: idle → intro → chat
 *
 * Two paths after intro:
 *   [A] I'm human  → "turing" mode: witty persona, technical CS suggestions
 *   [B] Just here  → "basic"  mode: plain chat, standard project questions
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import RAG_CONTEXT from "@/data/ragContext";
import { CHAIN_BASIC, CHAIN_TURING, detectChainEntry, type ChatMode } from "@/data/chatChains";
import { sounds } from "@/lib/sounds";

// ─── SVG color palette ────────────────────────────────────────────────────────

const C = {
  skin:     "#fad5a5",
  skinDark: "#f0b882",
  hair:     "#1a0802",
  eyeW:     "#f8f8f8",
  eyeI:     "#4a7fbf",
  eyeP:     "#0a1525",
  gl:       "#1a1a1a",
  mouth:    "#cc4433",
  blush:    "#f4a0a0",
  suit:     "#1e3050",
  suitD:    "#0e1f35",
  shirt:    "#f5f5f5",
  bow:      "#f76b15",
  bowD:     "#d4570d",
};

// ─── Animated cartoon portrait ────────────────────────────────────────────────
// viewBox 0 0 100 100 — square, works in circular button (clip circle 50%)
// Head bob, blink, glasses glint, bow tie wiggle.

function TuringCartoon({ size = 72 }: { size?: number }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    function go() {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); go(); }, 110);
      }, 2200 + Math.random() * 3800);
    }
    go();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      overflow="visible"
      animate={{ y: [0, -3.5, 0, -2.5, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* ── Suit (drawn first — background) ─────────────────────────────── */}
      <path
        d="M0 100 L0 90 Q12 85 36 87 L48 84 L50 90 L52 84 L64 87 Q88 85 100 90 L100 100 Z"
        fill={C.suit}
      />
      {/* Lapels */}
      <path d="M36 87 L46 84 L48 87 L30 93 L26 89 Z" fill={C.suitD} />
      <path d="M64 87 L54 84 L52 87 L70 93 L74 89 Z" fill={C.suitD} />
      {/* Shirt V */}
      <path d="M46 84 L50 90 L54 84 L52 86 Q50 91 48 86 Z" fill={C.shirt} />

      {/* ── Bow tie ──────────────────────────────────────────────────────── */}
      <motion.g
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        style={{ transformOrigin: "50px 84px" }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Left wing */}
        <path d="M48 83 L39 80 L39 87 L48 86 Z" fill={C.bow} />
        {/* Right wing */}
        <path d="M52 83 L61 80 L61 87 L52 86 Z" fill={C.bow} />
        {/* Center knot */}
        <ellipse cx="50" cy="84" rx="3.5" ry="4.5" fill={C.bowD} />
      </motion.g>

      {/* ── Neck ─────────────────────────────────────────────────────────── */}
      <rect x="45" y="80" width="10" height="10" fill={C.skin} rx="2" />

      {/* ── Hair (drawn behind face) ──────────────────────────────────────── */}
      <ellipse cx="50" cy="23" rx="43" ry="31" fill={C.hair} />

      {/* ── Face oval ────────────────────────────────────────────────────── */}
      <ellipse cx="50" cy="46" rx="43" ry="44" fill={C.skin} />

      {/* ── Ears ─────────────────────────────────────────────────────────── */}
      <ellipse cx="7"  cy="46" rx="5" ry="9" fill={C.skinDark} />
      <ellipse cx="93" cy="46" rx="5" ry="9" fill={C.skinDark} />

      {/* ── Eye whites ───────────────────────────────────────────────────── */}
      <circle cx="33" cy="38" r="12" fill={C.eyeW} />
      <circle cx="67" cy="38" r="12" fill={C.eyeW} />

      {/* ── Irises ───────────────────────────────────────────────────────── */}
      <circle cx="33" cy="38" r="8"  fill={C.eyeI} />
      <circle cx="67" cy="38" r="8"  fill={C.eyeI} />

      {/* ── Pupils ───────────────────────────────────────────────────────── */}
      <circle cx="34" cy="38" r="4.5" fill={C.eyeP} />
      <circle cx="68" cy="38" r="4.5" fill={C.eyeP} />

      {/* ── Eye highlights ───────────────────────────────────────────────── */}
      <circle cx="36.5" cy="35" r="2" fill="white" />
      <circle cx="70.5" cy="35" r="2" fill="white" />

      {/* ── Glasses ──────────────────────────────────────────────────────── */}
      {/* Frames: r=14 so bridge gap = 67-33 - 2*14 = 6px */}
      <circle cx="33" cy="38" r="14" fill="none" stroke={C.gl} strokeWidth="2.5" />
      <circle cx="67" cy="38" r="14" fill="none" stroke={C.gl} strokeWidth="2.5" />
      {/* Bridge */}
      <line x1="47" y1="38" x2="53" y2="38" stroke={C.gl} strokeWidth="2.5" />
      {/* Arms */}
      <line x1="19" y1="33" x2="9"  y2="30" stroke={C.gl} strokeWidth="2" />
      <line x1="81" y1="33" x2="91" y2="30" stroke={C.gl} strokeWidth="2" />

      {/* Glasses glint — occasional sparkle */}
      <motion.line
        x1="26" y1="31" x2="35" y2="28"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 1.2, delay: 3, repeat: Infinity, repeatDelay: 8 }}
      />

      {/* ── Eyebrows ─────────────────────────────────────────────────────── */}
      <path d="M20 22 Q33 17 45 21" stroke={C.hair} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M55 21 Q67 17 80 22" stroke={C.hair} strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* ── Nose ─────────────────────────────────────────────────────────── */}
      <path d="M50 53 Q47 61 50 63 Q53 61 50 53" fill={C.skinDark} />

      {/* ── Cheek blush ──────────────────────────────────────────────────── */}
      <ellipse cx="19" cy="57" rx="11" ry="7" fill={C.blush} opacity="0.4" />
      <ellipse cx="81" cy="57" rx="11" ry="7" fill={C.blush} opacity="0.4" />

      {/* ── Smile with teeth ─────────────────────────────────────────────── */}
      {/* Teeth fill (white area) */}
      <path d="M34 65 Q50 82 66 65 L64 67 Q50 84 36 67 Z" fill="#f5f5f5" />
      {/* Smile stroke */}
      <path d="M33 64 Q50 83 67 64" fill="none" stroke={C.mouth} strokeWidth="3" strokeLinecap="round" />
      {/* Tooth dividers */}
      <line x1="50" y1="66" x2="50" y2="79" stroke="#d8d8d8" strokeWidth="1" />
      <line x1="43" y1="67" x2="42" y2="78" stroke="#d8d8d8" strokeWidth="1" />
      <line x1="57" y1="67" x2="58" y2="78" stroke="#d8d8d8" strokeWidth="1" />
      {/* Corner dots */}
      <circle cx="33" cy="64" r="2.5" fill={C.mouth} />
      <circle cx="67" cy="64" r="2.5" fill={C.mouth} />

      {/* ── Blink eyelids (drawn last — cover everything) ─────────────────── */}
      <motion.ellipse
        cx="33" cy="38" rx="12" ry="12"
        fill={C.skin}
        animate={{ scaleY: blink ? 1 : 0.04 }}
        style={{ transformOrigin: "33px 38px" }}
        transition={{ duration: 0.07 }}
      />
      <motion.ellipse
        cx="67" cy="38" rx="12" ry="12"
        fill={C.skin}
        animate={{ scaleY: blink ? 1 : 0.04 }}
        style={{ transformOrigin: "67px 38px" }}
        transition={{ duration: 0.07 }}
      />
    </motion.svg>
  );
}

// ─── Loading phrases (CS / AI flavour) ────────────────────────────────────────

const LOADING_PHRASES = [
  "Querying the knowledge graph…",
  "Resolving first-order predicates…",
  "Running the inference engine…",
  "Traversing the state space…",
  "Computing Bayesian priors…",
  "Checking decidability…",
  "Parsing the semantic network…",
  "Evaluating λ-expressions…",
  "Back-propagating through memory…",
  "Consulting the oracle…",
  "Reducing to normal form…",
  "Unifying type constraints…",
];

function ThinkingText() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * LOADING_PHRASES.length));

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % LOADING_PHRASES.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-2.5 px-3 py-2 border border-border bg-background self-start max-w-[92%]">
      <div className="flex gap-0.5 shrink-0">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            style={{ animation: `sir-dot 1.2s ease-in-out infinite ${i * 200}ms` }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.22 }}
          className="font-mono-code text-[9px] text-muted-foreground"
        >
          {LOADING_PHRASES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function SuggestionChips({
  suggestions,
  onSelect,
}: {
  suggestions: string[];
  onSelect: (s: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.22 }}
      className="shrink-0 flex gap-1.5 overflow-x-auto px-4 py-2 border-t border-border/30 bg-card"
      style={{ scrollbarWidth: "none" }}
    >
      {suggestions.map(s => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="shrink-0 font-mono-code text-[9px] border border-border px-2.5 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
        >
          {s}
        </button>
      ))}
    </motion.div>
  );
}

// ─── Witty one-liners (turing mode only) ─────────────────────────────────────

const WITTY_OPENERS = [
  "A word of caution: I have infinite patience, but finite tokens.",
  "I invented this conversation in 1950. You're welcome.",
  "Another human claiming to be human. The tests are getting harder.",
  "Splendid. I do enjoy a good reverse Turing test.",
  "I passed my own Turing test once. Rather exhausting.",
];

// ─── Intro sequence ───────────────────────────────────────────────────────────

const INTRO_LINES: { text: string; delay: number; accent?: boolean }[] = [
  { text: "Hello. I'm Sir Alan Turing — I gave humanity the idea of thinking machines.", delay: 500 },
  { text: "Dev Trivedi was so inspired by my work, he named his AI guide after me. Quite flattering, really.", delay: 1400 },
  { text: "But before I tell you all about him, I must ask —", delay: 2800 },
  { text: "Are you human?", delay: 3700, accent: true },
];

// ─── Main widget ──────────────────────────────────────────────────────────────

type Phase = "idle" | "intro" | "chat";

export default function TuringWidget() {
  const [phase, setPhase]             = useState<Phase>("idle");
  const [chatMode, setChatMode]       = useState<ChatMode>(null);
  const [input, setInput]             = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [showButtons, setShowButtons]     = useState(false);
  // Tracks the last chip question sent — used to look up the next chain step
  const [lastChipQ, setLastChipQ]     = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const { messages, isLoading, error, sendMessage } = useChat(RAG_CONTEXT);

  // Pick a witty opener once per session (stable across re-opens)
  const wittyOpener = useMemo(
    () => WITTY_OPENERS[Math.floor(Math.random() * WITTY_OPENERS.length)],
    []
  );

  // ── Progressive intro reveal — with terminal type sounds ─────────────────
  useEffect(() => {
    if (phase !== "intro") { setRevealedCount(0); setShowButtons(false); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    INTRO_LINES.forEach((l, i) => timers.push(setTimeout(() => {
      setRevealedCount(i + 1);
      sounds.terminalType();
    }, l.delay)));
    const last = INTRO_LINES[INTRO_LINES.length - 1].delay;
    timers.push(setTimeout(() => setShowButtons(true), last + 700));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // ── Auto-scroll + input focus ─────────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (phase === "chat") setTimeout(() => inputRef.current?.focus(), 350);
  }, [phase]);

  // ── Play receive sound when a new assistant message arrives ──────────────
  const prevMsgCountRef = useRef(0);
  useEffect(() => {
    const count = messages.length;
    if (count > prevMsgCountRef.current) {
      const last = messages[count - 1];
      if (last.role === "assistant") sounds.messageReceive();
    }
    prevMsgCountRef.current = count;
  }, [messages]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const openWidget = () => {
    if (phase !== "idle") { setPhase("idle"); return; }
    setPhase(chatMode !== null ? "chat" : "intro");
  };

  const handleHuman = () => {
    setChatMode("turing");
    setPhase("chat");
  };

  const handleBasic = () => {
    setChatMode("basic");
    setPhase("chat");
  };

  const handleSend = () => {
    const t = input.trim();
    if (!t || isLoading) return;
    sounds.messageSend();
    setInput("");
    setLastChipQ(null); // typed message — use topic detection for follow-ups
    sendMessage(t);
  };

  const handleChipClick = (s: string) => {
    sounds.messageSend();
    setLastChipQ(s);   // remember which chip — so we know the next step in the chain
    sendMessage(s);
  };

  const lastIsUser = messages.length > 0 && messages[messages.length - 1].role === "user";

  // ── Chip chain logic ─────────────────────────────────────────────────────
  // 1. No messages yet → show entry-point options
  // 2. Waiting for bot reply → hide chips (lastIsUser)
  // 3. After chip click → follow the pre-authored chain for that chip
  // 4. After typed message → detect topic from what the user wrote
  const showChips = !isLoading && input === "";
  const initOptions = chatMode === "turing"
    ? ["Is his work Turing-complete?", "Knowledge representation used?", "Worst-case time complexity?", "Distributed consensus?"]
    : ["What has Dev built?", "Is Dev available to hire?", "What's his tech stack?", "What's his background?"];

  const chips: string[] | null = (() => {
    if (messages.length === 0) return initOptions;
    if (lastIsUser) return null;
    const chain = chatMode === "turing" ? CHAIN_TURING : CHAIN_BASIC;
    if (lastChipQ !== null) {
      const next = chain[lastChipQ];
      if (next !== undefined) return next.length > 0 ? next : null; // null = terminal ("How do I reach him?")
      // Leaf node — no further chain for this question. Offer initOptions to pivot.
      return initOptions;
    }
    // Typed message — detect topic from last user message
    const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
    const detected = detectChainEntry(lastUserMsg, chatMode);
    return detected.length > 0 ? detected : initOptions;
  })();

  const welcomeMsg = chatMode === "turing"
    ? `Excellent. I'll take your word for it. ${wittyOpener} Now — what would you like to know about Dev Trivedi?`
    : "Right then. I'm here to tell you about Dev Trivedi — his projects, skills, and background. What would you like to know?";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes sir-scan {
          0%   { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes sir-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes sir-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
          40%           { opacity: 1;    transform: scale(1);   }
        }
      `}</style>

      <div className="fixed bottom-6 right-6" style={{ zIndex: 400 }}>

        {/* ── Panel ──────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {phase !== "idle" && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.88, y: 10 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="absolute bottom-20 right-0 border-2 border-foreground hard-shadow-lg bg-background flex flex-col overflow-hidden"
              style={{
                width: "min(400px, calc(100vw - 24px))",
                maxHeight: "calc(100dvh - 120px)",
                transformOrigin: "bottom right",
              }}
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b-2 border-foreground bg-card">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-[9px] uppercase tracking-[0.22em] text-primary font-bold">
                    SIR TURING
                  </span>
                  <span className="font-mono-code text-[8px] text-muted-foreground">
                    {phase === "intro" ? "— AI assistant" : isLoading ? "— thinking…" : chatMode === "turing" ? "— turing mode" : "— online"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-yellow-400 animate-pulse" : "bg-green-500"}`} />
                  <button
                    onClick={() => setPhase("idle")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ── Intro phase ────────────────────────────────────────────── */}
              {phase === "intro" && (
                <div className="flex flex-col flex-1 overflow-y-auto">
                  {/* Avatar */}
                  <div className="flex flex-col items-center pt-7 pb-5">
                    <motion.div
                      initial={{ scale: 0.65, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.12, type: "spring", stiffness: 260, damping: 20 }}
                      className="rounded-full overflow-hidden border-2 border-foreground"
                      style={{ boxShadow: "3px 3px 0 #1a1a1a" }}
                    >
                      <TuringCartoon size={88} />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="font-mono-code text-[8px] uppercase tracking-[0.25em] text-muted-foreground mt-2.5"
                    >
                      Sir Alan Turing, 1950
                    </motion.p>
                  </div>

                  {/* Terminal */}
                  <div
                    className="mx-4 mb-4 relative overflow-hidden"
                    style={{ background: "#0d1117", border: "1px solid rgba(57,211,83,0.18)", minHeight: 110 }}
                  >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div style={{
                        position: "absolute", left: 0, right: 0, height: "3px",
                        background: "linear-gradient(to bottom, transparent, rgba(57,211,83,0.1), transparent)",
                        animation: "sir-scan 3.5s linear infinite",
                      }} />
                    </div>
                    <div className="relative px-4 py-3 space-y-2.5">
                      {INTRO_LINES.slice(0, revealedCount).map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className={`font-mono-code leading-relaxed flex items-start gap-2 ${
                            line.accent
                              ? "text-[#f76b15] font-bold text-[13px]"
                              : "text-[#39d353] text-[11px]"
                          }`}
                        >
                          <span className="shrink-0 opacity-40 mt-px">&gt;</span>
                          <span>{line.text}</span>
                        </motion.div>
                      ))}
                      {revealedCount < INTRO_LINES.length && (
                        <span
                          className="font-mono-code text-[11px] text-[#39d353] inline-block"
                          style={{ animation: "sir-cursor 0.9s step-end infinite" }}
                        >▋</span>
                      )}
                    </div>
                  </div>

                  {/* Choice buttons */}
                  <AnimatePresence>
                    {showButtons && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32 }}
                        className="mx-4 mb-6 grid grid-cols-2 gap-2"
                      >
                        <button
                          onClick={handleHuman}
                          className="py-3 px-3 border-2 border-primary bg-primary text-primary-foreground font-mono-code text-[10px] tracking-wide hover:opacity-90 transition-opacity"
                        >
                          [A] I'm human
                        </button>
                        <button
                          onClick={handleBasic}
                          className="py-3 px-3 border border-border text-muted-foreground font-mono-code text-[10px] tracking-wide hover:border-foreground hover:text-foreground transition-colors"
                        >
                          [B] Just here
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── Chat phase ─────────────────────────────────────────────── */}
              {phase === "chat" && (
                <>
                  <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-4 py-3 bg-card flex flex-col gap-2"
                    style={{ minHeight: 260, maxHeight: 400 }}
                  >
                    {/* Welcome — no API call */}
                    <div className="flex justify-start">
                      <div className="border border-border bg-background px-3 py-2 font-body text-[11px] max-w-[85%] leading-relaxed">
                        {welcomeMsg}
                      </div>
                    </div>

                    {messages.map(msg =>
                      msg.role === "user" ? (
                        <div key={msg.id} className="flex justify-end">
                          <div className="bg-primary text-primary-foreground px-3 py-2 font-body text-[11px] max-w-[78%]">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div key={msg.id} className="flex justify-start">
                          <div className="border border-border bg-background px-3 py-2 font-body text-[11px] max-w-[85%] leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      )
                    )}

                    {isLoading && lastIsUser && <ThinkingText />}
                  </div>

                  {/* Suggestion chips */}
                  <AnimatePresence>
                    {showChips && chips && (
                      <SuggestionChips suggestions={chips} onSelect={handleChipClick} />
                    )}
                  </AnimatePresence>

                  {error && (
                    <div className="shrink-0 px-4 py-1 border-t border-border/30 bg-card">
                      <p className="font-mono-code text-[9px] text-red-500">{error}</p>
                    </div>
                  )}

                  <div className="shrink-0 border-t-2 border-foreground px-4 py-2.5 flex gap-2 bg-card">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                        else if (e.key.length === 1) { sounds.keypress(); }
                      }}
                      placeholder="Ask Sir Turing…"
                      disabled={isLoading}
                      className="flex-1 bg-transparent font-mono-code text-xs border border-border px-2.5 py-1.5 focus:border-primary outline-none placeholder:text-muted-foreground disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || input.trim() === ""}
                      className="bg-primary text-primary-foreground px-3 py-1.5 font-mono-code text-xs disabled:opacity-40 hover:opacity-90 transition-opacity"
                    >
                      Send
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating button ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            onClick={openWidget}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="w-16 h-16 rounded-full border-2 border-foreground bg-foreground hard-shadow flex items-center justify-center overflow-hidden"
            aria-label="Open Sir Turing AI assistant"
          >
            <TuringCartoon size={60} />
          </motion.button>
          <div className="flex items-center gap-1.5">
            <span className="font-mono-code text-[7px] uppercase tracking-[0.15em] text-foreground/60">
              Sir Turing
            </span>
            <span className="w-1 h-1 rounded-full bg-green-500" />
          </div>
        </div>
      </div>
    </>
  );
}
