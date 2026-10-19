import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, it } from "vitest";
import { news } from "../src/data/updates";
import { leadership } from "../src/data/leadership";
import { LeadershipPreview } from "../src/components/LeadershipPreview";
import { NetworkCard } from "../src/components/NetworkCard";
import { facilities } from "../src/data/facilities";
beforeAll(() => { (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true; });
it("uses the exact newest-first event order supplied by Zendale", () => {
  expect(news.map(story => story.slug)).toEqual(["business-of-health-conference-2026","hfn-private-sector-town-hall","world-patient-safety-day-2026","eko-health-convention-2026","lagos-state-blood-transfusion-partnership"]);
});
it("keeps Bukola’s qualification separate from her displayed name", () => {
  const host=document.createElement('div');const root=createRoot(host);
  act(() => root.render(<MemoryRouter><LeadershipPreview /></MemoryRouter>));
  expect(Array.from(host.querySelectorAll('h3')).map(h=>h.textContent)).toEqual(leadership.map(person=>person.name));
  expect(host.querySelectorAll('h3')[3].textContent).toBe('Bukola Oladipupo');
  expect(host.querySelectorAll('h3')[3].textContent).not.toContain('SPHRi');
  expect(host.textContent).toContain('SPHRi Certified');
  act(() => root.unmount());
});
it("provides a photograph and its official logo for all ten network cards", () => {
  const host=document.createElement('div');const root=createRoot(host);
  act(() => root.render(<MemoryRouter>{facilities.map(f=><NetworkCard key={f.id} facility={f}/>)}</MemoryRouter>));
  const cards=Array.from(host.querySelectorAll('article'));expect(cards).toHaveLength(10);
  cards.forEach(card=>{const images=Array.from(card.querySelectorAll('img'));expect(images).toHaveLength(2);expect(images[0].getAttribute('src')).not.toBe(images[1].getAttribute('src'));});
  act(() => root.unmount());
});
