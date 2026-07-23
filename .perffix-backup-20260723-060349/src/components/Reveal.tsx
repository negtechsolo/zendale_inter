import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "rise" = fade + 12px rise. "sweep" = enter along the Z-stroke diagonal. */
  variant?: "rise" | "sweep";
}

/**
 * The site's only scroll animation.
 *
 * This used to be a framer-motion component, which meant every revealed
 * element was pre-rendered with `opacity: 0` and stayed invisible until the
 * JavaScript bundle had downloaded, hydrated and mounted an animation
 * controller for each one — 51 of them on the homepage alone. Text that is
 * present in the HTML but invisible for two seconds is worse than text that
 * arrives late, so the animation is now plain CSS driven by a single shared
 * IntersectionObserver that starts working the moment the HTML is parsed.
 *
 * Without JavaScript, or if anything fails, the content is simply visible.
 * The visual result — a 600ms fade and rise, staggered by `delay` — is
 * unchanged. See the inline bootstrap script in index.html.
 */
export function Reveal({ children, delay = 0, className, variant = "rise" }: RevealProps) {
  const classes = [
    "z-reveal",
    variant === "sweep" ? "z-reveal--sweep" : "z-reveal--rise",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={delay ? ({ "--z-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
