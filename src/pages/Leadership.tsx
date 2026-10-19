import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { LeadershipGroup } from "../components/LeadershipGroup";
import { Button } from "../components/Button";

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
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <LeadershipGroup />
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
