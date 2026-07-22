import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { beginSsr, endSsr, type ResolvedSeo } from "./lib/seo";
import { facilities, facilityProfilePath } from "./data/facilities";
import { articlePath, publishedArticles } from "./data/articles";
import { SITE } from "./config";

export { beginSsr, endSsr };

/** Canonical origin, used by the pre-renderer to build the sitemap. */
export const SITE_URL = SITE.url.replace(/\/$/, "");

/** GA4 measurement id, or "" when analytics is switched off. */
export const ANALYTICS_ID = SITE.analyticsId;
export type { ResolvedSeo };

/** The element tree for one URL. Rendered by scripts/prerender.mjs. */
export function createApp(url: string) {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

/** Static routes that always exist, in sitemap priority order. */
const staticRoutes = [
  "/",
  "/about",
  "/network",
  "/services",
  "/corporate-health",
  "/consulting",
  "/medical-technology",
  "/partnerships",
  "/how-we-work",
  "/case-studies",
  "/resources",
  "/downloads",
  "/careers",
  "/contact",
  "/privacy",
];

/**
 * Every URL to pre-render.
 *
 * Facility profiles are fully enumerable. Articles are time-gated, so only
 * the ones already published at build time are pre-rendered; anything with a
 * future publish date still resolves through the SPA fallback in vercel.json
 * and appears on schedule without a redeploy.
 */
export function getRoutes(): string[] {
  return [
    ...staticRoutes,
    ...facilities.map((facility) => facilityProfilePath(facility.id)),
    ...publishedArticles().map((article) => articlePath(article.slug)),
  ];
}

/** Maps a route to the page module that renders it, for module preloading. */
export function routeModule(route: string): string {
  if (route === "/") return "src/pages/Home.tsx";
  if (route.startsWith("/network/")) return "src/pages/FacilityProfile.tsx";
  if (route.startsWith("/resources/")) return "src/pages/ArticlePage.tsx";
  const map: Record<string, string> = {
    "/about": "src/pages/About.tsx",
    "/network": "src/pages/Network.tsx",
    "/services": "src/pages/Services.tsx",
    "/corporate-health": "src/pages/CorporateHealth.tsx",
    "/consulting": "src/pages/Consulting.tsx",
    "/medical-technology": "src/pages/MedicalTechnology.tsx",
    "/partnerships": "src/pages/Partnerships.tsx",
    "/how-we-work": "src/pages/HowWeWork.tsx",
    "/resources": "src/pages/Resources.tsx",
    "/downloads": "src/pages/Downloads.tsx",
    "/case-studies": "src/pages/CaseStudies.tsx",
    "/careers": "src/pages/Careers.tsx",
    "/contact": "src/pages/Contact.tsx",
    "/privacy": "src/pages/Privacy.tsx",
  };
  return map[route] ?? "src/pages/NotFound.tsx";
}
