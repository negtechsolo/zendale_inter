import { Link } from "react-router-dom";
import type { Facility } from "../data/facilities";
import { facilityProfilePath } from "../data/facilities";
import { FacilityVisual } from "./FacilityVisual";
import { FacilityBadge } from "./FacilityBadge";

export function NetworkCard({ facility }: { facility: Facility }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden border border-porcelain/15 bg-[#10233e] text-porcelain">
      <Link to={facilityProfilePath(facility.id)} aria-label={`Explore ${facility.name}`} className="relative block">
        <FacilityVisual facility={facility} fill className="aspect-[16/10] w-full" />
        <FacilityBadge facility={facility} compact />
      </Link>
      <div className="flex flex-1 flex-col items-start p-4">

        <h3 className="font-display text-lg leading-snug"><Link to={facilityProfilePath(facility.id)}>{facility.name}</Link></h3>
        <p className="mt-3 text-xs leading-relaxed text-porcelain/75">{facility.focus}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs">
          <Link to={facilityProfilePath(facility.id)} className="font-medium text-brass hover:text-porcelain">Learn More →</Link>
          {facility.url ? <a href={facility.url} target="_blank" rel="noopener noreferrer" className="text-porcelain/80 hover:text-brass">Visit Facility ↗</a> : facility.internal ? <Link to={facility.internal} className="text-porcelain/80 hover:text-brass">{facility.id === "zendale-central-store" ? "Request a Supply Quote →" : "Visit Practice →"}</Link> : null}
        </div>
      </div>
    </article>
  );
}
