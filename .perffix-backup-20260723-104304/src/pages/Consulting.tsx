import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";

const practices = [
  {
    name: "Hospital Planning",
    copy: "Feasibility, service design and planning for new or expanding facilities, grounded in the practical cost and operational requirements of running them.",
  },
  {
    name: "Operational Improvement",
    copy: "Diagnosing and fixing the workflows, rotas, procurement habits and management blind spots that keep good facilities underperforming.",
  },
  {
    name: "Public-Private Partnerships",
    copy: "Structuring public-private partnerships between government and private providers, with clear scope, aligned incentives and workable governance.",
  },
  {
    name: "Quality & Compliance",
    copy: "Building practical standards, audit trails and clinical governance systems that meet regulatory expectations and support patient care.",
  },
  {
    name: "Healthcare Transformation",
    copy: "End-to-end change programmes for organisations repositioning how they deliver care, with clear sequencing, accountable teams and realistic implementation plans.",
  },
];

export default function Consulting() {
  return (
    <>
      <Seo
        title="Healthcare Consulting"
        description="Zendale Consulting, through VHELAR: hospital planning, operational improvement, partnerships, quality and compliance, from people who run facilities."
      />
      <PageHero
        eyebrow="Healthcare Consulting · VHELAR Consulting"
        title="Advice from people who run hospitals, not just study them."
        lede="Zendale's consulting practice advises hospitals, investors and public institutions, backed by a group that operates ICUs, diagnostic centres and specialist facilities every day. Our recommendations have all been tested on ourselves first."
        image={{ src: "consulting-hero.webp", alt: "VHELAR consultants reviewing a facility operations plan with hospital leadership" }}
      >
        <Button to="/contact" variant="brass">Talk to Our Team</Button>
      </PageHero>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">The Practice</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Five areas. One test: would we run it this way ourselves?
            </h2>
          </Reveal>
          <div className="mt-12 space-y-px bg-ink/10">
            {practices.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div className="z-sweep grid gap-4 bg-porcelain p-8 sm:grid-cols-12 sm:items-baseline lg:p-10">
                  <span className="eyebrow text-brass sm:col-span-1">0{i + 1}</span>
                  <h3 className="font-display text-2xl text-ink sm:col-span-4">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-carbon/80 sm:col-span-7 sm:text-base">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-porcelain lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="sweep">
            <SmartImage
              src="consulting-fieldwork.webp"
              alt="Consulting fieldwork inside a client hospital during an operational diagnostic"
              className="diag-mask aspect-[4/3] w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-brass">Why the operating base matters</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Our consultants can show you a working example because we operate it.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-porcelain/75">
              When we recommend a maintenance regime, an ICU escalation pathway or a
              procurement discipline, we can show you the version running inside the
              Zendale network today. Advisory divorced from operations produces
              beautiful documents; advisory rooted in operations produces working
              hospitals.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button to="/case-studies" variant="light">Read a transformation case study</Button>
              <Button to="/contact" variant="brass">Talk to Our Team</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
