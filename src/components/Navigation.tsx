import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

const Navigation = () => {
  const location = useLocation();
  const { setExperience } = useApp();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b-2 border-foreground">
      {/* Main nav bar */}
      <nav className="px-6 md:px-12 lg:px-16 h-14 flex items-center justify-between max-w-full">
        {/* Logo + tagline */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-display text-xl tracking-tight hover:text-primary transition-colors duration-200 shrink-0"
          >
            DT<span className="text-primary">.</span>
          </Link>
          <span className="hidden md:block h-5 w-px bg-border" />
          <span className="hidden md:block font-mono-code text-[11px] text-muted-foreground">
            Software Engineer
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-body text-sm px-4 py-1.5 block transition-all duration-150 ${
                  isActive(link.path)
                    ? "bg-foreground text-background"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* "Open to work" badge */}
          <div className="hidden md:flex items-center gap-1.5 border-2 border-foreground px-3 py-1 hard-shadow-sm mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-green-500" />
            </span>
            <span className="font-mono-code text-xs text-foreground">status: hiring</span>
          </div>

          {/* OS Mode toggle */}
          <button
            onClick={() => setExperience("os")}
            className="hidden md:flex items-center gap-1.5 font-mono-code text-xs px-3 py-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150"
            title="Switch to OS mode"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>OS Mode</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-150"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border-2 border-transparent hover:border-foreground transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Sub-tagline strip */}
      <div className="hidden md:block border-t border-foreground/15 px-6 md:px-12 lg:px-16 py-1 bg-card/40">
        <p className="font-mono-code text-[10px] text-muted-foreground tracking-wide">
          // dev trivedi — ms computer science @ njit — building systems that scale
          <span className="ml-3 text-primary">▪</span>
          <span className="ml-3">new jersey, usa</span>
        </p>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t-2 border-foreground">
          <ul className="divide-y divide-border/30">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block font-body text-base py-4 px-6 transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground hover:bg-card"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setExperience("os");
                }}
                className="w-full text-left font-body text-base py-4 px-6 text-foreground hover:bg-card flex items-center gap-2"
              >
                <Monitor className="w-4 h-4" />
                Switch to OS Mode
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
