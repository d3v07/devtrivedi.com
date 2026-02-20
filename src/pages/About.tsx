import { ArrowUpRight, Award, BookOpen, Briefcase, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/sections/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const experiences = [
  {
    number: "01",
    company: "RR Enterprise",
    role: "Software Engineer",
    period: "Jul 2024 — Dec 2024",
    location: "India",
    description:
      "Built high-performance data pipelines and cloud-native applications, significantly improving operational efficiency and cross-team collaboration.",
    achievements: [
      "Built C++ S3 ingestion pipeline processing 10K records daily, reducing data latency by 85%",
      "Developed React dashboard on AWS Amplify, cutting reporting turnaround from hours to seconds",
      "Designed secure Node.js APIs on AWS EC2 with Swagger + JWT, boosting cross-team data access by 75%",
      "Implemented structured logging and health checks with CloudWatch, cutting incident triage to ~10 minutes",
    ],
    technologies: ["C++", "React", "Node.js", "AWS EC2", "AWS S3", "CloudWatch", "JWT"],
  },
  {
    number: "02",
    company: "Nuance Media",
    role: "Software Engineer",
    period: "Sep 2023 — May 2024",
    location: "Remote",
    description:
      "Delivered optimized web applications and automated deployment workflows for client campaigns under tight deadlines.",
    achievements: [
      "Delivered React applications on Vercel with code-splitting, improving campaign performance under high traffic",
      "Reworked MongoDB schemas with compound indexes, reducing latency from 400ms to 180ms",
      "Shipped 20+ production features across Agile sprints using Jira and Jest, maintaining delivery quality",
      "Automated build and deployment with GitHub Actions, cutting release cycle time by 40%",
    ],
    technologies: ["React", "MongoDB", "GitHub Actions", "Vercel", "Jest", "Jira"],
  },
];

const education = [
  {
    school: "New Jersey Institute of Technology",
    short: "NJIT",
    degree: "Master of Science in Computer Science",
    period: "Jan 2025 — Dec 2026",
    gpa: "4.0",
    location: "Newark, NJ",
    coursework: [
      "Operating Systems",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Cloud Computing",
      "Machine Learning",
    ],
  },
  {
    school: "Jawaharlal Nehru Technological University",
    short: "JNTU",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Nov 2020 — Jul 2024",
    gpa: null,
    location: "India",
    coursework: ["Software Engineering", "Database Management", "Computer Networks", "Operating Systems"],
  },
];

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    icon: Briefcase,
    title: "Tech Stack",
    skills: ["Node.js", "Express.js", "React.js", "REST APIs", "HTML5", "CSS3"],
  },
  {
    icon: Award,
    title: "Cloud & DevOps",
    skills: ["AWS EC2/S3/RDS/Lambda", "Azure VMs", "Docker", "Kubernetes", "GitHub Actions", "Jenkins"],
  },
  {
    icon: BookOpen,
    title: "Databases & Tools",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Git", "Postman", "Swagger", "Jest"],
  },
];

