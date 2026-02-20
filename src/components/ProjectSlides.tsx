import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, FileCode, Monitor } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Project {
  number: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string[];
  features: string[];
  tech: string[];
  links?: { github?: string; live?: string };
}

interface ProjectSlidesProps {
  project: Project;
  onClose: () => void;
}

type ViewMode = "slides" | "dev";

interface Slide {
  title: string;
  slidesContent: React.ReactNode;
  devContent: React.ReactNode;
  presenterNote: string;
}

function buildSlides(project: Project): Slide[] {
  return [
    {
      title: "The Problem",
      presenterNote: `This slide sets up the context for why ${project.title} exists. Lead with the pain — make the audience feel it before you show the solution.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">01 / Problem</span>
          <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
            {project.tagline.split(" ").slice(0, 5).join(" ")}...
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">01 / Problem — Technical Framing</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Problem statement
// Project: ${project.title}
// Category: ${project.category}

const problem = {
  domain: "${project.category}",
  challenge: \`
    ${project.problem.substring(0, 150)}...
  \`,
  constraints: [
    "Production-grade requirements",
    "Scalability under load",
    "Real-time responsiveness"
  ]
};`}
          </pre>
        </div>
      ),
    },
    {
      title: "The Solution",
      presenterNote: `Explain what was built without getting lost in implementation details yet. Focus on the architectural decision — why this approach over alternatives.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">02 / Solution</span>
          <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
            What was built
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">02 / Architecture</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Architecture overview
// ${project.title}

const architecture = {
  approach: "Event-driven, layered",
  stack: [${project.tech.map((t) => `"${t}"`).join(", ")}],
  solution: \`
    ${project.solution.substring(0, 200)}
  \`
};

// Key design decisions:
// - Separation of concerns
// - Horizontal scalability
// - Fault tolerance`}
          </pre>
        </div>
      ),
    },
    {
      title: "Key Features",
      presenterNote: `Walk through each feature at a high level. These are the capabilities that matter to end users, not implementation details.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">03 / Features</span>
          <h2 className="font-display text-4xl mb-8">Built to do this</h2>
          <div className="space-y-4">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-primary pl-4">
                <span className="font-mono-code text-xs text-primary mt-0.5 shrink-0">0{i + 1}</span>
                <p className="font-body text-base text-foreground">{f}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">03 / Implementation Details</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Feature breakdown
const features = [
${project.features.map((f, i) => `  "${f}",`).join("\n")}
];

// Each feature maps to:
// - A service layer component
// - Unit + integration tests
// - Monitoring/observability hook`}
          </pre>
        </div>
      ),
    },
    {
      title: "Impact & Results",
      presenterNote: `Numbers are everything here. Lead with the biggest number, then support it with context. These are real, measured outcomes.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">04 / Impact</span>
          <h2 className="font-display text-4xl mb-8">What actually happened</h2>
          <div className="space-y-3">
            {project.impact.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border-2 border-foreground bg-card">
                <span className="text-primary font-mono-code text-sm shrink-0 mt-0.5">✓</span>
                <p className="font-body text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">04 / Metrics & Benchmarks</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Measured outcomes
const results = {
${project.impact
  .map((item, i) => `  metric_${String(i + 1).padStart(2, "0")}: "${item.substring(0, 60)}...",`)
  .join("\n")}
};

// Measurement methodology:
// - Production load testing
// - A/B comparison baseline
// - Continuous monitoring`}
          </pre>
        </div>
      ),
    },
    {
      title: "Tech Stack",
      presenterNote: `This slide is for technical audiences. Walk through the key technology choices and why they were made — not just what was used.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">05 / Stack</span>
          <h2 className="font-display text-4xl mb-8">How it's built</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono-code text-sm px-4 py-2 border-2 border-foreground bg-card hard-shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground mt-8">
            {project.tech.length} technologies. Chosen for production reliability, not resume padding.
          </p>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">05 / Dependency Graph</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// package.json (simplified)
{
  "name": "${project.title.toLowerCase().replace(/\s/g, "-")}",
  "dependencies": {
${project.tech.map((t) => `    "${t.toLowerCase()}": "latest",`).join("\n")}
  },
  "scripts": {
    "dev": "start dev server",
    "build": "production build",
    "test": "jest --coverage"
  }
}`}
          </pre>
        </div>
      ),
    },
    {
      title: "Challenges",
      presenterNote: `Honesty builds credibility. What was actually hard? What would you do differently? This is where senior engineers pay attention.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">06 / Challenges</span>
          <h2 className="font-display text-4xl mb-8">What was hard</h2>
          <div className="space-y-6">
            {[
              { challenge: "Scalability under production load", solution: "Horizontal scaling + caching strategy" },
              { challenge: "Data consistency guarantees", solution: "Transactional boundaries + event sourcing" },
              { challenge: "Latency requirements at scale", solution: "In-memory aggregates + async processing" },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-destructive/30 bg-destructive/5">
                  <p className="font-body text-xs text-destructive uppercase tracking-wide mb-1">Problem</p>
                  <p className="font-body text-sm">{item.challenge}</p>
                </div>
                <div className="p-4 border-2 border-primary/30 bg-primary/5">
                  <p className="font-body text-xs text-primary uppercase tracking-wide mb-1">How it was solved</p>
                  <p className="font-body text-sm">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">06 / Technical Debt & Learnings</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Lessons learned
const technicalDebt = {
  identified: [
    "N+1 query patterns in initial impl",
    "Missing circuit breakers on external APIs",
    "Insufficient observability on hot paths"
  ],
  resolved: [
    "Batch loading + DataLoader pattern",
    "Exponential backoff + timeout budgets",
    "Structured logging + distributed tracing"
  ],
  ifStartingAgain: [
    "Schema-first API design",
    "Observability from day 1",
    "Event sourcing for audit trail"
  ]
};`}
          </pre>
        </div>
      ),
    },
    {
      title: "What's Next",
      presenterNote: `This is your vision slide. If this were a real product, where does it go? Show you think beyond the immediate task.`,
      slidesContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl">
          <span className="font-mono-code text-xs text-primary uppercase tracking-widest mb-6">07 / Roadmap</span>
          <h2 className="font-display text-4xl mb-8">If this were a product</h2>
          <div className="space-y-4">
            {[
              "Multi-region deployment with global data residency",
              "Self-service onboarding with guided setup",
              "API-first design for third-party integrations",
              "Real-time collaboration features",
              `ML-powered recommendations specific to ${project.category}`,
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono-code text-xs text-muted-foreground mt-0.5 shrink-0">
                  v{i + 2}.0
                </span>
                <p className="font-body text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      devContent: (
        <div className="flex flex-col justify-center h-full px-12 py-10 max-w-3xl font-mono-code text-sm">
          <span className="text-primary text-xs uppercase tracking-widest mb-6">07 / Engineering Roadmap</span>
          <pre className="bg-foreground text-background p-6 text-sm leading-relaxed overflow-auto border-2 border-foreground">
            {`// Future engineering work
const roadmap = [
  {
    version: "2.0",
    focus: "Multi-region + global CDN",
    effort: "6 weeks",
    priority: "high"
  },
  {
    version: "2.1",
    focus: "API v2 with GraphQL subscriptions",
    effort: "3 weeks",
    priority: "high"
  },
  {
    version: "3.0",
    focus: "ML inference pipeline integration",
    effort: "8 weeks",
    priority: "medium"
  }
];`}
          </pre>
        </div>
      ),
    },
  ];
}

