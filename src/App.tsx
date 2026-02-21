import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import Desktop from "./components/Desktop";
import DesktopLayer from "./components/DesktopLayer";
import WindowFrame from "./components/WindowFrame";
import ChatWidget from "./components/ChatWidget";
import { AppProvider, useApp } from "./context/AppContext";
import { sounds } from "./lib/sounds";

const queryClient = new QueryClient();

function AppShell() {
  const { experience, setExperience } = useApp();
  const isOsMode = experience === "os";

  // Mobile always gets website mode — auto-switch on resize too
  useEffect(() => {
    const check = () => { if (window.innerWidth < 768) setExperience("website"); };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [setExperience]);

  // Global click sound — plays on any button or link click across the site
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("button, a, [role='button']")) {
        sounds.click();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);


  return (
    <div data-experience={experience}>
      {/* Desktop taskbar — only visible in OS mode */}
      {isOsMode && <Desktop />}

      {/* Always-mounted wallpaper + icons — hidden in website mode */}
      <DesktopLayer visible={isOsMode} />

      {/* Window frame — macOS chrome in OS mode, passthrough in website mode */}
      <WindowFrame>
        {!isOsMode && (
          <>
            {/* Subtle grid texture */}
            <div
              className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
            <Navigation />
          </>
        )}
        <div className={isOsMode ? "" : "overflow-hidden relative z-10"}>
          <AnimatedRoutes />
        </div>
      </WindowFrame>

      {/* Sir Turing floating widget — always visible in both modes */}
      <ChatWidget />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <ScrollToTop />
          <AppShell />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
