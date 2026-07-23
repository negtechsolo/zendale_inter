import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "rise" = fade + 12px rise. "sweep" = enter along the Z-stroke diagonal. */
  variant?: "rise" | "sweep";
}

/** The site's only scroll animation: restrained, staggered, reduced-motion aware. */
export function Reveal({ children, delay = 0, className, variant = "rise" }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  const from =
    variant === "sweep"
      ? { opacity: 0, x: -18, y: 5 } // along the 14° Z-stroke direction
      : { opacity: 0, y: 12 };
  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
