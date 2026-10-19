import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, it } from "vitest";
import { news } from "../src/data/updates";
import { leadership } from "../src/data/leadership";
import { LeadershipPreview } from "../src/components/LeadershipPreview";
import { LeadershipGroup } from "../src/components/LeadershipGroup";
import { NetworkCard } from "../src/components/NetworkCard";
import { facilities } from "../src/data/facilities";
beforeAll(() => { (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true; });
it("uses the exact newest-first event order supplied by Zendale", () => {
  expect(news.map(story => story.slug)).toEqual(["business-of-health-conference-2026","hfn-private-sector-town-hall","world-patient-safety-day-2026","eko-health-convention-2026","lagos-state-blood-transfusion-partnership"]);
});
it("keeps home leadership concise, with HR immediately after the CEO and an inline qualification", () => {
  const host = document.createElement('div');
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter><LeadershipPreview /></MemoryRouter>));
  const names = Array.from(host.querySelectorAll('h3 > span:first-child')).map(h => h.textContent);
  expect(names).toEqual(['Dr. Rita Irurhe', 'Bukola Oladipupo', 'Everester Oguh', 'Tunde Adribigbe']);
  expect(host.querySelectorAll('h3')[1].querySelector('span:last-child')?.textContent).toBe('SPHRi');
  expect(host.querySelector('a[href*="linkedin.com"]')).toBeNull();
  expect(host.textContent).not.toContain(leadership[0].biography[0]);
  expect(host.querySelectorAll('a[href^="/leadership#"]')).toHaveLength(4);
  act(() => root.unmount());
});
it("publishes supplied LinkedIn links only within the full leadership profiles", () => {
  const host = document.createElement('div');
  const root = createRoot(host);
  act(() => root.render(<LeadershipGroup />));
  expect(Array.from(host.querySelectorAll('a')).map(a => a.href)).toEqual(leadership.filter(p => p.linkedin).map(p => p.linkedin));
  expect(host.querySelector('#tunde-adribigbe a')).toBeNull();
  leadership.forEach(person => expect(host.querySelector(`#${person.id}`)?.textContent).toContain(person.biography[0]));
  act(() => root.unmount());
});
it("provides a photograph and its official logo for all ten network cards", () => {
  const host=document.createElement('div');const root=createRoot(host);
  act(() => root.render(<MemoryRouter>{facilities.map(f=><NetworkCard key={f.id} facility={f}/>)}</MemoryRouter>));
  const cards=Array.from(host.querySelectorAll('article'));expect(cards).toHaveLength(10);
  cards.forEach(card=>{const images=Array.from(card.querySelectorAll('img'));expect(images).toHaveLength(2);expect(images[0].getAttribute('src')).not.toBe(images[1].getAttribute('src'));});
  act(() => root.unmount());
});
