import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";

const capabilities = [
  "Medical equipment and healthcare consumables",
  "Laboratory equipment and diagnostic supplies",
  "Pharmaceuticals and medical devices",
  "ICT equipment and office technology",
  "Office furniture and operational supplies",
  "Safety equipment and PPE",
  "Facility management supplies",
  "Printing and branding materials",
  "Construction and project materials",
  "Logistics, warehousing and distribution",
  "Vendor management",
  "Strategic sourcing",
  "Procurement outsourcing",
];

const deliverySteps = [
  {
    title: "Define the requirement",
    copy: "We clarify scope, specifications, quantities, compliance requirements, delivery locations and timelines before sourcing begins.",
  },
  {
    title: "Source and evaluate",
    copy: "We identify suitable suppliers, assess commercial and technical fit, complete due diligence and document the selection process.",
  },
  {
    title: "Coordinate procurement",
    copy: "We manage purchase planning, supplier communication, contract administration, logistics and delivery milestones.",
  },
  {
    title: "Verify and report",
    copy: "We support quality checks, delivery confirmation, documentation, accountability and performance reporting.",
  },
];

export default function ProcurementSupplyChain() {
  return (
    <>
      <Seo
        title="Procurement & Supply Chain Management"
        description="End-to-end procurement, strategic sourcing, vendor management, logistics and supply chain coordination from Zendale Limited."
      />
      <PageHero
        eyebrow="Procurement & Supply Chain Management"
        title="Transparent sourcing. Accountable delivery."
        lede="Zendale provides end-to-end procurement and supply chain management for government institutions, healthcare organisations, development partners, NGOs and private-sector clients."
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">The Service</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              One coordinated procurement partner from planning to delivery.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-carbon/85">
              <p>
                Zendale Limited provides end-to-end procurement and supply chain support for government institutions, healthcare organisations, development partners, NGOs and private-sector clients.
              </p>
              <p>
                We manage strategic sourcing, vendor selection, procurement planning, logistics coordination, contract administration, inventory support and nationwide delivery while ensuring transparency, quality assurance, regulatory compliance and value for money.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Procurement Capabilities</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Products, services and operational support across multiple sectors.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <Reveal key={capability} delay={(index % 3) * 0.04}>
                <div className="h-full bg-porcelain px-5 py-5 sm:px-6">
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-ink">{capability}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">How We Deliver</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              A clear process built around control, compliance and accountability.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-porcelain/15 md:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="h-full bg-ink p-6">
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-medium">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-porcelain/70">{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Discuss a Requirement</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Tell us what needs to be sourced, where it is needed and when.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-carbon/80">
              Our team will review the scope and explain the most suitable procurement and delivery approach.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/contact">Talk to Our Team</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
