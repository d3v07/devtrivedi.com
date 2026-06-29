import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#·:.01";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface ScrambleTextProps {
  text: string;
  className?: string;
}

/** Decodes `text` from random glyphs each time it changes — terminal/matrix style. */
const ScrambleText = ({ text, className }: ScrambleTextProps) => {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced() || typeof requestAnimationFrame === "undefined") {
      setDisplay(text);
      return;
    }
    const settle = 15; // frames before a char locks once it starts revealing
    const stagger = 1.5; // frames between successive chars beginning to reveal
    const total = Math.ceil(text.length * stagger) + settle;
    let frame = 0;

    const tick = () => {
      let out = "";
      let done = 0;
      for (let i = 0; i < text.length; i++) {
        const startAt = i * stagger;
        if (frame >= startAt + settle) {
          out += text[i];
          done++;
        } else if (text[i] === " ") {
          out += " ";
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      frame += 1;
      if (done < text.length && frame <= total + 2) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
};

export default ScrambleText;
