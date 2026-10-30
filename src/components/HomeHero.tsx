import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SmartImage } from "./SmartImage";
import { usePrefersReducedMotion } from "../lib/hooks";
import { projects } from "../data/updates";

const slides = [
  {
    label: "Zendale Limited",
    title: "One Partner. Complete Healthcare Solutions.",
    copy: "Zendale brings together hospitals, diagnostics, specialist care, fertility services and healthcare support within one integrated healthcare ecosystem. One trusted partner for every healthcare need.",
    image: "real/office-zendale-oct2026.webp",
    alt: "The Zendale Limited office, with a member of staff working at the desk",
    caption: "Zendale Limited · Our office",
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
  const slide = slides[index];
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
    <section className="bg-ink text-porcelain" aria-roledescription="carousel" aria-label="Discover Zendale"
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
      <div key={index} className="home-hero-slide mx-auto grid max-w-[1600px] lg:grid-cols-[0.95fr_1.05fr]" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} aria-live={manual || interacting || reduced ? "polite" : "off"}>
        <div className="flex min-w-0 flex-col justify-center px-5 pb-9 pt-12 sm:px-8 lg:min-h-[540px] lg:py-14 lg:pl-12 lg:pr-10 xl:pl-20">
          <p className="eyebrow text-brass">{slide.label}</p>
          <h1 className="mt-5 max-w-xl font-display text-[2.65rem] font-medium leading-[1.08] sm:text-5xl xl:text-[3.5rem]">{slide.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-porcelain/80 sm:text-lg">{slide.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={slide.link} variant="brass">{slide.action}</Button>
            <Button to={slide.secondary} variant="light">{slide.secondaryAction}</Button>
          </div>
        </div>
        <figure className="relative min-w-0 self-center bg-[#e8edf1]">
          <SmartImage src={slide.image} alt={slide.alt} eager fill className="aspect-[4/3] w-full" imgClassName="!object-contain" sizes="(min-width: 1600px) 820px, (min-width: 1024px) 53vw, 100vw" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-5 py-3 text-xs leading-relaxed text-white sm:px-7">{slide.caption}</figcaption>
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
