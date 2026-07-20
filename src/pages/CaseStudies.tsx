import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Success Stories"
        description="Zendale case studies covering hospital transformation, corporate health programmes, equipment installation, healthcare partnerships and community outreach."
      />
      <PageHero
        eyebrow="Success Stories"
        title="What the ecosystem looks like when it's working."
        lede="Five engagements, each told the same way: the challenge as it arrived, the approach we took, and the outcome that followed."
      >
        <Button to="/contact" variant="brass">Discuss a Similar Engagement</Button>
      </PageHero>

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-16 px-5 lg:space-y-24 lg:px-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id} variant="sweep">
              <article aria-labelledby={`cs-${cs.id}`}>
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <SmartImage
                      src={cs.image}
                      alt={cs.imageAlt}
                      className={`${i % 2 === 1 ? "diag-mask-reverse" : "diag-mask"} aspect-[4/3] w-full`}
                    />
                  </div>
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="eyebrow text-brass">{cs.category}</p>
                    <h2 id={`cs-${cs.id}`} className="mt-3 font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
                      {cs.title}
                    </h2>
                    <dl className="mt-7 space-y-6">
                      <div>
                        <dt className="eyebrow text-steel">The Challenge</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-carbon/85 sm:text-base">{cs.challenge}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-steel">The Zendale Approach</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-carbon/85 sm:text-base">{cs.approach}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-steel">The Outcome</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-carbon/85 sm:text-base">{cs.outcome}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                {i < caseStudies.length - 1 && <div className="brass-rule mt-16 lg:mt-24" aria-hidden="true" />}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
              Your situation belongs on this page.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/contact" variant="brass">Discuss a Similar Engagement</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
