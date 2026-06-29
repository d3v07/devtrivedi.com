import { useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Types `text` out via a width reveal (Web Animations API + steps easing).
 * The full text is always in the DOM (SEO / a11y / test safe); only the visible
 * width animates. No-ops on reduced-motion or where WAAPI is unavailable.
 */
const Typewriter = ({ text, className = "", duration = 1500, delay = 400 }: TypewriterProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const anim = el.animate(
      [{ width: "0ch" }, { width: `${text.length}ch` }],
      { duration, delay, easing: `steps(${text.length}, end)`, fill: "both" },
    );
    return () => anim.cancel();
  }, [text, duration, delay]);

  return (
    <span
      ref={ref}
      className={`overflow-hidden whitespace-nowrap align-bottom ${className}`}
      style={{ width: `${text.length}ch` }}
    >
      {text}
    </span>
  );
};

export default Typewriter;
