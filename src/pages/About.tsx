import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { Button } from "../components/Button";
import { NodeEmblem } from "../components/NodeEmblem";
import { pillars } from "../data/pillars";

const coreValues = [
  {
    name: "Compassion",
    copy:
      "We place people at the center of everything we do by fostering empathy, dignity, respect, and meaningful impact across the healthcare ecosystem.",
  },
  {
    name: "Excellence",
    copy:
      "We are committed to excellence in healthcare leadership, governance, operations, and service delivery, aligned with international standards and global best practices through accountability and continuous improvement.",
  },
  {
    name: "Integrity",
    copy:
      "We uphold ethical practice, professionalism, transparency, and trust in every aspect of our work and partnerships.",
  },
  {
    name: "Collaboration",
    copy:
      "We believe stronger healthcare systems are built through collaboration, integration, teamwork, and shared purpose.",
  },
  {
    name: "Growth with Purpose",
    copy:
      "We pursue intentional growth and innovation that strengthen healthcare institutions, improve access to quality healthcare, and create lasting impact.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="Who We Are"
        description="Zendale builds and connects strong healthcare institutions in one integrated ecosystem, grounded in compassionate care and operational excellence."
      />
      <PageHero
        eyebrow="Who We Are"
        title="Many parts. One system. One promise."
        lede="Zendale builds and connects strong healthcare institutions so patients, organisations and communities can reach quality care, expertise and infrastructure through one trusted ecosystem."
        image={{ src: "about-hero.webp", alt: "Zendale clinicians and consultants working across the group's facilities" }}
      />

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5" variant="sweep">
            <SmartImage
              src="about-story.webp"
              alt="Inside a Zendale network facility during a working day"
              className="diag-mask-reverse aspect-[3/4] w-full"
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow text-steel">Why Zendale</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Healthcare is strongest when it is connected
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-carbon/85">
              <p>
                Access to quality healthcare should be simple. Instead, many patients and organisations find themselves navigating a fragmented system, moving between hospitals, laboratories, specialists and service providers, with little connection between them.
              </p>
              <p>
                At Zendale, we believe healthcare works best when it is connected.
              </p>
              <p>
                We have built an integrated healthcare network that brings together hospitals, specialist care, diagnostics, fertility services and other essential healthcare services within one coordinated ecosystem. Whether you need routine medical care, advanced diagnostics, specialist procedures or long-term clinical support, our network is designed to deliver seamless, high-quality healthcare through one trusted partner.
              </p>
              <p>
                For organisations, this means comprehensive healthcare solutions that support the health and wellbeing of your workforce. For healthcare institutions, it means partnering with a team that understands every aspect of delivering quality healthcare. For government and development partners, it means working with an experienced organisation capable of supporting healthcare initiatives from planning and implementation to long-term sustainability.
              </p>
              <p>
                Beyond patient care, we strengthen healthcare delivery through medical equipment procurement, biomedical engineering, healthcare consulting and operational support, ensuring that the facilities delivering care have the expertise, technology and infrastructure they need to perform at their best.
              </p>
              <p>
                Because healthcare is more than treating illness. It is about connecting the right people, the right expertise and the right infrastructure to deliver better outcomes. When every part of the healthcare journey works together, patients receive better care, organisations gain a trusted healthcare partner and institutions are empowered to deliver their very best.
              </p>
              <p>
                When healthcare is connected, everyone benefits. That is the healthcare ecosystem we are building at Zendale.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-porcelain lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
          <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
            <path d="M40 100 H920 L280 420 H1160" fill="none" stroke="#4A6FA5" strokeWidth="1" />
            <path d="M600 260 40 100 M600 260 920 100 M600 260 280 420 M600 260 1160 420" fill="none" stroke="#C89B5A" strokeWidth="0.8" strokeOpacity="0.6" />
            {[40, 280, 600, 920, 1160].map((x, index) => (
              <rect key={x} x={x - 7} y={(index === 0 || index === 3) ? 93 : index === 4 ? 413 : index === 1 ? 413 : 253} width="14" height="14" transform={`rotate(45 ${x} ${(index === 0 || index === 3) ? 100 : index === 4 ? 420 : index === 1 ? 420 : 260})`} fill="none" stroke="#C89B5A" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-brass">Our Philosophy</p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Strong institutions. Shared purpose. Sustainable healthcare impact.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" delay={0.06}>
              <div className="border-l border-brass pl-6 text-base leading-relaxed text-porcelain/80 sm:text-lg">
                <p>
                  At Zendale, we believe that lasting improvements in healthcare are never achieved by one person, one facility or one organisation alone. They are built through strong institutions, meaningful partnerships and a shared commitment to improving lives.
                </p>
                <p className="mt-5">
                  Our purpose is to deliver exceptional healthcare while strengthening the systems that make quality care possible. We are committed to ensuring that patients receive quality care, organisations have a trusted healthcare partner, and healthcare institutions have the expertise, resources and infrastructure needed to thrive.
                </p>
                <p className="mt-5">
                  This philosophy shapes everything we do. Through our hospitals, diagnostic centres, specialist services and healthcare support solutions, we combine clinical excellence, innovation and operational expertise to make healthcare more accessible, more coordinated and more effective for the people and organisations we serve.
                </p>
                <p className="mt-5">
                  By partnering with individuals, organisations, healthcare institutions and government, we help expand access to quality healthcare, strengthen healthcare delivery and create lasting impact within the communities we serve.
                </p>
                <p className="mt-5">
                  Because sustainable healthcare is not built by individual organisations. It is built by strong institutions working together with a shared purpose.
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.12}>
              <div className="grid gap-px bg-porcelain/10">
                {[
                  ["Strong Institutions", "Building and strengthening healthcare facilities that deliver safe, accessible and high-quality care."],
                  ["Shared Purpose", "Working alongside patients, organisations, healthcare providers and government to improve health outcomes through trusted partnerships."],
                  ["Sustainable Impact", "Creating lasting healthcare solutions by combining clinical excellence, innovation and operational expertise within one integrated ecosystem."],
                ].map(([title, copy], index) => (
                  <div key={title} className="bg-ink p-6">
                    <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">0{index + 1}</p>
                    <h3 className="mt-2 font-display text-2xl">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-porcelain/65">{copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">Our Direction</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              A clear vision supported by a practical mission.
            </h2>
          </Reveal>
          <div className="relative mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden bg-ink p-8 text-porcelain lg:p-12">
                <span className="absolute right-8 top-6 font-display text-8xl text-porcelain/[0.04]" aria-hidden="true">V</span>
                <p className="eyebrow text-brass">Vision</p>
                <p className="mt-5 max-w-xl font-display text-2xl leading-snug sm:text-3xl">
                  To transform healthcare delivery in Nigeria through a trusted and integrated healthcare ecosystem that delivers accessible, reliable, and quality healthcare for everyone.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="relative h-full overflow-hidden border border-steel/20 bg-porcelain p-8 lg:p-12">
                <span className="absolute right-8 top-6 font-display text-8xl text-steel/[0.06]" aria-hidden="true">M</span>
                <p className="eyebrow text-steel">Mission</p>
                <p className="mt-5 max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl">
                  To build and strengthen healthcare institutions grounded in compassionate care, ethical practice, and operational excellence, while improving access to quality healthcare across communities.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-steel">Core Values</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
              The principles that shape how we lead, operate and partner.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-10">
            {coreValues.map((value, index) => (
              <Reveal key={value.name} className={index < 3 ? "lg:col-span-3" : "lg:col-span-5"} delay={index * 0.06}>
                <article className="group relative h-full overflow-hidden bg-porcelain p-8 transition-colors hover:bg-mist/50 lg:p-10">
                  <div className="absolute left-0 top-0 h-1 w-16 bg-brass transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-eyebrow text-brass">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-2xl text-ink">{value.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-carbon/80">{value.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-4">
            <Button to="/partnerships">Explore Partnership Opportunities</Button>
            <Button to="/contact" variant="outline">Talk to Our Team</Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-steel">The Ecosystem</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Five pillars carry everything we do.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delay={index * 0.06}>
                <div className="h-full bg-porcelain p-7">
                  <NodeEmblem motif={pillar.motif} className="h-9 w-9 text-steel" />
                  <h3 className="mt-4 font-display text-lg leading-snug text-ink">{pillar.name}</h3>
                  <p className="mt-2 text-sm text-carbon/70">{pillar.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Button to="/network">Explore Our Healthcare Network</Button>
            <Button to="/contact" variant="outline">Talk to Our Team</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
