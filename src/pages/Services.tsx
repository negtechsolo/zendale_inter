import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { AccordionItem } from "../components/Accordion";
import { Button } from "../components/Button";
import { serviceGroups } from "../data/services";

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Zendale's services, organised by capability pillar: clinical and specialist care, corporate healthcare, medical technology, healthcare consulting and hospital partnerships."
      />
      <PageHero
        eyebrow="Services"
        title="Everything we do, organised the way you'd ask for it."
        lede="Five capability pillars connect to the services beneath them. Choose the one that matches your need, or ask our team to guide you."
      >
        <Button to="/contact" variant="brass">Talk to Our Team</Button>
      </PageHero>

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          {serviceGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <AccordionItem kicker={`Pillar 0${i + 1}`} title={group.name} defaultOpen={i === 0}>
                <p className="max-w-2xl text-base leading-relaxed text-carbon/85">{group.intro}</p>
                <dl className="mt-8 grid gap-px bg-ink/10 sm:grid-cols-2">
                  {group.services.map((s) => (
                    <div key={s.name} className="bg-porcelain py-5 pr-6 sm:px-6">
                      <dt className="font-medium text-ink">{s.name}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-carbon/75">{s.detail}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <Button to={group.route} variant="outline">
                    {group.id === "clinical" ? "Explore the network" : `Explore ${group.name}`}
                  </Button>
                </div>
              </AccordionItem>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist/60 py-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Don't see your exact need listed?
            </h2>
            <p className="mt-3 max-w-xl text-base text-carbon/80">
              The list above explains how we organise our services. It does not limit what the
              network can take on. Describe the situation and we'll tell you honestly
              whether and how we can help.
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
