import MiniWindow from "./MiniWindow";

interface ResumeAppProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export default function ResumeApp({ onClose, onFocus, zIndex }: ResumeAppProps) {
  return (
    <MiniWindow
      title="resume.pdf — Dev Trivedi"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialX={560}
      initialY={50}
      width={340}
      height={420}
    >
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 pt-3 pb-2.5 border-b-2 border-foreground">
          <p className="font-display text-xl leading-tight">Dev Trivedi</p>
          <p className="font-mono-code text-[9px] text-primary mt-0.5 tracking-widest uppercase">
            Software Engineer
          </p>
          <p className="font-mono-code text-[9px] text-muted-foreground mt-1">
            trivedidev16@gmail.com · New York City, NY
          </p>
        </div>

        {/* Education */}
        <div className="border-b border-border/20">
          <div className="px-4 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">Education</span>
          </div>
          <div className="px-4 py-2.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-body text-[11px] font-semibold">MS Computer Science</p>
                <p className="font-mono-code text-[9px] text-muted-foreground">NJIT · GPA 4.0</p>
              </div>
              <span className="font-mono-code text-[9px] text-muted-foreground shrink-0 ml-2">2024–2026</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-body text-[11px] font-semibold">BS Computer Science</p>
                <p className="font-mono-code text-[9px] text-muted-foreground">JNTUH</p>
              </div>
              <span className="font-mono-code text-[9px] text-muted-foreground shrink-0 ml-2">2020–2024</span>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="border-b border-border/20">
          <div className="px-4 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">Projects</span>
          </div>
          <div className="px-4 py-2.5 space-y-2.5">
            {[
              { name: "PulseOps",    desc: "Event-driven monitoring · distributed systems",  metric: "3× throughput" },
              { name: "SpendLens",   desc: "Cloud cost optimizer · AWS",                     metric: "$18K saved" },
              { name: "VendorFlow",  desc: "Multi-tenant vendor management SaaS",            metric: "20+ tenants" },
            ].map(p => (
              <div key={p.name} className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-body text-[11px] font-semibold">{p.name}</p>
                  <p className="font-mono-code text-[9px] text-muted-foreground">{p.desc}</p>
                </div>
                <span className="font-mono-code text-[9px] text-primary border border-primary/30 px-1 shrink-0 mt-0.5">
                  {p.metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="px-4 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">Skills</span>
          </div>
          <div className="px-4 py-2.5 space-y-1.5">
            {[
              ["Languages",  "TypeScript · Go · Python · C++ · Java"],
              ["Cloud",      "AWS · Docker · Kubernetes · Terraform"],
              ["Backend",    "Node.js · FastAPI · PostgreSQL · Redis"],
              ["Frontend",   "React · Tailwind · Framer Motion"],
            ].map(([cat, val]) => (
              <div key={cat} className="flex gap-2">
                <span className="font-mono-code text-[9px] text-primary shrink-0 w-16">{cat}</span>
                <span className="font-mono-code text-[9px] text-foreground/70">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="shrink-0 px-4 py-2.5 border-t-2 border-foreground bg-card">
        <button
          onClick={() => window.open("/resume.pdf", "_blank")}
          className="w-full font-mono-code text-xs py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Download PDF
        </button>
      </div>
    </MiniWindow>
  );
}
