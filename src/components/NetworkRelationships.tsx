import { organisationLogos, hmoLogos } from "../data/networkRelationships";
import { RelationshipLogoRow } from "./RelationshipLogoRow";

export function NetworkRelationships() {
  return (
    <section aria-labelledby="network-relationships-heading" className="border-y border-ink/10 bg-white py-14 lg:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-5 lg:px-8">
        <p className="eyebrow text-steel">Relationships Across Our Network</p>
        <div className="mt-4 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <h2 id="network-relationships-heading" className="max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl">Healthcare experience that reaches <span className="whitespace-nowrap">across organisations.</span></h2>
          <p className="max-w-xl text-base leading-relaxed text-carbon/80 sm:text-lg">Through our subsidiaries, we have provided healthcare services and support to organisations across different sectors.</p>
        </div>
      </div>
      <div className="space-y-9">
        <RelationshipLogoRow id="organisations" title="Organisations we have served" logos={organisationLogos} />
        <RelationshipLogoRow id="hmo-relationships" title="HMO relationships" logos={hmoLogos} direction="right" />
      </div>
    </section>
  );
}
