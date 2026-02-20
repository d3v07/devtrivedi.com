import { ArrowRight, Github, Linkedin, Mail, MapPin, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/sections/Footer";
import { useApp } from "@/context/AppContext";

const Home = () => {
  const { experience } = useApp();
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [topLine, setTopLine] = useState("Dev");
  const [bottomLine, setBottomLine] = useState("Trivedi");
  const [topOutlined, setTopOutlined] = useState(false);
  const [bottomOutlined, setBottomOutlined] = useState(true);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const runLoop = () => {
      setTopLine("Dev");
      setBottomLine("Trivedi");
      setTopOutlined(false);
      setBottomOutlined(true);
      animationRef.current = window.setTimeout(() => {
        setTopLine("Software");
        setBottomLine("Developer");
        setTopOutlined(true);
        setBottomOutlined(false);
        animationRef.current = window.setTimeout(runLoop, 4000);
      }, 4000);
    };
    const init = window.setTimeout(runLoop, 1500);
    return () => {
      window.clearTimeout(init);
      if (animationRef.current) window.clearTimeout(animationRef.current);
    };
  }, [prefersReducedMotion]);

  const metrics = [
    { num: "01", value: "4.0 GPA", context: "MS Computer Science, NJIT" },
    { num: "02", value: "$18K saved", context: "AI cost optimization — SpendLens" },
    { num: "03", value: "3× throughput", context: "Sub-second writes at peak — PulseOps" },
    { num: "04", value: "20+ tenants", context: "Multi-tenant SaaS — VendorFlow" },
    { num: "05", value: "1.5+ years", context: "Professional software engineering" },
    { num: "06", value: "30+ projects", context: "Developed, deployed, scaled" },
  ];

  const featured = [
    { name: "PulseOps.go", category: "Event-Driven Monitoring", num: "01", impact: "Sub-second writes at 3× peak" },
    { name: "SpendLens.py", category: "AI Cost Optimization", num: "02", impact: "$18K annual savings" },
    { name: "VendorFlow.ts", category: "Multi-tenant SaaS", num: "03", impact: "20+ tenants, 2K+ invoices" },
  ];

  const bedtime = [
    { tag: "Cost Engineering", title: "How I Cut AWS Costs by $18K Without Removing a Single Feature", time: "4 min read", href: "/blog/cutting-aws-costs-18k" },
    { tag: "SaaS Architecture", title: "Building Multi-Tenant SaaS in One Sprint: What Actually Happened", time: "6 min read", href: "/blog/multi-tenant-saas-one-sprint" },
    { tag: "Observability", title: "Real-Time Monitoring: Because Your Database Should Tell You When It's Dying", time: "5 min read", href: "/blog/real-time-monitoring-database" },
    { tag: "Systems Design", title: "Five Things I Learned About Distributed Systems That No Textbook Told Me", time: "7 min read", href: "/blog/distributed-systems-lessons" },
    { tag: "Student Life", title: "What NJIT's MS Computer Science Actually Teaches You (Versus What You Expect)", time: "5 min read", href: "/blog/cs-grad-school-reality" },
  ];

  return (
    <main className="min-h-screen selection-accent">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 ${experience === "os" ? "pt-10" : "pt-28"} pb-16`}>
        <div className="max-w-6xl mx-auto w-full">

          {/* Visitor counter — PostHog humor */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-8">
            <span className="font-mono-code text-[11px] text-muted-foreground border border-border/60 px-2 py-1">
              Visitor #{(3_847_291).toLocaleString()} (probably)
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: main content */}
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="font-mono-code text-xs tracking-widest uppercase text-primary mb-5 flex items-center gap-2"
              >
                <span className="w-5 h-px bg-primary" />
                software engineer
              </motion.p>

              {/* Giant animated name */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="font-display text-[4.5rem] md:text-[7.5rem] lg:text-[9rem] leading-[0.88] tracking-tight mb-6 h-[2em]"
              >
                <span className="block h-[1em] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={topLine}
                      className={topOutlined ? "text-stroke" : ""}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {topLine || "\u00A0"}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block h-[1em] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={bottomLine}
                      className={bottomOutlined ? "text-stroke" : ""}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {bottomLine || "\u00A0"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>

              {/* Terminal CTA line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
                className="mb-8 inline-flex items-center gap-3 bg-foreground text-background px-4 py-2.5 border-2 border-foreground hard-shadow-primary"
              >
                <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
                <code className="font-mono-code text-sm">$ hire dev --start=asap --domain=systems --remote=yes</code>
                <span className="font-mono-code text-primary cursor-blink select-none">|</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.33 }}
                className="font-body text-base text-muted-foreground leading-relaxed max-w-lg mb-10"
              >
                Building scalable systems and cloud-native applications. MS Computer Science @ NJIT.
                Focus on full-stack development, AWS, and things that actually ship.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 font-body text-sm px-6 py-3 bg-foreground text-background border-2 border-foreground neo-btn-primary"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 bg-background border-2 border-foreground neo-btn"
                >
                  Get in Touch
                </Link>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3"
              >
                {[
                  { href: "https://github.com/d3v07", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/trivedi-dev", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:trivedidev16@gmail.com", icon: Mail, label: "Email" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-transparent text-muted-foreground"
                    aria-label={s.label}
                    whileHover={{ scale: 1.12, borderColor: "hsl(var(--foreground))", color: "hsl(var(--foreground))" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <s.icon className="w-4 h-4" />
                  </motion.a>
                ))}
                <span className="h-4 w-px bg-border mx-1" />
                <span className="flex items-center gap-1.5 font-mono-code text-[11px] text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  New Jersey, USA
                </span>
              </motion.div>
            </div>

            {/* Right: stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="lg:col-span-4 space-y-3 pt-2"
            >
              {[
                { value: "4.0", label: "GPA at NJIT" },
                { value: "1.5+", label: "Years Experience" },
                { value: "30+", label: "Projects Shipped" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="p-5 border-2 border-foreground bg-card interactive-card"
                  whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <span className="font-display text-5xl text-primary block">{stat.value}</span>
                  <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTEXT STRIP ──────────────────────────────────────────────── */}
      <section className="py-6 px-6 md:px-12 lg:px-24 border-t-2 border-b-2 border-foreground section-alt">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
          {[
            { tag: "Currently", title: "MS Computer Science", sub: "NJIT Ying Wu College of Computing" },
            { tag: "Previously", title: "Software Engineer", sub: "RR Enterprise · Nuance Media" },
            { tag: "Building with", title: "Full-Stack & Cloud", sub: "AWS · React · Node.js · C++ · PostgreSQL" },
          ].map((item, i) => (
            <ScrollReveal key={item.tag} delay={i * 0.07} direction="up">
              <div className={`py-6 ${i > 0 ? "md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
                <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-2">{item.tag}</span>
                <p className="font-display text-xl mb-1">{item.title}</p>
                <p className="font-body text-sm text-muted-foreground">{item.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-3">
                  Featured Work
                </span>
                <h2 className="font-display text-4xl md:text-5xl">Recent Projects</h2>
              </div>
              <Link to="/projects" className="group font-body text-sm flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                View all <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1} direction="up">
                <motion.div
                  className="group border-2 border-foreground bg-card interactive-card"
                  whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0px hsl(var(--foreground))" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <Link to="/projects" className="block p-5">
                    <span className="font-mono-code text-[11px] text-muted-foreground block mb-3">{p.name}</span>
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">{p.category}</span>
                    <p className="font-display text-xl group-hover:text-primary transition-colors mb-2">{p.name.split(".")[0]}</p>
                    <p className="font-body text-sm text-muted-foreground">{p.impact}</p>
                    <div className="mt-4 font-body text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open slides <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS TABLE ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-6 md:px-12 lg:px-24 section-alt border-t-2 border-b-2 border-foreground">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-8">By the numbers</span>
            <div className="border-2 border-foreground hard-shadow-lg">
              {metrics.map((m, i) => (
                <div
                  key={m.num}
                  className={`flex items-center gap-6 px-6 py-4 ${i < metrics.length - 1 ? "border-b border-border/20" : ""} ${i % 2 === 0 ? "bg-card" : "bg-background"} hover:bg-primary/5 transition-colors duration-150`}
                >
                  <span className="font-mono-code text-xs text-muted-foreground w-6 shrink-0">{m.num}</span>
                  <span className="font-display text-2xl text-primary w-44 shrink-0">{m.value}</span>
                  <span className="font-body text-sm text-muted-foreground">{m.context}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── SHAMELESS PITCH ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative border-2 border-foreground p-10 md:p-14 hard-shadow-lg">
              <span className="absolute -top-3 left-6 bg-background px-2 font-mono-code text-xs text-muted-foreground">
                shameless pitch — we know.
              </span>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
                    We could write something here about how you <em>really</em> should hire Dev...
                  </h2>
                  <p className="font-body text-muted-foreground text-base leading-relaxed mb-2">
                    ...and this is incredibly important and your competitors already have and blah blah blah.
                  </p>
                  <p className="font-body text-foreground text-base font-semibold">
                    But honestly: he builds real things that work at scale.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "4.0 GPA — because precision matters",
                    "Open source contributor",
                    "Ships things. Actually ships them.",
                    "Has opinions on distributed systems (you want this)",
                    "Available now",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 shrink-0 font-mono-code text-sm">→</span>
                      <span className="font-body text-sm">{point}</span>
                    </div>
                  ))}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 mt-4 font-body text-sm px-5 py-2.5 bg-primary text-primary-foreground border-2 border-primary neo-btn"
                  >
                    Hire Dev →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── THE BLOG ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-6 md:px-12 lg:px-24 border-t-2 border-foreground section-alt">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono-code text-xs tracking-widest uppercase text-muted-foreground block mb-1">The Blog</span>
            <p className="font-body text-xs text-muted-foreground mb-8">Technical writing from the trenches.</p>
            <div className="border-2 border-foreground hard-shadow">
              {bedtime.map((item, i) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center justify-between p-5 hover:bg-primary/5 transition-colors duration-150 group ${i < bedtime.length - 1 ? "border-b border-border/20" : ""}`}
                >
                  <div>
                    <span className="font-mono-code text-xs text-primary block mb-1">{item.tag}</span>
                    <p className="font-body text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-6">
                    <span className="font-mono-code text-xs text-muted-foreground hidden md:block">{item.time}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Link to="/blog" className="font-mono-code text-xs text-primary hover:underline flex items-center gap-1 justify-end">
                All posts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-foreground text-background border-t-2 border-foreground">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-3 leading-tight">
                Currently open to new opportunities.
              </h2>
              <p className="font-body text-base opacity-60 max-w-lg">
                Let's build something. Or at the very least, have a good conversation about distributed systems.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 font-body text-sm px-8 py-4 bg-primary text-primary-foreground border-2 border-primary neo-btn-invert"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
};

export default Home;
