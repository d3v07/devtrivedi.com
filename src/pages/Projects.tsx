import { ArrowUpRight, Github, ExternalLink, ChevronDown, Brain, Server, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/sections/Footer";

interface Project {
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  features: string[];
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    number: "01",
    title: "Lintellect",
    category: "AI / DevTools",
    tagline: "High-bar AI code review agent for production PRs",
    description:
      "An agentic PR review pipeline that parses diffs, retrieves AST context via Tree-sitter, and generates evidence-gated inline comments with file and line citations.",
    problem:
      "Manual code reviews are slow, inconsistent, and often produce ungrounded or cosmetic-only feedback that misses real semantic issues.",
    solution:
      "Designed an agentic pipeline with diff parsing, AST context retrieval, and evidence-based prompts that produce inline comments with file-and-line citations.",
    impact: [
      "Reduced review turnaround time by 60%+ on routine changes",
      "Cut hallucinated or ungrounded feedback by 80%+ versus raw diff prompting",
      "Increased semantic issue detection to 80%+ while filtering cosmetic noise",
      "Lowered reviewer nit churn by 50%+ with first-pass AI pair reviewer outputs",
    ],
    features: [
      "Evidence-gated inline comments with file & line citations",
      "Syntax-aware diffing plus Tree-sitter context retrieval",
      "First-pass AI pair reviewer: summary, risks, approve or request changes",
      "Integrated with GitHub Actions for automated PR workflows",
    ],
    tech: ["Python", "Tree-sitter", "AST", "LLM", "GitHub API"],
    links: {
      github: "https://github.com/d3v07/lintellect",
    },
  },
  {
    number: "02",
    title: "FinMind",
    category: "Full-Stack Finance",
    tagline: "Session-based financial research workspace with multi-agent AI",
    description:
      "A full-stack financial research workspace with JWT auth, persisted history, 4-mode agent adapter with fallback routing, and artifact rendering for charts and tables.",
    problem:
      "Financial analysts waste time on repeated setup across multi-query workflows, and single-provider AI pipelines fail during outages.",
    solution:
      "Built a session-based workspace with JWT auth, a 4-mode agent adapter (Dexter, OpenRouter, mock, auto) with fallback routing, and real-time artifact rendering.",
    impact: [
      "Reduced repeated setup steps by 80%+ for multi-query workflows",
      "Improved successful query completion to 99%+ during provider outages",
      "Cut time-to-decision-ready output from minutes to <10s per query",
      "Prevented spend overruns by 100% with daily and per-session budget guardrails",
    ],
    features: [
      "4-mode agent adapter with automatic fallback routing",
      "Artifact rendering: single/multi-ticker charts, comparison tables, news sentiment",
      "Cost metering with daily and per-session budget guardrails",
      "Persisted session history with JWT authentication",
    ],
    tech: ["React", "Node.js", "JWT", "OpenRouter", "Chart.js", "PostgreSQL"],
    links: {
      github: "https://github.com/d3v07/finmind",
    },
  },
  {
    number: "03",
    title: "DocWeave",
    category: "AI / Knowledge Graph",
    tagline: "Continuously updating governed knowledge truth layer",
    description:
      "An AI-native knowledge layer that ingests PDFs, emails, screenshots, and logs, extracts claims with provenance and confidence scores, and resolves conflicts via truth reconciliation.",
    problem:
      "Organizations struggle with contradictory information across documents, and existing systems can't trace answers back to source evidence.",
    solution:
      "Architected a continuous ingestion pipeline with claim graph extraction, conflict detection (supports/refutes/supersedes edges), and embedding + graph traversal for precision queries.",
    impact: [
      "Near real-time updates with sub-minute ingestion latency",
      "100% citation coverage — every answer traceable to source evidence",
      "Reduced contradictory answers by 90%+ via truth reconciliation rules",
      "Sub-second answers over millions of claim nodes and edges",
    ],
    features: [
      "Multimodal ingestion: PDFs, emails, screenshots, logs",
      "Claim graph with provenance and confidence scores",
      "Conflict detection: supports, refutes, supersedes edges",
      "Embeddings for recall + graph traversal for precision",
    ],
    tech: ["Python", "Embeddings", "Neo4j", "FastAPI", "Redis"],
    links: {
      github: "https://github.com/d3v07/docweave",
    },
  },
  {
    number: "04",
    title: "Cyber Threat Predictor",
    category: "ML / Cybersecurity",
    tagline: "ML-powered IIoT threat detection with federated learning",
    description:
      "Processed 2.1M IIoT network packets using optimized preprocessing and an ensemble of SVM and Random Forest models, deployed with a federated learning pipeline for cross-site privacy.",
    problem:
      "Traditional IIoT security generates excessive false positives and can't share threat intelligence across sites without exposing sensitive edge data.",
    solution:
      "Trained an ensemble of SVM and Random Forest with optimized feature engineering, then deployed a federated learning pipeline improving cross-site AUC while maintaining data privacy.",
    impact: [
      "Reduced false positives by 34% using optimized preprocessing and feature engineering",
      "Achieved 94.1% detection accuracy with 0.1s inference latency per sample",
      "Improved cross-site AUC by 0.21 via federated learning pipeline",
      "Maintained privacy of sensitive edge data across all training sites",
    ],
    features: [
      "Ensemble of SVM + Random Forest classifiers",
      "Optimized preprocessing for 2.1M+ IIoT network packets",
      "Federated learning for privacy-preserving cross-site training",
    ],
    tech: ["Python", "Django", "Scikit-learn", "SVM", "Random Forest", "Federated Learning"],
    links: {},
  },
  {
    number: "05",
    title: "PulseOps",
    category: "Event-Driven Monitoring",
    tagline: "Real-time operations dashboard with sub-second performance",
    description:
      "A high-performance event-driven monitoring system using Kafka streams and Redis-backed aggregates for real-time operational insights.",
    problem:
      "Traditional monitoring couldn't handle peak load traffic spikes while maintaining sub-second response times for dashboard queries.",
    solution:
      "Architected event-driven ingestion via Kafka streams with Redis-backed aggregates and GraphQL interfaces for efficient data transfer.",
    impact: [
      "Sustained sub-second writes during 3x higher peak load traffic spikes",
      "Dashboard queries answered under 900ms at peak concurrency",
      "Reduced payload transfer by 62% with GraphQL interfaces",
      "Accelerated dashboard responsiveness for active production users",
    ],
    features: [
      "Kafka streams for event-driven ingestion",
      "Redis-backed aggregates for real-time queries",
      "GraphQL interfaces for efficient data transfer",
      "Peak load handling with sub-second latency",
    ],
    tech: ["Node.js", "Kafka", "Redis", "PostgreSQL", "GraphQL", "AWS"],
    links: {
      github: "https://github.com/d3v07/pulseops",
    },
  },
  {
    number: "06",
    title: "SpendLens",
    category: "AI Cost Optimization",
    tagline: "AI-driven cloud cost analyzer with predictive recommendations",
    description:
      "An intelligent cloud cost management platform using AI/ML to analyze spending patterns and provide actionable rightsizing recommendations.",
    problem:
      "Cloud costs growing unpredictably without actionable insights or safeguards during anomalous billing patterns.",
    solution:
      "Integrated AI inference pipelines with rule-based safeguards, simulating infrastructure configurations to forecast cost reductions.",
    impact: [
      "Generated AI-driven recommendations across 12 services weekly",
      "Identified ~$18K annual savings opportunities",
      "Forecasted mean 27% cost reduction across infrastructure",
      "Prevented recommendations during anomalous billing patterns",
    ],
    features: [
      "AI-driven cost recommendations",
      "Infrastructure configuration simulations",
      "Retention policies and storage tier comparisons",
      "Rule-based safeguards for anomaly detection",
    ],
    tech: ["TypeScript", "Node.js", "PostgreSQL", "AI/ML", "AWS"],
    links: {
      github: "https://github.com/d3v07/spendlens",
    },
  },
  {
    number: "07",
    title: "VendorFlow",
    category: "Multi-tenant SaaS",
    tagline: "Enterprise vendor management with tenant isolation and billing automation",
    description:
      "A comprehensive multi-tenant vendor management system with RBAC authorization, queue-managed billing, and high-frequency caching.",
    problem:
      "Needed tenant-isolated services for suppliers, agreements, and payments while maintaining peak responsiveness during high invoice volumes.",
    solution:
      "Orchestrated tenant-isolated services with RBAC, asynchronized billing through queue-managed workers, and cached high-frequency read paths.",
    impact: [
      "Enforced RBAC authorization across 20+ tenants",
      "Preserved peak responsiveness during 2K+ invoice runs",
      "Lowered persistence pressure by 40% under concurrent access",
      "Integrated Stripe for seamless payment processing",
    ],
    features: [
      "Tenant-isolated services with RBAC",
      "Queue-managed async billing workers",
      "In-memory caching for high-frequency reads",
      "Stripe payment integration",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Redis", "Stripe", "AWS"],
    links: {
      github: "https://github.com/d3v07/vendorflow",
    },
  },
  {
    number: "08",
    title: "RideShare",
    category: "Full-Stack / Mobility",
    tagline: "MERN-based ride-sharing MVP with real-time matching",
    description:
      "A ride-sharing MVP using MongoDB, Express, React, and Node.js with JWT authentication, geohash nearest-neighbor matching, and OSRM routing with Socket.IO for real-time updates.",
    problem:
      "Ride-sharing platforms need sub-second matching with real-time updates while maintaining secure role-based workflows for riders and drivers.",
    solution:
      "Built with JWT auth and role-based workflows, implemented geohash nearest-neighbor matching and OSRM routing with Socket.IO, deployed containerized services on Vercel/Render.",
    impact: [
      "Achieved 99.4% uptime with containerized Docker deployment",
      "Sub-second ride matching latency via geohash nearest-neighbor algorithm",
      "Real-time updates delivered instantly via Socket.IO",
      "Secure role-based workflows with JWT authentication",
    ],
    features: [
      "Geohash nearest-neighbor matching algorithm",
      "OSRM routing with real-time Socket.IO updates",
      "JWT authentication with role-based access control",
      "Containerized deployment with Docker on Vercel/Render",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "Docker"],
    links: {
      github: "https://github.com/d3v07/rideshare",
    },
  },
  {
    number: "09",
    title: "ChatterBox",
    category: "Systems / C++",
    tagline: "Terminal-based multi-user chat with IPC and thread synchronization",
    description:
      "A terminal-based multi-user chat system using System V IPC, RAII wrappers, and POSIX thread synchronization, supporting 50+ concurrent users with a lightweight binary protocol.",
    problem:
      "Building a reliable multi-user chat system at the systems level requires careful concurrency management and message ordering without high-level frameworks.",
    solution:
      "Designed with System V IPC, RAII wrappers, and mutex-protected server-client concurrency. Built a lightweight binary protocol with timestamps for ordered delivery.",
    impact: [
      "Supported 50+ concurrent users with thread synchronization",
      "Achieved 0.4s average response latency with mutex-protected concurrency",
      "Reduced dropped messages by 93% in stress tests via binary protocol",
    ],
    features: [
      "System V IPC with RAII wrappers",
      "Mutex-protected server-client concurrency",
      "Lightweight binary protocol with timestamps",
      "Ordered message delivery under stress",
    ],
    tech: ["C++", "System V IPC", "POSIX Threads", "Sockets"],
    links: {
      github: "https://github.com/d3v07/chatterbox",
    },
  },
];

interface Category {
  name: string;
  icon: React.ReactNode;
  description: string;
  projectNumbers: string[];
  accent: string;
  accentBg: string;
}

const categories: Category[] = [
  {
    name: "AI & Intelligence",
    icon: <Brain className="w-5 h-5" />,
    description: "ML models, knowledge graphs & intelligent agents",
    projectNumbers: ["01", "02", "03", "04"],
    accent: "text-purple-600 dark:text-purple-400",
    accentBg: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40",
  },
  {
    name: "Infrastructure & Ops",
    icon: <Server className="w-5 h-5" />,
    description: "Event-driven systems, cost optimization & SaaS platforms",
    projectNumbers: ["05", "06", "07"],
    accent: "text-primary",
    accentBg: "bg-primary/10 border-primary/20 hover:border-primary/40",
  },
  {
    name: "Engineering & Systems",
    icon: <Wrench className="w-5 h-5" />,
    description: "Real-time networking, systems programming & full-stack builds",
    projectNumbers: ["08", "09"],
    accent: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
  },
];

const iconButtonClass =
  "p-3 border border-border rounded-md hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 " +
  "focus:outline-none focus:ring-0 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const Projects = () => {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const getProjectsByCategory = (cat: Category) =>
    cat.projectNumbers.map((num) => projects.find((p) => p.number === num)!).filter(Boolean);

  const selectedProjectData = selectedProject
    ? projects.find((p) => p.number === selectedProject)
    : null;

  const handleProjectClick = (projectNumber: string) => {
    setSelectedProject(projectNumber);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleFolderClick = (folderName: string) => {
    if (openFolder === folderName) {
      setOpenFolder(null);
      setSelectedProject(null);
    } else {
      setOpenFolder(folderName);
      setSelectedProject(null);
    }
  };

  return (
    <main className="pt-32 pb-24 relative overflow-hidden cursor-none">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-60 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <section className="px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-body text-sm tracking-widest uppercase text-primary mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-primary" />
            Selected Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-display text-5xl md:text-7xl leading-tight mb-8"
          >
            Featured Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-muted-foreground max-w-2xl mb-16"
          >
            A collection of projects showcasing my expertise in full-stack development, cloud architecture, and building
            scalable, production-ready systems. Click a folder to explore.
          </motion.p>

          {/* Category Folders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories.map((cat, idx) => {
              const isOpen = openFolder === cat.name;
              const catProjects = getProjectsByCategory(cat);
              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  onClick={() => handleFolderClick(cat.name)}
                   whileHover={{ scale: 1.03, y: -4 }}
                   whileTap={{ scale: 0.98 }}
                   className={`text-left p-6 border transition-all duration-300 cursor-pointer ${cat.accentBg} ${
                     isOpen
                       ? "ring-2 ring-primary/30 shadow-lg shadow-primary/10"
                       : "hover:shadow-md hover:shadow-foreground/5"
                   }`}
                 >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 ${cat.accent}`}>
                      {cat.icon}
                      <span className="font-body text-xs tracking-widest uppercase font-semibold">
                        {cat.name}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-4 h-4 ${cat.accent}`} />
                    </motion.div>
                  </div>

                  <p className="font-body text-xs text-muted-foreground mb-4">
                    {cat.description}
                  </p>

                  {/* Mini project previews (stacked) */}
                  <div className="space-y-1.5">
                    {catProjects.map((proj) => (
                      <div
                        key={proj.number}
                        className="flex items-center gap-2 font-body text-sm text-foreground/70"
                      >
                        <span className={`text-xs font-semibold ${cat.accent}`}>{proj.number}</span>
                        <span className="truncate">{proj.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="font-body text-xs text-muted-foreground">
                      {catProjects.length} project{catProjects.length !== 1 ? "s" : ""}
                    </span>
                    <span className={`font-body text-xs ${cat.accent} opacity-60 group-hover:opacity-100 transition-opacity`}>
                      Click to explore →
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded Folder - Project Cards */}
          <AnimatePresence mode="wait">
            {openFolder && (
              <motion.div
                key={openFolder}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden mb-16"
              >
                <div className="p-8 border border-border bg-card/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl">{openFolder}</h3>
                    <button
                      onClick={() => {
                        setOpenFolder(null);
                        setSelectedProject(null);
                      }}
                      className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {getProjectsByCategory(
                      categories.find((c) => c.name === openFolder)!
                    ).map((proj, i) => (
                      <motion.button
                        key={proj.number}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                         onClick={() => handleProjectClick(proj.number)}
                         whileHover={{ scale: 1.03, y: -4 }}
                         whileTap={{ scale: 0.98 }}
                         className={`text-left p-5 border border-border bg-background hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300 group cursor-pointer ${
                          selectedProject === proj.number
                            ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                            : ""
                        }`}
                      >
                        <span className="font-display text-3xl text-foreground/10 group-hover:text-primary/20 transition-colors">
                          {proj.number}
                        </span>
                        <h4 className="font-display text-xl mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {proj.title}
                        </h4>
                        <span className="font-body text-xs text-muted-foreground block mb-3">
                          {proj.category}
                        </span>
                        <p className="font-body text-xs text-muted-foreground line-clamp-2 break-words">
                          {proj.tagline}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="font-body text-[10px] px-2 py-0.5 bg-muted/30 border border-border text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.tech.length > 3 && (
                            <span className="font-body text-[10px] px-2 py-0.5 text-muted-foreground">
                              +{proj.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* All Projects by Category (scroll reveal fallback) */}
          {!openFolder && !selectedProject && (
            <div className="space-y-16 mb-16">
              {categories.map((cat) => {
                const catProjects = getProjectsByCategory(cat);
                return (
                  <ScrollReveal key={cat.name} delay={0.1}>
                    <div>
                      <div className={`flex items-center gap-2 mb-6 ${cat.accent}`}>
                        {cat.icon}
                        <h3 className="font-display text-2xl">{cat.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {catProjects.map((proj, i) => (
                          <motion.button
                            key={proj.number}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            onClick={() => {
                              setOpenFolder(cat.name);
                              handleProjectClick(proj.number);
                            }}
                            className="text-left p-5 border border-border bg-background hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300 group cursor-pointer"
                          >
                            <span className="font-display text-3xl text-foreground/10 group-hover:text-primary/20 transition-colors">
                              {proj.number}
                            </span>
                            <h4 className="font-display text-xl mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {proj.title}
                            </h4>
                            <span className="font-body text-xs text-muted-foreground block mb-3">
                              {proj.category}
                            </span>
                            <p className="font-body text-xs text-muted-foreground line-clamp-2 break-words">
                              {proj.tagline}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {proj.tech.slice(0, 3).map((t) => (
                                <span key={t} className="font-body text-[10px] px-2 py-0.5 bg-muted/30 border border-border text-muted-foreground">
                                  {t}
                                </span>
                              ))}
                              {proj.tech.length > 3 && (
                                <span className="font-body text-[10px] px-2 py-0.5 text-muted-foreground">
                                  +{proj.tech.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Selected Project Detail */}
          <AnimatePresence mode="wait">
            {selectedProjectData && (
              <motion.div
                ref={detailRef}
                key={selectedProjectData.number}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <ScrollReveal delay={0}>
                  <article className="group">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                      {/* Number */}
                      <motion.div className="md:col-span-2" whileHover={{ scale: 1.1 }}>
                        <span className="font-display text-8xl md:text-9xl text-muted/10 group-hover:text-primary/20 transition-colors duration-700">
                          {selectedProjectData.number}
                        </span>
                      </motion.div>

                      {/* Content */}
                      <div className="md:col-span-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                          <div>
                            <span className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-3">
                              {selectedProjectData.category}
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl group-hover:text-primary transition-colors duration-300 mb-2 break-words">
                              {selectedProjectData.title}
                            </h2>
                            <p className="font-body text-lg text-muted-foreground break-words">
                              {selectedProjectData.tagline}
                            </p>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            {selectedProjectData.links?.github && (
                              <MagneticButton strength={0.3}>
                                <a
                                  href={selectedProjectData.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={iconButtonClass}
                                  aria-label="View on GitHub"
                                >
                                  <Github className="w-5 h-5" />
                                </a>
                              </MagneticButton>
                            )}
                            {selectedProjectData.links?.live && (
                              <MagneticButton strength={0.3}>
                                <a
                                  href={selectedProjectData.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={iconButtonClass}
                                  aria-label="View live project"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                </a>
                              </MagneticButton>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg max-w-3xl break-words">
                          {selectedProjectData.description}
                        </p>

                        {/* Problem & Solution */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                          <motion.div
                            className="p-6 bg-card/50 border border-border"
                            whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="font-body text-xs tracking-widest uppercase text-primary mb-4">
                              The Problem
                            </h4>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed break-words">
                              {selectedProjectData.problem}
                            </p>
                          </motion.div>

                          <motion.div
                            className="p-6 bg-card/50 border border-border"
                            whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="font-body text-xs tracking-widest uppercase text-primary mb-4">
                              The Solution
                            </h4>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed break-words">
                              {selectedProjectData.solution}
                            </p>
                          </motion.div>
                        </div>

                        {/* Impact - conditional */}
                        {selectedProjectData.impact.length > 0 && (
                          <div className="p-8 bg-card border border-border mb-10">
                            <h4 className="font-body text-xs tracking-widest uppercase text-primary mb-6">
                              Impact & Results
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {selectedProjectData.impact.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                                  <span className="font-body text-sm text-muted-foreground break-words">
                                    {item}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Features - conditional */}
                        {selectedProjectData.features.length > 0 && (
                          <div className="mb-10">
                            <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                              Key Features
                            </h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                              {selectedProjectData.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.3, delay: i * 0.03 }}
                                  className="font-body text-sm text-muted-foreground flex items-start gap-3"
                                >
                                  <span className="text-primary/60">→</span>
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech stack */}
                        <div>
                          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProjectData.tech.map((t, i) => (
                              <motion.span
                                key={t}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: i * 0.02 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="font-body text-sm px-4 py-2 bg-background border border-border hover:border-primary/50 transition-all duration-300"
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Projects;
