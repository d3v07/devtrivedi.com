import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitCommit, Zap, Bug, Sparkles, Wrench } from "lucide-react";
import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/ScrollReveal";

type ChangeType = "feat" | "fix" | "perf" | "refactor" | "chore";

interface ChangeEntry {
  version: string;
  date: string;
  label: string;
  changes: {
    type: ChangeType;
    title: string;
    description: string;
  }[];
}

const changelog: ChangeEntry[] = [
  {
    version: "v3.0.0",
    date: "2026-02-19",
    label: "The OS Update",
    changes: [
      {
        type: "feat",
        title: "Portfolio OS — desktop mode with draggable icons",
        description:
          "Rebuilt the entire portfolio as an operating system. Draggable file icons, windowed navigation, taskbar. Because why not.",
      },
      {
        type: "feat",
        title: "Project Slides — Swiper-powered presentations per project",
        description:
          "Each project now has a 7-slide presentation with Slides mode (marketing) and Dev mode (architecture). Presenter notes included.",
      },
      {
        type: "feat",
        title: "App Library — shuffle + category filter for projects",
        description:
          "Projects page rebuilt as an App Library. Hit Shuffle for chaos, filter by domain for signal.",
      },
      {
        type: "feat",
        title: "Changelog page (this page)",
        description:
          "Version history for a portfolio. Probably overkill. Definitely on brand.",
      },
      {
        type: "refactor",
        title: "Neo-brutalist design system — hard shadows, thick borders",
        description:
          "Replaced glass-morphism and blur effects with 4px offset hard shadows and 2px solid borders. PostHog-inspired editorial aesthetic.",
      },
      {
        type: "chore",
        title: "Removed cursor-none and decorative blur orbs",
        description: "The custom cursor was cool for 48 hours. Then it got annoying.",
      },
    ],
  },
  {
    version: "v2.3.0",
    date: "2026-01-15",
    label: "The Forms Update",
    changes: [
      {
        type: "feat",
        title: "Contact form with email validation and toast feedback",
        description: "Actually working contact form. Validated. Won't spam you.",
      },
      {
        type: "feat",
        title: "Footer with social links and site map",
        description: "A proper footer. With links that go places.",
      },
      {
        type: "fix",
        title: "Mobile navigation hamburger menu",
        description: "Fixed the hamburger menu not closing after link click on iOS.",
      },
    ],
  },
  {
    version: "v2.2.0",
    date: "2025-12-20",
    label: "The Projects Showcase",
    changes: [
      {
        type: "feat",
        title: "Projects page with category folders",
        description:
          "9 projects organized into 3 domain folders: AI & Intelligence, Infrastructure & Ops, Engineering & Systems.",
      },
      {
        type: "feat",
        title: "Project detail views with impact metrics",
        description: "Each project shows problem, solution, impact, tech stack, and key features.",
      },
      {
        type: "perf",
        title: "Lazy loading for project detail panels",
        description: "Project details now load on demand instead of all upfront.",
      },
    ],
  },
  {
    version: "v2.1.0",
    date: "2025-12-10",
    label: "The Animation Update",
    changes: [
      {
        type: "feat",
        title: "Typewriter hero animation — Dev/Trivedi ↔ Software/Developer",
        description:
          "Hero text cycles between two states with smooth AnimatePresence transitions. Technically unnecessary. Looks great.",
      },
      {
        type: "feat",
        title: "ScrollReveal component for staggered section entrance",
        description: "Sections fade/slide in as you scroll. Industry standard. Implemented properly.",
      },
      {
        type: "feat",
        title: "MagneticButton — cursor attraction effect",
        description:
          "Buttons that subtly pull toward the cursor. Later removed in v3.0.0 as part of the anti-blur refactor.",
      },
    ],
  },
  {
    version: "v2.0.0",
    date: "2025-11-28",
    label: "The Rewrite",
    changes: [
      {
        type: "refactor",
        title: "Full migration from plain HTML to React + Vite",
        description:
          "Rebuilt from scratch. TypeScript throughout. Component architecture. Actually maintainable now.",
      },
      {
        type: "feat",
        title: "Dark mode with next-themes",
        description: "System-aware dark mode. Persisted to localStorage. Works.",
      },
      {
        type: "feat",
        title: "Framer Motion page transitions",
        description: "AnimatePresence wrapping the router. Smooth exits and entrances between routes.",
      },
      {
        type: "chore",
        title: "Tailwind CSS v3 + shadcn/ui component library",
        description: "Standardized on Tailwind. Pulled in shadcn/ui for form components and primitives.",
      },
    ],
  },
  {
    version: "v1.0.0",
    date: "2025-09-01",
    label: "The Beginning",
    changes: [
      {
        type: "feat",
        title: "Initial portfolio — HTML, CSS, vanilla JS",
        description:
          "The original. 3 pages. One CSS file. Zero frameworks. Some of the best code I've written because it had to work without abstractions.",
      },
      {
        type: "feat",
        title: "Projects section with 3 highlighted projects",
        description: "PulseOps, SpendLens, VendorFlow. The first three shipped.",
      },
    ],
  },
];