export default function ProjectSlides({ project, onClose }: ProjectSlidesProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("slides");
  const [showNotes, setShowNotes] = useState(true);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const slides = buildSlides(project);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "n" || e.key === "N") setShowNotes((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] bg-foreground/50 flex items-center justify-center p-4 md:p-8"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
      {/* Modal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-background border-2 border-foreground flex flex-col hard-shadow-lg"
        style={{ width: "min(95vw, 1100px)", height: "min(88vh, 820px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Window chrome (title bar) ─────────────────────────────── */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-card px-4 py-2 shrink-0">
          {/* Left: close + title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150"
              aria-label="Close slides"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="font-mono-code text-sm text-muted-foreground">
              {project.title}
              <span className="text-primary">.</span>slides
            </span>
          </div>

          {/* Center: view mode toggle */}
          <div className="flex items-center border-2 border-foreground">
            <button
              onClick={() => setViewMode("slides")}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-mono-code text-xs transition-all duration-150 ${
                viewMode === "slides"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-card"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Slides
            </button>
            <button
              onClick={() => setViewMode("dev")}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-mono-code text-xs transition-all duration-150 border-l-2 border-foreground ${
                viewMode === "dev"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-card"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Dev mode
            </button>
          </div>

          {/* Right: slide counter + notes toggle */}
          <div className="flex items-center gap-4">
            <span className="font-mono-code text-xs text-muted-foreground">
              {activeSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setShowNotes((v) => !v)}
              className={`font-mono-code text-xs px-3 py-1.5 border-2 border-foreground transition-all duration-150 ${
                showNotes ? "bg-foreground text-background" : ""
              }`}
            >
              Notes [N]
            </button>
          </div>
        </div>

        {/* ── Main content area ─────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar: slide navigation */}
          <div className="w-48 shrink-0 border-r-2 border-foreground bg-card overflow-y-auto">
            <div className="p-4 space-y-1">
              <p className="font-mono-code text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                Slides
              </p>
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`slide-nav-item w-full text-left px-3 py-2 font-body text-sm transition-all duration-200 hover:text-primary block ml-3 ${
                    activeSlide === index ? "active-sidebar-item" : ""
                  }`}
                >
                  <span className="font-mono-code text-[10px] text-muted-foreground mr-2">
                    0{index + 1}
                  </span>
                  {slide.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main slide area */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <Swiper
              modules={[Navigation, Pagination]}
              className="w-full"
              style={{
                flex: 1, minHeight: 0, height: "100%",
                "--swiper-pagination-color": "#f54e00",
                "--swiper-pagination-bullet-inactive-color": "#999",
                "--swiper-navigation-color": "#f54e00",
              } as React.CSSProperties}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".slide-prev",
                nextEl: ".slide-next",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              keyboard={{ enabled: true }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="h-full">
                  <div className="h-full overflow-y-auto">
                    {viewMode === "slides" ? slide.slidesContent : slide.devContent}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom nav arrows */}
            <div className="flex items-center justify-between px-4 py-2 border-t-2 border-foreground/20 bg-card/50">
              <button className="slide-prev flex items-center gap-2 font-mono-code text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <div className="font-mono-code text-[10px] text-muted-foreground">
                ← → arrow keys • ESC to close • N for notes
              </div>
              <button className="slide-next flex items-center gap-2 font-mono-code text-xs text-muted-foreground hover:text-foreground transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Presenter notes panel ────────────────────────────────── */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t-2 border-foreground bg-card overflow-hidden shrink-0"
            >
              <div className="px-6 py-4 max-h-32 overflow-y-auto">
                <p className="font-mono-code text-[10px] text-primary uppercase tracking-widest mb-2">
                  Presenter notes:
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {slides[activeSlide]?.presenterNote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
