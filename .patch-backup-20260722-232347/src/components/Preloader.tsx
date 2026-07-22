import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/**
 * First-visit preloader: the two parallel diagonal strokes of the Z draw in,
 * then the curtain lifts. Runs once per session; skipped under reduced motion.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"draw" | "lift" | "gone">(() =>
    sessionStorage.getItem("zendale-preloaded") ? "gone" : "draw"
  );

  useEffect(() => {
    if (phase !== "draw") return;
    if (reduced) {
      sessionStorage.setItem("zendale-preloaded", "1");
      setPhase("gone");
      return;
    }
    const t1 = setTimeout(() => setPhase("lift"), 1400);
    const t2 = setTimeout(() => {
      sessionStorage.setItem("zendale-preloaded", "1");
      setPhase("gone");
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, reduced]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        phase === "lift" ? "-translate-y-full" : ""
      }`}
    >
      <svg viewBox="0 0 120 120" className="h-24 w-24">
        {/* Two parallel diagonal strokes, the logo's DNA drawing itself */}
        <path className="z-stroke" d="M22 24 H98 L38 96" fill="none" stroke="#4A6FA5" strokeWidth="10" />
        <path className="z-stroke second" d="M38 96 H98" fill="none" stroke="#C89B5A" strokeWidth="10" />
      </svg>
    </div>
  );
}
