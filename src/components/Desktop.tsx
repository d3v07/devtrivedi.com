/**
 * Desktop — renders only the OS taskbar strip.
 * Wallpaper and draggable icons live in DesktopLayer.
 * Only mounted when experience === "os".
 *
 * MinimizedPill: shown in taskbar center when windowState === "minimized".
 * Clicking it calls setWindowState("normal") to restore the window.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";

// ─── Route → filename map (mirrors WindowFrame) ───────────────────────────────

const ROUTE_TITLES: Record<string, string> = {
  "/":          "home.mdx",
  "/about":     "about.md",
  "/projects":  "projects/",
  "/contact":   "contact.tsx",
  "/changelog": "CHANGELOG.md",
};

// ─── Menu definitions ─────────────────────────────────────────────────────────

type MenuItem =
  | { type: "item"; label: string; action: () => void }
  | { type: "separator" };

// ─── Clock ────────────────────────────────────────────────────────────────────

function Clock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono-code text-xs text-foreground tabular-nums">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

// ─── MinimizedPill ────────────────────────────────────────────────────────────

function MinimizedPill({ label, onRestore }: { label: string; onRestore: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onClick={onRestore}
      title="Click to restore window"
      className="flex items-center gap-1.5 px-3 h-6 border border-foreground bg-card font-mono-code text-[10px] text-foreground hover:bg-foreground hover:text-background transition-colors duration-100 select-none hard-shadow-sm"
    >
      <span className="w-1.5 h-1.5 bg-primary shrink-0" aria-hidden="true" />
      {label}
    </motion.button>
  );
}

// ─── ClosedPill ───────────────────────────────────────────────────────────────

function ClosedPill({ label, onReopen }: { label: string; onReopen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onClick={onReopen}
      title="Click to reopen window"
      className="flex items-center gap-1.5 px-3 h-6 border border-foreground/40 bg-background font-mono-code text-[10px] text-muted-foreground hover:bg-foreground hover:text-background transition-colors duration-100 select-none"
    >
      <span className="w-1.5 h-1.5 bg-muted-foreground/50 shrink-0" aria-hidden="true" />
      {label}
      <span className="text-[8px] opacity-60 ml-0.5">↑ reopen</span>
    </motion.button>
  );
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

export default function Desktop() {
  const { setExperience, windowState, setWindowState, windowOpen, setWindowOpen } = useApp();
  const location = useLocation();

  const filename = ROUTE_TITLES[location.pathname] ?? "404.tsx";

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems: Record<string, MenuItem[]> = {
    File: [
      {
        type: "item",
        label: "Download Resume",
        action: () => { window.open("/resume.pdf", "_blank"); setActiveMenu(null); },
      },
      { type: "separator" },
      {
        type: "item",
        label: "Exit OS",
        action: () => { setExperience("website"); setActiveMenu(null); },
      },
    ],
    Edit: [
      {
        type: "item",
        label: "Copy URL",
        action: () => { navigator.clipboard.writeText(window.location.href); setActiveMenu(null); },
      },
      { type: "separator" },
      {
        type: "item",
        label: "Select All",
        action: () => { document.execCommand("selectAll"); setActiveMenu(null); },
      },
    ],
    View: [
      {
        type: "item",
        label: "Zoom In",
        action: () => {
          const current = parseFloat(document.documentElement.style.zoom || "1");
          document.documentElement.style.zoom = String(Math.min(1.5, current + 0.1));
          setActiveMenu(null);
        },
      },
      {
        type: "item",
        label: "Zoom Out",
        action: () => {
          const current = parseFloat(document.documentElement.style.zoom || "1");
          document.documentElement.style.zoom = String(Math.max(0.5, current - 0.1));
          setActiveMenu(null);
        },
      },
      { type: "separator" },
      {
        type: "item",
        label: "Reset Zoom",
        action: () => { document.documentElement.style.zoom = "1"; setActiveMenu(null); },
      },
    ],
    History: [
      {
        type: "item",
        label: "Back",
        action: () => { window.history.back(); setActiveMenu(null); },
      },
      {
        type: "item",
        label: "Forward",
        action: () => { window.history.forward(); setActiveMenu(null); },
      },
    ],
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-9 bg-card border-b-2 border-foreground flex items-center justify-between px-3 z-50">
      {/* Left: logo + macOS-style menu bar */}
      <div className="flex items-center gap-1 shrink-0 relative" ref={menuRef}>
        <span className="font-display text-sm font-bold mr-1 sm:mr-3">
          DT<span className="text-primary">.</span>
        </span>

        {/* Menu labels — hidden on mobile to save space */}
        <div className="hidden sm:flex items-center gap-1">
        {["File", "Edit", "View", "History"].map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
            className={`font-mono-code text-xs px-2 py-1 transition-colors cursor-pointer ${
              activeMenu === menu
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            {menu}
          </button>
        ))}

        {/* Dropdown panel */}
        {activeMenu && (
          <div className="absolute top-full left-0 mt-0.5 bg-card border-2 border-foreground hard-shadow min-w-[160px] z-[200]">
            {menuItems[activeMenu].map((item, i) =>
              item.type === "separator" ? (
                <div key={i} className="border-t border-border/30 my-1" />
              ) : (
                <button
                  key={i}
                  onClick={item.action}
                  className="block w-full text-left font-mono-code text-xs px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}
        </div>{/* end hidden sm:flex menu labels */}
      </div>

      {/* Center: minimized pill or reopen pill */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {windowState === "minimized" && windowOpen && (
            <MinimizedPill
              key="minimized"
              label={filename}
              onRestore={() => setWindowState("normal")}
            />
          )}
          {!windowOpen && (
            <ClosedPill
              key="closed"
              label={filename}
              onReopen={() => setWindowOpen(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Right: clock + exit */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={() => setExperience("website")}
          className="font-mono-code text-xs px-2 py-1 border border-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
        >
          <span className="hidden sm:inline">Exit OS mode</span>
          <span className="sm:hidden">Exit</span>
        </button>
        <Clock />
      </div>
    </div>
  );
}
