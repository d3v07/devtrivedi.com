import { createContext, useContext, useState, ReactNode } from "react";

type Experience = "os" | "website";
export type WindowState = "normal" | "minimized" | "maximized";

interface AppContextValue {
  experience: Experience;
  setExperience: (exp: Experience) => void;
  toggleExperience: () => void;
  windowState: WindowState;
  setWindowState: (s: WindowState) => void;
  windowOpen: boolean;
  setWindowOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [experience, setExperienceState] = useState<Experience>(() => {
    try {
      const saved = localStorage.getItem("portfolio-experience");
      return (saved as Experience) || "website";
    } catch {
      return "website";
    }
  });

  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [windowOpen, setWindowOpen] = useState<boolean>(true);

  const setExperience = (exp: Experience) => {
    setExperienceState(exp);
    if (exp === "os") {
      setWindowOpen(true);
      setWindowState("normal");
    }
    try { localStorage.setItem("portfolio-experience", exp); } catch {}
  };

  const toggleExperience = () => setExperience(experience === "os" ? "website" : "os");

  return (
    <AppContext.Provider value={{ experience, setExperience, toggleExperience, windowState, setWindowState, windowOpen, setWindowOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
