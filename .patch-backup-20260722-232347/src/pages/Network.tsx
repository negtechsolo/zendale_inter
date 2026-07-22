import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { facilities, facilityProfilePath } from "../data/facilities";
import { whatsappLink } from "../config";

export default function Network() {
  const wa = whatsappLink("Hello Zendale. I have a question about one of your facilities.");

  return (
    <>
      <Seo
        title="Healthcare Network"
        description="Explore the growing Zendale Limited healthcare network, connecting specialist care, critical care, dialysis, fertility, diagnostics, biomedical support and healthcare consulting."
        canonicalPath="/network"
      />
      <PageHero
        eyebrow="The Healthcare Network"
        title="A growing healthcare network designed to work as one."
        lede="The institutions shown here make up Zendale Limited's current network. Each keeps its specialist focus while remaining connected to the wider ecosystem for referrals, expertise, operational support and future growth."
      >
        <Button to="/contact" variant="brass">Talk to Our Team</Button>
        <Button to="/partnerships" variant="light">Explore Partnerships</Button>
      </PageHero>

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mb-14 grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-steel">Current Network</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                {facilities.length} institutions today, with a structure built to welcome what comes next.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-carbon/70 lg:col-span-4">
              This page reflects the current Zendale network, not a permanent limit. New facilities, specialist practices and institutional partnerships can be added as the ecosystem expands.
            </p>
          </Reveal>

          <div className="space-y-16 lg:space-y-24">
            {facilities.map((facility, index) => (
              <Reveal key={facility.id} variant="sweep">
                <article
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                  aria-labelledby={`facility-${facility.id}`}
                >
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative">
                      <SmartImage
                        src={facility.image}
                        alt={facility.imageAlt}
                        className={`${index % 2 === 1 ? "diag-mask-reverse" : "diag-mask"} aspect-[16/10] w-full`}
                      />
                      {facility.logo && (
                        <div className="absolute bottom-4 left-4 flex min-h-16 max-w-[55%] items-center bg-white/95 px-4 py-3 shadow-[0_12px_30px_rgba(11,27,51,0.16)] backdrop-blur">
                          <img
                            src={facility.logo}
                            alt={facility.logoAlt ?? `${facility.name} logo`}
                            className="max-h-11 max-w-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-brass">
                      {facility.code} · {facility.focus}
                    </p>
                    <h2
                      id={`facility-${facility.id}`}
                      className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl"
                    >
                      {facility.name}
                    </h2>
                    {facility.location && (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-steel">
                        {facility.location}
                      </p>
                    )}
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon/85">
                      {facility.description}
                    </p>
                    <div className="mt-6">
                      <h3 className="eyebrow text-steel">Services at a glance</h3>
                      <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                        {facility.services.map((service) => (
                          <li key={service} className="flex items-start gap-2.5 text-sm text-carbon/80">
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-steel" aria-hidden="true" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button to={facilityProfilePath(facility.id)}>Learn More</Button>
                      {facility.url ? (
                        <Button href={facility.url} variant="outline">Visit Facility</Button>
                      ) : facility.internal ? (
                        <Button to={facility.internal} variant="outline">Visit Practice</Button>
                      ) : null}
                    </div>
                  </div>
                </article>
                {index < facilities.length - 1 && (
                  <div className="brass-rule mt-16 lg:mt-24" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Not sure which facility you need?</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Describe the need. We will route it.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-4">
            <Button to="/contact" variant="brass">Talk to Our Team</Button>
            {wa && <Button href={wa} variant="light">Chat on WhatsApp</Button>}
            <Link to="/how-we-work" className="inline-flex items-center px-2 py-3 text-sm font-medium text-porcelain/80 hover:text-brass">
              See how referrals work →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
