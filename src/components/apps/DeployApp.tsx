import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniWindow from "./MiniWindow";

type Status = "idle" | "running" | "done";

interface LogLine {
  text: string;
  type: "info" | "success" | "warn";
}

const PIPELINE: { label: string; duration: number; logs: LogLine[] }[] = [
  {
    label: "Installing dependencies",
    duration: 800,
    logs: [
      { text: "npm install --prefer-offline", type: "info" },
      { text: "added 847 packages in 0.8s", type: "success" },
    ],
  },
  {
    label: "Running tests",
    duration: 1200,
    logs: [
      { text: "npx vitest run", type: "info" },
      { text: "89 tests passed (0 failed)", type: "success" },
      { text: "No segfaults detected", type: "success" },
    ],
  },
  {
    label: "Building for production",
    duration: 900,
    logs: [
      { text: "vite build --mode production", type: "info" },
      { text: "bundle size: 284kb (gzipped)", type: "info" },
      { text: "Build complete", type: "success" },
    ],
  },
  {
    label: "Pushing to AWS S3",
    duration: 700,
    logs: [
      { text: "aws s3 sync dist/ s3://portfolio-bucket", type: "info" },
      { text: "Uploaded 24 files", type: "success" },
    ],
  },
  {
    label: "Invalidating CloudFront cache",
    duration: 600,
    logs: [
      { text: "aws cloudfront create-invalidation --paths '/*'", type: "info" },
      { text: "Invalidation complete", type: "success" },
    ],
  },
];

const logColor: Record<LogLine["type"], string> = {
  info: "text-foreground/60",
  success: "text-[#39d353]",
  warn: "text-[#f0c05a]",
};

interface DeployAppProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export default function DeployApp({ onClose, onFocus, zIndex }: DeployAppProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [currentStage, setCurrentStage] = useState(-1);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const runDeploy = () => {
    setStatus("running");
    setCurrentStage(0);
    setLogs([]);

    let delay = 0;
    PIPELINE.forEach((stage, stageIdx) => {
      setTimeout(() => {
        setCurrentStage(stageIdx);
        stage.logs.forEach((log, logIdx) => {
          setTimeout(() => {
            setLogs((prev) => [...prev, log]);
          }, (logIdx + 1) * 120);
        });
      }, delay);
      delay += stage.duration;
    });

    setTimeout(() => {
      setStatus("done");
      setCurrentStage(PIPELINE.length);
      setLogs((prev) => [
        ...prev,
        { text: "Deployed successfully. Ship it.", type: "success" },
      ]);
    }, delay);
  };

  const reset = () => {
    setStatus("idle");
    setCurrentStage(-1);
    setLogs([]);
  };

  return (
    <MiniWindow
      title="deploy.sh"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialX={220}
      initialY={200}
      width={400}
      height={300}
    >
      {/* Pipeline stages */}
      <div className="flex items-center gap-0 shrink-0 border-b-2 border-foreground bg-card px-3 py-2">
        {PIPELINE.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-0">
            <div
              className={`flex items-center gap-1 px-2 py-1 text-[9px] font-mono-code transition-colors ${
                currentStage > i
                  ? "text-[#39d353]"
                  : currentStage === i
                  ? "text-primary font-bold"
                  : "text-foreground/30"
              }`}
            >
              {currentStage > i ? "✓" : currentStage === i ? "▶" : "○"}
              <span className="hidden sm:inline">{stage.label.split(" ")[0]}</span>
            </div>
            {i < PIPELINE.length - 1 && (
              <span className="text-foreground/20 font-mono-code text-[9px]">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Log output */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto bg-[#0d1117] px-3 py-2 space-y-0.5"
      >
        {logs.length === 0 && status === "idle" && (
          <p className="font-mono-code text-[11px] text-foreground/30 pt-2">
            Ready to deploy. Hit the button.
          </p>
        )}
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className={`font-mono-code text-[11px] ${logColor[log.type]}`}
            >
              {log.type === "success" ? "✓ " : "$ "}
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action button */}
      <div className="shrink-0 p-2.5 border-t-2 border-foreground bg-card flex items-center gap-3">
        {status === "idle" && (
          <button
            onClick={runDeploy}
            className="flex-1 font-mono-code text-xs py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Deploy
          </button>
        )}
        {status === "running" && (
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-foreground/5 border border-foreground/20">
            <motion.span
              className="w-2 h-2 bg-primary shrink-0"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="font-mono-code text-xs text-muted-foreground">
              {currentStage >= 0 && currentStage < PIPELINE.length
                ? PIPELINE[currentStage].label
                : "Deploying..."}
            </span>
          </div>
        )}
        {status === "done" && (
          <>
            <span className="font-mono-code text-xs text-[#39d353] flex-1">
              Deployed successfully.
            </span>
            <button
              onClick={reset}
              className="font-mono-code text-xs px-3 py-2 border border-foreground/30 text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </MiniWindow>
  );
}
