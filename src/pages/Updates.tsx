import { useLocation } from "react-router-dom";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { StoryCards } from "../components/StoryCards";
import { projects, news } from "../data/updates";
import { ketuPhcCaseStudy as ketu } from "../data/ketuPhc";
export default function Updates() {
  const isNews = useLocation().pathname === "/news";
  const title = isNews ? "News & Sector Engagement" : "Impact in Action";
  return (
    <>
      <Seo
        title={title}
        description={
          isNews
            ? "Events, partnerships and healthcare-sector engagement from Zendale Limited."
            : "Explore Zendale’s healthcare programmes, partnerships and community outreach."
        }
        canonicalPath={isNews ? "/news" : "/impact"}
      />
      <PageHero
        eyebrow={title}
        title={
          isNews
            ? "Connected to the wider healthcare conversation."
            : "Our healthcare work, in practice."
        }
        lede={
          isNews
            ? "Selected institutional updates, partnership announcements and sector events."
            : "Corporate health programmes, community outreach and healthcare partnerships across the Zendale network."
        }
      />
      <section className="bg-porcelain px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StoryCards
            stories={
              isNews
                ? news
                : [
                    {
                      slug: ketu.slug,
                      path: ketu.path,
                      title: ketu.title,
                      category: ketu.model,
                      image: ketu.image.replace("/images/", ""),
                      imageAlt: ketu.imageAlt,
                      summary: ketu.homepageSummary,
                      sections: [],
                    },
                    ...projects,
                  ]
            }
          />
        </div>
      </section>
    </>
  );
}
