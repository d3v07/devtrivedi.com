/**
 * DesktopLayer — always-mounted OS background.
 *
 * Left dock:   nav + apps, frosted glass, one column, large icons.
 * Bottom dock: taskbar strip showing currently open mini-app windows.
 * Mini apps:   timestamp-keyed so closing + reopening always mounts fresh.
 *              z-index 200 (above taskbar at 50, above page content).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FolderOpen, BookOpen, Mail, Monitor,
  Terminal, Scroll, Rocket, X,
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

const APP_META: Record<string, { label: string; color: string }> = {
  terminal: { label: "Terminal",  color: "bg-zinc-800" },
  resume:   { label: "Resume",    color: "bg-emerald-700" },
  deploy:   { label: "Deploy",    color: "bg-violet-700" },
};

// ─── Left dock icon ───────────────────────────────────────────────────────────

function DockIcon({
  def,
  isOpen,
  onClick,
}: {
  def: IconDef;
  isOpen?: boolean;
  onClick?: () => void;
}) {
  const Icon = def.icon;

  const inner = (
    <motion.div
      className="flex flex-col items-center gap-1.5 w-full py-1"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      {/* Icon box */}
      <div
        className="w-12 h-12 flex items-center justify-center border-2 border-white/30 bg-white/15 backdrop-blur-sm"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
      >
        <Icon className={`w-6 h-6 ${def.accent}`} />
      </div>

      {/* Label */}
      <span
        className="font-mono-code text-[9px] text-white text-center leading-tight w-full truncate px-1"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)" }}
      >
        {def.label}
      </span>

      {/* Open indicator dot */}
      {isOpen && (
        <span className="w-1 h-1 rounded-full bg-white/80 shrink-0" />
      )}
    </motion.div>
  );

  if (def.href) {
    return (
      <Link to={def.href} className="w-full block">
        {inner}
      </Link>
    );
  }

  return (
    <button className="w-full" onClick={onClick}>
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

  // Map of appId → open timestamp. Unique timestamp = fresh React key = fresh mount.
  // This fixes "close then reopen shows nothing" — AnimatePresence won't block a re-open
  // because the key is different every time the app is opened.
  const [openApps, setOpenApps] = useState<Record<string, number>>({});

  const openApp = (id: string) =>
    setOpenApps(prev => ({ ...prev, [id]: Date.now() }));

  const closeApp = (id: string) =>
    setOpenApps(prev => { const n = { ...prev }; delete n[id]; return n; });

  const openIds = Object.keys(openApps);

  const navIcons: IconDef[] = [
    { id: "home",     label: "Home",     icon: FileText,   href: "/",         accent: "text-orange-400" },
    { id: "projects", label: "Projects", icon: FolderOpen, href: "/projects", accent: "text-white" },
    { id: "about",    label: "About",    icon: BookOpen,   href: "/about",    accent: "text-blue-300" },
    { id: "contact",  label: "Contact",  icon: Mail,       href: "/contact",  accent: "text-red-300" },
    { id: "switch",   label: "Exit OS",  icon: Monitor,    action: () => setExperience("website"), accent: "text-white/70" },
  ];

  const appIcons: IconDef[] = [
    { id: "terminal", label: "Terminal", icon: Terminal, action: () => openApp("terminal"), accent: "text-orange-400" },
    { id: "resume",   label: "Resume",   icon: Scroll,   action: () => openApp("resume"),   accent: "text-emerald-300" },
    { id: "deploy",   label: "Deploy",   icon: Rocket,   action: () => openApp("deploy"),   accent: "text-violet-300" },
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

      {/* ── Left dock ────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-0 flex flex-col items-center py-4 px-2 gap-2"
        style={{
          top: "36px",
          bottom: "48px", // leave room for bottom dock
          width: 80,
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRight: "1px solid rgba(255,255,255,0.10)",
          zIndex: 40,
        }}
      >
        {/* Nav icons */}
        {navIcons.map((def) => (
          <DockIcon key={def.id} def={def} onClick={def.action} />
        ))}

        {/* Divider */}
        <div className="w-10 h-px bg-white/20 my-1 shrink-0" />

        {/* App icons */}
        {appIcons.map((def) => (
          <DockIcon
            key={def.id}
            def={def}
            isOpen={def.id in openApps}
            onClick={def.action}
          />
        ))}
      </div>

      {/* ── Bottom taskbar dock ───────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center px-4 gap-2"
        style={{
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          zIndex: 45,
        }}
      >
        {openIds.length === 0 ? (
          <span
            className="font-mono-code text-[10px] text-white/30"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
          >
            No apps open — click an icon to launch one
          </span>
        ) : (
          <AnimatePresence>
            {openIds.map((id) => {
              const meta = APP_META[id];
              if (!meta) return null;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className={`flex items-center gap-2 px-3 h-8 ${meta.color} border border-white/20`}
                >
                  <span
                    className="font-mono-code text-[10px] text-white"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                  >
                    {meta.label}
                  </span>
                  <button
                    onClick={() => closeApp(id)}
                    className="text-white/50 hover:text-white transition-colors ml-1"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* ── Mini apps ──────────────────────────────────────────────────────────── */}
      {/* z-index 200 lives in MiniWindow itself — above taskbar (50) + page content */}
      <AnimatePresence>
        {openApps.terminal && (
          <TerminalApp
            key={`terminal-${openApps.terminal}`}
            onClose={() => closeApp("terminal")}
          />
        )}
        {openApps.resume && (
          <ResumeApp
            key={`resume-${openApps.resume}`}
            onClose={() => closeApp("resume")}
          />
        )}
        {openApps.deploy && (
          <DeployApp
            key={`deploy-${openApps.deploy}`}
            onClose={() => closeApp("deploy")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
