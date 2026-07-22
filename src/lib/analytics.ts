import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Page views for a single-page app.
 *
 * The Google tag itself is written into the <head> of every pre-rendered page
 * at build time (see scripts/prerender.mjs), which is what fires the first
 * page view and what site auditors look for in the HTML. Client-side route
 * changes do not reload the document, so each subsequent navigation is
 * reported here.
 *
 * With SITE.analyticsId empty this does nothing and no script is ever loaded.
 */
export function usePageViews() {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!SITE.analyticsId) return;
    if (isFirst.current) {
      isFirst.current = false; // the tag already reported the landing page
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);
}
