import { Link } from "react-router-dom";
import type { Facility } from "../data/facilities";
import { facilityProfilePath } from "../data/facilities";
import { FacilityVisual } from "./FacilityVisual";
import { FacilityBadge } from "./FacilityBadge";

export function NetworkCard({ facility }: { facility: Facility }) {
  return (
    <article className="grid min-w-0 overflow-hidden border border-porcelain/15 bg-[#10233e] text-porcelain sm:grid-cols-[0.8fr_1.2fr]">
      <Link to={facilityProfilePath(facility.id)} aria-label={`Explore ${facility.name}`} className="relative block min-h-52">
        <FacilityVisual facility={facility} fill className="h-full min-h-52 w-full" />
        <FacilityBadge facility={facility} compact />
      </Link>
      <div className="flex flex-col items-start p-6">

        <h3 className="font-display text-xl leading-snug"><Link to={facilityProfilePath(facility.id)}>{facility.name}</Link></h3>
        <p className="mt-3 text-sm leading-relaxed text-porcelain/75">{facility.focus}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 text-sm">
          <Link to={facilityProfilePath(facility.id)} className="font-medium text-brass hover:text-porcelain">Learn More →</Link>
          {facility.url ? <a href={facility.url} target="_blank" rel="noopener noreferrer" className="text-porcelain/80 hover:text-brass">Visit Facility ↗</a> : facility.internal ? <Link to={facility.internal} className="text-porcelain/80 hover:text-brass">{facility.id === "zendale-central-store" ? "Request a Supply Quote →" : "Visit Practice →"}</Link> : null}
        </div>
      </div>
    </article>
  );
}
