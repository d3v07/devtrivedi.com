import { useEffect, useState } from "react";

const LINES = [
  "booting devOS v3.0 …",
  "mounting /portfolio …................ [ ok ]",
  "loading projects · experience · blog  [ ok ]",
  "opening uplink to recruiters ........ [ ok ]",
  "status: open-to-work ................ ready",
];

const skip = () => {
  if (typeof window === "undefined") return true;
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
    return window.sessionStorage?.getItem("dt-booted") === "1";
  } catch {
    return true;
  }
};

/** One-time-per-session terminal boot overlay. On-brand for the OS theme. */
const BootSequence = () => {
  const [done, setDone] = useState(skip);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (done) return;
    try {
      window.sessionStorage?.setItem("dt-booted", "1");
    } catch {
      /* ignore */
    }
    const timers: number[] = [];
    LINES.forEach((_, i) =>
      timers.push(window.setTimeout(() => setShown(i + 1), 220 + i * 230)),
    );
    const settled = 220 + LINES.length * 230;
    timers.push(window.setTimeout(() => setLeaving(true), settled + 320));
    timers.push(window.setTimeout(() => setDone(true), settled + 720));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[#0f0f0f] text-[#f3e9dc] transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-lg px-6 font-mono-code text-[11px] sm:text-sm">
        {LINES.slice(0, shown).map((line, i) => (
          <div key={i} className="leading-relaxed">
            <span className="text-primary">$</span> {line}
          </div>
        ))}
        <span className="mt-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
      </div>
    </div>
  );
};

export default BootSequence;
