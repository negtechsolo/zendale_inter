import { useState } from "react";
import type { RelationshipLogo } from "../data/networkRelationships";
import { FacilityLogo } from "./FacilityLogo";

export function RelationshipLogoRow({ id, title, description, logos }: {
  id: string;
  title: string;
  description: string;
  logos: RelationshipLogo[];
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relationship-row" role="region" aria-labelledby={`${id}-heading`}>
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h3 id={`${id}-heading`} className="font-display text-2xl leading-tight text-ink">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-carbon/75">{description}</p>
        </div>
        <button type="button" aria-pressed={paused} aria-label={`${paused ? "Resume" : "Pause"} ${title.toLowerCase()} logos`} onClick={() => setPaused(value => !value)} className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-ink/15 px-3 text-xs font-medium text-steel hover:border-steel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel motion-reduce:hidden">
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className="relationship-marquee" data-paused={paused}>
        <div className="relationship-track" style={{ animationDuration: `${logos.length * 6}s` }}>
          {[0, 1].map(copy => (
            <ul key={copy} className="relationship-logo-group" aria-hidden={copy === 1 ? true : undefined} aria-label={copy === 0 ? title : undefined}>
              {logos.map(logo => (
                <li key={logo.name} className="flex h-28 w-44 shrink-0 items-center justify-center border border-ink/10 bg-white p-4 sm:w-48" title={`${logo.name} · ${logo.via}`}>
                  <FacilityLogo src={`/images/${logo.image}`} alt={copy === 0 ? `${logo.name}, through ${logo.via}` : ""} sizes="176px" className="max-h-20 max-w-full object-contain" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
