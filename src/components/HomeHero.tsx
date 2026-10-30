import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SmartImage } from "./SmartImage";
import { usePrefersReducedMotion } from "../lib/hooks";
import { EcosystemHero } from "./EcosystemHero";
import { projects } from "../data/updates";

const slides = [
  {
    label: "Zendale Limited",
    title: "One Partner. Complete Healthcare Solutions.",
    copy: "Zendale brings together hospitals, diagnostics, specialist care, fertility services and healthcare support within one integrated healthcare ecosystem. One trusted partner for every healthcare need.",
    image: "",
    alt: "The Zendale healthcare ecosystem",
    caption: "Zendale Limited · One integrated healthcare ecosystem",
    link: "/partnerships", action: "Partner With Zendale", secondary: "/network", secondaryAction: "Explore Our Healthcare Network",
  },
  {
    label: "Our Healthcare Network",
    title: "A growing network. One coordinated system.",
    copy: "Behind one name is a coordinated network of hospitals, diagnostics, specialist care, fertility services and healthcare support.",
    image: "real/team-finnih-oct2026.webp",
    alt: "The Finnih Medical Centre team outside their facility",
    caption: "Finnih Medical Centre · Part of the Zendale network",
    link: "/network", action: "Explore Our Healthcare Network", secondary: "/network/finnih", secondaryAction: "Meet Finnih Medical Centre",
  },
  {
    label: "Impact in Action",
    title: projects[0].title,
    copy: projects[0].summary,
    image: projects[0].image,
    alt: projects[0].imageAlt,
    caption: "Corporate health · Life Centre Medicals and SkyHigh Medical Centre",
    link: projects[0].path, action: "Explore the Programme", secondary: "/corporate-health", secondaryAction: "Plan a Corporate Health Programme",
  },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [manual, setManual] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const select = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    setManual(true);
  };
  useEffect(() => {
    if (reduced || interacting || manual) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % slides.length), 9000);
    return () => window.clearInterval(timer);
  }, [reduced, interacting, manual]);

  return (
    <section className="bg-ink pt-16 text-porcelain lg:pt-20" aria-roledescription="carousel" aria-label="Discover Zendale"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      onTouchStart={event => { touchX.current = event.touches[0].clientX; }}
      onTouchEnd={event => {
        if (touchX.current !== null) {
          const delta = event.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 50) select(index + (delta < 0 ? 1 : -1));
        }
        touchX.current = null;
      }}>
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-14" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
        {/* Each slot measures every slide. Hidden alternatives keep their space,
            so changing slides cannot shift headings, buttons or the image. */}
        <div className="min-w-0">
          <div className="grid">
            {slides.map((item, i) => <p key={item.label} aria-hidden={i !== index} className={`hero-slot eyebrow text-brass ${i === index ? "hero-slot-active" : "hero-slot-hidden"}`}>{item.label}</p>)}
          </div>
          <h1 className="mt-5 grid font-display text-[2.5rem] font-medium leading-[1.08] sm:text-5xl lg:text-[clamp(2.5rem,3.5vw,3.25rem)]" aria-live={manual || interacting || reduced ? "polite" : "off"}>
            {slides.map((item, i) => <span key={item.label} aria-hidden={i !== index} className={`hero-slot ${i === index ? "hero-slot-active" : "hero-slot-hidden"}`}>{item.title}</span>)}
          </h1>
          <div className="mt-6 grid text-base leading-relaxed text-porcelain/80">
            {slides.map((item, i) => <p key={item.label} aria-hidden={i !== index} className={`hero-slot ${i === index ? "hero-slot-active" : "hero-slot-hidden"}`}>{item.copy}</p>)}
          </div>
          <div className="mt-8 grid">
            {slides.map((item, i) => <div key={item.label} aria-hidden={i !== index} className={`hero-slot flex flex-col items-start gap-3 ${i === index ? "hero-slot-active" : "hero-slot-hidden"}`}>
              <Button to={item.link} variant="brass">{item.action}</Button>
              <Button to={item.secondary} variant="light">{item.secondaryAction}</Button>
            </div>)}
          </div>
        </div>
        <figure className="min-w-0 overflow-hidden border border-white/15 bg-[#10233e]">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {slides.map((item, i) => <div key={item.label} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${i === index ? "visible opacity-100" : "invisible opacity-0"}`}>
              {item.image ? <SmartImage src={item.image} alt={item.alt} eager fill className="h-full w-full" imgClassName={i === 2 ? "object-[center_52%]" : undefined} sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw" /> : <EcosystemHero />}
            </div>)}
          </div>
          <figcaption className="grid bg-[#10233e] px-5 py-4 text-xs leading-relaxed text-porcelain/80">
            {slides.map((item, i) => <span key={item.label} aria-hidden={i !== index} className={`hero-slot ${i === index ? "hero-slot-active" : "hero-slot-hidden"}`}>{item.caption}</span>)}
          </figcaption>
        </figure>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 border-t border-porcelain/15 px-5 py-4 lg:px-8">
        <div className="flex items-center gap-2" aria-label="Choose an introduction slide">
          {slides.map((item, i) => <button key={item.label} type="button" onClick={() => select(i)} aria-label={`Show ${item.label}`} aria-current={i === index ? "true" : undefined} className="group flex h-11 w-10 items-center justify-center"><span className={`h-1 transition-all ${i === index ? "w-8 bg-brass" : "w-4 bg-white/35 group-hover:bg-white"}`} /></button>)}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => select(index - 1)} aria-label="Previous introduction" className="h-11 w-11 border border-white/30 transition-colors hover:bg-white/10">←</button>
          <button type="button" onClick={() => select(index + 1)} aria-label="Next introduction" className="h-11 w-11 border border-white/30 transition-colors hover:bg-white/10">→</button>
        </div>
      </div>
    </section>
  );
}
