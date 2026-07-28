import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Seo, addJsonLd } from "../lib/seo";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SITE } from "../config";
import { ketuPhcCaseStudy } from "../data/ketuPhc";

function buildCaseStudySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ketuPhcCaseStudy.title,
    description: ketuPhcCaseStudy.summary,
    mainEntityOfPage: new URL(ketuPhcCaseStudy.path, SITE.url).toString(),
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: new URL("/images/zendale-logo.webp", SITE.url).toString(),
      },
    },
    about: [
      "Primary healthcare",
      "Public–Private Partnership",
      "Diagnostic services",
      "Healthcare operations",
    ],
  };
}

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Success Stories",
        item: new URL("/case-studies", SITE.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ketuPhcCaseStudy.facility,
        item: new URL(ketuPhcCaseStudy.path, SITE.url).toString(),
      },
    ],
  };
}

function CaseStudySchema() {
  if (typeof window === "undefined") {
    addJsonLd(buildCaseStudySchema());
    addJsonLd(buildBreadcrumbSchema());
  }

  useEffect(() => {
    document
      .querySelectorAll("script[data-zendale-ketu-case-schema], script[data-zendale-ketu-breadcrumb-schema]")
      .forEach((node) => node.remove());

    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.dataset.zendaleKetuCaseSchema = "1";
    articleScript.text = JSON.stringify(buildCaseStudySchema());
    document.head.appendChild(articleScript);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.dataset.zendaleKetuBreadcrumbSchema = "1";
    breadcrumbScript.text = JSON.stringify(buildBreadcrumbSchema());
    document.head.appendChild(breadcrumbScript);

    return () => {
      articleScript.remove();
      breadcrumbScript.remove();
    };
  }, []);

  return null;
}

const snapshot = [
  ["Partnership model", ketuPhcCaseStudy.model],
  ["Healthcare facility", ketuPhcCaseStudy.facility],
  ["Delivery partner", `${ketuPhcCaseStudy.partner}, Zendale Group`],
  ["Primary focus", "Diagnostics, operational coordination and sustainable service delivery"],
  ["Engagement status", ketuPhcCaseStudy.status],
  ["Next phase", "Proposed expansion of advanced imaging services, subject to approval"],
];

const existingSupport = [
  "Operational coordination for diagnostic service delivery",
  "Qualified and trained personnel",
  "Patient workflow, reporting and turnaround-time management",
  "Consumables and imaging materials for supported services",
  "Routine maintenance, calibration and quality assurance",
  "Regulatory, quality-control and safety compliance",
];

const proposedExpansion = [
  "Echocardiography for non-invasive assessment of heart structure and function",
  "General X-ray services",
  "Mammography for breast screening and early detection",
  "Advanced ultrasound imaging, including Doppler studies",
];

const intendedImpact = [
  "Improve access to reliable diagnostic services within the community",
  "Reduce avoidable referrals to external diagnostic providers",
  "Support earlier detection and faster clinical decision-making",
  "Strengthen continuity of care within the PHC",
  "Support patient confidence, retention and long-term facility sustainability",
  "Provide a partnership framework that other primary healthcare centres can assess and adapt",
];

