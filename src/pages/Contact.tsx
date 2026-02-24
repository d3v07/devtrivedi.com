import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/sections/Footer";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "trivedidev16@gmail.com",
    href: "mailto:trivedidev16@gmail.com",
    note: "Best for formal inquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/trivedi-dev",
    href: "https://linkedin.com/in/trivedi-dev",
    note: "Connect professionally",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/d3v07",
    href: "https://github.com/d3v07",
    note: "See the code",
  },
];

const Contact = () => {
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
            // contact.tsx
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8"
          >
            Let's work
            <br />
            <em className="text-primary">together.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="font-body text-base text-muted-foreground max-w-lg mb-10 leading-relaxed"
          >
            Open to full-time roles, internships, and interesting collaborations.
            Based in New York City, NY — open to remote.
            I typically respond within 24 hours.
          </motion.p>

          {/* Contact link cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="grid md:grid-cols-3 gap-6 mb-0"
          >
            {contactLinks.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    opacity: { duration: 0.35, delay: 0.38 + i * 0.08 },
                    y: { duration: 0.35, delay: 0.38 + i * 0.08 },
                    x: { type: "spring", stiffness: 400, damping: 28 },
                    boxShadow: { type: "spring", stiffness: 400, damping: 28 },
                    scale: { type: "spring", stiffness: 400, damping: 28 },
                  }}
                  className="group block p-8 border-2 border-foreground bg-card interactive-card"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 border border-foreground/20 bg-background group-hover:border-primary transition-colors duration-150">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                  </div>
                  <span className="font-mono-code text-[11px] uppercase tracking-widest text-muted-foreground block mb-1">
                    {c.label}
                  </span>
                  <p className="font-body text-sm font-medium group-hover:text-primary transition-colors duration-150 mb-1 truncate">
                    {c.value}
                  </p>
                  <p className="font-body text-xs text-muted-foreground/60">{c.note}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── RESUME + STATUS ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-t-2 border-foreground section-alt">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

          {/* Resume download */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="border-2 border-foreground bg-background p-8 hard-shadow"
          >
            <FileText className="w-8 h-8 text-primary mb-5" />
            <h2 className="font-display text-2xl mb-2">Resume</h2>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
              Download my resume for a structured overview of my experience, skills, and projects.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 bg-foreground text-background border-2 border-foreground neo-btn-primary"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-2 border-foreground bg-background p-8 hard-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="font-mono-code text-xs text-green-600 dark:text-green-400 uppercase tracking-widest">
                  Available for opportunities
                </span>
              </div>

              <h2 className="font-display text-2xl mb-3">Open to work</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                Full-time roles, internships, and interesting side projects.
                New York City, NY — fully open to remote work.
              </p>

              <div className="space-y-2">
                {[
                  "Full-Stack Engineering",
                  "Cloud-Native / AWS",
                  "Backend Systems & APIs",
                  "ML / AI Engineering",
                ].map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <span className="text-primary font-mono-code text-sm">→</span>
                    <span className="font-body text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <p className="font-mono-code text-xs text-muted-foreground">
                Response time: <span className="text-foreground">≤ 24 hours</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-foreground text-background border-t-2 border-foreground">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-3 leading-tight">
              Ready to build something?
            </h2>
            <p className="font-body text-base opacity-60 max-w-lg">
              Or at the very least, have a good conversation about distributed systems.
            </p>
          </div>
          <a
            href="mailto:trivedidev16@gmail.com"
            className="shrink-0 inline-flex items-center gap-2 font-body text-sm px-8 py-4 bg-primary text-primary-foreground border-2 border-primary neo-btn-invert"
          >
            Send an email
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
