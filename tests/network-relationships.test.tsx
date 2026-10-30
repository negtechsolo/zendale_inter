import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, it, vi } from "vitest";
import { NetworkRelationships } from "../src/components/NetworkRelationships";
import { HomeHero } from "../src/components/HomeHero";

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

it("keeps the two logo lists separate without duplicate partnership or pause buttons", () => {
  const host = document.createElement("div");
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter><NetworkRelationships /></MemoryRouter>));
  expect(host.querySelector('ul[aria-label="Organisations we have served"]')?.querySelectorAll("li")).toHaveLength(17);
  expect(host.querySelector('ul[aria-label="HMO relationships"]')?.querySelectorAll("li")).toHaveLength(8);
  expect(host.querySelectorAll('a[href="/news/lagos-state-blood-transfusion-partnership"]')).toHaveLength(0);
  expect(host.querySelectorAll('button')).toHaveLength(0);
  expect(host.querySelectorAll('.relationship-marquee[tabindex="0"]')).toHaveLength(2);
  expect(host.querySelectorAll('.relationship-track[data-direction="left"]')).toHaveLength(1);
  expect(host.querySelectorAll('.relationship-track[data-direction="right"]')).toHaveLength(1);
  host.querySelectorAll('ul[aria-hidden="true"] img').forEach(image => expect(image.getAttribute("alt")).toBe(""));
  act(() => root.unmount());
});

it("rotates the introduction and lets visitors select and follow each real story", () => {
  vi.useFakeTimers();
  const host = document.createElement("div");
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter><HomeHero /></MemoryRouter>));
  expect(host.querySelector('h1')?.textContent).toContain("One Partner.");
  act(() => vi.advanceTimersByTime(9000));
  expect(host.querySelector('figcaption')?.textContent).toContain("Finnih Medical Centre");
  expect(host.querySelector('a[href="/network/finnih"]')).not.toBeNull();
  act(() => host.querySelector<HTMLButtonElement>('button[aria-label="Next introduction"]')!.click());
  expect(host.querySelector('h1')?.textContent).toBe("BUA Corporate Health Programme");
  expect(host.querySelector('a[href="/impact/bua-corporate-health"]')).not.toBeNull();
  act(() => vi.advanceTimersByTime(18000));
  expect(host.querySelector('h1')?.textContent).toBe("BUA Corporate Health Programme");
  act(() => host.querySelector<HTMLButtonElement>('button[aria-label="Show Zendale Limited"]')!.click());
  expect(host.querySelector('h1')?.textContent).toContain("One Partner.");
  act(() => root.unmount());
  vi.useRealTimers();
});
