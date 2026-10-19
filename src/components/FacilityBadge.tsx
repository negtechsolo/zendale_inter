import type { Facility } from "../data/facilities";
import { FacilityLogo } from "./FacilityLogo";

/** A consistent, small logo inset from the top-right edge of the photograph. */
export function FacilityBadge({ facility, compact = false, eager = false }: {
  facility: Facility;
  compact?: boolean;
  eager?: boolean;
}) {
  if (!facility.logo || facility.logoOnly) return null;
  return (
    <div className={`pointer-events-none absolute right-3 top-3 z-10 flex items-center justify-center border border-ink/10 bg-white/95 px-3 py-2 shadow-sm ${compact ? "h-12 w-24" : "h-14 w-28 sm:h-16 sm:w-36"}`}>
      <FacilityLogo
        src={facility.logo}
        alt={facility.logoAlt ?? `${facility.name} logo`}
        sizes={compact ? "96px" : "144px"}
        eager={eager}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
