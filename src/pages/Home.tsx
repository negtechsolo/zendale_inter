import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { EcosystemHero } from "../components/EcosystemHero";
import { NodeEmblem } from "../components/NodeEmblem";
import { MarkLimited, MarkYes } from "../components/Indicator";
import { LeadGateForm } from "../components/forms";
import { facilities } from "../data/facilities";
import { pillars } from "../data/pillars";
import { industries } from "../data/services";
import { SITE, whatsappLink } from "../config";

/* ------------------------------------------------------------------ */
/*  01 · Hero — The Zendale Ecosystem                                  */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-porcelain">
      {/* Photographic texture layer behind the 3D scene */}
      <SmartImage
        src="home-hero-texture.jpg"
        alt=""
        eager
        className="absolute inset-0 opacity-[0.16]"
        imgClassName="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" aria-hidden="true" />
      <EcosystemHero />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-40 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-brass">The Zendale Ecosystem</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
              One Partner. Complete Healthcare Solutions.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-porcelain/80 sm:text-lg">
              Zendale unites specialist care, healthcare consulting, medical technology,
              corporate health and hospital partnerships in one coordinated network.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact" variant="brass">Talk to Our Team</Button>
              <Button to="/network" variant="light">Explore Our Healthcare Network</Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.45}>
          <p className="mt-14 font-mono text-[0.625rem] uppercase tracking-eyebrow text-porcelain/40">
            8 facilities · 5 capability pillars · one system — hover a node to explore it
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  02 · Who We Are                                                    */
/* ------------------------------------------------------------------ */

const whoCards = [
  {
    title: "Healthcare Services",
    copy: "Clinical care through our specialist healthcare network.",
    to: "/network",
  },
  {
    title: "Healthcare Consulting",
    copy: "Helping healthcare organisations improve, expand and transform.",
    to: "/consulting",
  },
  {
    title: "Medical Technology",
    copy: "Supporting healthcare providers through biomedical engineering and technology solutions.",
    to: "/medical-technology",
  },
];

