import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ContactWidget } from "./ContactWidget";
import { Preloader } from "./Preloader";
import { usePageViews } from "../lib/analytics";
import { useRevealRescan } from "../lib/reveal";
import { VercelInsights } from "./VercelInsights";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

/** Route-change fallback while a code-split page chunk loads. */
function RouteFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-porcelain"
      role="status"
      aria-label="Loading page"
    >
      <span className="eyebrow text-steel">Loading…</span>
    </div>
  );
}

export function Layout() {
  usePageViews();
  useRevealRescan();

  return (
    <>
      <Preloader />
      <ScrollToTop />
      <VercelInsights />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />

      <ContactWidget />
    </>
  );
}