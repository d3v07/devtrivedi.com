import { ArrowUpRight, Github, Shuffle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/sections/Footer";
import ProjectSlides from "@/components/ProjectSlides";

interface Project {
  number: string;
  title: string;
  filename: string;
  category: string;
  domain: "AI" | "Infrastructure" | "Engineering";
  tagline: string;
  problem: string;
  solution: string;
  impact: string[];
  features: string[];
  tech: string[];
  links?: { github?: string; live?: string };
}

const projects: Project[] = [
  {
    number: "01",
    title: "Lintellect",
    filename: "Lintellect.cpp",
    category: "AI / DevTools",
    domain: "AI",
    tagline: "High-bar AI code review agent for production PRs",
    problem: "Manual code reviews are slow, inconsistent, and often produce ungrounded or cosmetic-only feedback that misses real semantic issues.",
    solution: "Designed an agentic pipeline with diff parsing, AST context retrieval, and evidence-based prompts that produce inline comments with file-and-line citations.",
    impact: ["60%+ reduction in review turnaround time", "80%+ cut in hallucinated feedback vs raw diff prompting", "80%+ semantic issue detection rate", "50%+ lower reviewer nit churn"],
    features: ["Evidence-gated inline comments with file & line citations", "Syntax-aware diffing + Tree-sitter context retrieval", "First-pass AI pair reviewer: summary, risks, approve or request changes", "Integrated with GitHub Actions"],
    tech: ["Python", "Tree-sitter", "AST", "LLM", "GitHub API"],
    links: { github: "https://github.com/d3v07/lintellect" },
  },
  {
    number: "02",
    title: "FinMind",
    filename: "FinMind.ipynb",
    category: "Full-Stack Finance",
    domain: "AI",
    tagline: "Session-based financial research workspace with multi-agent AI",
    problem: "Financial analysts waste time on repeated setup across multi-query workflows, and single-provider AI pipelines fail during outages.",
    solution: "Built a session-based workspace with JWT auth, a 4-mode agent adapter (Dexter, OpenRouter, mock, auto) with fallback routing, and real-time artifact rendering.",
    impact: ["80%+ reduction in repeated setup steps", "99%+ query completion during provider outages", "<10s time-to-decision-ready output per query", "100% prevention of budget overruns via guardrails"],
    features: ["4-mode agent adapter with automatic fallback routing", "Artifact rendering: charts, comparison tables, news sentiment", "Cost metering with daily and per-session budget guardrails", "Persisted session history with JWT authentication"],
    tech: ["React", "Node.js", "JWT", "OpenRouter", "Chart.js", "PostgreSQL"],
    links: { github: "https://github.com/d3v07/finmind" },
  },
  {
    number: "03",
    title: "DocWeave",
    filename: "DocWeave.mdx",
    category: "AI / Knowledge Graph",
    domain: "AI",
    tagline: "Continuously updating governed knowledge truth layer",
    problem: "Organizations struggle with contradictory information across documents, and existing systems can't trace answers back to source evidence.",
    solution: "Architected a continuous ingestion pipeline with claim graph extraction, conflict detection (supports/refutes/supersedes edges), and embedding + graph traversal for precision queries.",
    impact: ["Sub-minute ingestion latency for near real-time updates", "100% citation coverage — every answer traceable to source", "90%+ reduction in contradictory answers", "Sub-second answers over millions of claim nodes"],
    features: ["Multimodal ingestion: PDFs, emails, screenshots, logs", "Claim graph with provenance and confidence scores", "Conflict detection: supports, refutes, supersedes edges", "Embeddings for recall + graph traversal for precision"],
    tech: ["Python", "Embeddings", "Neo4j", "FastAPI", "Redis"],
    links: { github: "https://github.com/d3v07/docweave" },
  },
  {
    number: "04",
    title: "Cyber Threat Predictor",
    filename: "threat_predictor.pkl",
    category: "ML / Cybersecurity",
    domain: "AI",
    tagline: "ML-powered IIoT threat detection with federated learning",
    problem: "Traditional IIoT security generates excessive false positives and can't share threat intelligence across sites without exposing sensitive edge data.",
    solution: "Trained an ensemble of SVM and Random Forest with optimized feature engineering, then deployed a federated learning pipeline improving cross-site AUC while maintaining data privacy.",
    impact: ["34% false positive reduction", "94.1% detection accuracy with 0.1s inference latency", "0.21 cross-site AUC improvement via federated learning", "Full data privacy preservation across all training sites"],
    features: ["Ensemble of SVM + Random Forest classifiers", "Optimized preprocessing for 2.1M+ IIoT network packets", "Federated learning for privacy-preserving cross-site training"],
    tech: ["Python", "Django", "Scikit-learn", "SVM", "Random Forest", "Federated Learning"],
    links: {},
  },
  {
    number: "05",
    title: "PulseOps",
    filename: "PulseOps.go",
    category: "Event-Driven Monitoring",
    domain: "Infrastructure",
    tagline: "Real-time operations dashboard with sub-second performance",
    problem: "Traditional monitoring couldn't handle peak load traffic spikes while maintaining sub-second response times for dashboard queries.",
    solution: "Architected event-driven ingestion via Kafka streams with Redis-backed aggregates and GraphQL interfaces for efficient data transfer.",
    impact: ["Sub-second writes sustained during 3× peak load spikes", "Dashboard queries answered under 900ms at peak concurrency", "62% reduction in payload transfer with GraphQL", "Accelerated dashboard responsiveness for active production users"],
    features: ["Kafka streams for event-driven ingestion", "Redis-backed aggregates for real-time queries", "GraphQL interfaces for efficient data transfer", "Peak load handling with sub-second latency"],
    tech: ["Node.js", "Kafka", "Redis", "PostgreSQL", "GraphQL", "AWS"],
    links: { github: "https://github.com/d3v07/pulseops" },
  },
  {
    number: "06",
    title: "SpendLens",
    filename: "SpendLens.py",
    category: "AI Cost Optimization",
    domain: "Infrastructure",
    tagline: "AI-driven cloud cost analyzer with predictive recommendations",
    problem: "Cloud costs growing unpredictably without actionable insights or safeguards during anomalous billing patterns.",
    solution: "Integrated AI inference pipelines with rule-based safeguards, simulating infrastructure configurations to forecast cost reductions.",
    impact: ["AI-driven recommendations across 12 services weekly", "$18K annual savings opportunities identified", "27% mean forecasted cost reduction across infrastructure", "100% prevention of recommendations during billing anomalies"],
    features: ["AI-driven cost recommendations", "Infrastructure configuration simulations", "Retention policies and storage tier comparisons", "Rule-based safeguards for anomaly detection"],
    tech: ["TypeScript", "Node.js", "PostgreSQL", "AI/ML", "AWS"],
    links: { github: "https://github.com/d3v07/spendlens" },
  },
  {
    number: "07",
    title: "VendorFlow",
    filename: "VendorFlow.ts",
    category: "Multi-tenant SaaS",
    domain: "Infrastructure",
    tagline: "Enterprise vendor management with tenant isolation and billing automation",
    problem: "Needed tenant-isolated services for suppliers, agreements, and payments while maintaining peak responsiveness during high invoice volumes.",
    solution: "Orchestrated tenant-isolated services with RBAC, asynchronized billing through queue-managed workers, and cached high-frequency read paths.",
    impact: ["RBAC enforced across 20+ tenants", "Peak responsiveness preserved during 2K+ invoice runs", "40% lower persistence pressure under concurrent access", "Stripe payment integration with seamless processing"],
    features: ["Tenant-isolated services with RBAC", "Queue-managed async billing workers", "In-memory caching for high-frequency reads", "Stripe payment integration"],
    tech: ["MongoDB", "Express", "React", "Node.js", "Redis", "Stripe", "AWS"],
    links: { github: "https://github.com/d3v07/vendorflow" },
  },
  {
    number: "08",
    title: "RideShare",
    filename: "rideshare.sql",
    category: "Full-Stack / Mobility",
    domain: "Engineering",
    tagline: "MERN-based ride-sharing MVP with real-time matching",
    problem: "Ride-sharing platforms need sub-second matching with real-time updates while maintaining secure role-based workflows for riders and drivers.",
    solution: "Built with JWT auth and role-based workflows, implemented geohash nearest-neighbor matching and OSRM routing with Socket.IO, deployed containerized services on Vercel/Render.",
    impact: ["99.4% uptime with containerized Docker deployment", "Sub-second ride matching via geohash nearest-neighbor", "Real-time updates delivered instantly via Socket.IO", "Secure role-based workflows with JWT auth"],
    features: ["Geohash nearest-neighbor matching algorithm", "OSRM routing with real-time Socket.IO updates", "JWT authentication with role-based access control", "Containerized deployment with Docker on Vercel/Render"],
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "Docker"],
    links: { github: "https://github.com/d3v07/rideshare" },
  },
  {
    number: "09",
    title: "ChatterBox",
    filename: "ChatterBox.rs",
    category: "Systems / C++",
    domain: "Engineering",
    tagline: "Terminal-based multi-user chat with IPC and thread synchronization",
    problem: "Building a reliable multi-user chat system at the systems level requires careful concurrency management and message ordering without high-level frameworks.",
    solution: "Designed with System V IPC, RAII wrappers, and mutex-protected server-client concurrency. Built a lightweight binary protocol with timestamps for ordered delivery.",
    impact: ["50+ concurrent users with thread synchronization", "0.4s average response latency with mutex-protected concurrency", "93% reduction in dropped messages in stress tests"],
    features: ["System V IPC with RAII wrappers", "Mutex-protected server-client concurrency", "Lightweight binary protocol with timestamps", "Ordered message delivery under stress"],
    tech: ["C++", "System V IPC", "POSIX Threads", "Sockets"],
    links: { github: "https://github.com/d3v07/chatterbox" },
  },
];

