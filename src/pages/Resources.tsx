import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { resources, resourceTypes, type ResourceType } from "../data/resources";

export default function Resources() {
  const [filter, setFilter] = useState<ResourceType | "All">("All");
  const visible = filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <>
      <Seo
        title="Resource Centre"
        description="The Zendale Resource Centre: articles, case studies, professional guides, healthcare insights, white papers, corporate health resources and referral guides."
      />
      <PageHero
        eyebrow="Resource Centre"
        title="Written by operators. Read by decision-makers."
        lede="Everything here comes from running facilities, programmes and equipment — filter by what you need, read in place, and follow each piece to the part of Zendale it came from."
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources by type">
              {(["All", ...resourceTypes] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={filter === t}
                  onClick={() => setFilter(t)}
                  className={`border px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-eyebrow transition-colors ${
                    filter === t
                      ? "border-steel bg-steel text-porcelain"
                      : "border-ink/20 bg-white text-carbon/80 hover:border-steel hover:text-steel"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 space-y-px bg-ink/10" role="list" aria-label="Resources">
            {visible.map((r, i) => (
              <Reveal key={r.id} delay={Math.min(i * 0.05, 0.3)}>
                <article role="listitem" className="z-sweep bg-porcelain p-7 lg:p-9">
                  <p className="eyebrow text-brass">{r.type}</p>
                  <h2 className="mt-2 font-display text-2xl leading-snug text-ink">{r.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon/80 sm:text-base">{r.summary}</p>
                  <Link to={r.route} className="mt-4 inline-block text-sm font-medium text-steel hover:text-brass">
                    {r.routeLabel} →
                  </Link>
                </article>
              </Reveal>
            ))}
            {visible.length === 0 && (
              <p className="bg-porcelain p-9 text-sm text-carbon/70" role="status">
                Nothing in this category yet — new material is added as it's written.
                Try another filter, or ask us directly for what you need.
              </p>
            )}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Button to="/downloads">Open the Professional Download Centre</Button>
            <Button to="/contact" variant="outline">Ask for something specific</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
