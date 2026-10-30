import type { RelationshipLogo } from "../data/networkRelationships";
import { FacilityLogo } from "./FacilityLogo";

export function RelationshipLogoRow({ id, title, logos, direction = "left" }: {
  id: string;
  title: string;
  logos: RelationshipLogo[];
  direction?: "left" | "right";
}) {
  return (
    <div className="relationship-row" role="region" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto mb-4 max-w-7xl px-5 lg:px-8">
        <h3 id={`${id}-heading`} className="font-display text-xl leading-tight text-ink sm:text-2xl">{title}</h3>
      </div>
      <div className="relationship-marquee" tabIndex={0} aria-label={`${title}: focus or hover to pause`}>
        <div className="relationship-track" data-direction={direction} style={{ animationDuration: `${logos.length * 6}s` }}>
          {[0, 1].map(copy => (
            <ul key={copy} className="relationship-logo-group" aria-hidden={copy === 1 ? true : undefined} aria-label={copy === 0 ? title : undefined}>
              {logos.map(logo => (
                <li key={logo.name} className="flex h-24 w-40 shrink-0 items-center justify-center bg-white px-5 py-3 sm:h-28 sm:w-48" title={logo.name}>
                  <FacilityLogo src={`/images/${logo.image}`} alt={copy === 0 ? logo.name : ""} sizes="152px" className="max-h-20 max-w-full object-contain" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
