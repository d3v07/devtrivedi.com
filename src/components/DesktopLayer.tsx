/**
 * DesktopLayer — always-mounted OS background.
 *
 * Centered bottom dock: nav links + mini apps + exit.
 * Hover tooltips on each icon.
 * z-order management: clicking a mini app window brings it to front.
 * Mini apps: timestamp-keyed so closing + reopening always mounts fresh.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FolderOpen, BookOpen, Mail, Monitor,
  Terminal, Scroll, Rocket,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import TerminalApp from "./apps/TerminalApp";
import ResumeApp   from "./apps/ResumeApp";
import DeployApp   from "./apps/DeployApp";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconDef {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  href?: string;
  action?: () => void;
  accent: string;
}

// ─── Dock icon with hover tooltip ─────────────────────────────────────────────

function DockIcon({
  def,
  isOpen,
  onClick,
}: {
  def: IconDef;
  isOpen?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = def.icon;

  const inner = (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute bottom-full mb-2.5 px-2 py-1 font-mono-code text-[9px] text-white whitespace-nowrap pointer-events-none z-50"
            style={{
              background: "rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            {def.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon square */}
      <motion.div
        className="w-11 h-11 flex items-center justify-center border border-white/20 bg-white/10"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        whileHover={{ scale: 1.18, y: -6 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        <Icon className={`w-5 h-5 ${def.accent}`} />
      </motion.div>

      {/* Open indicator dot */}
      {isOpen && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-1 h-1 rounded-full bg-white/80 mt-0.5 shrink-0"
        />
      )}
    </div>
  );

  if (def.href) {
    return (
      <Link to={def.href} className="block">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="block">
      {inner}
    </button>
  );
}

// ─── DesktopLayer ─────────────────────────────────────────────────────────────

interface DesktopLayerProps {
  visible: boolean;
}

export default function DesktopLayer({ visible }: DesktopLayerProps) {
  const { setExperience } = useApp();

  // Increment every time OS mode is entered — used as dock key to retrigger entrance animation
  const [enterKey, setEnterKey] = useState(0);
  useEffect(() => {
    if (visible) setEnterKey(k => k + 1);
  }, [visible]);

  // Map of appId → open timestamp. Unique timestamp = fresh React key = fresh mount.
  // This fixes "close then reopen shows nothing" — different key every open.
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

  // z-index: 200 base + position in stack * 10. Top of stack = highest.
  const zIndexFor = (id: string): number => {
    const idx = zOrder.indexOf(id);
    return 200 + (idx === -1 ? 0 : idx * 10);
  };

  const navIcons: IconDef[] = [
    { id: "home",     label: "Home",     icon: FileText,   href: "/",         accent: "text-orange-400" },
    { id: "projects", label: "Projects", icon: FolderOpen, href: "/projects", accent: "text-white" },
    { id: "about",    label: "About",    icon: BookOpen,   href: "/about",    accent: "text-blue-300" },
    { id: "contact",  label: "Contact",  icon: Mail,       href: "/contact",  accent: "text-red-300" },
  ];

  const appIcons: IconDef[] = [
    { id: "terminal", label: "Terminal", icon: Terminal, action: () => openApp("terminal"), accent: "text-orange-400" },
    { id: "resume",   label: "Resume",   icon: Scroll,   action: () => openApp("resume"),  accent: "text-emerald-300" },
    { id: "deploy",   label: "Deploy",   icon: Rocket,   action: () => openApp("deploy"),  accent: "text-violet-300" },
  ];

  return (
    <div
      className={`fixed inset-0 transition-opacity duration-200 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/Wallpaper2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ── Centered bottom dock ──────────────────────────────────────────────── */}
      <motion.div
        key={enterKey}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          zIndex: 50,
        }}
        initial={{ y: 24, opacity: 0, scale: 0.92 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 0px rgba(255,255,255,0)",
            "0 0 18px rgba(255,255,255,0.55), 0 0 6px rgba(255,255,255,0.3)",
            "0 0 4px rgba(255,255,255,0.15)",
            "0 0 18px rgba(255,255,255,0.55), 0 0 6px rgba(255,255,255,0.3)",
            "0 0 4px rgba(255,255,255,0.15)",
            "0 0 0px rgba(255,255,255,0)",
          ],
        }}
        transition={{
          y:         { type: "spring", stiffness: 380, damping: 28 },
          opacity:   { duration: 0.3 },
          scale:     { type: "spring", stiffness: 380, damping: 28 },
          boxShadow: { duration: 2.8, delay: 0.5, times: [0, 0.12, 0.28, 0.45, 0.62, 0.78, 1] },
        }}
      >
        {/* Nav icons */}
        {navIcons.map((def) => (
          <DockIcon key={def.id} def={def} />
        ))}

        {/* Divider */}
        <div className="w-px h-7 bg-white/20 mx-0.5 shrink-0" />

        {/* App icons */}
        {appIcons.map((def) => (
          <DockIcon
            key={def.id}
            def={def}
            isOpen={def.id in openApps}
            onClick={def.action}
          />
        ))}

        {/* Divider */}
        <div className="w-px h-7 bg-white/20 mx-0.5 shrink-0" />

        {/* Exit OS */}
        <DockIcon
          def={{
            id: "switch",
            label: "Exit OS",
            icon: Monitor,
            accent: "text-white/60",
          }}
          onClick={() => setExperience("website")}
        />
      </motion.div>

      {/* ── Mini apps (rendered via portal in MiniWindow) ─────────────────────── */}
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
        {openApps.deploy && (
          <DeployApp
            key={`deploy-${openApps.deploy}`}
            onClose={() => closeApp("deploy")}
            onFocus={() => focusApp("deploy")}
            zIndex={zIndexFor("deploy")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