const typeConfig: Record<ChangeType, { icon: React.FC<{ className?: string }>; label: string; color: string }> = {
  feat: { icon: Sparkles, label: "feat", color: "bg-primary text-primary-foreground" },
  fix: { icon: Bug, label: "fix", color: "bg-destructive text-destructive-foreground" },
  perf: { icon: Zap, label: "perf", color: "bg-accent text-accent-foreground" },
  refactor: { icon: GitCommit, label: "refactor", color: "bg-foreground text-background" },
  chore: { icon: Wrench, label: "chore", color: "bg-muted text-muted-foreground border border-border" },
};

const YEARS = ["All", "2026", "2025"];

const Changelog = () => {
  const [filterYear, setFilterYear] = useState("All");

  const filtered = changelog.filter((entry) => {
    if (filterYear === "All") return true;
    return entry.date.startsWith(filterYear);
  });

  return (
    <main className="min-h-screen">

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b-2 border-foreground">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono-code text-xs tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-primary" />
              // changelog.md
            </p>
            <h1 className="font-display text-5xl md:text-7xl mb-6">Changelog</h1>
            <p className="font-body text-base text-muted-foreground max-w-xl leading-relaxed">
              Version history for a developer portfolio. Every design decision, feature shipped, and thing
              scrapped. Brutally honest.
            </p>
          </motion.div>

          {/* Year filter tabs */}
          <div className="flex gap-2 mt-10">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(year)}
                className={`font-mono-code text-sm px-4 py-2 border-2 border-foreground transition-all duration-150 ${
                  filterYear === year
                    ? "bg-foreground text-background"
                    : "bg-background hover:bg-foreground hover:text-background neo-btn-sm"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTRIES ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-[7px] hidden md:block" />

            <div className="space-y-16">
              {filtered.map((entry, entryIndex) => (
                <ScrollReveal key={entry.version} delay={entryIndex * 0.05} direction="up">
                  <div className="md:pl-10 relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-primary border-2 border-foreground hidden md:block" />

                    {/* Version header */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="font-mono-code text-2xl font-bold">{entry.version}</span>
                      <span className="font-body text-sm px-3 py-1 border-2 border-foreground bg-card hard-shadow-sm">
                        {entry.label}
                      </span>
                      <span className="font-mono-code text-xs text-muted-foreground ml-auto">{entry.date}</span>
                    </div>

                    {/* Change cards */}
                    <div className="space-y-4">
                      {entry.changes.map((change, changeIndex) => {
                        const config = typeConfig[change.type];
                        const Icon = config.icon;
                        return (
                          <motion.div
                            key={changeIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: changeIndex * 0.05 }}
                            className="flex gap-4 p-4 border-2 border-foreground bg-card interactive-card"
                          >
                            {/* Type badge */}
                            <div className="flex-shrink-0">
                              <span
                                className={`inline-flex items-center gap-1 font-mono-code text-xs px-2 py-1 ${config.color}`}
                              >
                                <Icon className="w-3 h-3" />
                                {config.label}
                              </span>
                            </div>

                            {/* Content */}
                            <div>
                              <p className="font-body font-semibold text-sm mb-1">{change.title}</p>
                              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                {change.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-6 md:px-12 lg:px-24 border-t-2 border-foreground section-alt">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono-code text-xs text-primary uppercase tracking-widest mb-2">// what's next</p>
              <h2 className="font-display text-3xl mb-2">Always shipping.</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                This portfolio is a living project. OS window framing shipped. Next: interactive project demos,
                maybe an AI assistant.
              </p>
            </div>
            <a
              href="https://github.com/d3v07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 border-2 border-foreground bg-foreground text-background flex-shrink-0 neo-btn-primary"
            >
              View on GitHub
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
};

export default Changelog;
