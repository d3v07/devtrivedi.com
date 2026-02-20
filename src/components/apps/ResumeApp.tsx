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
      width={360}
      height={500}
    >
      <div className="flex-1 overflow-y-auto text-foreground">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b-2 border-foreground">
          <p className="font-display text-2xl leading-tight">Dev Trivedi</p>
          <p className="font-mono-code text-[10px] text-primary mt-0.5 tracking-wide uppercase">
            Software Engineer
          </p>
          <div className="flex flex-wrap gap-x-3 mt-1.5">
            {[
              "trivedidev16@gmail.com",
              "New Jersey, USA",
              "github.com/trivedidev",
            ].map((c) => (
              <span key={c} className="font-mono-code text-[9px] text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="border-b border-border/20">
          <div className="px-5 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">
              Education
            </span>
          </div>
          <div className="px-5 py-2.5 space-y-2">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-body text-[11px] font-semibold">MS Computer Science</p>
                <span className="font-mono-code text-[9px] text-muted-foreground">2024 – 2026</span>
              </div>
              <p className="font-mono-code text-[9px] text-muted-foreground">NJIT · GPA 4.0</p>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-body text-[11px] font-semibold">BS Computer Science</p>
                <span className="font-mono-code text-[9px] text-muted-foreground">2020 – 2024</span>
              </div>
              <p className="font-mono-code text-[9px] text-muted-foreground">Sardar Patel University</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="border-b border-border/20">
          <div className="px-5 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">
              Experience
            </span>
          </div>
          <div className="px-5 py-2.5 space-y-3">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-body text-[11px] font-semibold">Software Engineer</p>
                <span className="font-mono-code text-[9px] text-muted-foreground">2023 – 2024</span>
              </div>
              <p className="font-mono-code text-[9px] text-muted-foreground mb-1">RR Enterprise</p>
              <ul className="space-y-0.5">
                {[
                  "Built event-driven monitoring pipeline — 3x throughput gain",
                  "Reduced AWS infrastructure cost by $18K/yr with zero feature loss",
                  "Led migration from monolith to microservices (Node.js + Go)",
                ].map((b) => (
                  <li key={b} className="font-mono-code text-[9px] text-foreground/70 flex gap-1.5">
                    <span className="text-primary shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-body text-[11px] font-semibold">Software Engineer</p>
                <span className="font-mono-code text-[9px] text-muted-foreground">2022 – 2023</span>
              </div>
              <p className="font-mono-code text-[9px] text-muted-foreground mb-1">Nuance Media</p>
              <ul className="space-y-0.5">
                {[
                  "Shipped multi-tenant SaaS onboarding 20+ tenants in one sprint",
                  "Built real-time analytics dashboard with WebSocket + Redis Pub/Sub",
                  "Improved page load by 40% with lazy loading and CDN optimization",
                ].map((b) => (
                  <li key={b} className="font-mono-code text-[9px] text-foreground/70 flex gap-1.5">
                    <span className="text-primary shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="border-b border-border/20">
          <div className="px-5 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">
              Projects
            </span>
          </div>
          <div className="px-5 py-2.5 space-y-2">
            {[
              {
                name: "PulseOps.go",
                desc: "Distributed monitoring system · Go · Kafka · Prometheus",
                metric: "3x throughput",
              },
              {
                name: "SpendLens.py",
                desc: "AI-driven cloud cost optimizer · Python · AWS Cost Explorer",
                metric: "$18K saved",
              },
              {
                name: "VendorFlow.ts",
                desc: "Multi-tenant vendor management SaaS · TypeScript · PostgreSQL",
                metric: "20+ tenants",
              },
            ].map((p) => (
              <div key={p.name} className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-body text-[11px] font-semibold">{p.name}</p>
                  <p className="font-mono-code text-[9px] text-muted-foreground">{p.desc}</p>
                </div>
                <span className="font-mono-code text-[9px] text-primary shrink-0 mt-0.5 border border-primary/30 px-1">
                  {p.metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="px-5 py-1.5 bg-foreground/5 border-b border-border/10">
            <span className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">
              Skills
            </span>
          </div>
          <div className="px-5 py-2.5 space-y-1">
            {[
              ["Languages", "TypeScript · Go · Python · C++ · Java"],
              ["Frontend", "React · Tailwind · Framer Motion · Next.js"],
              ["Backend", "Node.js · Express · FastAPI · gRPC"],
              ["Cloud & Infra", "AWS · Docker · Kubernetes · Terraform"],
              ["Databases", "PostgreSQL · Redis · MongoDB · Kafka"],
            ].map(([cat, val]) => (
              <div key={cat} className="flex gap-2">
                <span className="font-mono-code text-[9px] text-primary shrink-0 w-20">{cat}</span>
                <span className="font-mono-code text-[9px] text-foreground/70">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download button */}
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
