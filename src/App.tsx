import { lazy, useEffect, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

/**
 * Every route is code-split; the three.js stack loads only with the home hero.
 * lazyRetry handles the classic SPA failure after a redeploy: the open tab's
 * index.html references old chunk hashes that no longer exist, the dynamic
 * import throws, and the page appears not to load until a manual refresh.
 * Here we refresh once automatically (guarded so it can never loop).
 */
function lazyRetry(factory: () => Promise<{ default: ComponentType }>) {
  return lazy(() =>
    factory().catch((error) => {
      const key = "zendale-chunk-reload";
      if (import.meta.env.MODE !== "test" && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return new Promise<never>(() => {}); // reloading, never resolves
      }
      throw error; // second failure is a real problem; surface it
    })
  );
}

const Home = lazyRetry(() => import("./pages/Home"));
const About = lazyRetry(() => import("./pages/About"));
const Network = lazyRetry(() => import("./pages/Network"));
const FacilityProfile = lazyRetry(() => import("./pages/FacilityProfile"));
const Services = lazyRetry(() => import("./pages/Services"));
const CorporateHealth = lazyRetry(() => import("./pages/CorporateHealth"));
const Consulting = lazyRetry(() => import("./pages/Consulting"));
const MedicalTechnology = lazyRetry(() => import("./pages/MedicalTechnology"));
const ProcurementSupplyChain = lazyRetry(() => import("./pages/ProcurementSupplyChain"));
const Partnerships = lazyRetry(() => import("./pages/Partnerships"));
const HowWeWork = lazyRetry(() => import("./pages/HowWeWork"));
const Resources = lazyRetry(() => import("./pages/Resources"));
const ArticlePage = lazyRetry(() => import("./pages/ArticlePage"));
const Downloads = lazyRetry(() => import("./pages/Downloads"));
const CaseStudies = lazyRetry(() => import("./pages/CaseStudies"));
const Careers = lazyRetry(() => import("./pages/Careers"));
const Contact = lazyRetry(() => import("./pages/Contact"));
const Privacy = lazyRetry(() => import("./pages/Privacy"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));

/**
 * Route chunks are prefetched on intent rather than on idle.
 *
 * The previous version fired sixteen dynamic imports as soon as the browser
 * went idle, which is why an audit of a cold homepage recorded forty HTTP
 * requests. Prefetching when a link is hovered, touched or focused keeps
 * navigation just as instant for real visitors while a first page view now
 * downloads only what it actually renders.
 */
const routeLoaders: Record<string, () => Promise<unknown>> = {
  "/about": () => import("./pages/About"),
  "/network": () => import("./pages/Network"),
  "/services": () => import("./pages/Services"),
  "/corporate-health": () => import("./pages/CorporateHealth"),
  "/consulting": () => import("./pages/Consulting"),
  "/medical-technology": () => import("./pages/MedicalTechnology"),
  "/procurement-supply-chain": () => import("./pages/ProcurementSupplyChain"),
  "/partnerships": () => import("./pages/Partnerships"),
  "/how-we-work": () => import("./pages/HowWeWork"),
  "/resources": () => import("./pages/Resources"),
  "/downloads": () => import("./pages/Downloads"),
  "/case-studies": () => import("./pages/CaseStudies"),
  "/careers": () => import("./pages/Careers"),
  "/contact": () => import("./pages/Contact"),
  "/privacy": () => import("./pages/Privacy"),
};

function loaderFor(path: string): (() => Promise<unknown>) | undefined {
  if (routeLoaders[path]) return routeLoaders[path];
  if (path.startsWith("/network/")) return () => import("./pages/FacilityProfile");
  if (path.startsWith("/resources/")) return () => import("./pages/ArticlePage");
  return undefined;
}

function usePrefetchOnIntent() {
  useEffect(() => {
    const done = new Set<string>();

    let lastTarget: Element | null = null;

    const onIntent = (event: Event) => {
      const target = event.target as Element | null;
      if (!target || target === lastTarget) return; // cheap exit while the pointer sits still
      lastTarget = target;

      const anchor = target.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const path = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
      if (done.has(path)) return;

      const load = loaderFor(path);
      if (!load) return;

      done.add(path);
      load().catch(() => done.delete(path)); // lazyRetry covers real failures
    };

    /*
     * pointerover bubbles, so one listener on the document is enough and it
     * fires only when the pointer moves onto a different element. The earlier
     * version listened for pointerenter in the capture phase, which runs for
     * every nested element the pointer passes through and did a DOM lookup on
     * each one, making mouse movement itself expensive.
     */
    /*
     * Hovering is not the only way people navigate, and on a phone there is
     * no hover at all. Once the browser is idle, the chunks for the links
     * actually on screen are fetched one at a time, so tapping a nav item
     * opens instantly without the sixteen-request burst the old idle
     * prefetch produced on first load.
     */
    let cancelled = false;
    const idle =
      (window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 900));

    function prefetchVisible() {
      if (cancelled) return;
      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
      );
      const queue: (() => Promise<unknown>)[] = [];

      for (const anchor of anchors) {
        const href = anchor.getAttribute("href");
        if (!href) continue;
        const path = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
        if (done.has(path)) continue;
        const load = loaderFor(path);
        if (!load) continue;
        done.add(path);
        queue.push(load);
      }

      // One at a time, each waiting for the next idle window.
      const next = () => {
        if (cancelled) return;
        const job = queue.shift();
        if (!job) return;
        job()
          .catch(() => undefined)
          .finally(() => idle(next, { timeout: 3000 }));
      };
      idle(next, { timeout: 3000 });
    }

    const startPrefetch = () => idle(prefetchVisible, { timeout: 4000 });
    if (document.readyState === "complete") startPrefetch();
    else window.addEventListener("load", startPrefetch, { once: true });

    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", startPrefetch);
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("touchstart", onIntent);
      document.removeEventListener("focusin", onIntent);
    };
  }, []);
}

export default function App() {
  usePrefetchOnIntent();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/network" element={<Network />} />
        <Route path="/network/:facilityId" element={<FacilityProfile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/corporate-health" element={<CorporateHealth />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/medical-technology" element={<MedicalTechnology />} />
        <Route path="/procurement-supply-chain" element={<ProcurementSupplyChain />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:articleSlug" element={<ArticlePage />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
