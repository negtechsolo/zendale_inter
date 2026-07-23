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
        description="Explore Zendale Limited services across institutional partnerships, specialist care, corporate healthcare, medical technology and healthcare consulting."
      />
      <PageHero
        eyebrow="Services"
        title="Complete healthcare capabilities. One coordinated system."
        lede="Zendale brings together specialist care, corporate healthcare, medical technology, healthcare consulting and institutional partnerships around each organisation's needs."
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          {serviceGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <AccordionItem kicker={`Pillar 0${i + 1}`} title={group.name} defaultOpen={i === 0}>
                <p className="max-w-2xl text-base leading-relaxed text-carbon/85">{group.intro}</p>
                <dl className="mt-8 grid gap-px bg-ink/10 sm:grid-cols-2">
                  {group.services.map((service) => (
                    <div key={service.name} className="bg-porcelain py-5 pr-6 sm:px-6">
                      <dt className="font-medium text-ink">{service.name}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-carbon/75">{service.detail}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <Button to={group.route} variant="outline">
                    {group.id === "clinical"
                      ? "Explore the network"
                      : group.id === "partnerships"
                        ? "Explore partnership pathways"
                        : `Explore ${group.name}`}
                  </Button>
                </div>
              </AccordionItem>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Who We Support</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
                  Solutions for organisations across the public, private and development sectors.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-porcelain/75">
                Zendale partners with organisations across the public and private sectors to deliver healthcare, operational and procurement solutions.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-porcelain/15 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Federal Ministries, Departments and Agencies (MDAs)",
              "State Governments",
              "Local Government Authorities",
              "Healthcare Institutions",
              "Teaching Hospitals",
              "Corporate Organisations",
              "Development Partners",
              "International NGOs",
              "Educational Institutions",
              "Manufacturing Companies",
              "Financial Institutions",
              "Faith-Based Organisations",
            ].map((organisation, index) => (
              <Reveal key={organisation} delay={(index % 3) * 0.04}>
                <div className="h-full bg-ink px-5 py-5 sm:px-6">
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-porcelain/85">{organisation}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
