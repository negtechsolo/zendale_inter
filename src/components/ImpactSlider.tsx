import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SmartImage } from "./SmartImage";
import { projects } from "../data/updates";
import { ketuPhcCaseStudy as ketu } from "../data/ketuPhc";
import { usePrefersReducedMotion } from "../lib/hooks";
const slides = [
  projects[0],
  {
    title: ketu.title,
    summary: ketu.homepageSummary,
    image: ketu.image.replace("/images/", ""),
    imageAlt: ketu.imageAlt,
    path: ketu.path,
    category: ketu.model,
  },
  projects[1],
  projects[2],
];
export function ImpactSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const current = slides[index];
  const move = (direction: number) =>
    setIndex((i) => (i + direction + slides.length) % slides.length);
  useEffect(() => {
    if (paused || interacting || reduced) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, [paused, interacting, reduced]);
  return (
    <section
      className="bg-mist/60 px-5 py-20 lg:px-8"
      aria-roledescription="carousel"
      aria-label="Impact in Action"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false);
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-steel">Impact in Action</p>
            <h2 className="mt-4 font-display text-4xl text-ink">
              Real work. Connected capabilities.
            </h2>
          </div>
          <Button to="/impact" variant="outline">
            Explore Our Impact
          </Button>
        </div>
        <div
          className="grid overflow-hidden bg-white lg:grid-cols-2"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current !== null) {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) {
                move(dx < 0 ? 1 : -1);
                setPaused(true);
              }
            }
            touchX.current = null;
          }}
        >
          <SmartImage
            key={current.image}
            src={current.image}
            alt={current.imageAlt}
            className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[28rem]"
          />
          <div
            className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"
            aria-live={paused || interacting || reduced ? "polite" : "off"}
            aria-atomic="true"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <p className="eyebrow text-steel">{current.category}</p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {current.title}
            </h3>
            <p className="mt-5 leading-relaxed text-carbon/80">
              {current.summary}
            </p>
            <div className="mt-7">
              <Button to={current.path}>View Project</Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                move(-1);
                setPaused(true);
              }}
              aria-label="Previous project"
              className="h-11 w-11 border border-ink/25 text-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                move(1);
                setPaused(true);
              }}
              aria-label="Next project"
              className="h-11 w-11 border border-ink/25 text-ink"
            >
              →
            </button>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="px-4 text-sm text-ink"
              >
                {paused ? "Play slideshow" : "Pause slideshow"}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.path}
                type="button"
                aria-label={`Show project ${i + 1}: ${slide.title}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className={`h-11 w-11 border text-sm ${i === index ? "border-steel bg-steel text-white" : "border-ink/25 text-ink"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
