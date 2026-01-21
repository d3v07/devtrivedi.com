import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: -100,
    scale: 0.98,
  },
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
