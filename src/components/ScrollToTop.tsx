import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { experience } = useApp();

  useEffect(() => {
    if (experience === "os") {
      // In OS mode, scrolling lives inside WindowFrame's content div
      document.querySelector("[data-window-content]")?.scrollTo({ top: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, experience]);

  return null;
};

export default ScrollToTop;
