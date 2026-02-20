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
import { AppProvider, useApp } from "./context/AppContext";

const queryClient = new QueryClient();

function AppShell() {
  const { experience, setExperience } = useApp();
  const isOsMode = experience === "os";

  // OS mode is desktop-only — auto-fall-back to website mode on narrow viewports
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768 && experience === "os") {
        setExperience("website");
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [experience, setExperience]);

  return (
    <>
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
    </>
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
