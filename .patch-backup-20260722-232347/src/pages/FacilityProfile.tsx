import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "../lib/seo";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { facilities, facilityProfilePath } from "../data/facilities";

export default function FacilityProfile() {
  const { facilityId } = useParams<{ facilityId: string }>();
  const facility = facilities.find((item) => item.id === facilityId);

  if (!facility) {
    return <Navigate to="/network" replace />;
  }

  const related = facilities.filter((item) => item.id !== facility.id).slice(0, 3);
  const primaryAction = facility.url ? (
    <Button href={facility.url} variant="brass">Visit Official Facility Website</Button>
  ) : facility.internal ? (
    <Button to={facility.internal} variant="brass">Explore the Consulting Practice</Button>
  ) : null;

  return (
    <>
      <Seo
        title={`${facility.name} | Healthcare Network`}
        description={`${facility.name} is part of the growing Zendale Limited healthcare network. Explore its focus, services and connection to the wider ecosystem.`}
        canonicalPath={facilityProfilePath(facility.id)}
        image={facility.logo}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-porcelain lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 opacity-15" aria-hidden="true">
          <svg viewBox="0 0 1200 620" className="h-full w-full" preserveAspectRatio="none">
            <path d="M70 118 H1070 L260 500 H1150" fill="none" stroke="#4A6FA5" strokeWidth="1" />
            <path d="M650 310 70 118 M650 310 1070 118 M650 310 260 500 M650 310 1150 500" fill="none" stroke="#C89B5A" strokeOpacity="0.6" strokeWidth="0.75" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-6">
            <Link to="/network" className="eyebrow text-brass transition-colors hover:text-porcelain">
              Healthcare Network / {facility.code}
            </Link>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-6xl">
              {facility.name}
            </h1>
            <p className="mt-5 max-w-xl text-xl text-porcelain/85">{facility.focus}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-porcelain/70 sm:text-lg">
              {facility.description}
            </p>
            {facility.location && (
              <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-steel">
                {facility.location}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryAction}
              <Button to="/contact" variant="light">Talk to Zendale</Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1} variant="sweep">
            <div className="relative">
              <SmartImage
                src={facility.image}
                alt={facility.imageAlt}
                eager
                className="diag-mask aspect-[16/10] w-full"
              />
              {facility.logo && (
                <div className="absolute -bottom-6 left-5 flex min-h-24 w-[min(20rem,80%)] items-center justify-center border border-ink/10 bg-white p-5 shadow-[0_20px_45px_rgba(11,27,51,0.18)] sm:left-8">
                  <img
                    src={facility.logo}
                    alt={facility.logoAlt ?? `${facility.name} logo`}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-steel">Facility Profile</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              A specialist institution connected to a wider healthcare ecosystem.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-carbon/80">
              Each institution keeps its own specialist focus while remaining connected to Zendale Limited for referrals, operational support, clinical coordination and partnership opportunities.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {facility.services.map((service, index) => (
                <div key={service} className="relative min-h-36 bg-white p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">0{index + 1}</span>
                  <p className="mt-4 font-display text-xl leading-snug text-ink">{service}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-steel">Continue Exploring</p>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">More from the growing network.</h2>
            </div>
            <Button to="/network" variant="outline">View the Full Network</Button>
          </Reveal>
          <div className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <Link to={facilityProfilePath(item.id)} className="group block h-full bg-porcelain p-7 transition-colors hover:bg-white">
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">{item.code}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{item.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/70">{item.focus}</p>
                  <span className="mt-6 inline-block text-sm font-medium text-steel transition-transform group-hover:translate-x-1">Learn More →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Access and Partnerships</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              Need care, a referral pathway or an institutional conversation?
            </h2>
          </Reveal>
          <Reveal className="flex flex-wrap gap-4" delay={0.08}>
            {primaryAction}
            <Button to="/partnerships" variant="light">Explore Partnerships</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
