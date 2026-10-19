import { Navigate, useLocation } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { projects, news } from "../data/updates";
export default function UpdateStory() {
  const path = useLocation().pathname;
  const story = [...projects, ...news].find((item) => item.path === path);
  if (!story)
    return (
      <Navigate to={path.startsWith("/news/") ? "/news" : "/impact"} replace />
    );
  return (
    <>
      <Seo
        title={story.title}
        description={story.summary}
        canonicalPath={story.path}
        image={`/images/${story.image}`}
      />
      <PageHero
        eyebrow={story.category}
        title={story.title}
        lede={story.summary}
      />
      <article className="bg-porcelain px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SmartImage
            src={story.image}
            alt={story.imageAlt}
            eager
            className="max-h-[36rem] w-full"
            imgClassName="!object-contain"
          />
          <p className="mt-3 text-sm text-carbon/65">{story.imageAlt}</p>
          <div className="mx-auto mt-12 max-w-3xl space-y-9">
            {story.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl text-ink">
                  {section.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-carbon/85">
                  {section.text}
                </p>
              </section>
            ))}
            <div className="flex flex-wrap gap-4 border-t border-ink/15 pt-8">
              <Button to="/contact">Talk to Our Team</Button>
              <Button
                to={path.startsWith("/news/") ? "/news" : "/impact"}
                variant="outline"
              >
                Explore More Stories
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
