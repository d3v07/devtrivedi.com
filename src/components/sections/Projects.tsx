import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Lintellect",
    category: "AI Code Review",
    description: "Agentic PR review pipeline with AST context retrieval and evidence-gated inline comments. Reduced review turnaround by 60%.",
    tech: ["Python", "Tree-sitter", "LLM", "GitHub API"],
    color: "bg-secondary",
  },
  {
    number: "02",
    title: "FinMind",
    category: "Financial Research",
    description: "Session-based research workspace with 4-mode agent adapter and real-time artifact rendering. Sub-10s decision-ready output.",
    tech: ["React", "Node.js", "JWT", "Chart.js"],
    color: "bg-accent/20",
  },
  {
    number: "06",
    title: "SpendLens",
    category: "AI Cost Optimization",
    description: "AI-driven cloud cost analyzer with predictive recommendations. Identified ~$18K annual savings across 12 services.",
    tech: ["TypeScript", "Node.js", "AI/ML", "AWS"],
    color: "bg-card",
  },
  {
    number: "05",
    title: "PulseOps",
    category: "Event-Driven Monitoring",
    description: "Real-time operations dashboard with Kafka streams and Redis-backed aggregates. Sub-second writes at 3x peak load.",
    tech: ["Node.js", "Kafka", "Redis", "GraphQL"],
    color: "bg-primary/10",
  },
];

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto mb-12">
        <span className="font-body text-sm tracking-widest uppercase text-primary block mb-4">
          Selected Work
        </span>
        <div className="flex justify-between items-end">
          <h2 className="font-display text-4xl md:text-5xl">Featured Projects</h2>
          <p className="font-body text-sm text-muted-foreground hidden md:block">
            Scroll horizontally →
          </p>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 scroll-snap-x cursor-grab active:cursor-grabbing"
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className={`flex-shrink-0 w-[85vw] md:w-[500px] scroll-snap-item ${project.color} p-8 group interactive-card`}
            whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-display text-6xl text-foreground/20">
                {project.number}
              </span>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="p-2 bg-background/80 hover:bg-background transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-background/80 hover:bg-background transition-colors"
                  aria-label="View project"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <span className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
              {project.category}
            </span>
            
            <h3 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-body text-xs px-3 py-1 bg-background/80 border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
