import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { MarkYes } from "../components/Indicator";
import { whatsappLink } from "../config";

const offerings = [
  {
    name: "Healthcare Retainership",
    benefit: "Your organisation gains an ongoing clinical partner with defined cover, an agreed response process and a named contact who understands your company.",
  },
  {
    name: "Executive Medicals",
    benefit: "Senior leaders get comprehensive assessments handled discreetly and scheduled around their calendars, not ours.",
  },
  {
    name: "Annual Staff Medicals",
    benefit: "Workforce checks run on schedule using one report format, making year-on-year comparison possible.",
  },
  {
    name: "Pre-employment Screening",
    benefit: "Fitness-for-role screening delivered on hiring timelines. Your offer letters stop waiting on clinics.",
  },
  {
    name: "Occupational Health",
    benefit: "Workplace risk assessment and ongoing occupational health support that keeps you compliant and your people protected.",
  },
  {
    name: "Nationwide Coverage",
    benefit: "One arrangement covers staff across locations, delivered through Zendale facilities and vetted partner providers.",
  },
];

const hrGets = [
  "One contract and one invoice cycle across every location",
  "One consolidated report format across every site and every cycle",
  "Scheduling handled by Zendale, not by your HR team",
  "A named programme contact who answers, escalates and fixes",
  "Screening capacity that keeps pace with your hiring",
];

export default function CorporateHealth() {
  const wa = whatsappLink("Hello Zendale. I would like to discuss a corporate health programme for my organisation.");
  return (
    <>
      <Seo
        title="Corporate Healthcare"
        description="Corporate health from Zendale: retainership, executive and staff medicals, pre-employment screening and occupational health, under one partner."
      />
      <PageHero
        eyebrow="Corporate Healthcare"
        title="Workforce health, without HR becoming a clinic administrator."
        lede="One partner manages your entire corporate health programme, including medicals, screening and occupational health across every location, with one standard and one point of contact."
        image={{ src: "corporate-hero.webp", alt: "Executive health consultation during a corporate medical programme" }}
      >
        <Button to="/contact" variant="brass">Request a Corporate Proposal</Button>
        {wa && <Button href={wa} variant="light">Chat on WhatsApp</Button>}
      </PageHero>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">The Programme</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Six services. One arrangement.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <Reveal key={o.name} delay={(i % 3) * 0.08}>
                <div className="z-sweep h-full bg-porcelain p-8">
                  <span className="eyebrow text-brass">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl text-ink">{o.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/80">{o.benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-porcelain lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">What HR actually receives</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
              A programme you can run in an hour a month.
            </h2>
            <ul className="mt-8 space-y-4">
              {hrGets.map((g) => (
                <li key={g} className="flex items-start gap-3 text-base text-porcelain/85">
                  <MarkYes />
                  {g}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact" variant="brass">Request a Corporate Proposal</Button>
              <Button to="/downloads" variant="light">Download the Corporate Health Guide</Button>
            </div>
          </Reveal>
          <Reveal variant="sweep" delay={0.1}>
            <SmartImage
              src="corporate-wellness.webp"
              alt="Corporate wellness session delivered on-site for a client organisation"
              className="diag-mask-reverse aspect-[4/5] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-steel">A note on honesty</p>
            <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
              We won't promise your absenteeism numbers will fall by a specific
              percentage. No honest provider can. We will promise a programme that
              runs on time, reports clearly, and treats your people well.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
