import { createPortal } from "react-dom";
import { motion, useDragControls } from "framer-motion";
import { ReactNode } from "react";

interface MiniWindowProps {
  title: string;
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  children: ReactNode;
}

export default function MiniWindow({
  title,
  onClose,
  onFocus,
  zIndex = 200,
  initialX = 300,
  initialY = 80,
  width = 320,
  height = 420,
  children,
}: MiniWindowProps) {
  const dragControls = useDragControls();

  return createPortal(
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      style={{ position: "fixed", zIndex, width, top: 0, left: 0 }}
      className="border-2 border-foreground hard-shadow-lg bg-background flex flex-col"
      onPointerDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 h-8 bg-card border-b-2 border-foreground shrink-0 select-none"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <button
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:opacity-80 transition-opacity shrink-0"
          title="Close"
        />
        <span className="flex-1 text-center font-mono-code text-[10px] text-muted-foreground truncate pointer-events-none">
          {title}
        </span>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-hidden flex flex-col"
        style={{ height: height - 32 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>,
    document.body
  );
}
