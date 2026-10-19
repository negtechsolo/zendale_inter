import { Link, Navigate, useLocation } from "react-router-dom";
import { Seo } from "../lib/seo";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { projects, news } from "../data/updates";

export default function UpdateStory() {
  const path = useLocation().pathname;
  const isNews = path.startsWith("/news/");
  const story = [...projects, ...news].find((item) => item.path === path);
  if (!story) return <Navigate to={isNews ? "/news" : "/impact"} replace />;

  return (
    <>
      <Seo
        title={story.title}
        description={story.summary}
        canonicalPath={story.path}
        image={`/images/${story.image}`}
      />
      <header className="bg-ink px-5 pb-12 pt-32 text-porcelain lg:px-8 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <Link to={isNews ? "/news" : "/impact"} className="text-sm text-porcelain/75 hover:text-brass">
            ← {isNews ? "All News & Sector Engagement" : "All Impact Stories"}
          </Link>
          <p className="eyebrow mt-8 text-brass">{story.category}</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-porcelain/85 sm:text-xl">
            {story.summary}
          </p>
        </div>
      </header>
      <article className="bg-porcelain px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <figure>
            <SmartImage
              fill
              src={story.image}
              alt={story.imageAlt}
              eager
              className="story-photo h-80 w-full sm:h-[36rem]"
              imgClassName="!object-contain"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
            <figcaption className="mt-4 border-b border-ink/10 pb-5 text-sm leading-relaxed text-carbon/70">
              {story.imageAlt}
            </figcaption>
          </figure>
          <div className="mt-10 space-y-10 lg:mt-12 lg:space-y-12">
            {story.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-8 text-carbon/85 sm:text-xl sm:leading-9">
                  {section.text.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <div className="flex flex-wrap gap-4 border-t border-ink/15 pt-8">
              <Button to="/contact">Talk to Our Team</Button>
              <Button to={isNews ? "/news" : "/impact"} variant="outline">
                Explore More Stories
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
