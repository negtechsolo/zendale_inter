import { Suspense, lazy, useEffect, useState } from "react";
import { supportsWebGL, useIsMobile, usePrefersReducedMotion } from "../lib/hooks";

const EcosystemScene = lazy(() => import("../three/EcosystemScene"));

/**
 * The 3D "Zendale Ecosystem" with a designed poster fallback:
 * used when WebGL is unavailable, and shown while the three.js
 * chunk lazy-loads. The poster is the same Z letterform, static.
 */
function Poster() {
  // Node coordinates trace the Z exactly as the 3D scene assembles it.
  const facilities: [number, number][] = [
    [345, 160], [485, 160],            // top stroke
    [505, 250], [325, 350],            // diagonal
    [280, 440], [360, 440], [440, 440], [500, 440], // bottom stroke
  ];
  const pillarCorners: [number, number][] = [
    [250, 160], [550, 160], [250, 440], [560, 440], // corners
  ];
  const centre: [number, number] = [405, 300];
  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      role="img"
      aria-label="The Zendale ecosystem: eight facilities and five capability pillars assembled into the Zendale Z"
    >
      <g stroke="#4A6FA5" strokeOpacity="0.5" strokeWidth="1.2" fill="none">
        <path d="M250 160 H550 L250 440 H560" />
        <path d="M405 300 250 160 M405 300 550 160 M405 300 250 440 M405 300 560 440" strokeOpacity="0.25" />
      </g>
      {facilities.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#4A6FA5" />
      ))}
      {pillarCorners.map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y - 7} width="14" height="14" fill="none" stroke="#C89B5A" strokeWidth="1.6" transform={`rotate(45 ${x} ${y})`} />
      ))}
      <circle cx={centre[0]} cy={centre[1]} r="9" fill="#C89B5A" />
      <ellipse cx="400" cy="300" rx="270" ry="120" fill="none" stroke="#C89B5A" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 7" />
    </svg>
  );
}

export function EcosystemHero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => setWebgl(supportsWebGL()), []);

  return (
    <div className="absolute inset-0">
      <div aria-hidden="true" className="absolute inset-0">
        {webgl ? (
          <Suspense fallback={<Poster />}>
            <EcosystemScene reduced={reduced} mobile={mobile} onHoverLabel={setLabel} />
          </Suspense>
        ) : (
          <Poster />
        )}
      </div>
      {/* HUD label: the hovered node's mono identity, pinned like an instrument readout */}
      <div
        className={`pointer-events-none absolute right-5 top-24 z-10 border border-brass/50 bg-ink/85 px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-porcelain transition-opacity duration-200 lg:right-8 lg:top-28 ${
          label ? "opacity-100" : "opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {label ?? ""}
      </div>
    </div>
  );
}
