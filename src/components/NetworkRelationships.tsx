import { organisationLogos, hmoLogos } from "../data/networkRelationships";
import { RelationshipLogoRow } from "./RelationshipLogoRow";

export function NetworkRelationships() {
  return (
    <section aria-labelledby="network-relationships-heading" className="border-y border-ink/10 bg-white py-14 lg:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-5 lg:px-8">
        <p className="eyebrow text-steel">Relationships Across Our Network</p>
        <div className="mt-4 space-y-5">
          <h2 id="network-relationships-heading" className="font-display text-2xl leading-tight text-ink sm:text-3xl lg:whitespace-nowrap lg:text-[clamp(1.8rem,2.7vw,2.25rem)]">Healthcare experience that reaches across organisations.</h2>
          <p className="text-base leading-relaxed text-carbon/80 lg:whitespace-nowrap lg:text-[clamp(0.875rem,1.25vw,1rem)]">Through our subsidiaries, we have provided healthcare services and support to organisations across different sectors.</p>
        </div>
      </div>
      <div className="space-y-9">
        <RelationshipLogoRow id="organisations" title="Organisations we have served" logos={organisationLogos} />
        <RelationshipLogoRow id="hmo-relationships" title="HMO relationships" logos={hmoLogos} direction="right" />
      </div>
    </section>
  );
}
