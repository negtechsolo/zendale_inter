import { Suspense, lazy, useEffect, useState } from "react";
import { supportsWebGL, useIsMobile, usePrefersReducedMotion } from "../lib/hooks";

const EcosystemScene = lazy(() => import("../three/EcosystemScene"));

/**
 * The 3D "Zendale Ecosystem" with a designed poster fallback:
 * used when WebGL is unavailable, and shown while the three.js
 * chunk lazy-loads. The poster is the same constellation, static.
 */
function Poster() {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="The Zendale ecosystem: eight facilities and five capability pillars connected as one network">
      <g stroke="#4A6FA5" strokeOpacity="0.35" strokeWidth="1">
        <path d="M400 300 220 190 M400 300 580 180 M400 300 640 340 M400 300 560 460 M400 300 250 470 M400 300 160 330 M220 190 580 180 M580 180 640 340 M640 340 560 460 M560 460 250 470 M250 470 160 330 M160 330 220 190" />
        <path d="M400 300 330 240 M400 300 470 250 M400 300 460 360 M400 300 340 360 M330 240 470 250 M470 250 460 360 M460 360 340 360 M340 360 330 240" strokeOpacity="0.55" />
      </g>
      {[
        [220, 190], [580, 180], [640, 340], [560, 460], [250, 470], [160, 330], [700, 240], [120, 440],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#4A6FA5" />
      ))}
      {[
        [330, 240], [470, 250], [460, 360], [340, 360], [400, 210],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 6} y={y - 6} width="12" height="12" fill="none" stroke="#C89B5A" strokeWidth="1.5" transform={`rotate(45 ${x} ${y})`} />
      ))}
      <circle cx="400" cy="300" r="9" fill="#C89B5A" />
    </svg>
  );
}

export function EcosystemHero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => setWebgl(supportsWebGL()), []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {webgl ? (
        <Suspense fallback={<Poster />}>
          <EcosystemScene reduced={reduced} mobile={mobile} />
        </Suspense>
      ) : (
        <Poster />
      )}
    </div>
  );
}
