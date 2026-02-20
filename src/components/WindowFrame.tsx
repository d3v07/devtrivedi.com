/**
 * WindowFrame — full macOS-style window chrome with framer-motion.
 *
 * States:
 *   "normal"    — draggable, resizable window
 *   "minimized" — hidden; pill appears in taskbar
 *   "maximized" — fills screen minus taskbar
 *
 * Traffic lights:
 *   Red    — closes the window (red button). Desktop icon click reopens.
 *   Yellow — minimizes to taskbar pill.
 *   Green  — toggles maximize / restore.
 *
 * Drag only initiates from the title bar via useDragControls.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  useDragControls,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

// ─── Route titles ─────────────────────────────────────────────────────────────

const ROUTE_TITLES: Record<string, string> = {
  "/":          "home.mdx",
  "/about":     "about.md",
  "/projects":  "projects/",
  "/contact":   "contact.tsx",
  "/changelog": "CHANGELOG.md",
};

// ─── Geometry defaults ────────────────────────────────────────────────────────

const DEFAULT_TOP    = 44;
const DEFAULT_LEFT   = 116;
const DEFAULT_WIDTH  = () => window.innerWidth - 128;
const DEFAULT_HEIGHT = () => window.innerHeight - 56;
const TASKBAR_H      = 36;

// ─── Resize handle ────────────────────────────────────────────────────────────

type ResizeEdge = "se" | "sw" | "ne" | "nw";

function ResizeHandle({
  edge,
  onResizeStart,
}: {
  edge: ResizeEdge;
  onResizeStart: (e: React.PointerEvent, edge: ResizeEdge) => void;
}) {
  const cursors: Record<ResizeEdge, string> = {
    se: "cursor-se-resize", sw: "cursor-sw-resize",
    ne: "cursor-ne-resize", nw: "cursor-nw-resize",
  };
  const positions: Record<ResizeEdge, string> = {
    se: "bottom-0 right-0", sw: "bottom-0 left-0",
    ne: "top-0 right-0",   nw: "top-0 left-0",
  };
  return (
    <div
      className={`absolute w-4 h-4 z-50 ${positions[edge]} ${cursors[edge]}`}
      style={{ touchAction: "none" }}
      onPointerDown={(e) => onResizeStart(e, edge)}
    />
  );
}

// ─── Traffic light button ─────────────────────────────────────────────────────

function TrafficLight({
  color, borderColor, onClick, title, symbol,
}: {
  color: string;
  borderColor: string;
  onClick: () => void;
  title: string;
  symbol: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      title={title}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.82 }}
      transition={{ type: "spring", stiffness: 600, damping: 32 }}
      className="relative w-3 h-3 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: color,
        border: `1px solid ${borderColor}`,
        boxShadow: "1px 1px 0px rgba(0,0,0,0.25)",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute font-mono-code select-none pointer-events-none"
            style={{ fontSize: "7px", lineHeight: 1, color: "rgba(0,0,0,0.6)", fontWeight: 700 }}
          >
            {symbol}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── WindowFrame ──────────────────────────────────────────────────────────────

export default function WindowFrame({ children }: { children: React.ReactNode }) {
  const { experience, windowState, setWindowState, windowOpen, setWindowOpen } = useApp();
  const location  = useLocation();
  const navigate  = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isOsMode = experience === "os";

  // Motion values drive position + size — required for animate() helper
  const motionX = useMotionValue(DEFAULT_LEFT);
  const motionY = useMotionValue(DEFAULT_TOP);
  const motionW = useMotionValue(DEFAULT_WIDTH());
  const motionH = useMotionValue(DEFAULT_HEIGHT());

  // Persist normal geometry while dragging/resizing so maximize can restore
  const normalGeom = useRef({
    x: DEFAULT_LEFT, y: DEFAULT_TOP,
    w: DEFAULT_WIDTH(), h: DEFAULT_HEIGHT(),
  });

  useEffect(() => {
    if (windowState !== "normal") return;
    const u1 = motionX.on("change", (v) => { normalGeom.current.x = v; });
    const u2 = motionY.on("change", (v) => { normalGeom.current.y = v; });
    const u3 = motionW.on("change", (v) => { normalGeom.current.w = v; });
    const u4 = motionH.on("change", (v) => { normalGeom.current.h = v; });
    return () => { u1(); u2(); u3(); u4(); };
  }, [windowState, motionX, motionY, motionW, motionH]);

  // ── Traffic light handlers ──────────────────────────────────────────────────

  const handleMaximize = useCallback(() => {
    const spring = { type: "spring" as const, stiffness: 400, damping: 38 };
    if (windowState === "maximized") {
      animate(motionX, normalGeom.current.x, spring);
      animate(motionY, normalGeom.current.y, spring);
      animate(motionW, normalGeom.current.w, spring);
      animate(motionH, normalGeom.current.h, spring);
      setWindowState("normal");
    } else {
      normalGeom.current = {
        x: motionX.get(), y: motionY.get(),
        w: motionW.get(), h: motionH.get(),
      };
      animate(motionX, 0, spring);
      animate(motionY, TASKBAR_H, spring);
      animate(motionW, window.innerWidth, spring);
      animate(motionH, window.innerHeight - TASKBAR_H, spring);
      setWindowState("maximized");
    }
  }, [windowState, motionX, motionY, motionW, motionH, setWindowState]);

  const handleMinimize = useCallback(() => {
    setWindowState("minimized");
  }, [setWindowState]);

  const handleClose = useCallback(() => {
    setWindowOpen(false);
    setWindowState("normal");
  }, [setWindowOpen, setWindowState]);

  // ── Scroll reset on route change ────────────────────────────────────────────

  useEffect(() => {
    if (isOsMode && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, isOsMode]);

  // ── Resize logic ────────────────────────────────────────────────────────────

  const resizeState = useRef<{
    edge: ResizeEdge;
    startX: number; startY: number;
    startW: number; startH: number;
    startLeft: number; startTop: number;
  } | null>(null);

  const handleResizeStart = useCallback(
    (e: React.PointerEvent, edge: ResizeEdge) => {
      if (windowState !== "normal") return;
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      resizeState.current = {
        edge,
        startX: e.clientX, startY: e.clientY,
        startW: motionW.get(), startH: motionH.get(),
        startLeft: motionX.get(), startTop: motionY.get(),
      };
    },
    [windowState, motionW, motionH, motionX, motionY]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizeState.current) return;
      const { edge, startX, startY, startW, startH, startLeft, startTop } = resizeState.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const MIN_W = 400, MIN_H = 300;
      if (edge === "se") {
        motionW.set(Math.max(MIN_W, startW + dx));
        motionH.set(Math.max(MIN_H, startH + dy));
      } else if (edge === "sw") {
        const nw = Math.max(MIN_W, startW - dx);
        motionX.set(startLeft + (startW - nw));
        motionW.set(nw);
        motionH.set(Math.max(MIN_H, startH + dy));
      } else if (edge === "ne") {
        const nh = Math.max(MIN_H, startH - dy);
        motionY.set(startTop + (startH - nh));
        motionW.set(Math.max(MIN_W, startW + dx));
        motionH.set(nh);
      } else if (edge === "nw") {
        const nw = Math.max(MIN_W, startW - dx);
        const nh = Math.max(MIN_H, startH - dy);
        motionX.set(startLeft + (startW - nw));
        motionY.set(startTop + (startH - nh));
        motionW.set(nw);
        motionH.set(nh);
      }
    },
    [motionW, motionH, motionX, motionY]
  );

  const handleResizeEnd = useCallback(() => { resizeState.current = null; }, []);

  // ── Website mode passthrough ────────────────────────────────────────────────

  if (!isOsMode) return <>{children}</>;

  const filename  = ROUTE_TITLES[location.pathname] ?? "404.tsx";
  const pageTitle = `${filename} — dev trivedi`;
  const fakeUrl   = `portfolio://devtrivedi.dev${location.pathname === "/" ? "" : location.pathname}`;

  return (
    <AnimatePresence>
      {windowOpen && (
        <motion.div
          key="window"
          drag={windowState === "normal"}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          style={{
            x: motionX,
            y: motionY,
            width: motionW,
            height: motionH,
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 20,
            border: "2px solid hsl(var(--foreground))",
            boxShadow: "6px 6px 0px hsl(var(--foreground))",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "hsl(var(--background))",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: windowState === "minimized" ? 0 : 1,
            scale:   windowState === "minimized" ? 0.85 : 1,
            pointerEvents: windowState === "minimized" ? "none" : "auto",
          }}
          exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
          transition={{ opacity: { duration: 0.22 }, scale: { duration: 0.22 } }}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
        >
          {/* ── Title bar — drag handle ────────────────────────────────────── */}
          <div
            className="flex items-center gap-3 px-3 h-9 bg-card border-b-2 border-foreground shrink-0 select-none"
            style={{ cursor: windowState === "normal" ? "grab" : "default" }}
            onPointerDown={(e) => { if (windowState === "normal") dragControls.start(e); }}
          >
            {/* Traffic lights */}
            <div
              className="flex items-center gap-1.5"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <TrafficLight color="#FF5F57" borderColor="#E0443E" onClick={handleClose}   title="Close window"   symbol="×" />
              <TrafficLight color="#FEBC2E" borderColor="#D9A020" onClick={handleMinimize} title="Minimize"       symbol="−" />
              <TrafficLight color="#28C840" borderColor="#1AAB29" onClick={handleMaximize} title={windowState === "maximized" ? "Restore" : "Maximize"} symbol="+" />
            </div>

            {/* Centered page title */}
            <span className="flex-1 text-center font-mono-code text-[11px] text-muted-foreground truncate pointer-events-none">
              {pageTitle}
            </span>

            {/* Balance spacer */}
            <div className="w-14 shrink-0" />
          </div>

          {/* ── URL / address bar ─────────────────────────────────────────────── */}
          <div
            className="flex items-center gap-2 px-3 h-8 bg-background border-b border-foreground/15 shrink-0"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => navigate(-1)}
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              title="Back"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              title="Forward"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex-1 flex items-center bg-card border border-foreground/20 px-2.5 h-5">
              <span className="font-mono-code text-[10px] text-muted-foreground truncate">
                {fakeUrl}
              </span>
            </div>
          </div>

          {/* ── Scrollable content area ───────────────────────────────────────── */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto overflow-x-hidden bg-background"
            data-window-content
            onPointerDown={(e) => e.stopPropagation()}
          >
            {children}
          </div>

          {/* ── Corner resize handles (normal state only) ─────────────────────── */}
          {windowState === "normal" && (
            <>
              <ResizeHandle edge="se" onResizeStart={handleResizeStart} />
              <ResizeHandle edge="sw" onResizeStart={handleResizeStart} />
              <ResizeHandle edge="ne" onResizeStart={handleResizeStart} />
              <ResizeHandle edge="nw" onResizeStart={handleResizeStart} />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
