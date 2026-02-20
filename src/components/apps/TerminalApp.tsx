import { useState, useRef, useEffect, KeyboardEvent } from "react";
import MiniWindow from "./MiniWindow";

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  whoami      - who is this guy
  ls          - list directory
  git log     - recent commits
  ps aux      - running processes
  skills      - tech stack
  ssh hire@me - make contact
  clear       - clear terminal
  date        - current date/time`,

  whoami: `dev trivedi
  role:      software engineer
  degree:    ms computer science @ njit (gpa: 4.0)
  status:    open to work
  location:  new jersey, usa`,

  ls: `total 6
  drwxr-xr-x  PulseOps.go/
  drwxr-xr-x  SpendLens.py/
  drwxr-xr-x  VendorFlow.ts/
  drwxr-xr-x  portfolio-os/
  -rw-r--r--  resume.pdf
  -rw-r--r--  about.md`,

  "git log": () => `commit 4a7f3d2  (HEAD -> main)
  Author: Dev Trivedi <trivedidev16@gmail.com>
  Date:   ${new Date().toDateString()}

      feat: ship portfolio OS with draggable windows

  commit 3b8c1e9
      fix: cut AWS costs $18K without removing features

  commit 2d6a0f4
      perf: 3x throughput on event-driven monitoring

  commit 1c9b7e3
      feat: multi-tenant SaaS, 20+ tenants in one sprint`,

  "ps aux": `PID   PROCESS           CPU   STATUS
  001   PulseOps.go        3%    running
  002   SpendLens.py       1%    running
  003   VendorFlow.ts      2%    running
  004   portfolio-os       0%    running
  005   coffee.sh         99%    critical`,

  skills: `languages:   TypeScript - Go - Python - C++ - Java
  frontend:    React - Tailwind - Framer Motion
  backend:     Node.js - Express - FastAPI
  cloud:       AWS (EC2 - RDS - S3 - Lambda)
  databases:   PostgreSQL - Redis - MongoDB
  tools:       Docker - Git - Kafka - Prometheus`,

  "ssh hire@me": `Connecting to hire@dev.trivedi...
  Connection established.

  > He ships real things that work at scale.
  > 4.0 GPA. Open to work. Has opinions on
  > distributed systems (you want this).

  Contact: trivedidev16@gmail.com`,

  date: () => new Date().toString(),
};

const WELCOME: Line[] = [
  { type: "output", text: "Portfolio OS v3.0 - type 'help' for commands" },
  { type: "output", text: "-".repeat(45) },
];

const lineColor: Record<Line["type"], string> = {
  input: "text-[#f0c05a]",
  output: "text-[#39d353]",
  error: "text-red-400",
};

interface TerminalAppProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export default function TerminalApp({ onClose, onFocus, zIndex }: TerminalAppProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();

    if (!cmd) return;

    const inputLine: Line = { type: "input", text: cmd };

    if (cmd === "clear") {
      setLines(WELCOME);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler !== undefined) {
      const result = typeof handler === "function" ? handler() : handler;
      const outputLines: Line[] = result
        .split("\n")
        .map((text) => ({ type: "output" as const, text }));
      setLines((prev) => [...prev, inputLine, ...outputLines]);
    } else {
      const errorLine: Line = {
        type: "error",
        text: `command not found: ${cmd}. try 'help'`,
      };
      setLines((prev) => [...prev, inputLine, errorLine]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (cmd) {
        setHistory((prev) => [cmd, ...prev]);
      }
      runCommand(input);
      setInput("");
      setHistoryIdx(-1);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = historyIdx + 1;
      if (nextIdx < history.length) {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
      return;
    }
  };

  return (
    <MiniWindow
      title="terminal -- dev@portfolio:~"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialX={80}
      initialY={60}
      width={480}
      height={320}
    >
      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 bg-[#0d1117]"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={`font-mono-code text-xs leading-relaxed whitespace-pre-wrap ${lineColor[line.type]}`}>
            {line.type === "input" ? (
              <span>
                <span className="text-[#f0c05a]">dev@portfolio:~$ </span>
                {line.text}
              </span>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>

      {/* Input line */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-white/10 shrink-0 bg-[#0d1117]">
        <span className="text-[#f0c05a] font-mono-code text-xs shrink-0">
          dev@portfolio:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#f0c05a] font-mono-code text-xs outline-none caret-[#f0c05a] ml-1"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </MiniWindow>
  );
}
