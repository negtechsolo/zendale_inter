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
import { facilities, facilityProfilePath } from "../data/facilities";
import { pillars } from "../data/pillars";
import { industries } from "../data/services";
import { SITE, whatsappLink } from "../config";

/* ------------------------------------------------------------------ */
/*  01 · Hero, The Zendale Ecosystem                                  */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-porcelain">
      <img
        src="/images/home-hero-texture.webp"
        srcSet="/images/home-hero-texture-400.webp 400w, /images/home-hero-texture-800.webp 800w, /images/home-hero-texture-1200.webp 1200w, /images/home-hero-texture.webp 1536w"
        sizes="100vw"
        width="1536"
        height="1024"
        alt=""
        aria-hidden="true"
        loading="eager"
        {...{ fetchpriority: "high" }}
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.1]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/80 to-ink/20 md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-20 md:grid-cols-12 md:items-start md:gap-8 md:pb-16 md:pt-24 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="relative z-20 order-1 md:col-span-6 lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-brass">The Zendale Ecosystem</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 max-w-[42rem] font-display text-[2.65rem] font-medium leading-[1.02] sm:text-6xl lg:text-[3.7rem] xl:text-[4rem]">
              <span className="block">One Partner.</span>
              <span className="block lg:whitespace-nowrap">Complete Healthcare</span>
              <span className="block">Solutions.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-porcelain/80 sm:text-lg">
              Zendale brings together hospitals, diagnostics, specialist care, fertility services and
              healthcare support within one integrated healthcare ecosystem. One trusted partner for every healthcare need.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Button to="/partnerships" variant="brass">Partner With Zendale</Button>
              <Button to="/network" variant="light">Explore Our Healthcare Network</Button>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-8 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-porcelain/60 md:mt-10 lg:whitespace-nowrap">
              {`Current network: ${facilities.length} institutions · 6 capability pillars · one coordinated system`}
            </p>
          </Reveal>
        </div>

        <div className="relative order-2 h-[250px] w-full md:col-span-6 md:h-[340px] md:pt-2 lg:col-span-6 lg:h-[360px] lg:pt-0">
          <EcosystemHero />
        </div>
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
            <div className="mt-6 space-y-4 text-base leading-relaxed text-carbon/85 sm:text-lg">
              <p>
                The challenge in healthcare isn’t finding one service. It’s bringing the right services together. That’s why Zendale was built.
              </p>
              <p>
                Behind one name is a <strong className="font-semibold text-ink">coordinated network</strong> of hospitals, diagnostics, specialist care, fertility services and healthcare support, <strong className="font-semibold text-ink">providing complete healthcare solutions</strong> for individuals, organisations, healthcare institutions and development partners through <strong className="font-semibold text-ink">one trusted partner</strong>.
              </p>
            </div>
            <div className="mt-8">
              <Button to="/about" variant="outline">Why Zendale</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" variant="sweep" delay={0.15}>
            <SmartImage
              src="home-who-we-are.webp"
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

const partnershipPathways = [
  "Corporate Organisation",
  "Hospital/Clinic",
  "Government or Non Government Agency",
  "HMO",
  "Healthcare Investor",
  "International Organisation",
];

