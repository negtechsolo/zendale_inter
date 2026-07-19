import { Suspense, lazy, useEffect, useState } from "react";
import { supportsWebGL, useIsMobile, usePrefersReducedMotion } from "../lib/hooks";

const EcosystemScene = lazy(() => import("../three/EcosystemScene"));

/**
 * Lightweight fallback shown while the Three.js scene loads or when WebGL
 * is unavailable. It keeps the Zendale Z readable and positioned away from
 * the hero copy instead of filling the whole viewport with scattered nodes.
 */
function Poster({ mobile }: { mobile: boolean }) {
  const originX = mobile ? 400 : 790;
  const originY = mobile ? 330 : 315;
  const scale = mobile ? 0.72 : 0.92;

  const point = (x: number, y: number) => [
    originX + x * scale,
    originY + y * scale,
  ] as const;

  const facilities = [
    point(-105, -105),
    point(35, -105),
    point(132, -52),
    point(34, 35),
    point(-88, 112),
    point(-12, 112),
    point(66, 112),
    point(138, 112),
  ];

  const pillars = [
    point(-185, -105),
    point(185, -105),
    point(-185, 112),
    point(185, 112),
    point(0, 0),
  ];

  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      role="img"
      aria-label="The Zendale healthcare network assembled into the Zendale Z"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="zendale-poster-halo" cx="70%" cy="45%" r="42%">
          <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0B1B33" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="700" fill="url(#zendale-poster-halo)" />

      <g
        stroke="#6E93C9"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        fill="none"
      >
        <path
          d={`M ${pillars[0][0]} ${pillars[0][1]} H ${pillars[1][0]} L ${pillars[2][0]} ${pillars[2][1]} H ${pillars[3][0]}`}
        />
        <path
          d={`M ${pillars[4][0]} ${pillars[4][1]} L ${pillars[0][0]} ${pillars[0][1]} M ${pillars[4][0]} ${pillars[4][1]} L ${pillars[1][0]} ${pillars[1][1]} M ${pillars[4][0]} ${pillars[4][1]} L ${pillars[2][0]} ${pillars[2][1]} M ${pillars[4][0]} ${pillars[4][1]} L ${pillars[3][0]} ${pillars[3][1]}`}
          strokeOpacity="0.24"
        />
      </g>

      {facilities.map(([x, y], index) => (
        <g key={`facility-${index}`} transform={`translate(${x} ${y})`}>
          <circle r="9" fill="none" stroke="#6E93C9" strokeWidth="1.8" />
          <circle r="3.2" fill="#8FB5EA" />
        </g>
      ))}

      {pillars.map(([x, y], index) => (
        <g key={`pillar-${index}`} transform={`translate(${x} ${y})`}>
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            fill="none"
            stroke="#E0B26E"
            strokeWidth="1.8"
            transform="rotate(45)"
          />
          <circle r="3.5" fill="#E0B26E" />
        </g>
      ))}
    </svg>
  );
}

export function EcosystemHero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  const mask = mobile
    ? "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 64%, transparent 100%)"
    : "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.88) 52%, #000 72%)";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        {webgl ? (
          <Suspense fallback={<Poster mobile={mobile} />}>
            <EcosystemScene
              reduced={reduced}
              mobile={mobile}
              onHoverLabel={setLabel}
            />
          </Suspense>
        ) : (
          <Poster mobile={mobile} />
        )}
      </div>

      <div
        className={`pointer-events-none absolute bottom-7 right-5 z-10 max-w-[16rem] border border-brass/45 bg-ink/88 px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-porcelain backdrop-blur-sm transition-all duration-200 lg:bottom-9 lg:right-8 ${
          label ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {label ?? ""}
      </div>
    </div>
  );
}
