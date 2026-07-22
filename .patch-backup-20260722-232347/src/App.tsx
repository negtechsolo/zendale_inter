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

/** Prefetch all route chunks once the browser is idle: navigation becomes
 *  instant, and chunks already in memory survive a redeploy mid-session. */
function usePrefetchRoutes() {
  useEffect(() => {
    const prefetch = () => {
      [
        () => import("./pages/About"), () => import("./pages/Network"),
        () => import("./pages/FacilityProfile"),
        () => import("./pages/Services"), () => import("./pages/CorporateHealth"),
        () => import("./pages/Consulting"), () => import("./pages/MedicalTechnology"),
        () => import("./pages/Partnerships"), () => import("./pages/HowWeWork"),
        () => import("./pages/Resources"), () => import("./pages/ArticlePage"), () => import("./pages/Downloads"),
        () => import("./pages/CaseStudies"), () => import("./pages/Careers"),
        () => import("./pages/Contact"), () => import("./pages/Privacy"),
      ].forEach((f) => f().catch(() => {})); // best-effort; lazyRetry covers failures
    };
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 1800);
    }
  }, []);
}

export default function App() {
  usePrefetchRoutes();
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
