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

it("loads the next facility image before switching and keeps the main message still", async () => {
  vi.useFakeTimers();
  const host = document.createElement("div");
  const root = createRoot(host);
  try {
    act(() => root.render(<MemoryRouter><HomeHero /></MemoryRouter>));
    const title = host.querySelector("h1");
    expect(title?.textContent).toBe("One Partner. Complete Healthcare Solutions.");
    expect(host.querySelectorAll("img")).toHaveLength(1);
    expect(host.querySelector('a[href="/network/finnih"]')).not.toBeNull();
    act(() => vi.advanceTimersByTime(6500));
    expect(host.querySelector('a[href="/network/finnih"]')).not.toBeNull();
    await act(async () => {
      host.querySelector('img[src="/images/home-hero/skyhigh.webp"]')!.dispatchEvent(new Event("load"));
    });
    expect(host.querySelector('a[href="/network/sky-high"]')).not.toBeNull();
    expect(host.querySelector("h1")).toBe(title);
    act(() => host.querySelector<HTMLButtonElement>('button[aria-label="Next introduction"]')!.click());
    await act(async () => {
      host.querySelector('img[src="/images/home-hero/kindred.webp"]')!.dispatchEvent(new Event("load"));
    });
    expect(host.querySelector('a[href="/network/kindred-path"]')?.textContent).toBe("Kindred Path Fertility Centre");
  } finally {
    act(() => root.unmount());
    vi.useRealTimers();
  }
});
