import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { NodeEmblem } from "../components/NodeEmblem";
import { pillars } from "../data/pillars";

const values = [
  {
    name: "Clinical integrity",
    copy: "Care decisions are made by clinicians on clinical grounds. We never promise outcomes medicine cannot promise, and we say so plainly.",
  },
  {
    name: "One accountable partner",
    copy: "Whoever you are — patient, HR lead, CEO or agency — one named contact at Zendale owns your relationship end to end.",
  },
  {
    name: "Operators, not observers",
    copy: "Our advice comes from facilities we actually run. When we recommend something, it's because we've made it work ourselves.",
  },
  {
    name: "Built for the long term",
    copy: "Maintenance schedules, follow-up care, continuous support — everything we deliver assumes the relationship continues after handover.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="Who We Are"
        description="Zendale is an integrated healthcare group: eight specialist facilities, a consulting practice, a medical technology division and a corporate health team operating as one coordinated network."
      />
      <PageHero
        eyebrow="Who We Are"
        title="Many parts. One system. One promise."
        lede="Zendale exists so that no one dealing with healthcare — patient or institution — has to assemble their own network of providers. We assembled it already."
        image={{ src: "about-hero.webp", alt: "Zendale clinicians and consultants working across the group's facilities" }}
      />

      {/* The story */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5" variant="sweep">
            <SmartImage
              src="about-story.webp"
              alt="Inside a Zendale network facility during a working day"
              className="diag-mask-reverse aspect-[3/4] w-full"
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-steel">The Story</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Healthcare's hardest problem isn't medicine. It's coordination.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-carbon/85">
              <p>
                A patient who needs dialysis, then a specialist opinion, then a procedure,
                usually has to navigate three unconnected providers. An HR manager building
                a health programme has to vet a dozen clinics. A hospital that buys equipment
                from one company must find another to maintain it — and a third to advise on
                the operations around it.
              </p>
              <p>
                Zendale was built to remove that burden. The group brings specialist
                facilities, consulting expertise, biomedical engineering and corporate
                health delivery under one coordinated management — so the coordination
                happens on our side of the relationship, not yours.
              </p>
              <p>
                Today the Zendale Healthcare Network spans eight facilities — from
                multi-specialist hospital care at Sky High Medical Centre to dedicated
                endoscopy, fertility, critical care and medical support services — alongside
                VHELAR Consulting and our medical technology practice. Different doors,
                same house.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-ink py-20 text-porcelain lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-px bg-porcelain/10 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="h-full bg-ink p-8 lg:p-12">
              <p className="eyebrow text-brass">Mission</p>
              <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                To give every patient and every institution a single, dependable partner
                for complete healthcare — care, expertise and infrastructure, coordinated
                as one.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full bg-ink p-8 lg:p-12">
              <p className="eyebrow text-brass">Vision</p>
              <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                A healthcare landscape where integrated networks — not isolated
                facilities — set the standard for how care is delivered and managed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">What We Hold To</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              The standards behind the structure.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.08}>
                <div className="z-sweep h-full bg-porcelain p-8 lg:p-10">
                  <span className="eyebrow text-brass">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl text-ink">{v.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/80">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The ecosystem at a glance */}
      <section className="bg-mist/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">The Ecosystem</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Five pillars carry everything we do.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <div className="h-full bg-porcelain p-7">
                  <NodeEmblem motif={p.motif} className="h-9 w-9 text-steel" />
                  <h3 className="mt-4 font-display text-lg leading-snug text-ink">{p.name}</h3>
                  <p className="mt-2 text-sm text-carbon/70">{p.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Button to="/network">Explore Our Healthcare Network</Button>
            <Button to="/contact" variant="outline">Talk to Our Team</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/*
 * NOTE (per brief): a Leadership section is intentionally absent because no
 * leadership names, roles or photos were supplied. The brief requires
 * "leadership placeholder-free — only what's provided". Add a Leadership
 * section here only when real profiles are available.
 */