function WhoWeAre() {
  return (
    <section className="bg-porcelain py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-steel">Who We Are</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
              Not a hospital. A healthcare system you can call.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-carbon/85 sm:text-lg">
              Zendale is an integrated healthcare group. Behind one name sits a coordinated
              network of specialist facilities, a consulting practice, a medical technology
              division and a corporate health team — built so that a patient, an employer,
              a hospital, an HMO or a public institution can each reach the right care,
              expertise or infrastructure through a single partner. When you work with
              Zendale, you are not engaging one clinic; you are engaging an ecosystem.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="outline">Read the full story</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" variant="sweep" delay={0.15}>
            <SmartImage
              src="home-who-we-are.jpg"
              alt="A Zendale clinical team coordinating patient care across the network"
              className="diag-mask aspect-[4/3] w-full"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-3">
          {whoCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <Link to={c.to} className="z-sweep block h-full bg-porcelain p-8 transition-colors hover:bg-mist/60">
                <span className="eyebrow text-brass">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon/80">{c.copy}</p>
                <span className="mt-5 inline-block text-sm font-medium text-steel">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  03 · Healthcare Network preview — connected constellation grid     */
/* ------------------------------------------------------------------ */

function NetworkPreview() {
  return (
    <section className="relative bg-ink py-20 text-porcelain lg:py-28">
      {/* Fine connector filaments echoing the hero */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path d="M0 20 100 8 M0 45 100 34 M0 72 100 60 M0 96 100 86" stroke="#4A6FA5" strokeWidth="0.15" fill="none" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brass">The Healthcare Network</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            Eight facilities. One referral away from each other.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-porcelain/75">
            Every facility below is a working part of the same system — which means one
            phone call to Zendale reaches all of them.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px bg-porcelain/10 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f, i) => (
            <Reveal key={f.id} delay={(i % 4) * 0.08}>
              <div className="z-sweep flex h-full flex-col justify-between bg-ink p-6 transition-colors hover:bg-[#0f2340]">
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">{f.code}</p>
                  <h3 className="mt-2 font-display text-lg leading-snug">{f.name}</h3>
                  <p className="mt-2 text-sm text-porcelain/65">{f.focus}</p>
                </div>
                {f.internal ? (
                  <Link to={f.internal} className="mt-6 inline-block text-sm font-medium text-steel transition-colors hover:text-brass">
                    Visit Facility →
                  </Link>
                ) : (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-sm font-medium text-steel transition-colors hover:text-brass"
                  >
                    Visit Facility →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button to="/network" variant="light">See the full network</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  04 · How We Work — a true sequence on a diagonal flowing path      */
/* ------------------------------------------------------------------ */

const steps = [
  { n: "01", title: "Understand your need", copy: "A conversation first — patient, HR lead, hospital CEO or agency, we start by hearing the actual problem." },
  { n: "02", title: "Assess requirements", copy: "We map the need to the network: which facilities, disciplines or teams the work truly requires." },
  { n: "03", title: "Assign specialist team", copy: "You get named people — clinicians, engineers or consultants — accountable for your outcome." },
  { n: "04", title: "Deliver solution", copy: "Care delivered, equipment commissioned, programme launched — on the plan we agreed together." },
  { n: "05", title: "Continuous support", copy: "The relationship doesn't end at delivery. Follow-up, maintenance and review are built in." },
];

function HowWeWorkStrip() {
  return (
    <section className="overflow-hidden bg-mist/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-steel">How We Work</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
            One sequence, whoever you are.
          </h2>
        </Reveal>
        {/* The path descends on the Z-stroke diagonal from left to right */}
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-steel/40 lg:block"
            style={{ transform: "rotate(3.5deg)" }}
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <li className="relative lg:pt-0" style={{ marginTop: `calc(${i} * 0.9rem)` }}>
                <span className="flex h-14 w-14 items-center justify-center border border-steel bg-porcelain font-mono text-sm text-steel">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon/75">{s.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12">
          <Button to="/how-we-work" variant="outline">See how we work in full</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 · Why Zendale — designed comparison panel                       */
/* ------------------------------------------------------------------ */

const comparison: { label: string; traditional: boolean }[] = [
  { label: "Specialist clinical care", traditional: true },
  { label: "Multiple specialist facilities in one network", traditional: false },
  { label: "Critical care, dialysis, fertility, endoscopy under one group", traditional: false },
  { label: "Healthcare consulting practice", traditional: false },
  { label: "Medical technology & biomedical engineering", traditional: false },
  { label: "Corporate healthcare programmes", traditional: false },
  { label: "Nationwide partner delivery", traditional: false },
];

function WhyZendale() {
  return (
    <section className="bg-porcelain py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-steel">Why Zendale</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
            One hospital solves one problem. A network solves yours.
          </h2>
        </Reveal>
        <Reveal className="mt-12" variant="sweep">
          <div className="grid overflow-hidden lg:grid-cols-2">
            {/* Traditional provider — mist surface */}
            <div className="bg-mist p-8 lg:p-12">
              <p className="eyebrow text-carbon/60">A traditional provider</p>
              <p className="mt-3 font-display text-2xl text-ink">One hospital. One location. A fixed menu of services.</p>
              <ul className="mt-8 space-y-4">
                {comparison.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-sm text-carbon/80">
                    {row.traditional ? <MarkYes /> : <MarkLimited />}
                    <span className={row.traditional ? "" : "text-carbon/50"}>{row.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Zendale — ink surface */}
            <div className="bg-ink p-8 text-porcelain lg:p-12">
              <p className="eyebrow text-brass">Zendale</p>
              <p className="mt-3 font-display text-2xl">An integrated network that answers every part of the question.</p>
              <ul className="mt-8 space-y-4">
                {comparison.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-sm text-porcelain/85">
                    <MarkYes />
                    <span>{row.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  06 · We Support — industries marquee in the mono face              */
/* ------------------------------------------------------------------ */

function WeSupport() {
  const track = [...industries, ...industries];
  return (
    <section className="border-y border-ink/10 bg-porcelain py-14" aria-label="Who we support">
      <Reveal>
        <p className="eyebrow px-5 text-steel lg:px-8">We Support</p>
      </Reveal>
      <div className="marquee-viewport mt-6 overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {track.map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-10 font-mono text-lg uppercase tracking-eyebrow text-carbon/70">
              {name}
              <span className="inline-block h-2 w-2 rotate-45 border border-brass" />
            </span>
          ))}
        </div>
      </div>
      {/* Accessible static list for screen readers and reduced motion */}
      <ul className="sr-only">
        {industries.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  07 · Capability pillars strip                                      */
/* ------------------------------------------------------------------ */

function PillarsStrip() {
  return (
    <section className="bg-porcelain py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-steel">Capability Pillars</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Five ways into one ecosystem.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <Link to={p.route} className="z-sweep block h-full bg-porcelain p-7 text-ink transition-colors hover:bg-mist/60">
                <NodeEmblem motif={p.motif} className="h-10 w-10 text-steel" />
                <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">{p.code}</p>
                <h3 className="mt-2 font-display text-lg leading-snug">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon/70">{p.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  08 · Resource & Downloads teaser — gated lead form                 */
/* ------------------------------------------------------------------ */

function ResourceTeaser() {
  const [done, setDone] = useState(false);
  return (
    <section className="bg-mist/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Resources & Downloads</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Guides written for the people who make healthcare decisions.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-carbon/80">
            Referral guides for clinicians. Programme guides for HR. Equipment and
            lifecycle guides for hospitals. Plus insights from a group that runs
            facilities, not just writes about them.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-carbon/80">
            <li className="flex gap-3"><MarkYes /> Endoscopy, ICU, Fertility, Equipment & Corporate Health guides</li>
            <li className="flex gap-3"><MarkYes /> Case studies in challenge–approach–outcome format</li>
            <li className="flex gap-3"><MarkYes /> Insights and white papers from operating experience</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/resources" variant="outline">Browse the Resource Centre</Button>
            <Button to="/downloads" variant="outline">Open the Download Centre</Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bg-ink p-8 text-porcelain lg:p-10">
            {done ? (
              <div role="status">
                <p className="eyebrow text-brass">You're set</p>
                <h3 className="mt-3 font-display text-2xl">The Download Centre is open to you.</h3>
                <p className="mt-3 text-sm leading-relaxed text-porcelain/75">
                  Head over and take the guides you need — each one downloads immediately.
                </p>
                <div className="mt-6">
                  <Button to="/downloads" variant="brass">Go to the Download Centre</Button>
                </div>
              </div>
            ) : (
              <>
                <p className="eyebrow text-brass">Get the guides</p>
                <h3 className="mt-3 font-display text-2xl">Tell us who to send them to.</h3>
                <div className="mt-6">
                  <LeadGateForm
                    idPrefix="home-gate"
                    itemLabel="the guides"
                    submitLabel="Unlock the Download Centre"
                    dark
                    onComplete={() => {
                      sessionStorage.setItem("zendale-lead", "1");
                      setDone(true);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  09 · Consultation band                                             */
/* ------------------------------------------------------------------ */

function ConsultationBand() {
  const wa = whatsappLink("Hello Zendale — I'd like to talk to your team.");
  return (
    <section className="bg-ink py-20 text-porcelain lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="brass-rule mb-10" />
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-brass">Start the conversation</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                Tell us the problem. We'll bring the network.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" variant="brass">Talk to Our Team</Button>
              {wa && <Button href={wa} variant="light">Chat on WhatsApp</Button>}
              <Button to="/contact#callback" variant="light">Request a Callback</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title={SITE.tagline}
        description="Zendale is an integrated healthcare group uniting specialist care, healthcare consulting, medical technology, corporate health and hospital partnerships in one coordinated network."
      />
      <Hero />
      <WhoWeAre />
      <NetworkPreview />
      <HowWeWorkStrip />
      <WhyZendale />
      <WeSupport />
      <PillarsStrip />
      <ResourceTeaser />
      <ConsultationBand />
    </>
  );
}
