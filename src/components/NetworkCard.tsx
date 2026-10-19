import { Link } from "react-router-dom";
import type { Facility } from "../data/facilities";
import { facilityProfilePath } from "../data/facilities";
import { FacilityVisual } from "./FacilityVisual";
import { FacilityLogo } from "./FacilityLogo";

export function NetworkCard({ facility }: { facility: Facility }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden border border-porcelain/15 bg-[#10233e] text-porcelain">
      <Link
        to={facilityProfilePath(facility.id)}
        aria-label={`Explore ${facility.name}`}
        className="relative block"
      >
        <FacilityVisual
          facility={facility}
          fill
          className="aspect-[4/3] w-full"
        />
        {facility.logo && (
          <div className="absolute bottom-2 right-2 flex h-12 w-24 items-center justify-center border border-ink/10 bg-white/95 px-2 py-1.5 shadow-sm">
            <FacilityLogo
              src={facility.logo}
              alt={facility.logoAlt ?? `${facility.name} logo`}
              sizes="96px"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">
          {facility.code}
        </p>
        <h3 className="mt-3 min-h-[4.2em] font-display text-lg leading-snug">
          <Link to={facilityProfilePath(facility.id)}>{facility.name}</Link>
        </h3>
        <p className="mt-2 min-h-[4.5em] text-sm leading-relaxed text-porcelain/75">
          {facility.focus}
        </p>
        <div className="mt-auto flex flex-col items-start gap-3 pt-6 text-sm">
          <Link
            to={facilityProfilePath(facility.id)}
            className="font-medium text-brass hover:text-porcelain"
          >
            Learn More →
          </Link>
          {facility.url ? (
            <a
              href={facility.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-porcelain/80 hover:text-brass"
            >
              Visit Facility ↗
            </a>
          ) : facility.internal ? (
            <Link
              to={facility.internal}
              className="text-porcelain/80 hover:text-brass"
            >
              {facility.id === "zendale-central-store"
                ? "Request a Supply Quote →"
                : "Visit Practice →"}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