export default function KetuPhcCaseStudy() {
  return (
    <>
      <Seo
        title="Ikosi Ketu PHC Partnership Case Study"
        description="How LifeCentre Medical Diagnostics and Ikosi Ketu Primary Healthcare Centre are using a Public–Private Partnership to strengthen diagnostics, operations and sustainable primary healthcare delivery."
        canonicalPath={ketuPhcCaseStudy.path}
      />
      <CaseStudySchema />

      <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-porcelain lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
          <svg viewBox="0 0 1200 620" className="h-full w-full" preserveAspectRatio="none">
            <path d="M70 118 H1070 L260 500 H1150" fill="none" stroke="#4A6FA5" strokeWidth="1" />
            <path d="M650 310 70 118 M650 310 1070 118 M650 310 260 500 M650 310 1150 500" fill="none" stroke="#C89B5A" strokeOpacity="0.6" strokeWidth="0.75" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-porcelain/55" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brass">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/case-studies" className="hover:text-brass">Success Stories</Link>
            <span aria-hidden="true">/</span>
            <span className="text-porcelain/80">Ikosi Ketu PHC</span>
          </nav>

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow text-brass">{ketuPhcCaseStudy.category}</p>
              <h1 className="mt-4 max-w-5xl font-display text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-6xl">
                {ketuPhcCaseStudy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-porcelain/75 sm:text-lg">
                {ketuPhcCaseStudy.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" variant="brass">Discuss a Similar Partnership</Button>
                <Button to="/consulting" variant="light">Explore Healthcare Consulting</Button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-4" delay={0.1}>
              <div className="border border-porcelain/15 bg-porcelain/[0.04] p-6">
                <p className="eyebrow text-steel">Partnership Snapshot</p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-porcelain/50">Facility</dt>
                    <dd className="mt-1 text-porcelain">{ketuPhcCaseStudy.facility}</dd>
                  </div>
                  <div>
                    <dt className="text-porcelain/50">Location</dt>
                    <dd className="mt-1 text-porcelain">{ketuPhcCaseStudy.location}</dd>
                  </div>
                  <div>
                    <dt className="text-porcelain/50">Model</dt>
                    <dd className="mt-1 text-porcelain">{ketuPhcCaseStudy.model}</dd>
                  </div>
                  <div>
                    <dt className="text-porcelain/50">Status</dt>
                    <dd className="mt-1 text-brass">{ketuPhcCaseStudy.status}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="relative z-10 -mt-8 sm:-mt-12">
            <figure className="overflow-hidden bg-mist shadow-[0_18px_60px_rgba(20,27,37,0.14)]">
              <img
                src={ketuPhcCaseStudy.image}
                width="1448"
                height="1086"
                alt={ketuPhcCaseStudy.imageAlt}
                loading="eager"
                decoding="async"
                className="aspect-[16/9] w-full object-cover object-center"
              />
              <figcaption className="border-t border-ink/10 bg-porcelain px-5 py-3 text-xs text-carbon/65 sm:px-6">
                {ketuPhcCaseStudy.facility}, Lagos.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-steel">The Context</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              A 24-hour primary healthcare facility with an opportunity to expand local diagnostic access.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="space-y-5 text-base leading-[1.8] text-carbon/85">
              <p>
                Ikosi Ketu Primary Healthcare Centre was established to provide round-the-clock primary healthcare for its surrounding community. As demand grew, the facility needed an operating and diagnostic model that could make more reliable services available locally while supporting the long-term sustainability of the PHC.
              </p>
              <p>
                LifeCentre Medical Diagnostics entered into a Public–Private Partnership with the PHC and the local government to support diagnostic service delivery through coordinated operations, qualified personnel, management systems and a sustainable revenue model.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-steel">The Partnership Model</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Strengthening service delivery through shared operational responsibility.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-carbon/80">
              The partnership is structured to improve access to reliable and affordable diagnostic services while supporting proper management, staffing, equipment care, quality assurance and regulatory compliance.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {snapshot.map(([label, value], index) => (
              <Reveal key={label} delay={index * 0.05}>
                <div className="h-full bg-porcelain p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">0{index + 1}</p>
                  <h3 className="mt-4 text-sm font-medium text-steel">{label}</h3>
                  <p className="mt-2 font-display text-xl leading-snug text-ink">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Operational Support</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              The operating foundation behind the diagnostic service.
            </h2>
            <ul className="mt-8 space-y-4 border-l-2 border-brass/70 pl-6 text-base leading-relaxed text-carbon/85">
              {existingSupport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-ink p-8 text-porcelain lg:p-10">
              <p className="eyebrow text-brass">Next Phase</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
                Expanding diagnostic capacity within the PHC.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-porcelain/75">
                Building on the existing diagnostic services at Ikosi Ketu PHC, the partnership is exploring an expansion of on-site imaging services to support earlier diagnosis, reduce external referrals and strengthen continuity of care within the community.
              </p>
              <ul className="mt-7 space-y-4 text-sm leading-relaxed text-porcelain/85">
                {proposedExpansion.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-steel">Intended Impact</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              A practical model for stronger and more sustainable primary healthcare.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-carbon/80">
              The partnership is designed to strengthen access, continuity and facility sustainability without publishing unverified performance figures.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {intendedImpact.map((item, index) => (
                <Reveal key={item} delay={index * 0.05}>
                  <div className="h-full bg-porcelain p-7">
                    <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">0{index + 1}</p>
                    <p className="mt-4 text-base leading-relaxed text-carbon/85">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-brass">Replicating the Model</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              Exploring a partnership to strengthen a PHC or healthcare institution?
            </h2>
          </Reveal>
          <Reveal className="flex flex-wrap gap-4" delay={0.1}>
            <Button to="/contact" variant="brass">Discuss a Similar Partnership</Button>
            <Button to="/case-studies" variant="light">View More Success Stories</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
