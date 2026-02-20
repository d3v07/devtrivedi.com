import { useState } from "react";
import MiniWindow from "./MiniWindow";

const STORAGE_KEY = "portfolio-notepad-content";

export default function NotepadApp({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ?? ""; } catch { return ""; }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    try { localStorage.setItem(STORAGE_KEY, e.target.value); } catch {}
  };

  const handleClear = () => {
    setText("");
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const lines = text ? text.split("\n").length : 0;

  return (
    <MiniWindow
      title="notepad.txt"
      onClose={onClose}
      initialX={320}
      initialY={60}
      width={360}
      height={440}
    >
      {/* Toolbar — strong PostHog border */}
      <div className="flex items-center gap-3 px-3 py-2 border-b-2 border-foreground bg-card shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-mono-code text-[10px] text-muted-foreground">
            {text.length} chars
          </span>
        </div>
        <span className="font-mono-code text-[10px] text-muted-foreground">·</span>
        <span className="font-mono-code text-[10px] text-muted-foreground">
          {lines} {lines === 1 ? "line" : "lines"}
        </span>
        <span className="flex-1" />
        {text.length > 0 && (
          <span className="font-mono-code text-[10px] text-primary">
            saved
          </span>
        )}
        <button
          onClick={handleClear}
          className="font-mono-code text-[10px] px-2 py-0.5 border border-foreground/30 text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          clear
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={handleChange}
        className="flex-1 w-full px-4 py-3 font-mono-code text-sm bg-background text-foreground resize-none focus:outline-none placeholder:text-muted-foreground/25 leading-relaxed"
        placeholder={"// start typing...\n// auto-saved to your browser"}
        spellCheck={false}
        autoFocus
      />
    </MiniWindow>
  );
}
