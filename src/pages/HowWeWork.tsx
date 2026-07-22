import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";

const stages = [
  {
    n: "01",
    title: "Understand your need",
    copy:
      "Every engagement starts with a conversation, not a form. A patient describes symptoms; an HR manager describes a workforce; a hospital CEO describes an operational problem; an agency describes a public health goal. We listen before we route.",
    forYou: "You speak with someone who asks practical questions. You do not need to understand our organisational structure to get started.",
  },
  {
    n: "02",
    title: "Assess requirements",
    copy:
      "We translate the need into a plan across the network: which facility, which specialists, which engineering or consulting capability, and in what order. Where something sits outside our network, we say so plainly and point you to better options.",
    forYou: "A clear written scope of what will happen, where, and who is responsible for each part.",
  },
  {
    n: "03",
    title: "Assign specialist team",
    copy:
      "Named clinicians, engineers or consultants take ownership, while one coordinator remains your single point of contact across every facility involved. Accountability has a name and a phone number.",
    forYou: "One contact to call, however many parts of the network your case touches.",
  },
  {
    n: "04",
    title: "Deliver solution",
    copy:
      "Care is delivered, equipment is commissioned and programmes are launched according to the plan agreed in stage two. Changes are communicated before they happen, not explained afterwards.",
    forYou: "Delivery on the agreed plan, with honest communication when reality forces a change.",
  },
  {
    n: "05",
    title: "Continuous support",
    copy:
      "Follow-up appointments, maintenance schedules, programme reviews and referral pathways continue after handover. The engagement ends when the agreed work is complete, not simply when an invoice is issued.",
    forYou: "A partner still answering the phone six months later.",
  },
];

export default function HowWeWork() {
  return (
    <>
      <Seo
        title="How We Work"
        description="Zendale's five-stage way of working: understand the need, assess requirements, assign a specialist team, deliver the solution, and provide continuous support."
      />
      <PageHero
        eyebrow="How We Work"
        title="The same five stages, whether you're one patient or one government."
        lede="Complexity lives on our side of the relationship. Yours looks like this: one conversation, one plan, one team, one delivery, and support that continues."
        image={{ src: "how-we-work-hero.webp", alt: "A Zendale coordinator planning a patient pathway with the clinical team" }}
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <ol>
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="relative grid gap-6 border-l border-steel/30 pb-20 pl-8 last:pb-0 sm:grid-cols-12 sm:gap-10 sm:pl-12 lg:pb-24">
                  <span
                    className="absolute -left-[1.35rem] top-0 flex h-11 w-11 items-center justify-center border border-steel bg-porcelain font-mono text-sm text-steel"
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <div className="sm:col-span-7">
                    <h2 className="font-display text-2xl text-ink sm:text-3xl">{s.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-carbon/85">{s.copy}</p>
                  </div>
                  <div className="sm:col-span-5">
                    <div className="bg-mist/70 p-6">
                      <p className="eyebrow text-steel">What that means for you</p>
                      <p className="mt-2 text-sm leading-relaxed text-carbon/85">{s.forYou}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="sweep">
            <SmartImage
              src="how-we-work-support.webp"
              alt="Ongoing equipment maintenance visit at a partner facility"
              className="diag-mask aspect-[16/10] w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-brass">Stage five is the point</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Most providers are built to close engagements. We're built to keep them.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-porcelain/75">
              A network proves its value over time through the second referral, the scheduled
              maintenance, the annual medical cycle. That is why continuous support is a
              stage of our process, not an upsell at the end of it.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button to="/contact" variant="brass">Talk to Our Team</Button>
              <Button to="/case-studies" variant="light">See it in practice</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
