import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { usePrefersReducedMotion } from "../lib/hooks";
import { imageMeta, srcSetFor } from "../lib/imageMeta";
import { facilities, facilityProfilePath } from "../data/facilities";

const photographs = [
  ["finnih", "finnih", "50% 100%"],
  ["sky-high", "skyhigh", "50% 83%"],
  ["kindred-path", "kindred", "50% 43%"],
  ["zendale-endoscopy", "endoscopy", "50% 65%"],
].map(([id, file, focalPoint]) => {
  const facility = facilities.find(item => item.id === id)!;
  return { name: facility.name, path: facilityProfilePath(id), image: `home-hero/${file}.webp`, focalPoint };
});

function HeroPhoto({ index, className = "", onLoad, onError }: {
  index: number; className?: string; onLoad?: () => void; onError?: () => void;
}) {
  const { image, focalPoint } = photographs[index];
  const meta = imageMeta[image];
  return <img src={`/images/${image}`} srcSet={srcSetFor(image) || undefined} sizes="100vw"
    width={meta?.w} height={meta?.h} alt="" draggable={false} decoding="async"
    {...(!onLoad ? { fetchpriority: "high" } : {})}
    className={`absolute inset-0 h-full w-full object-contain lg:object-cover ${className}`} style={{ objectPosition: focalPoint }}
    onLoad={event => { const img = event.currentTarget; if (onLoad) void (img.decode?.() ?? Promise.resolve()).catch(() => {}).then(onLoad); }}
    onError={onError} />;
}

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const request = useRef<number | null>(null);

  const select = (next: number) => {
    const target = (next + photographs.length) % photographs.length;
    request.current = target === index ? null : target;
    setPending(request.current);
  };
  useEffect(() => {
    if (reduced || focused || pending !== null) return;
    const timeout = window.setTimeout(() => {
      const next = (index + 1) % photographs.length;
      request.current = next;
      setPending(next);
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [index, reduced, focused, pending]);
  useEffect(() => {
    if (previous === null) return;
    const timeout = window.setTimeout(() => setPrevious(null), 720);
    return () => window.clearTimeout(timeout);
  }, [previous, index]);
  const place = photographs[index];

  return (
    <section className="bg-ink pt-16 text-porcelain lg:pt-20" aria-roledescription="carousel" aria-label="Zendale healthcare network photographs">
      <div className="zendale-hero relative isolate flex flex-col overflow-hidden bg-ink"
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onTouchStart={event => { touchX.current = event.touches[0].clientX; }}
        onTouchEnd={event => {
          if (touchX.current !== null) {
            const delta = event.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 50) select(index + (delta < 0 ? 1 : -1));
          }
          touchX.current = null;
        }}>
        <div aria-hidden="true" className="pointer-events-none relative aspect-[8/5] shrink-0 lg:absolute lg:inset-0 lg:-z-20">
          {previous !== null && previous !== pending && <HeroPhoto key={previous} index={previous} />}
          <HeroPhoto key={index} index={index} className={previous !== null ? "zendale-hero-enter" : ""} />
          {pending !== null && <HeroPhoto key={pending} index={pending} className="invisible"
            onLoad={() => {
              if (request.current !== pending) return;
              request.current = null;
              setPrevious(index);
              setIndex(pending);
              setPending(null);
            }}
            onError={() => { if (request.current === pending) { request.current = null; setPending(null); } }} />}
        </div>
        <div aria-hidden="true" className="zendale-hero-shade pointer-events-none absolute inset-0 -z-10" />
        <div className="zendale-hero-copy mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-6 sm:px-8 sm:py-8">
          <div className="max-w-[44rem]">
            <p className="eyebrow text-brass">Zendale Limited</p>
            <h1 className="zendale-hero-title mt-3 font-display font-medium leading-[1.07] text-white">One Partner. Complete Healthcare Solutions.</h1>
            <p className="mt-4 max-w-[38rem] text-base leading-relaxed text-white/90">Zendale brings together hospitals, diagnostics, specialist care, fertility services and healthcare support within one integrated healthcare ecosystem. One trusted partner for every healthcare need.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button to="/partnerships" variant="brass">Partner With Zendale</Button>
              <Button to="/network" variant="light">Explore Our Healthcare Network</Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-white/30 px-5 py-1 sm:px-8">
          <div className="min-h-10 content-center text-sm" aria-live={focused ? "polite" : "off"}>
            <span className="mr-2 text-white/75">Featured:</span><a href={place.path} className="font-medium text-white underline decoration-white/45 underline-offset-4">{place.name}</a>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2" role="group" aria-label="Slideshow controls">
            <button type="button" onClick={() => select(index - 1)} aria-label="Previous introduction" className="h-11 w-9 text-xl hover:bg-white/10">←</button>
            <button type="button" onClick={() => select(index + 1)} aria-label="Next introduction" className="h-11 w-9 text-xl hover:bg-white/10">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
