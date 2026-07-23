import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    __zReveal?: () => void;
  }
}

/**
 * Tells the scroll-reveal bootstrap (see index.html) to pick up the elements
 * belonging to a newly navigated page. The bootstrap also watches for DOM
 * changes on its own; this simply makes the hand-off immediate.
 */
export function useRevealRescan() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.__zReveal?.();
  }, [pathname]);
}
