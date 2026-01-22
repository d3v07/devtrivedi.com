import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [topLine, setTopLine] = useState("Dev");
  const [bottomLine, setBottomLine] = useState("Dev");
  const [showTrivedi, setShowTrivedi] = useState(true);

  useEffect(() => {
    if (hasAnimated) return;

    // Check reduced motion preference on client
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setTopLine("Software");
      setBottomLine("Developer");
      setShowTrivedi(false);
      setHasAnimated(true);
      return;
    }

    const startTimer = setTimeout(() => {
      setShowTrivedi(false);

      // Typewriter for bottom line: Dev -> Developer
      const developerSuffix = "eloper";
      let devIndex = 0;
      const devInterval = setInterval(() => {
        if (devIndex < developerSuffix.length) {
          setBottomLine("Dev" + developerSuffix.slice(0, devIndex + 1));
          devIndex++;
        } else {
          clearInterval(devInterval);
        }
      }, 80);

      // Start top line typewriter after bottom completes
      setTimeout(() => {
        const softwareText = "Software";
        let softIndex = 0;
        setTopLine("");
        const softInterval = setInterval(() => {
          if (softIndex < softwareText.length) {
            setTopLine(softwareText.slice(0, softIndex + 1));
            softIndex++;
          } else {
            clearInterval(softInterval);
            setHasAnimated(true);
          }
        }, 80);
      }, developerSuffix.length * 80 + 200);

    }, 1000);

    return () => clearTimeout(startTimer);
  }, [hasAnimated]);

  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 py-8 selection-accent">
      {/* Top bar */}
      <header className="flex justify-between items-center">
        <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">Portfolio / 2026</span>
        <nav className="flex gap-6">
          <a
            href="https://github.com/d3v07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/devtrivedi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:trivedidev16@gmail.com"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl">
        <p className="font-body text-sm tracking-widest uppercase text-primary mb-4">Software Engineer</p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight mb-8">
          <span>{topLine || "\u00A0"}</span>
          <br />
          <AnimatePresence mode="wait">
            {showTrivedi ? (
              <motion.span
                key="trivedi"
                className="text-stroke"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ display: "inline-block", overflow: "hidden" }}
              >
                Trivedi
              </motion.span>
            ) : (
              <motion.span
                key="developer"
                className="text-stroke"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bottomLine}
              </motion.span>
            )}
          </AnimatePresence>
        </h1>

        <div className="max-w-md ml-auto mr-0 md:mr-24">
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Building <span className="highlight">scalable systems</span> and cloud-native applications. MS Computer
            Science @ NJIT with a focus on full-stack development and cloud tecnologies.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end">
        <a
          href="#work"
          className="flex items-center gap-2 font-body text-sm tracking-widest uppercase hover:text-primary transition-colors group"
        >
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          Scroll to explore
        </a>

        <span className="font-body text-sm text-muted-foreground">Based in New York City, New York 🗽 USA 🇺🇸</span>
      </div>
    </section>
  );
};

export default Hero;
