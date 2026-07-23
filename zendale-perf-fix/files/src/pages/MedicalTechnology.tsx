import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";

const lifecycle = [
  { n: "01", name: "Procurement", copy: "Specification and sourcing are matched to clinical need and budget rather than vendor inventory." },
  { n: "02", name: "Installation", copy: "Site preparation, installation and commissioning, phased around the clinical schedule." },
  { n: "03", name: "Training & Handover", copy: "Clinical teams trained before go-live, so equipment enters service already understood." },
  { n: "04", name: "Planned Maintenance", copy: "Preventive schedules that protect uptime, safety and asset value." },
  { n: "05", name: "Repairs", copy: "Fault diagnosis and repair are prioritised by clinical impact rather than ticket order." },
  { n: "06", name: "Lifecycle Decisions", copy: "Asset registers and replacement planning, so end-of-life is a decision, never a surprise." },
];

export default function MedicalTechnology() {
  return (
    <>
      <Seo
        title="Medical Technology"
        description="Zendale medical technology: equipment procurement, installation, planned maintenance, repairs and biomedical engineering for healthcare facilities."
      />
      <PageHero
        eyebrow="Medical Technology"
        title="Equipment is a lifecycle, not a delivery."
        lede="Many equipment problems begin with poor planning. Zendale's biomedical engineering team manages the full working life of your equipment, from specification and installation to maintenance and retirement."
        image={{ src: "medtech-hero.webp", alt: "Zendale biomedical engineer servicing clinical equipment" }}
      >
        <Button to="/contact" variant="brass">Discuss an Equipment Need</Button>
        <Button to="/downloads" variant="light">Download the Equipment Guide</Button>
      </PageHero>

      {/* Equipment lifecycle diagram, rendered in the brand's diagonal language */}
      <section className="overflow-hidden bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">The Lifecycle</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Six stages, descending the Z-stroke.
            </h2>
            <p className="mt-4 text-base text-carbon/80">
              Every engagement can begin at any stage, but the value increases when
              one team owns all six.
            </p>
          </Reveal>
          <div className="relative mt-16">
            <div
              className="absolute -left-10 -right-10 top-1/2 hidden h-px bg-steel/30 lg:block"
              style={{ transform: "rotate(-4deg)" }}
              aria-hidden="true"
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {lifecycle.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 0.06}>
                    <div
                      className="relative border border-ink/10 bg-white p-7"
                      style={{ marginTop: `calc(${i % 3} * 1.1rem)` }}
                    >
                      <span className="font-mono text-sm text-brass">{s.n}</span>
                      <h3 className="mt-2 font-display text-xl text-ink">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-carbon/75">{s.copy}</p>
                      {/* Diagonal corner cut, the Z-stroke as structure */}
                      <span
                        className="absolute right-0 top-0 h-6 w-6 bg-porcelain"
                        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                        aria-hidden="true"
                      />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-porcelain lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Biomedical Engineering</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
              The same engineers who keep our ICU running can keep yours running.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-porcelain/75">
              Zendale's biomedical engineers support the facilities of the Zendale
              Healthcare Network every day, including dialysis machines, monitoring systems,
              endoscopy equipment. That daily operating discipline is what external
              clients hire: engineers whose maintenance schedules are tested where the
              stakes are highest.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button to="/contact" variant="brass">Discuss an Equipment Need</Button>
              <Button to="/case-studies" variant="light">Read an installation case study</Button>
            </div>
          </Reveal>
          <Reveal variant="sweep" delay={0.1}>
            <SmartImage
              src="medtech-biomedical-engineer.webp"
              alt="Biomedical engineering team performing planned maintenance in a critical care unit"
              className="diag-mask-reverse aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
