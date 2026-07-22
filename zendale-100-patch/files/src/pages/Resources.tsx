import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { resources, resourceTypes, type ResourceType } from "../data/resources";
import {
  articlePath,
  articles,
  formatArticleDate,
  isArticlePublished,
} from "../data/articles";

export default function Resources() {
  const [filter, setFilter] = useState<ResourceType | "All">("All");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const articleCards = useMemo(
    () => articles.filter((article) => import.meta.env.DEV || isArticlePublished(article, now)),
    [now]
  );

  const visibleResources = filter === "All" ? resources : resources.filter((r) => r.type === filter);
  const showArticles = filter === "All" || filter === "Article" || filter === "Healthcare Insight";
  const showOtherResources = filter !== "Article";

  return (
    <>
      <Seo
        title="Resource Centre"
        description="Evidence-led healthcare articles, institutional insights, case studies and professional guides from Zendale Limited."
        canonicalPath="/resources"
      />
      <PageHero
        eyebrow="Resource Centre"
        title="Useful healthcare thinking, written for action."
        lede="Read evidence-led articles on healthcare institutions, partnerships, corporate health, medical technology, referral networks and operational improvement."
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
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

          {showArticles && articleCards.length > 0 && (
            <div className="mt-12">
              <Reveal className="flex flex-col justify-between gap-4 border-b border-ink/15 pb-6 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-steel">Latest Articles</p>
                  <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Research translated into practical decisions.</h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-carbon/65">New articles publish every Wednesday and Friday at 9:00 AM WAT from 12 August 2026 during the current five-week series.</p>
              </Reveal>

              <div className="mt-8 grid gap-px bg-ink/10 md:grid-cols-2">
                {articleCards.map((article, index) => {
                  const published = isArticlePublished(article, now);
                  return (
                    <Reveal key={article.slug} delay={Math.min(index * 0.05, 0.25)}>
                      <article className="group h-full bg-porcelain p-7 transition-colors hover:bg-white lg:p-9">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.14em]">
                          <span className="text-brass">{article.category}</span>
                          <span className="text-carbon/70">{formatArticleDate(article.publishAt)}</span>
                          <span className="text-carbon/70">{article.readMinutes} min read</span>
                          {!published && import.meta.env.DEV && (
                            <span className="border border-brass/40 px-2 py-1 text-brass">Scheduled preview</span>
                          )}
                        </div>
                        <h3 className="mt-4 font-display text-2xl leading-snug text-ink lg:text-3xl">{article.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-carbon/78 sm:text-base">{article.excerpt}</p>
                        <Link to={articlePath(article.slug)} className="mt-6 inline-block text-sm font-semibold text-steel transition-colors group-hover:text-brass">
                          Read More →
                        </Link>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}

          {showOtherResources && (
            <ul className="mt-14 space-y-px bg-ink/10" aria-label="Resources">
              {visibleResources.map((r, i) => (
                <li key={r.id}>
                  <Reveal delay={Math.min(i * 0.05, 0.3)}>
                  <article className="z-sweep bg-porcelain p-7 lg:p-9">
                    <p className="eyebrow text-brass">{r.type}</p>
                    <h2 className="mt-2 font-display text-2xl leading-snug text-ink">{r.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon/80 sm:text-base">{r.summary}</p>
                    <Link to={r.route} className="mt-4 inline-block text-sm font-medium text-steel hover:text-brass">
                      {r.routeLabel} →
                    </Link>
                  </article>
                  </Reveal>
                </li>
              ))}
              {visibleResources.length === 0 && (
                <li>
                  <p className="bg-porcelain p-9 text-sm text-carbon/70" role="status">
                    Nothing is available in this category yet. Try another filter or ask us directly for what you need.
                  </p>
                </li>
              )}
            </ul>
          )}

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Button to="/downloads">Open the Professional Download Centre</Button>
            <Button to="/contact" variant="outline">Ask for something specific</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
