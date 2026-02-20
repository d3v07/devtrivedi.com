import { ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    number: "01",
    company: "RR Enterprise",
    role: "Software Engineer Intern",
    period: "Jul — Dec 2024",
    description: "Built event-driven systems and multi-tenant APIs for a vendor management platform.",
    highlights: [
      "40% faster transaction processing",
      "60% reduced deployment time",
      "99.9% payment reliability",
    ],
  },
  {
    number: "02",
    company: "Nuance Media",
    role: "Full Stack Developer",
    period: "Sep 2023 — May 2024",
    description: "Developed media processing pipelines and real-time analytics dashboards.",
    highlights: [
      "35% reduced API response times",
      "80% less manual intervention",
      "500+ daily uploads processed",
    ],
  },
];

const Experience = () => {
  return (
    <section id="work" className="py-20 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-body text-sm tracking-widest uppercase text-primary block mb-4">
              Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl">Where I've worked</h2>
          </div>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`group py-12 ${index !== experiences.length - 1 ? "border-b-2 border-foreground" : ""}`}
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-display text-6xl text-muted-foreground/50 group-hover:text-primary transition-colors">
                    {exp.number}
                  </span>
                </div>

                {/* Main content */}
                <div className="md:col-span-7">
                  <div className="flex items-start gap-4 mb-4">
                    <h3 className="font-display text-3xl md:text-4xl group-hover:text-primary transition-colors">
                      {exp.company}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="font-body text-muted-foreground mb-2">{exp.role}</p>
                  <p className="font-body text-muted-foreground/70 text-sm">{exp.description}</p>
                </div>

                {/* Period and highlights */}
                <div className="md:col-span-4 md:text-right">
                  <span className="font-body text-sm text-muted-foreground block mb-4">
                    {exp.period}
                  </span>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="font-body text-xs px-3 py-1 bg-background border border-border"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
