import { ArrowUpRight, Award, BookOpen, Briefcase, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/sections/Footer";

interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
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
      "Designed secure, scalable Node.js APIs on AWS EC2 with Swagger + JWT, boosting cross-team data access by 75%",
      "Implemented structured logging and health checks with CloudWatch, cutting incident triage from hours to ~10 minutes",
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
      "Delivered optimized React applications on Vercel with code-splitting, improving client campaign performance under high traffic",
      "Reworked complex MongoDB schemas with compound indexes, reducing latency from 400ms to 180ms",
      "Shipped 20+ production features across Agile sprints using Jira and Jest, maintaining delivery quality",
      "Automated build and deployment workflows with GitHub Actions for CI/CD, cutting release cycle time by 40%",
    ],
    technologies: ["React", "MongoDB", "GitHub Actions", "Vercel", "Jest", "Jira"],
  },
];

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  gpa?: string;
  location: string;
  coursework: string[];
  achievements?: string[];
}

const education: EducationItem[] = [
  {
    school: "New Jersey Institute of Technology",
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
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "Nov 2020 — Jul 2024",
    location: "India",
    coursework: ["Software Engineering", "Database Management", "Computer Networks", "Operating Systems"],
  },
];

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Languages",
    skills: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Tech Stack",
    skills: ["Node.js", "Express.js", "React.js", "REST APIs", "HTML5", "CSS3", "JSON"],
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Cloud & DevOps",
    skills: [
      "AWS (EC2, S3, RDS, Lambda, CloudWatch)",
      "Azure (VMs, Blob Storage)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Databases & Tools",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Git", "Postman", "Swagger", "Jest", "Jira"],
  },
];

const leadership = [
  {
    role: "Team Lead",
    org: "Qualcomm AI Hackathon, NYU",
    year: "Sept 2025",
    description: "Led a 4-member team to build an edge-based computer vision prototype with Qualcomm AI Stack",
  },
  {
    role: "Event Coordinator",
    org: "NJIT GDG, Newark",
    year: "April 2025",
    description:
      "Organized coding workshop and peer-learning sessions for 40+ students, fostering collaboration in emerging technologies",
  },
];

const About = () => {
  return (
    <main className="pt-32 pb-24 relative overflow-hidden cursor-none">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-60 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Intro */}
      <section className="px-6 md:px-12 lg:px-24 mb-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm tracking-widest uppercase text-primary mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-primary" />
            About Me
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-display text-5xl md:text-7xl leading-tight mb-12"
          >
            I craft software that's
            <br />
            <em className="text-primary">built to last</em>, not just built to ship.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-12 font-body text-lg text-muted-foreground max-w-5xl"
          >
            <p className="leading-relaxed">
              Currently pursuing my Master's in Computer Science at NJIT with a
              <span className="text-foreground font-medium"> 4.0 GPA</span>. I've spent the last few years obsessing
              over distributed systems, event-driven architectures, and making things run faster. My approach combines
              rigorous engineering with a deep appreciation for clean, maintainable code.
            </p>

            <p className="leading-relaxed">
              From reducing cloud costs by 35% to building real-time dashboards that handle 10K+ daily events—I focus on
              impact, not just features. AWS & Azure certified and always learning something new. When I'm not coding,
              you'll find me exploring new technologies or contributing to open source.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
          >
            {[
              { value: "4.0", label: "GPA" },
              { value: "1.5+", label: "Years Experience" },
              { value: "85%", label: "Latency Reduction" },
              { value: "10K", label: "Records Processed Daily" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center md:text-left"
              >
                <span className="font-display text-4xl md:text-5xl text-primary">{stat.value}</span>
                <p className="font-body text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-card relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="font-body text-sm tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-20">Where I've worked</h2>
          </ScrollReveal>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <ScrollReveal key={exp.company} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className={`group py-16 ${index !== experiences.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-1">
                      <span className="font-display text-6xl text-muted/20 group-hover:text-primary/40 transition-colors duration-500">
                        {exp.number}
                      </span>
                    </div>

                    <div className="md:col-span-7">
                      <div className="flex items-start gap-4 mb-4">
                        <h3 className="font-display text-3xl md:text-4xl group-hover:text-primary transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                      <p className="font-body text-lg text-muted-foreground mb-1">{exp.role}</p>
                      <p className="font-body text-sm text-muted-foreground/60 mb-6">{exp.location}</p>
                      <p className="font-body text-muted-foreground leading-relaxed mb-8">{exp.description}</p>

                      {/* Achievements */}
                      <ul className="space-y-3 mb-8">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="font-body text-sm text-muted-foreground flex items-start gap-3"
                          >
                            <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-body text-xs px-3 py-1.5 bg-background border border-border group-hover:border-primary/30 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 md:text-right">
                      <span className="font-body text-sm text-muted-foreground block px-4 py-2 bg-background/50 border border-border inline-block">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-12 lg:px-24 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <ScrollReveal direction="left">
                <span className="font-body text-sm tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary" />
                  Toolkit
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">Technologies I work with</h2>
              </ScrollReveal>
            </div>

            <div className="md:col-span-8">
              <div className="grid sm:grid-cols-2 gap-12">
                {skillCategories.map((category, catIndex) => (
                  <ScrollReveal key={category.title} delay={catIndex * 0.1} direction="up">
                    <div>
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                        <span className="text-primary">{category.icon}</span>
                        <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                          {category.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="font-body text-sm px-4 py-2 bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-card relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="font-body text-sm tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Education
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-16">Academic Background</h2>
          </ScrollReveal>

          <div className="space-y-16">
            {education.map((edu, index) => (
              <ScrollReveal key={edu.school} delay={index * 0.15}>
                <motion.div whileHover={{ x: 8 }} className="grid md:grid-cols-2 gap-12 group">
                  <div>
                    <h3 className="font-display text-3xl mb-2 group-hover:text-primary transition-colors duration-300">
                      {edu.school}
                    </h3>
                    <p className="font-body text-lg text-muted-foreground mb-1">{edu.degree}</p>
                    <p className="font-body text-sm text-muted-foreground/60">
                      {edu.period} • {edu.location}
                    </p>
                  </div>
                  <div>
                    {edu.gpa && (
                      <div className="mb-6">
                        <span className="font-display text-5xl text-primary">{edu.gpa}</span>
                        <span className="font-body text-sm text-muted-foreground ml-2">GPA</span>
                      </div>
                    )}
                    <div className="mb-4">
                      <span className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-3">
                        Relevant Coursework
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span key={course} className="font-body text-sm px-3 py-1 bg-background border border-border">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    {edu.achievements && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {edu.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="font-body text-sm px-3 py-1 bg-primary/10 text-primary border border-primary/30"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Certifications */}
      <section className="px-6 md:px-12 lg:px-24 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="font-body text-sm tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Beyond Code
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-16">Leadership & Certifications</h2>
          </ScrollReveal>

          <div className="space-y-0">
            {leadership.map((item, index) => (
              <ScrollReveal key={item.org} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex flex-col md:flex-row md:items-start justify-between py-8 border-b border-border group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-2xl group-hover:text-primary transition-colors duration-300 mb-1">
                      {item.role}
                    </h3>
                    <p className="font-body text-muted-foreground mb-2">{item.org}</p>
                    <p className="font-body text-sm text-muted-foreground/70">{item.description}</p>
                  </div>
                  <span className="font-body text-sm text-muted-foreground mt-4 md:mt-0 px-4 py-2 bg-card border border-border">
                    {item.year}
                  </span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
