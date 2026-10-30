import { Link } from "react-router-dom";
import { facilities, facilityProfilePath } from "../data/facilities";
import { FacilityLogo } from "./FacilityLogo";

export function NetworkIdentityStrip() {
  return (
    <section aria-labelledby="network-identity-heading" className="border-b border-ink/10 bg-white px-5 py-9 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-steel">Our Healthcare Network</p>
            <h2 id="network-identity-heading" className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">Connected companies. Shared purpose.</h2>
          </div>
          <Link to="/network" className="text-sm font-medium text-steel hover:text-ink">Explore the network →</Link>
        </div>
        <ul className="flex gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-5 md:overflow-visible md:pb-0" aria-label="Institutions in the Zendale healthcare network">
          {facilities.map(facility => (
            <li key={facility.id} className="w-44 shrink-0 md:w-auto">
              <Link to={facilityProfilePath(facility.id)} className="flex h-full min-h-28 flex-col items-center justify-center gap-3 border border-ink/10 bg-porcelain/40 px-3 py-4 text-center transition-colors hover:border-steel/50 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel">
                {facility.logo && <FacilityLogo src={facility.logo} alt="" sizes="160px" className="h-11 w-full max-w-36 object-contain" />}
                <span className="text-xs font-medium leading-snug text-ink">{facility.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