type FilterDomain = "All" | "AI" | "Infrastructure" | "Engineering";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const domainColors: Record<string, string> = {
  AI:             "bg-background text-primary border-primary border-2",
  Infrastructure: "bg-foreground text-background border-foreground border-2",
  Engineering:    "bg-card text-foreground border-foreground border-2",
};

const Projects = () => {
  const [displayProjects, setDisplayProjects] = useState<Project[]>(projects);
  const [filter, setFilter] = useState<FilterDomain>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [slidesProject, setSlidesProject] = useState<Project | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const filteredProjects = filter === "All" ? displayProjects : displayProjects.filter((p) => p.domain === filter);

  const handleShuffle = useCallback(() => {
    setDisplayProjects((prev) => shuffle(prev));
    setShuffleKey((k) => k + 1);
  }, []);

  const filters: FilterDomain[] = ["All", "AI", "Infrastructure", "Engineering"];

  return (
    <main className="min-h-screen">
      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-foreground">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-mono-code text-xs tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-primary" />
              projects.mdx
            </p>
            <h1 className="font-display text-5xl md:text-7xl mb-4">App Library</h1>
            <p className="font-body text-lg text-muted-foreground">
              {projects.length} projects across 3 domains. Shuffle for chaos, filter for signal.
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            {/* Shuffle */}
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 font-mono-code text-sm px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150 neo-btn-sm"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle
            </button>

            <span className="h-6 w-px bg-border" />

            {/* Filter tabs */}
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono-code text-sm px-4 py-2 border-2 border-foreground transition-all duration-150 ${
                  filter === f ? "bg-foreground text-background" : "hover:bg-card"
                }`}
              >
                {f}
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({f === "All" ? projects.length : projects.filter((p) => p.domain === f).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Grid ──────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={shuffleKey}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.number}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  <div
                    className="border-2 border-foreground bg-card flex flex-col h-full interactive-card cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Card header */}
                    <div className="p-5 pb-3 border-b border-foreground/15">
                      <span className={`inline-block font-mono-code text-[10px] px-2 py-0.5 border mb-3 ${domainColors[project.domain] || ""}`}>
                        {project.domain}
                      </span>
                      <p className="font-mono-code text-[11px] text-muted-foreground mb-2">{project.filename}</p>
                      <h3 className="font-display text-xl leading-tight mb-1">{project.title}</h3>
                      <p className="font-body text-xs text-muted-foreground">{project.category}</p>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex-1">
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {project.tagline}
                      </p>

                      {/* First impact metric */}
                      {project.impact[0] && (
                        <div className="flex items-start gap-2 mb-4">
                          <span className="text-primary text-xs mt-0.5 shrink-0">→</span>
                          <p className="font-body text-xs font-medium text-foreground">{project.impact[0]}</p>
                        </div>
                      )}

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="font-mono-code text-[10px] px-1.5 py-0.5 border border-border bg-background">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="font-mono-code text-[10px] px-1.5 py-0.5 text-muted-foreground">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="flex border-t border-foreground/15">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSlidesProject(project);
                        }}
                        className="flex-1 py-2.5 font-mono-code text-xs text-primary hover:bg-primary hover:text-primary-foreground border-r border-foreground/15 transition-all duration-150"
                      >
                        ▶ Open Slides
                      </button>
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2.5 hover:bg-card transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-3.5 h-3.5 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Project Detail Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 z-40"
              onClick={() => setSelectedProject(null)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-background border-l-2 border-foreground z-50 flex flex-col overflow-hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b-2 border-foreground shrink-0">
                <div>
                  <p className="font-mono-code text-[11px] text-muted-foreground">{selectedProject.filename}</p>
                  <h2 className="font-display text-2xl">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <p className="font-mono-code text-xs text-primary uppercase tracking-widest mb-2">The Problem</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div>
                  <p className="font-mono-code text-xs text-primary uppercase tracking-widest mb-2">The Solution</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                </div>
                <div>
                  <p className="font-mono-code text-xs text-primary uppercase tracking-widest mb-3">Impact</p>
                  <div className="space-y-2">
                    {selectedProject.impact.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 border border-border bg-card">
                        <span className="text-primary text-xs mt-0.5 shrink-0">✓</span>
                        <p className="font-body text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono-code text-xs text-muted-foreground uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="font-mono-code text-xs px-2 py-1 border-2 border-foreground bg-background">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono-code text-xs text-muted-foreground uppercase tracking-widest mb-3">Key Features</p>
                  <div className="space-y-2">
                    {selectedProject.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-primary/60 text-xs mt-0.5 shrink-0">→</span>
                        <p className="font-body text-sm text-muted-foreground">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="p-5 border-t-2 border-foreground flex gap-3 shrink-0">
                <button
                  onClick={() => {
                    setSlidesProject(selectedProject);
                    setSelectedProject(null);
                  }}
                  className="flex-1 font-mono-code text-sm py-3 border-2 border-foreground bg-foreground text-background transition-all duration-150 neo-btn-primary"
                >
                  ▶ View Slides
                </button>
                {selectedProject.links?.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono-code text-sm px-4 py-3 border-2 border-foreground hover:bg-card transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Project Slides Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {slidesProject && (
          <ProjectSlides
            project={slidesProject}
            onClose={() => setSlidesProject(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Projects;
