import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Seo } from "../lib/seo";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import {
  articlePath,
  articles,
  formatArticleDate,
  getArticle,
  isArticlePublished,
  type Article,
} from "../data/articles";
import { SITE } from "../config";

function useCurrentTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}

function ArticleSchema({ article }: { article: Article }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.zendaleArticleSchema = article.slug;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.publishAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: new URL(articlePath(article.slug), SITE.url).toString(),
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
      image: new URL(SITE.socialImage, SITE.url).toString(),
      keywords: [article.primaryKeyword, article.category, "Zendale Limited"],
    });
    document.head.appendChild(script);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.dataset.zendaleFaqSchema = article.slug;
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(faqScript);

    return () => {
      script.remove();
      faqScript.remove();
    };
  }, [article]);

  return null;
}

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const article = getArticle(articleSlug);
  const now = useCurrentTime();

  if (!article) return <Navigate to="/nonexistent-route" replace />;

  const publicNow = isArticlePublished(article, now);
  const canPreview = import.meta.env.DEV;
  if (!publicNow && !canPreview) return <Navigate to="/nonexistent-route" replace />;

  const related = articles
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => canPreview || isArticlePublished(candidate, now))
    .sort((a, b) => {
      const aMatch = a.category === article.category ? 1 : 0;
      const bMatch = b.category === article.category ? 1 : 0;
      return bMatch - aMatch || new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime();
    })
    .slice(0, 3);

  return (
    <>
      <Seo
        title={article.seoTitle}
        description={article.metaDescription}
        canonicalPath={articlePath(article.slug)}
        type="article"
        publishedTime={article.publishAt}
        modifiedTime={article.updatedAt}
      />
      <ArticleSchema article={article} />

      <article>
        <header className="bg-ink pb-16 pt-32 text-porcelain lg:pb-24 lg:pt-40">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-porcelain/55" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-brass">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/resources" className="hover:text-brass">Resources</Link>
              <span aria-hidden="true">/</span>
              <span className="text-porcelain/80">Article</span>
            </nav>

            <Reveal>
              <p className="eyebrow mt-8 text-brass">{article.category}</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-porcelain/75 sm:text-lg">
                {article.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-porcelain/15 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-porcelain/55">
                <span>{article.author}</span>
                <span>{formatArticleDate(article.publishAt)}</span>
                <span>{article.readMinutes} min read</span>
              </div>
              {!publicNow && canPreview && (
                <p className="mt-5 inline-block border border-brass/50 bg-brass/10 px-3 py-2 text-xs text-brass">
                  Development preview. Public release: {formatArticleDate(article.publishAt)}, 9:00 AM WAT.
                </p>
              )}
            </Reveal>
          </div>
        </header>

        <div className="bg-porcelain py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
            <aside className="lg:col-span-3">
              <div className="sticky top-28 border-l border-ink/15 pl-5">
                <p className="eyebrow text-steel">In this article</p>
                <ol className="mt-4 space-y-3 text-sm leading-snug text-carbon/70">
                  {article.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a href={`#section-${index + 1}`} className="transition-colors hover:text-steel">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="space-y-12">
                {article.sections.map((section, index) => (
                  <Reveal key={section.heading}>
                    <section id={`section-${index + 1}`} className="scroll-mt-28">
                      <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5 text-base leading-[1.8] text-carbon/85">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets && (
                        <ul className="mt-6 space-y-3 border-l-2 border-brass/70 pl-6 text-base leading-relaxed text-carbon/85">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="relative before:absolute before:-left-[1.45rem] before:top-[0.72rem] before:h-1.5 before:w-1.5 before:bg-steel">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-16 border-y border-ink/10 py-10">
                <p className="eyebrow text-steel">Frequently Asked Questions</p>
                <div className="mt-6 space-y-px bg-ink/10">
                  {article.faq.map((item) => (
                    <details key={item.question} className="group bg-porcelain p-6 open:bg-white">
                      <summary className="cursor-pointer list-none font-display text-xl text-ink">
                        <span className="flex items-start justify-between gap-6">
                          {item.question}
                          <span className="text-steel transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </span>
                      </summary>
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-carbon/80 sm:text-base">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-12 bg-mist/70 p-7 lg:p-9">
                <p className="eyebrow text-steel">Sources and Further Reading</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-carbon/80">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-steel hover:text-brass">
                        {source.title}
                      </a>
                      <span className="text-carbon/60"> · {source.organisation}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-12 bg-ink p-8 text-porcelain lg:p-10">
                <p className="eyebrow text-brass">Continue the Conversation</p>
                <h2 className="mt-4 font-display text-3xl leading-tight">{article.cta.supportingText}</h2>
                <div className="mt-7">
                  <Button to={article.cta.to} variant="brass">{article.cta.label}</Button>
                </div>
              </Reveal>

              <p className="mt-8 text-xs leading-relaxed text-carbon/55">
                This article is provided for general educational and organisational planning purposes. It does not replace professional medical, legal, regulatory or financial advice for a specific situation.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-mist/60 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Continue Reading</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Related Zendale insights</h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-ink/10 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="bg-porcelain p-7">
                <p className="eyebrow text-brass">{item.category}</p>
                <h3 className="mt-3 font-display text-xl leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon/75">{item.excerpt}</p>
                <Link to={articlePath(item.slug)} className="mt-5 inline-block text-sm font-medium text-steel hover:text-brass">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
