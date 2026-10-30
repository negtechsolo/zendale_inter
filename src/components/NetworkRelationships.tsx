import { Link } from "react-router-dom";
import { organisationLogos, hmoLogos, bloodScreeningPartner } from "../data/networkRelationships";
import { RelationshipLogoRow } from "./RelationshipLogoRow";
import { FacilityLogo } from "./FacilityLogo";

export function NetworkRelationships() {
  return (
    <section aria-labelledby="network-relationships-heading" className="border-y border-ink/10 bg-mist/35 px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow text-steel">Relationships Across Our Network</p>
          <h2 id="network-relationships-heading" className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">Healthcare experience that reaches across organisations.</h2>
          <p className="mt-5 text-base leading-relaxed text-carbon/80 sm:text-lg">Through our subsidiaries, we have provided healthcare services and support to organisations across different sectors.</p>
        </div>
        <div className="space-y-10">
          <RelationshipLogoRow id="organisations" title="Organisations we have served" description="Selected organisations supported through Life Centre Medicals, part of the Zendale network." logos={organisationLogos} />
          <RelationshipLogoRow id="hmo-relationships" title="HMO relationships" description="HMO relationships through SkyHigh Medical Centre. Availability and cover depend on the facility, service and individual plan." logos={hmoLogos} />
        </div>
        <div className="mt-10 flex flex-col items-start gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:gap-7">
          <div className="flex h-24 w-28 shrink-0 items-center justify-center border border-ink/10 bg-white p-3">
            <FacilityLogo src={`/images/${bloodScreeningPartner.image}`} alt={`${bloodScreeningPartner.name} logo`} sizes="100px" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <p className="eyebrow text-steel">Institutional Partnership</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{bloodScreeningPartner.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-carbon/75">Blood-screening partnership through Life Centre Medicals.</p>
            <Link to={bloodScreeningPartner.path} className="mt-3 inline-block text-sm font-medium text-steel hover:text-ink">Read about the partnership →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
