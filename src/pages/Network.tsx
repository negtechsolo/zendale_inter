import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { facilities } from "../data/facilities";
import { whatsappLink } from "../config";

export default function Network() {
  const wa = whatsappLink("Hello Zendale. I have a question about one of your facilities.");
  return (
    <>
      <Seo
        title="Healthcare Network"
        description="The Zendale Healthcare Network: eight coordinated facilities spanning multi-specialist hospital care, critical care and dialysis, fertility, endoscopy, medical services and healthcare consulting."
      />
      <PageHero
        eyebrow="The Healthcare Network"
        title="Eight facilities that behave like one."
        lede="Each facility runs its own specialist practice while remaining one referral away from the rest of the network. That is the difference between a directory of providers and a coordinated healthcare system."
      >
        <Button to="/contact" variant="brass">Talk to Our Team</Button>
      </PageHero>

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-5 lg:space-y-24 lg:px-8">
          {facilities.map((f, i) => (
            <Reveal key={f.id} variant="sweep">
              <article
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                  i % 2 === 1 ? "" : ""
                }`}
                aria-labelledby={`facility-${f.id}`}
              >
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <SmartImage
                    src={f.image}
                    alt={f.imageAlt}
                    className={`${i % 2 === 1 ? "diag-mask-reverse" : "diag-mask"} aspect-[16/10] w-full`}
                  />
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-brass">
                    {f.code} · {f.focus}
                  </p>
                  <h2 id={`facility-${f.id}`} className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                    {f.name}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon/85">{f.description}</p>
                  <div className="mt-6">
                    <h3 className="eyebrow text-steel">Services at a glance</h3>
                    <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {f.services.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-carbon/80">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-steel" aria-hidden="true" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-7">
                    {f.internal ? (
                      <Button to={f.internal} variant="outline">Visit Facility</Button>
                    ) : (
                      <Button href={f.url} variant="outline">Visit Facility</Button>
                    )}
                  </div>
                </div>
              </article>
              {i < facilities.length - 1 && <div className="brass-rule mt-16 lg:mt-24" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Not sure which facility you need?</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Describe the need. We'll route it.
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
