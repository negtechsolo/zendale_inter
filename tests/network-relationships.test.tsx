import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, it } from "vitest";
import { NetworkRelationships } from "../src/components/NetworkRelationships";
import { NetworkIdentityStrip } from "../src/components/NetworkIdentityStrip";
import { facilities, facilityProfilePath } from "../src/data/facilities";

beforeAll(() => { (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true; });

it("keeps organisations, HMOs and the institutional partnership distinct and lets visitors pause each row", () => {
  const host = document.createElement("div");
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter><NetworkRelationships /></MemoryRouter>));
  expect(host.querySelector('ul[aria-label="Organisations we have served"]')?.querySelectorAll("li")).toHaveLength(17);
  expect(host.querySelector('ul[aria-label="HMO relationships"]')?.querySelectorAll("li")).toHaveLength(8);
  expect(host.querySelectorAll('a[href="/news/lagos-state-blood-transfusion-partnership"]')).toHaveLength(1);
  host.querySelectorAll('ul[aria-hidden="true"] img').forEach(image => expect(image.getAttribute("alt")).toBe(""));
  const buttons = host.querySelectorAll("button");
  act(() => buttons[0].click());
  expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
  expect(buttons[1].getAttribute("aria-pressed")).toBe("false");
  act(() => buttons[0].click());
  expect(buttons[0].getAttribute("aria-pressed")).toBe("false");
  act(() => root.unmount());
});

it("links each early subsidiary logo to its own network profile", () => {
  const host = document.createElement("div");
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter><NetworkIdentityStrip /></MemoryRouter>));
  facilities.forEach(facility => {
    const link = host.querySelector(`a[href="${facilityProfilePath(facility.id)}"]`);
    expect(link?.textContent).toContain(facility.name);
    expect(link?.querySelector("img")).not.toBeNull();
  });
  act(() => root.unmount());
});
