import type { Pillar } from "../data/pillars";

/**
 * 2D ecosystem node emblems, the same geometric motifs the 3D scene uses,
 * drawn as fine line SVGs. These are structural marks, not decorative icons:
 * each motif is the pillar's identity across the site and the hero.
 */
export function NodeEmblem({ motif, className = "h-9 w-9" }: { motif: Pillar["motif"]; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.1 } as const;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {motif === "lattice" && (
        <g {...stroke}>
          <path d="M20 5 33 12.5 33 27.5 20 35 7 27.5 7 12.5 Z" />
          <path d="M7 12.5 20 20 33 12.5 M20 20 20 35 M7 27.5 20 20" />
        </g>
      )}
      {motif === "briefcase" && (
        <g {...stroke}>
          <rect x="7" y="13" width="26" height="19" />
          <path d="M14 13 V9 H26 V13 M7 21 H33 M20 18.5 V23.5" />
        </g>
      )}
      {motif === "circuit" && (
        <g {...stroke}>
          <rect x="11" y="11" width="18" height="18" />
          <path d="M20 5 V11 M20 29 V35 M5 20 H11 M29 20 H35 M11 11 16 16 M29 29 24 24" />
          <circle cx="20" cy="20" r="3.2" />
        </g>
      )}
      {motif === "compass" && (
        <g {...stroke}>
          <circle cx="20" cy="20" r="14" />
          <path d="M26.5 13.5 22 22 13.5 26.5 18 18 Z" />
        </g>
      )}
      {motif === "rings" && (
        <g {...stroke}>
          <circle cx="15" cy="20" r="9.5" />
          <circle cx="25" cy="20" r="9.5" />
        </g>
      )}
    </svg>
  );
}