const leadership = [
  {
    role: "Team Lead",
    org: "Qualcomm AI Hackathon, NYU",
    year: "Sept 2025",
    description: "Led a 4-member team to build an edge-based computer vision prototype with Qualcomm AI Stack.",
  },
  {
    role: "Event Coordinator",
    org: "NJIT GDG, Newark",
    year: "April 2025",
    description:
      "Organized coding workshops and peer-learning sessions for 40+ students, fostering collaboration in emerging technologies.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const About = () => {
  return (
    <main className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono-code text-xs tracking-widest uppercase text-primary mb-5 flex items-center gap-2"
          >
            <span className="w-5 h-px bg-primary" />
            // about.md
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8"
          >
            I don't just write code.
            <br />
            <em className="text-primary">I architect outcomes.</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="grid md:grid-cols-2 gap-10 font-body text-base text-muted-foreground max-w-5xl leading-relaxed mb-12"
          >
            <p>
              Currently pursuing my Master's in Computer Science at NJIT with a{" "}
              <span className="text-foreground font-semibold">4.0 GPA</span>. I've spent the past few years obsessing
              over distributed systems, event-driven architectures, and making things run faster and cheaper.
            </p>
            <p>
              From reducing cloud costs by 35% to building real-time dashboards that handle 10K+ daily events — I focus
              on impact, not features. AWS & Azure certified. Always learning. Ships things that actually work.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="grid grid-cols-2 md:grid-cols-4 border-2 border-foreground hard-shadow-lg"
          >
            {[
              { value: "4.0", label: "GPA at NJIT" },
              { value: "1.5+", label: "Years Experience" },
              { value: "85%", label: "Latency Reduction" },
              { value: "10K", label: "Records / Day" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-6 bg-card ${i < 3 ? "border-r border-foreground/20" : ""}`}
              >
                <span className="font-display text-4xl text-primary block">{stat.value}</span>
                <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-t-2 border-foreground section-alt">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-3">
              // work_history.json
            </span>
            <h2 className="font-display text-4xl md:text-5xl">Where I've worked</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  opacity: { duration: 0.4, delay: idx * 0.1 },
                  y: { duration: 0.4, delay: idx * 0.1 },
                  x: { type: "spring", stiffness: 400, damping: 28 },
                  boxShadow: { type: "spring", stiffness: 400, damping: 28 },
                  scale: { type: "spring", stiffness: 400, damping: 28 },
                }}
                className="border-2 border-foreground bg-background interactive-card p-8"
              >
                <div className="grid md:grid-cols-12 gap-6">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="font-display text-5xl text-muted-foreground/20">{exp.number}</span>
                  </div>

                  {/* Main content */}
                  <div className="md:col-span-8">
                    <div className="flex flex-wrap items-start gap-3 mb-1">
                      <h3 className="font-display text-3xl">{exp.company}</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground mt-2" />
                    </div>
                    <p className="font-mono-code text-xs text-primary mb-1">{exp.role}</p>
                    <p className="font-body text-sm text-muted-foreground mb-5">{exp.description}</p>

                    <ul className="space-y-2 mb-6">
                      {exp.achievements.map((a) => (
                        <li key={a} className="font-body text-sm text-foreground flex items-start gap-3">
                          <span className="text-primary mt-0.5 shrink-0 font-mono-code">→</span>
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-code text-[11px] px-2.5 py-1 border border-foreground/30 bg-card"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Period */}
                  <div className="md:col-span-3 md:text-right">
                    <span className="font-mono-code text-xs border border-border px-3 py-1.5 inline-block text-muted-foreground">
                      {exp.period}
                    </span>
                    <p className="font-body text-xs text-muted-foreground mt-2">{exp.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-t-2 border-foreground">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-3">
              // tech_stack.toml
            </span>
            <h2 className="font-display text-4xl md:text-5xl">What I work with</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, catIdx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    opacity: { duration: 0.35, delay: catIdx * 0.07 },
                    y: { duration: 0.35, delay: catIdx * 0.07 },
                    x: { type: "spring", stiffness: 400, damping: 28 },
                    boxShadow: { type: "spring", stiffness: 400, damping: 28 },
                    scale: { type: "spring", stiffness: 400, damping: 28 },
                  }}
                  className="border-2 border-foreground p-5 bg-card hard-shadow"
                >
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-foreground/20">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-mono-code text-[11px] tracking-widest uppercase text-muted-foreground">
                      {cat.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-body text-xs px-2.5 py-1 border border-foreground/20 bg-background hover:border-primary hover:text-primary transition-colors duration-150 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-t-2 border-foreground section-alt">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-3">
              // education.json
            </span>
            <h2 className="font-display text-4xl md:text-5xl">Academic background</h2>
          </div>

          <div className="border-2 border-foreground hard-shadow-lg">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className={`grid md:grid-cols-2 gap-8 p-8 bg-background ${idx < education.length - 1 ? "border-b-2 border-foreground" : ""}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-code text-xs bg-foreground text-background px-2 py-0.5">
                      {edu.short}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">{edu.location}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-1">{edu.school}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-1">{edu.degree}</p>
                  <p className="font-mono-code text-xs text-muted-foreground/60">{edu.period}</p>
                </div>
                <div>
                  {edu.gpa && (
                    <div className="mb-5">
                      <span className="font-display text-6xl text-primary">{edu.gpa}</span>
                      <span className="font-body text-sm text-muted-foreground ml-2">GPA</span>
                    </div>
                  )}
                  <span className="font-mono-code text-[11px] tracking-widest uppercase text-muted-foreground block mb-3">
                    Coursework
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="font-body text-xs px-2.5 py-1 border border-foreground/20 bg-card"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-t-2 border-foreground">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-3">
              // leadership.yaml
            </span>
            <h2 className="font-display text-4xl md:text-5xl">Beyond the code</h2>
          </div>

          <div className="space-y-4">
            {leadership.map((item, idx) => (
              <motion.div
                key={item.org}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  opacity: { duration: 0.35, delay: idx * 0.08 },
                  y: { duration: 0.35, delay: idx * 0.08 },
                  x: { type: "spring", stiffness: 400, damping: 28 },
                  boxShadow: { type: "spring", stiffness: 400, damping: 28 },
                  scale: { type: "spring", stiffness: 400, damping: 28 },
                }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 border-2 border-foreground bg-card interactive-card"
              >
                <div className="flex-1">
                  <h3 className="font-display text-2xl mb-0.5">{item.role}</h3>
                  <p className="font-body text-sm text-primary mb-2">{item.org}</p>
                  <p className="font-body text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="font-mono-code text-xs border border-border px-3 py-1.5 shrink-0 text-muted-foreground">
                  {item.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
