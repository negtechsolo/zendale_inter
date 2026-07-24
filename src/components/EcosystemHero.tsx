import { Suspense, lazy, useCallback, useEffect, useId, useState } from "react";
import { supportsWebGL, useIsMobile, usePrefersReducedMotion } from "../lib/hooks";

const EcosystemScene = lazy(() => import("../three/EcosystemScene"));

interface NetworkGraphicProps {
  animated?: boolean;
}

function NetworkGraphic({ animated = false }: NetworkGraphicProps) {
  const gradientId = useId().replace(/:/g, "");
  const pathId = useId().replace(/:/g, "");

  const facilities = [
    [185, 105],
    [285, 105],
    [365, 150],
    [290, 205],
    [185, 270],
    [255, 270],
    [325, 270],
    [390, 270],
  ];

  const pillars = [
    [120, 105],
    [440, 105],
    [120, 270],
    [440, 270],
    [240, 188],
    [320, 188],
  ];

  return (
    <svg
      viewBox="78 66 404 244"
      className="h-full w-full"
      role="img"
      aria-label="The Zendale healthcare network arranged as the Zendale Z"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="52%">
          <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0B1B33" stopOpacity="0" />
        </radialGradient>
        <path id={pathId} d="M120 105 H440 L120 270 H440" />
        <filter id={`${gradientId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="280" cy="188" rx="195" ry="118" fill={`url(#${gradientId})`} />

      <g fill="none" stroke="#6E93C9" strokeWidth="1.5">
        <path d="M120 105 H440 L120 270 H440" strokeOpacity="0.72" />
        <path d="M280 188 L120 105 M280 188 L440 105 M280 188 L120 270 M280 188 L440 270" strokeOpacity="0.24" />
      </g>

      {facilities.map(([x, y], index) => (
        <g key={`facility-${index}`} transform={`translate(${x} ${y})`}>
          <circle r="10" fill="#0B1B33" stroke="#78A2DC" strokeWidth="2" />
          <circle r="3.6" fill="#BBD5F7" />
          {animated && (
            <circle r="10" fill="none" stroke="#78A2DC" strokeWidth="1.2" opacity="0.42">
              <animate attributeName="r" values="10;15;10" dur={`${3.2 + index * 0.17}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.42;0;0.42" dur={`${3.2 + index * 0.17}s`} repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}

      {pillars.map(([x, y], index) => (
        <g key={`pillar-${index}`} transform={`translate(${x} ${y})`} filter={`url(#${gradientId}-glow)`}>
          <rect x="-9" y="-9" width="18" height="18" fill="none" stroke="#E0B26E" strokeWidth="1.8" transform="rotate(45)" />
          <circle r="3.5" fill="#E0B26E" />
        </g>
      ))}

      {animated && (
        <>
          <circle r="4" fill="#E0B26E" filter={`url(#${gradientId}-glow)`}>
            <animateMotion dur="6.8s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
          <circle r="3" fill="#9BC2F5" filter={`url(#${gradientId}-glow)`}>
            <animateMotion dur="8.4s" begin="-3.1s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </>
      )}

    </svg>
  );
}

/** Mounts with the 3D scene, so it fires exactly when the scene is on screen. */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

export function EcosystemHero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  /*
   * The 3D scene is a 890 kB download that has to be parsed and compiled on
   * the main thread. Starting it while the page is still hydrating made the
   * whole page stall, so it is deferred until the browser reports itself
   * idle. The SVG below is on screen the entire time, so there is nothing to
   * wait for and nothing visibly changes hands.
   */
  const [readyFor3D, setReadyFor3D] = useState(false);
  useEffect(() => {
    if (mobile || reduced) return;
    const idle =
      (window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 700));
    const handle = idle(() => setReadyFor3D(true), { timeout: 2500 });
    return () => {
      const cancel = (window as unknown as { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (cancel) cancel(handle as number);
      else clearTimeout(handle as number);
    };
  }, [mobile, reduced]);

  const show3D = !mobile && webgl === true && readyFor3D;

  /* True only once the 3D chunk has loaded and the scene has actually
     mounted. Until then the SVG is the thing on screen. */
  const [sceneMounted, setSceneMounted] = useState(false);
  const handleSceneReady = useCallback(() => setSceneMounted(true), []);

  return (
    <div className="relative h-full w-full overflow-hidden" role="group" aria-label="Interactive Zendale healthcare ecosystem">
      {/*
        The SVG network is the base layer. It ships in the pre-built HTML and
        never unmounts, so the graphic is on screen immediately and cannot
        vanish while the 3D chunk downloads. Once the 3D scene has actually
        mounted the SVG fades out beneath it — it must not stay visible, or
        both drawings show at once and every node appears doubled.
      */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          sceneMounted ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={sceneMounted || undefined}
      >
        <NetworkGraphic animated={!reduced && !sceneMounted} />
      </div>

      {show3D && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SceneReady onReady={handleSceneReady} />
            <EcosystemScene
              reduced={reduced}
              mobile={false}
              onHoverLabel={setLabel}
            />
          </Suspense>
        </div>
      )}

      {!mobile && (
        <div
          className={`pointer-events-none absolute bottom-5 right-5 z-10 max-w-[16rem] border border-brass/45 bg-ink/90 px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-porcelain backdrop-blur-sm transition-all duration-200 ${
            label ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
          role="status"
          aria-live="polite"
        >
          {label ?? ""}
        </div>
      )}
    </div>
  );
}
