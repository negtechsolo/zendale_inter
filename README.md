# Zendale — One Partner. Complete Healthcare Solutions.

Flagship website for the Zendale integrated healthcare group.
React 18 · TypeScript · Vite · Tailwind CSS · React Three Fiber + Drei ·
Framer Motion · React Router DOM.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build (dist/)
npm run preview   # serve the production build locally
npx vitest run    # smoke test: renders all 16 routes, fails on console errors
```

## Before launch — owner checklist

1. **Contact details** — fill in `src/config.ts` (WhatsApp number, email,
   address, socials). Every WhatsApp button, deep link and contact row is
   wired and appears automatically the moment the number exists.
2. **Photography** — add the 29 photos to `src/assets/images/` using the exact
   filenames in `IMAGE-MANIFEST.md`, then rebuild.
3. **Guide PDFs** — drop the six documents into `public/downloads-files/`
   (filenames in `IMAGE-MANIFEST.md`).
4. **Form backends** — all forms validate and confirm client-side and hand off
   to pre-filled WhatsApp; wire them to your real endpoint/CRM (search the
   codebase for `TODO (backend)` — every hand-off point is marked).
5. **Privacy page** — have counsel review `/privacy` (marked `TODO (legal review)`).
6. **SPA hosting** — `vercel.json` at the project root rewrites all paths to
   `index.html` so deep routes (`/network`, `/contact`, …) load directly.
   Do not delete it; on other hosts, replicate the same rewrite rule.

## Deliberately out of scope (per brief)

- **Partner Login / Referral Portal** — future scope; no fake login screens
  were built and no links to them exist anywhere.
- **Leadership section on /about** — omitted because no leadership profiles
  were supplied; the brief forbids placeholders.

## Design system in one paragraph

Ink navy `#0B1B33`, Zendale steel blue `#4A6FA5`, warm porcelain `#F7F5F1`,
mist blue `#DCE6F2`, muted brass `#C89B5A` (rare accent), carbon-navy
`#16233A` body text. Fraunces for display, Inter for body, JetBrains Mono for
eyebrows, codes and data labels. The Z-stroke diagonal (14°) is the structural
and motion language: diagonal image masks, diagonal hover sweeps, the
preloader's two drawing strokes, the descending process paths, and the 3D
ecosystem hero where eight facility nodes and five capability pillars
assemble into one rotating structure. `prefers-reduced-motion` disables all
of it cleanly, and a static poster replaces the 3D scene when WebGL is
unavailable.
