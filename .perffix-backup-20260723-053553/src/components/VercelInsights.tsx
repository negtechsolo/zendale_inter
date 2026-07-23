import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useLocation } from "react-router-dom";

/**
 * Vercel Web Analytics and Speed Insights.
 *
 * Vercel's setup screens show Next.js imports; this project is Vite plus
 * React Router, so the `/react` entry points are the correct ones.
 *
 * Passing `route` groups measurements by route pattern rather than by literal
 * URL, so all eight facility pages report together as /network/:facilityId
 * instead of appearing as eight unrelated rows. `path` keeps the individual
 * URL for the detail view.
 *
 * Both components only send data from a real Vercel deployment. Locally and
 * in Codespaces they stay silent, which is why the dashboard stays empty
 * until this is deployed.
 */
export function VercelInsights() {
  const { pathname } = useLocation();
  const route = patternFor(pathname);

  return (
    <>
      <Analytics route={route} path={pathname} />
      <SpeedInsights route={route} />
    </>
  );
}

/** Collapses dynamic segments so reports group sensibly. */
function patternFor(pathname: string): string {
  if (/^\/network\/[^/]+$/.test(pathname)) return "/network/:facilityId";
  if (/^\/resources\/[^/]+$/.test(pathname)) return "/resources/:slug";
  return pathname;
}
