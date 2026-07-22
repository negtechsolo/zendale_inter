# What this patch changes

174 files. Every replaced file is backed up by `apply-patch.sh` before it is touched.

## Build & deployment configuration

- **`package.json`** — build now type-checks, bundles, builds an SSR copy and pre-renders; adds `images`, `prerender` and `serve` scripts
- **`vite.config.ts`** — emits a build manifest; stops forcing three.js into a statically-preloaded chunk
- **`vercel.json`** — clean URLs, real 404 status, immutable asset caching, text/plain for ads.txt & llms.txt, security headers, narrow SPA fallback for scheduled articles
- **`.gitignore`** — ignores dist-ssr (the previous file contained a stray heredoc)
- **`scripts/prerender.mjs`** — NEW — renders every route to HTML, writes 404.html and sitemap.xml
- **`scripts/gen-image-variants.mjs`** — NEW — generates responsive variants and src/lib/imageMeta.ts

## Site identity & metadata

- **`index.html`** — canonical/og/JSON-LD moved to www.zendalelimited.com; title 61->53 chars; description 195->145; non-blocking fonts; apple-touch-icon; manifest; preloader hand-off script
- **`src/config.ts`** — SITE.url points at the real domain; adds an opt-in analyticsId
- **`src/lib/seo.tsx`** — resolves head data for both server pre-render and client navigation; homepage uses the short brand to stay under 60 characters
- **`public/robots.txt`** — real domain, explicit allows for AI crawlers, points at llms.txt
- **`public/llms.txt`** — NEW — plain-language summary for answer engines, built from your real data
- **`public/ads.txt`** — NEW — valid text/plain response instead of an HTML error page
- **`public/site.webmanifest, icon-192.png, icon-512.png, apple-touch-icon.png`** — NEW — generated from your existing logo

## Pre-rendering

- **`src/entry-server.tsx`** — NEW — server entry, route enumeration, route-to-chunk map
- **`src/main.tsx`** — hydrates the pre-rendered markup instead of rebuilding it
- **`src/App.tsx`** — route prefetching moved from an idle burst of 16 imports to hover/touch/focus intent
- **`src/components/Preloader.tsx`** — server-safe; curtain hidden before paint for returning visitors
- **`src/pages/Downloads.tsx`** — no sessionStorage read during render; filter buttons are toggles, not ARIA tabs
- **`src/pages/ArticlePage.tsx`** — Article + FAQ structured data now ship inside the pre-rendered HTML
- **`src/pages/NotFound.tsx`** — marked noindex

## Accessibility

- **`src/components/EcosystemHero.tsx`** — role added so aria-label is permitted
- **`src/pages/Home.tsx`** — process list is a valid <ol>; decorative rule moved outside it; muted text contrast
- **`src/pages/HowWeWork.tsx`** — timeline is a valid <ol> with identical rendering
- **`src/pages/MedicalTechnology.tsx`** — lifecycle list is a valid <ol>; decorative rule moved outside it
- **`src/pages/Resources.tsx`** — ARIA-only list replaced with a real <ul>; contrast
- **`src/pages/Partnerships.tsx`** — radiogroup/radio replaced with group + aria-pressed toggles; contrast
- **`src/components/Footer.tsx`** — column labels h2 -> p (identical rendering, drops homepage H2 count to 9); contrast
- **`src/components/forms.tsx`** — placeholder and helper text contrast
- **`src/styles/index.css`** — accessible brass token; composited shimmer; preloader curtain rule

## Images

- **`src/components/SmartImage.tsx`** — srcset + sizes + intrinsic dimensions; fixes invisible cached images
- **`src/components/FacilityLogo.tsx`** — NEW — serves a 400px variant for logos that render at 44-80px
- **`src/components/Logo.tsx`** — 96px variant instead of the 535px original for a 48px slot
- **`src/pages/Network.tsx, src/pages/FacilityProfile.tsx`** — use FacilityLogo
- **`src/lib/imageMeta.ts`** — NEW — generated intrinsic dimensions and available variants
- **`public/images/*-{96,400,800,1200}.webp`** — 136 NEW generated variants

## Contact details, social profiles and analytics

- **`src/config.ts`** — real phone, WhatsApp number, head-office address, general and partnership emails, four social profiles, and the GA4 measurement-id switch
- **`src/components/SocialIcon.tsx`** — NEW, inline LinkedIn / Facebook / X / Instagram glyphs
- **`src/components/Footer.tsx`** — address, tap-to-call phone and email block; social row now renders bordered icon buttons with accessible names
- **`src/lib/analytics.ts`** — NEW, reports SPA route changes to GA4 (does nothing while the id is empty)
- **`src/components/Layout.tsx`** — mounts the page-view hook
- **`scripts/prerender.mjs`** — writes the Google tag into the head of every pre-rendered page when an id is set
- **`index.html`** — organisation schema now carries postal address, telephone, email, two contact points and `sameAs` social profiles
- **`public/llms.txt`** — contact block added

Side effects, both intended: the floating WhatsApp button is now visible (it was hidden while the number was blank), and the contact page's address and email rows now render.

## Not changed

Your data files (`src/data/*`), the 3D scene (`src/three/EcosystemScene.tsx`), `tailwind.config.js`, all page copy, and every original image are untouched.
