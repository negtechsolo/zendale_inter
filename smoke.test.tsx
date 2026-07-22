/**
 * Smoke test (dev-only, not shipped behaviour): renders every route in jsdom
 * and fails on any thrown error or console.error. Run: npx vitest run
 */
import { describe, it, expect, beforeAll, vi } from "vitest";
import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./src/App";

const routes = [
  "/", "/about", "/network", "/services", "/corporate-health", "/consulting",
  "/medical-technology", "/partnerships", "/how-we-work", "/resources",
  "/downloads", "/case-studies", "/careers", "/contact", "/privacy",
  "/network/lifecentre", "/network/lifecentre-support",
  "/resources/building-stronger-healthcare-institutions-nigeria", "/nonexistent-route",
];

beforeAll(() => {
  // jsdom lacks these browser APIs; the site itself feature-checks them.
  window.matchMedia = window.matchMedia || ((q: string) => ({
    matches: false, media: q, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  })) as any;
  (globalThis as any).IntersectionObserver = class {
    observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  };
  (globalThis as any).ResizeObserver = class {
    observe() {} unobserve() {} disconnect() {}
  };
  window.scrollTo = () => {};
});

describe("all routes render without errors", () => {
  for (const route of routes) {
    it(`renders ${route}`, async () => {
      const errors: unknown[][] = [];
      const spy = vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));
      const host = document.createElement("div");
      document.body.appendChild(host);
      const root = createRoot(host);
      root.render(
        <React.StrictMode>
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        </React.StrictMode>
      );
      await new Promise((r) => setTimeout(r, 400)); // let lazy chunks resolve
      expect(host.innerHTML.length).toBeGreaterThan(500); // page actually rendered
      root.unmount();
      host.remove();
      spy.mockRestore();
      const real = errors.filter((a) => !String(a[0]).includes("not wrapped in act"));
      expect(real, `console.error on ${route}: ${real.map(String).join("\n")}`).toEqual([]);
    });
  }
});
