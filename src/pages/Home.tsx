import { ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/sections/Footer";

const Home = () => {
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Animation state
  const [topLine, setTopLine] = useState("Dev");
  const [bottomLine, setBottomLine] = useState("Trivedi");
  const [topOutlined, setTopOutlined] = useState(false); // Dev = filled, Software = outlined
  const [bottomOutlined, setBottomOutlined] = useState(true); // Trivedi = outlined, Developer = filled
  const [phase, setPhase] = useState<"stateA" | "transitionAB" | "stateB" | "transitionBA">("stateA");
  const animationRef = useRef<number | null>(null);
  const intervalsRef = useRef<number[]>([]);

  // Typewriter helper
  const typeText = (
    target: string,
    setter: (val: string) => void,
    startFrom: string,
    speed: number,
    onComplete: () => void,
  ) => {
    let index = startFrom.length;
    setter(startFrom);
    const interval = window.setInterval(() => {
      if (index < target.length) {
        setter(target.slice(0, index + 1));
        index++;
      } else {
        window.clearInterval(interval);
        onComplete();
      }
    }, speed);
    intervalsRef.current.push(interval);
  };

  // Erase helper
  const eraseText = (
    current: string,
    stopAt: string,
    setter: (val: string) => void,
    speed: number,
    onComplete: () => void,
  ) => {
    let len = current.length;
    const interval = window.setInterval(() => {
      if (len > stopAt.length) {
        len--;
        setter(current.slice(0, len));
      } else {
        window.clearInterval(interval);
        onComplete();
      }
    }, speed);
    intervalsRef.current.push(interval);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const clearAllIntervals = () => {
      intervalsRef.current.forEach((i) => window.clearInterval(i));
      intervalsRef.current = [];
    };

    // Much slower, calmer animation - just smooth crossfades
    const runLoop = () => {
      // State A: Dev / Trivedi - hold 4s
      setPhase("stateA");
      setTopLine("Dev");
      setBottomLine("Trivedi");
      setTopOutlined(false);
      setBottomOutlined(true);

      animationRef.current = window.setTimeout(() => {
        // Smooth transition to State B
        setPhase("transitionAB");
        setTopLine("Software");
        setBottomLine("Developer");
        setTopOutlined(true);
        setBottomOutlined(false);

        // Hold State B for 4s
        animationRef.current = window.setTimeout(() => {
          setPhase("stateB");

          // Then transition back to State A
          animationRef.current = window.setTimeout(() => {
            setPhase("transitionBA");
            setTopLine("Dev");
            setBottomLine("Trivedi");
            setTopOutlined(false);
            setBottomOutlined(true);

            // Loop back after 4s
            animationRef.current = window.setTimeout(() => {
              runLoop();
            }, 4000);
          }, 4000);
        }, 100);
      }, 4000);
    };

    // Start after 2s delay
    const initialDelay = window.setTimeout(() => {
      runLoop();
    }, 2000);

    return () => {
      window.clearTimeout(initialDelay);
      if (animationRef.current) window.clearTimeout(animationRef.current);
      clearAllIntervals();
    };
  }, [prefersReducedMotion]);
  return (
    <main className="min-h-screen relative overflow-hidden cursor-none">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 relative">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content */}
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-body text-sm tracking-widest uppercase text-primary mb-6 flex items-center gap-2"
              >
                <span className="w-8 h-px bg-primary" />
                Software Engineer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-[8rem] leading-[0.85] tracking-tight mb-8 h-[2em] md:h-[2em]"
              >
                <span className="block h-[1em] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={topLine}
                      className={topOutlined ? "text-stroke" : ""}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {bottomLine || "\u00A0"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="max-w-lg mb-12"
              >
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Building <span className="highlight">scalable systems</span> and cloud-native applications. MS
                  Computer Science @ NJIT with a focus on
                  <span className="highlight"> full-stack development </span> and AWS.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <MagneticButton strength={0.2}>
                  <Link
                    to="/projects"
                    className="group inline-flex items-center gap-2 font-body text-sm px-6 py-3 bg-foreground text-background hover:bg-primary transition-all duration-500"
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                  >
                    Get in Touch
                  </Link>
                </MagneticButton>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-6"
              >
                {[
                  { href: "https://github.com/d3v07", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/trivedi-dev", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:trivedidev16@gmail.com", icon: Mail, label: "Email" },
                ].map((social) => (
                  <MagneticButton key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                ))}
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  New Jersey, USA
                </span>
              </motion.div>
            </div>

            {/* Stats sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:col-span-4 space-y-6"
            >
              {[
                { value: "4.0", label: "GPA at NJIT", delay: 0 },
                { value: "1.5+", label: "Years of Experience", delay: 0.1 },
                { value: "30+", label: "Projects Developed, Deployed & Scaled", delay: 0.2 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + stat.delay }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500"
                >
                  <span className="font-display text-5xl text-primary">{stat.value}</span>
                  <p className="font-body text-sm text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick highlights */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { tag: "Currently", title: "MS Computer Science", subtitle: "NJIT Ying Wu College of Computing" },
              { tag: "Previously", title: "Software Engineer", subtitle: "RR Enterprise • Nuance Media" },
              {
                tag: "Focus Areas",
                title: "Full-Stack & Cloud",
                subtitle: "AWS • React • Node.js • C++ • PostgreSQL • Azure ",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.tag} delay={index * 0.1} direction="up">
                <div className="group">
                  <span className="font-body text-xs tracking-widest uppercase text-primary block mb-3">
                    {item.tag}
                  </span>
                  <p className="font-display text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects preview */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="font-body text-sm tracking-widest uppercase text-primary block mb-4">
                  Featured Work
                </span>
                <h2 className="font-display text-4xl md:text-5xl">Recent Projects</h2>
              </div>
              <MagneticButton strength={0.3}>
                <Link
                  to="/projects"
                  className="group font-body text-sm flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  View all
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "PulseOps",
                category: "Event-Driven Monitoring",
                num: "01",
                desc: "Sub-second writes at 3x peak",
              },
              { name: "SpendLens", category: "AI Cost Optimization", num: "02", desc: "$18K annual savings" },
              { name: "VendorFlow", category: "Multi-tenant SaaS", num: "03", desc: "20+ tenants, 2K+ invoices" },
            ].map((project, index) => (
              <ScrollReveal key={project.name} delay={index * 0.15} direction="up">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <Link
                    to="/projects"
                    className="group block p-8 border border-border hover:border-primary bg-card/30 hover:bg-card transition-all duration-500"
                  >
                    <span className="font-display text-6xl text-muted/20 group-hover:text-primary/30 transition-colors duration-500 block mb-4">
                      {project.num}
                    </span>
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl group-hover:text-primary transition-colors duration-300 flex items-center gap-2 mb-2">
                      {project.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">{project.desc}</p>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-foreground text-background relative overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-8 h-8 mx-auto mb-6 text-primary" />
              <h2 className="font-display text-4xl md:text-6xl mb-6">Let's work together</h2>
              <p className="font-body text-lg opacity-70 max-w-xl mx-auto mb-10">
                Currently open to new opportunities. Let's build something exceptional.
              </p>
              <MagneticButton strength={0.2}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 font-body text-sm px-10 py-4 bg-primary text-primary-foreground hover:scale-105 transition-all duration-300"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
};

export default Home;
