/**
 * Lightweight framer-motion mock for Vitest.
 * Strips all animation props and renders plain HTML elements.
 */
import React from "react";
import { vi } from "vitest";

const ANIMATION_PROPS = new Set([
  "initial", "animate", "exit", "transition", "whileHover",
  "whileInView", "whileTap", "whileFocus", "viewport",
  "variants", "layout", "layoutId", "drag", "dragConstraints",
  "dragMomentum", "dragElastic", "onDragEnd", "onAnimationComplete",
]);

function stripAnimationProps(props: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(props).filter(([k]) => !ANIMATION_PROPS.has(k))
  );
}

function makeMotionComponent(tag: string) {
  return React.forwardRef<HTMLElement, Record<string, unknown>>(
    ({ children, ...props }, ref) => {
      const clean = stripAnimationProps(props);
      return React.createElement(tag, { ...clean, ref }, children);
    }
  );
}

const HTML_TAGS = [
  "div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "section", "article", "main", "aside", "header", "footer", "nav",
  "ul", "ol", "li", "a", "button", "form", "input", "label",
  "img", "figure", "figcaption", "video", "canvas", "svg", "path",
  "pre", "code",
];

export const motion = Object.fromEntries(
  HTML_TAGS.map((tag) => [tag, makeMotionComponent(tag)])
) as any;

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useInView = () => true;
export const useAnimation = () => ({ start: vi.fn(), stop: vi.fn() });
export const useMotionValue = (initial: unknown) => ({ get: () => initial, set: vi.fn() });
export const useTransform = () => ({ get: vi.fn() });
export const useDragControls = () => ({ start: vi.fn() });
export const MotionConfig = ({ children }: { children: React.ReactNode }) => <>{children}</>;