function PartnershipGateway() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-porcelain lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
        <svg viewBox="0 0 1200 620" className="h-full w-full" preserveAspectRatio="none">
          <path d="M80 120 H1040 L260 500 H1140" fill="none" stroke="#4A6FA5" strokeWidth="1" />
          <path d="M600 310 80 120 M600 310 1040 120 M600 310 260 500 M600 310 1140 500" fill="none" stroke="#C89B5A" strokeOpacity="0.55" strokeWidth="0.8" />
          <circle cx="600" cy="310" r="11" fill="#C89B5A" />
        </svg>
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-brass">Partnership Opportunities</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            Six pathways for organisations building better healthcare.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-porcelain/75">
            From workforce programmes and referral relationships to public health delivery, facility transformation, investment and international collaboration, Zendale structures each conversation around the institution and the result it needs.
          </p>
          <div className="mt-8">
            <Button to="/partnerships" variant="brass">Explore Partnership Pathways</Button>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <div className="grid gap-px bg-porcelain/10 sm:grid-cols-2">
            {partnershipPathways.map((pathway, index) => (
              <Reveal key={pathway} delay={index * 0.05}>
                <Link
                  to="/partnerships"
                  className="group flex h-full items-start gap-4 bg-ink p-6 transition-colors hover:bg-[#102746]"
                >
                  <span className="font-mono text-xs tracking-eyebrow text-brass">0{index + 1}</span>
                  <span>
                    <span className="font-display text-xl leading-tight">{pathway}</span>
                    <span className="mt-3 block text-xs font-medium uppercase tracking-[0.18em] text-steel transition-transform group-hover:translate-x-1">Start the conversation →</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PurposeSnapshot() {
  const purpose = [
    {
      label: "Vision",
      copy: "To transform healthcare delivery in Nigeria through a trusted and integrated healthcare ecosystem that delivers accessible, reliable, and quality healthcare for everyone.",
    },
    {
      label: "Mission",
      copy: "To build and strengthen healthcare institutions grounded in compassionate care, ethical practice, and operational excellence, while improving access to quality healthcare across communities.",
    },
    {
      label: "Philosophy",
      copy: "Healthcare transformation comes from building and connecting strong institutions that work together with shared purpose, accountability and a long-term commitment to quality care.",
    },
  ];

  return (
    <section className="bg-porcelain py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-steel">Our Purpose</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Growth is meaningful when it strengthens healthcare institutions and improves access.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-ink/10 lg:grid-cols-3">
          {purpose.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <article className={`relative h-full overflow-hidden p-8 lg:p-10 ${index === 1 ? "bg-mist" : "bg-porcelain"}`}>
                <span className="absolute right-5 top-2 font-display text-8xl text-steel/[0.05]" aria-hidden="true">0{index + 1}</span>
                <p className="eyebrow text-brass">{item.label}</p>
                <p className="relative mt-5 font-display text-xl leading-snug text-ink sm:text-2xl">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <Button to="/about" variant="outline">Read Our Philosophy and Core Values</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  03 · Healthcare Network preview, connected constellation grid     */
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
            A growing network. One coordinated system.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-porcelain/75">
            The institutions below make up the current Zendale network. The structure is designed to connect today's specialist capabilities while making room for new facilities and partnerships as the ecosystem grows.
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
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  <Link to={facilityProfilePath(f.id)} className="inline-block text-sm font-medium text-steel transition-colors hover:text-brass">
                    Learn More →
                  </Link>
                  {f.url ? (
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-porcelain/60 transition-colors hover:text-brass">
                      Visit Facility ↗
                    </a>
                  ) : f.internal ? (
                    <Link to={f.internal} className="inline-block text-sm font-medium text-porcelain/60 transition-colors hover:text-brass">
                      Visit Practice →
                    </Link>
                  ) : null}
                </div>
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
/*  04 · How We Work, a true sequence on a diagonal flowing path      */
/* ------------------------------------------------------------------ */

const steps = [
  { n: "01", title: "Understand your need", copy: "We begin with a conversation. Whether you are a patient, HR lead, hospital CEO or agency representative, we start by understanding the actual problem." },
  { n: "02", title: "Assess requirements", copy: "We map the need to the network: which facilities, disciplines or teams the work truly requires." },
  { n: "03", title: "Assign specialist team", copy: "You get named clinicians, engineers or consultants who are accountable for your outcome." },
  { n: "04", title: "Deliver solution", copy: "Care is delivered, equipment is commissioned and programmes are launched according to the plan we agreed together." },
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
        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-steel/40 lg:block"
            style={{ transform: "rotate(3.5deg)" }}
            aria-hidden="true"
          />
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 0.1}>
                  <div className="relative lg:pt-0" style={{ marginTop: `calc(${i} * 0.9rem)` }}>
                    <span className="flex h-14 w-14 items-center justify-center border border-steel bg-porcelain font-mono text-sm text-steel">
                      {s.n}
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-carbon/75">{s.copy}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="mt-12">
          <Button to="/how-we-work" variant="outline">See how we work in full</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 · Why Zendale, designed comparison panel                       */
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
            One hospital delivers one part of care. Zendale connects the entire healthcare journey.
          </h2>
        </Reveal>
        <Reveal className="mt-12" variant="sweep">
          <div className="grid overflow-hidden lg:grid-cols-2">
            {/* Traditional provider, mist surface */}
            <div className="bg-mist p-8 lg:p-12">
              <p className="eyebrow text-carbon/70">A traditional provider</p>
              <p className="mt-3 font-display text-2xl text-ink">One hospital. One location. A fixed menu of services.</p>
              <ul className="mt-8 space-y-4">
                {comparison.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-sm text-carbon/80">
                    {row.traditional ? <MarkYes /> : <MarkLimited />}
                    <span className={row.traditional ? "" : "text-carbon/70"}>{row.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Zendale, ink surface */}
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
/*  06 · We Support, industries marquee in the mono face              */
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
            Six ways into one ecosystem.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
/*  08 · Resource & Downloads teaser, gated lead form                 */
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
            <li className="flex gap-3"><MarkYes /> Case studies presented through the challenge, approach and outcome</li>
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
                  Visit the Download Centre and access the guides you need immediately.
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
  const wa = whatsappLink("Hello Zendale, I'd like to talk to your team.");
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
        description="An integrated healthcare group in Lagos connecting specialist care, consulting, medical technology and corporate health through one coordinated network."
      />
      <Hero />
      <WhoWeAre />
      <PartnershipGateway />
      <PurposeSnapshot />
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
