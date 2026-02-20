import MiniWindow from "./MiniWindow";

const sections = [
  {
    title: "Education",
    items: [
      { label: "MS Computer Science", sub: "NJIT · GPA 4.0 · 2024-2026" },
      { label: "BS Computer Science", sub: "Sardar Patel University · 2020-2024" },
    ],
  },
  {
    title: "Experience",
    items: [
      { label: "Software Engineer", sub: "RR Enterprise · 2023-2024" },
      { label: "Software Engineer", sub: "Nuance Media · 2022-2023" },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "PulseOps.go", sub: "Event-driven monitoring · 3x throughput" },
      { label: "SpendLens.py", sub: "AI cost optimization · $18K saved" },
      { label: "VendorFlow.ts", sub: "Multi-tenant SaaS · 20+ tenants" },
    ],
  },
  {
    title: "Skills",
    items: [
      { label: "Languages", sub: "TypeScript · Go · Python · C++ · Java" },
      { label: "Cloud & Infra", sub: "AWS · Docker · PostgreSQL · Redis" },
      { label: "Frontend", sub: "React · Tailwind · Framer Motion" },
    ],
  },
];

export default function ResumeApp({ onClose }: { onClose: () => void }) {
  return (
    <MiniWindow
      title="resume.pdf"
      onClose={onClose}
      initialX={560}
      initialY={50}
      width={340}
      height={480}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b-2 border-foreground bg-card">
          <p className="font-display text-xl leading-tight">Dev Trivedi</p>
          <p className="font-mono-code text-[10px] text-muted-foreground mt-0.5">
            Software Engineer · trivedidev16@gmail.com
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="border-b border-border/20">
            <div className="px-4 py-2 bg-foreground/5">
              <span className="font-mono-code text-[10px] tracking-widest uppercase text-primary">
                {section.title}
              </span>
            </div>
            {section.items.map((item) => (
              <div key={item.label} className="px-4 py-2.5 border-t border-border/10">
                <p className="font-body text-sm font-medium">{item.label}</p>
                <p className="font-mono-code text-[10px] text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Download button */}
      <div className="shrink-0 p-3 border-t-2 border-foreground bg-card">
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
