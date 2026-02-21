/**
 * DesktopLayer — always-mounted OS background.
 *
 * Wallpaper: z-index 5 (below WindowFrame at 20).
 * Dock: rendered via createPortal to document.body at z-index 50 (above all windows).
 *   — Centered when no mini apps are open.
 *   — Slides to left margin when any mini app is open.
 * Nav icons: reopen + restore window then navigate — no dead-end clicks.
 */

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText, FolderOpen, BookOpen, Mail, Monitor,
  Terminal, Scroll, BookMarked,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import TerminalApp from "./apps/TerminalApp";
import ResumeApp   from "./apps/ResumeApp";
import BlogApp     from "./apps/BlogApp";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconDef {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  action: () => void;
  accent: string;
}

// ─── Dock icon with hover tooltip ─────────────────────────────────────────────

function DockIcon({
  def,
  isOpen,
}: {
  def: IconDef;
  isOpen?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = def.icon;

  return (
    <button
      onClick={def.action}
      className="block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute bottom-full mb-3 px-2.5 py-1 font-mono-code text-[10px] text-white whitespace-nowrap pointer-events-none"
              style={{
                background: "rgba(0,0,0,0.88)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                zIndex: 999,
              }}
            >
              {def.label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon square */}
        <motion.div
          className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center border border-white/25 bg-white/12"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.20, y: -7 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
        >
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${def.accent}`} />
        </motion.div>

        {/* Open indicator dot */}
        {isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-white/90 mt-1 shrink-0"
          />
        )}
      </div>
    </button>
  );
}

// ─── DesktopLayer ─────────────────────────────────────────────────────────────

interface DesktopLayerProps {
  visible: boolean;
}

export default function DesktopLayer({ visible }: DesktopLayerProps) {
  const { setExperience, windowOpen, setWindowOpen, windowState, setWindowState } = useApp();
  const navigate = useNavigate();

  // Increment each time OS mode is entered — reruns entrance animation
  const [enterKey, setEnterKey] = useState(0);
  useEffect(() => {
    if (visible) setEnterKey(k => k + 1);
  }, [visible]);

  // Dock hint — shows briefly on OS entry, then fades
  const [showDockHint, setShowDockHint] = useState(false);
  useEffect(() => {
    if (!visible) return;
    setShowDockHint(true);
    const t = setTimeout(() => setShowDockHint(false), 5000);
    return () => clearTimeout(t);
  }, [enterKey]);

  // Map of appId → open timestamp. Unique timestamp = fresh React key = fresh mount.
  const [openApps, setOpenApps] = useState<Record<string, number>>({});

  // z-order stack: last element = highest z-index (focused window)
  const [zOrder, setZOrder] = useState<string[]>([]);

  const openApp = (id: string) => {
    setOpenApps(prev => ({ ...prev, [id]: Date.now() }));
    setZOrder(prev => [...prev.filter(x => x !== id), id]);
  };

  const closeApp = (id: string) => {
    setOpenApps(prev => { const n = { ...prev }; delete n[id]; return n; });
    setZOrder(prev => prev.filter(x => x !== id));
  };

  const focusApp = (id: string) => {
    setZOrder(prev => [...prev.filter(x => x !== id), id]);
  };

  const zIndexFor = (id: string): number => {
    const idx = zOrder.indexOf(id);
    return 200 + (idx === -1 ? 0 : idx * 10);
  };

  // Navigate to a page: always reopen + restore the main window first
  const navTo = (path: string) => {
    if (!windowOpen) setWindowOpen(true);
    if (windowState === "minimized") setWindowState("normal");
    navigate(path);
  };

  const hasOpen = Object.keys(openApps).length > 0;

  // ── Dynamic dock position ────────────────────────────────────────────────────
  const dockRef = useRef<HTMLDivElement>(null);
  const [dockX, setDockX] = useState(() =>
    Math.max(16, (window.innerWidth - 580) / 2)
  );

  useEffect(() => {
    const compute = () => {
      const w = dockRef.current?.offsetWidth ?? 580;
      setDockX(hasOpen ? 16 : Math.max(16, (window.innerWidth - w) / 2));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [hasOpen]);

  // ── Icon definitions ─────────────────────────────────────────────────────────

  const navIcons: IconDef[] = [
    { id: "home",     label: "Home",     icon: FileText,   action: () => navTo("/"),         accent: "text-orange-400" },
    { id: "projects", label: "Projects", icon: FolderOpen, action: () => navTo("/projects"), accent: "text-white" },
    { id: "about",    label: "About",    icon: BookOpen,   action: () => navTo("/about"),    accent: "text-blue-300" },
    { id: "contact",  label: "Contact",  icon: Mail,       action: () => navTo("/contact"),  accent: "text-red-300" },
  ];

  const appIcons: IconDef[] = [
    { id: "terminal", label: "Terminal", icon: Terminal,   action: () => openApp("terminal"), accent: "text-orange-400" },
    { id: "resume",   label: "Resume",   icon: Scroll,     action: () => openApp("resume"),   accent: "text-emerald-300" },
    { id: "blog",     label: "Blog",     icon: BookMarked, action: () => openApp("blog"),     accent: "text-violet-300" },
  ];

  // ── Dock markup (portalled to document.body) ─────────────────────────────────

  const dock = (
    <motion.div
      key={enterKey}
      style={{ position: "fixed", bottom: 16, left: 0, zIndex: 50 }}
      initial={{ y: 28, opacity: 0, scale: 0.92 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        boxShadow: [
          "0 0 0px rgba(255,255,255,0)",
          "0 0 0px rgba(255,255,255,0)",
          "0 0 20px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.35)",
          "0 0 6px rgba(255,255,255,0.2)",
          "0 0 20px rgba(255,255,255,0.6), 0 0 8px rgba(255,255,255,0.35)",
          "0 0 0px rgba(255,255,255,0)",
        ],
      }}
      transition={{
        y:         { type: "spring", stiffness: 360, damping: 28 },
        opacity:   { duration: 0.28 },
        scale:     { type: "spring", stiffness: 360, damping: 28 },
        boxShadow: { duration: 3.0, delay: 0.6, times: [0, 0.1, 0.28, 0.46, 0.64, 1] },
      }}
    >
      <motion.div
        ref={dockRef}
        className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 overflow-x-auto max-w-[calc(100vw-32px)] sm:max-w-none"
        style={{
          background: "rgba(0,0,0,0.62)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
        animate={{ x: dockX }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        {/* Nav icons — reopen window + navigate */}
        {navIcons.map((def) => (
          <DockIcon key={def.id} def={def} />
        ))}

        <div className="w-px h-8 bg-white/20 mx-0.5 shrink-0" />

        {/* App icons — open mini windows */}
        {appIcons.map((def) => (
          <DockIcon
            key={def.id}
            def={def}
            isOpen={def.id in openApps}
          />
        ))}

        <div className="w-px h-8 bg-white/20 mx-0.5 shrink-0" />

        {/* Exit OS */}
        <DockIcon
          def={{ id: "switch", label: "Exit OS", icon: Monitor, action: () => setExperience("website"), accent: "text-white/60" }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Wallpaper — z-5, below WindowFrame (z-20) */}
      <div
        className={`fixed inset-0 transition-opacity duration-200 ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/Wallpaper2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Dock portal — z-50, above all windows */}
      {visible && createPortal(dock, document.body)}

      {/* Dock hint — appears for 5s on OS entry, subtle bounce pointing down */}
      {visible && createPortal(
        <AnimatePresence>
          {showDockHint && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-[84px] left-1/2 pointer-events-none"
              style={{ zIndex: 48, transform: "translateX(-50%)" }}
            >
              <motion.div
                animate={{ y: [0, -5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: 2, ease: "easeInOut", delay: 0.3 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-mono-code text-[9px] uppercase tracking-widest text-white/50">
                  try the dock
                </span>
                <span className="text-white/30 text-xs leading-none">↓</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mini apps — each MiniWindow uses its own portal at z-200+ */}
      {visible && (
        <AnimatePresence>
          {openApps.terminal && (
            <TerminalApp
              key={`terminal-${openApps.terminal}`}
              onClose={() => closeApp("terminal")}
              onFocus={() => focusApp("terminal")}
              zIndex={zIndexFor("terminal")}
            />
          )}
          {openApps.resume && (
            <ResumeApp
              key={`resume-${openApps.resume}`}
              onClose={() => closeApp("resume")}
              onFocus={() => focusApp("resume")}
              zIndex={zIndexFor("resume")}
            />
          )}
          {openApps.blog && (
            <BlogApp
              key={`blog-${openApps.blog}`}
              onClose={() => closeApp("blog")}
              onFocus={() => focusApp("blog")}
              zIndex={zIndexFor("blog")}
            />
          )}
        </AnimatePresence>
      )}
    </>
  );
}
