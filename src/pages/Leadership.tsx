import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { leadership } from "../data/leadership";

export default function Leadership() {
  return (
    <>
      <Seo
        title="Our Leadership"
        description="Meet the leadership team of Zendale Limited across healthcare, business strategy, finance and people."
        canonicalPath="/leadership"
      />
      <PageHero
        eyebrow="Our Leadership"
        title="The people guiding our connected healthcare group."
        lede="Meet the team leading Zendale Limited across healthcare, business strategy, finance and people."
      />
      <section className="bg-porcelain py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 lg:px-8">
          {leadership.map((person) => (
            <article
              key={person.name}
              className="overflow-hidden border border-ink/10 bg-white"
            >
              <SmartImage
                src={person.image}
                alt={person.name}
                className="aspect-[4/5] w-full"
                imgClassName="object-top"
              />
              <div className="p-7">
                <p className="eyebrow text-steel">{person.credential}</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  {person.name}
                </h2>
                <p className="mt-3 font-medium text-steel">{person.title}</p>
                <p className="mt-4 leading-relaxed text-carbon/80">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-ink px-5 py-16 text-center text-porcelain">
        <h2 className="mb-6 font-display text-3xl">Connect with Zendale.</h2>
        <Button to="/contact" variant="brass">
          Talk to Our Team
        </Button>
      </section>
    </>
  );
}
