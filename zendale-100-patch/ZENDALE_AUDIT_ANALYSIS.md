# Zendale — audit analysis and what this patch changes

Written against the three reports you supplied: SEO Site Checkup (72/100),
PageSpeed Insights (Performance 67, Accessibility 85, Agentic Browsing 0/3)
and Seobility (on-page 57%).

---

## The one diagnosis that matters

Your site scores badly for a single reason, and it is not on any of the issue
lists. **Zendale is a client-rendered single-page application.**

Look at what Seobility actually fetched:

> File size **3.40 kB** · Word count **0** · "There is no H1 heading
> specified" · "There are no headings specified on the page" · "only very few
> links were found"

That is not a content problem. It is the literal HTML your server sends:
`<div id="root"></div>` and a JavaScript bundle. Everything — the headline,
the copy, the navigation, the footer, all 39 internal links — only comes into
existence after React runs in the visitor's browser.

That single fact is upstream of most of your failures:

| Symptom in your reports | Actually caused by |
|---|---|
| Seobility: 0 words, no H1, no headings | Empty server HTML |
| Seobility: Link structure **0%** | Empty server HTML |
| Seobility: Page quality 48%, structure 58% | Empty server HTML |
| PSI: **CLS 0.4**, culprit `<footer>` | Empty server HTML |
| PSI: Agentic Browsing 0/3, "accessibility tree is not well-formed" | Empty server HTML |
| SEO Site Checkup: AI Visibility 60, "weak proof signals" | Partly this |

The CLS one is worth spelling out, because it looks unrelated. On first load
React renders the shell: navigation, a 60vh "Loading…" placeholder, then the
footer. A moment later the route chunk arrives, the real page replaces the
placeholder, and the footer gets shoved hundreds of pixels down the document.
That shove **is** your 0.4 layout shift. Google flags the footer because the
footer is the thing that moved, but the footer is innocent.

**The fix is pre-rendering**, and it is what most of this patch is. Every
route is now rendered to real HTML at build time and React hydrates that
markup in the browser. Same components, same design, same behaviour — but the
document that arrives over the wire is complete.

Measured on the built output:

| | Before | After |
|---|---|---|
| Homepage HTML | 3.4 kB | 63.5 kB |
| Words in HTML | 0 | 1,082 |
| `<h1>` | 0 | 1 |
| `<h2>` | 12 | 9 |
| Internal links in HTML | ~0 | 39 |
| Pages pre-rendered | 0 | 23 + a real 404 |

---

## Every reported issue, and what happened to it

### SEO Site Checkup — 11 failed

| Issue | Status | How |
|---|---|---|
| LCP 4.38s | **Fixed** | Hero texture now has `fetchpriority=high`, `srcset` and intrinsic dimensions; fonts no longer block render; page content is in the HTML rather than assembled after two round trips |
| CLS 0.4 | **Fixed** | Pre-rendering removes the shell→content swap entirely; every image now carries `width`/`height` |
| Render-blocking resources | **Fixed** | The Google Fonts stylesheet is preloaded and promoted with `media="print"` + `onload`, so it never blocks first paint |
| Images not properly sized | **Fixed** | 136 responsive variants generated (400/800/1200px, plus 96px for logos) with `srcset` + `sizes` |
| Distorted images / aspect ratio | **Fixed** | Every `<img>` now emits the true intrinsic `width` and `height` |
| No custom 404 page | **Fixed** | `dist/404.html` is pre-rendered from your existing `NotFound` page and served with a real 404 status. Previously the catch-all rewrite returned HTTP 200 for every wrong URL |
| JS execution > 3.5s | **Improved** | Route chunks now prefetch on hover/focus instead of firing sixteen imports at idle; three.js no longer preloads on pages that never use it |
| Google Analytics missing | **Needs you** | `SITE.analyticsId` in `src/config.ts` is ready; paste your GA4 ID. Nothing loads while it is empty |
| Canonical points to the wrong URL | **Fixed** | Every canonical, `og:url`, JSON-LD `@id` and the sitemap now say `https://www.zendalelimited.com` instead of `zendale.vercel.app` |
| More than 20 HTTP requests | **Improved** | 16 idle prefetches removed; a cold homepage now downloads what it renders |
| Meta title 61 characters | **Fixed** | Now 53. See the note below |
| Too many H2 tags (12) | **Fixed** | The three footer column labels were `<h2>`; they are now `<p>` with the identical `.eyebrow` class, so nothing moves. Homepage is at 9 |
| ads.txt wrong Content-Type | **Fixed** | A real `public/ads.txt` plus an explicit `text/plain` header in `vercel.json` |

### PageSpeed Insights — Accessibility 85 → expected 100

| Audit | Cause found in your code | Fix |
|---|---|---|
| "Elements use prohibited ARIA attributes" | `EcosystemHero` had `aria-label` on a plain `<div>` with no role | Added `role="group"` |
| "Lists do not contain only `<li>`" | `<ol>` on Home, HowWeWork and MedicalTechnology had a `<Reveal>` wrapper (a `<div>`) as their direct child, plus an absolutely-positioned decorative `<div>` inside the `<ol>` on two of them | `<li>` is now the direct child, the animation wrapper moved inside it, the decorative rule moved to a wrapper outside the list |
| "`<li>` not contained within `<ul>`/`<ol>`" | Same root cause | Same fix |
| Contrast | See below | See below |
| "Identical links have the same purpose" | Not reproducible from source alone | Re-run PSI on the preview deploy; if it persists it will name the elements |

I checked the restructuring carefully so nothing moves. On the HowWeWork
timeline, `last:pb-0` was previously matching **every** item (each `<li>` was
the only child of its wrapper). I kept that exact structure rather than
"fixing" it, because fixing it would have added visible spacing between
stages — a design change you did not ask for. If you *want* that spacing,
that is a one-word edit and worth looking at.

### PageSpeed Insights — Agentic Browsing 0/3 → expected 3/3

- "Accessibility tree is not well-formed" — was the empty root plus the ARIA
  problems above.
- "llms.txt does not follow recommendations" — there was no `llms.txt`. There
  is now, written from your real facility and pillar data, listing all five
  pillars, all eight network members and every key page. Nothing invented.
- CLS 0.4 — covered above.

### Seobility — 57% → expected high 80s / low 90s

Meta data, page quality, page structure and link structure all move with
pre-rendering. Two items will not:

- **External factors 3%.** That is backlinks: one referring domain, one
  backlink. No code change affects this. It is outreach, directory listings,
  partner sites, association memberships and press.
- **"Only 0 words on this page"** becomes 1,082 on the homepage. But
  `/contact` sits at 246 words, just under Seobility's 250 threshold. Worth
  two more paragraphs of real copy.

---

## Things I changed that you should look at deliberately

### 1. Contrast — the one visible change

Your brand gold `#C89B5A` on the porcelain background measures **2.33:1**.
WCAG AA requires 4.5:1 for text. There is no arrangement of code that scores
100 on accessibility while that exact gold is used as text on light surfaces.

What I did: brass text now resolves through a CSS custom property.

- On ink surfaces (hero, footer, dark sections) it stays **exactly** `#C89B5A`.
- On light surfaces it becomes `#855F28` — the same 35.5° hue, darker, at
  5.26:1.
- Brass **fills, borders, rules and buttons are untouched.**

In practice this affects the small uppercase mono eyebrow labels on light
sections. To revert, set both values to `#C89B5A` at the bottom of
`src/styles/index.css` — the block is commented and self-contained. You would
then keep your exact gold and score roughly 92 on accessibility instead of
100. That is your call, not mine.

I also lifted muted text below the threshold: `text-carbon/45` and similar
went to `/70`, `text-porcelain/40` to `/60`. These are barely perceptible and
purely a legibility gain.

### 2. The homepage title

`Zendale Limited | One Partner. Complete Healthcare Solutions.` is 61
characters and fails the 60-character check. It is now:

`Zendale | One Partner. Complete Healthcare Solutions.` — 53 characters.

The full legal name is retained in `og:site_name`, the JSON-LD organisation
graph and every other page's title. If you would rather keep "Limited", the
alternative is dropping "One Partner." instead. Change it in `index.html` and
in the `SITE.shortName` branch of `src/lib/seo.tsx`.

### 3. The meta description

195 characters was over Seobility's pixel limit. Rewritten to 145:

> Zendale Limited is an integrated healthcare group connecting specialist
> care, consulting, medical technology and corporate health in one network.

"Institutional partnerships" and "growing network" were the casualties. Both
survive in the JSON-LD description and the `llms.txt` summary.

### 4. Article scheduling

Articles with a future `publishAt` are not pre-rendered — they would render
as a redirect. They still appear on schedule through a narrow SPA fallback
kept in `vercel.json` for `/resources/:slug`. But the `/resources` listing
page is pre-rendered, so a crawler will not see a newly live article there
until the next deploy. Redeploy when articles go live, or add a scheduled
Vercel deploy hook.

---

## Two things I found that you did not ask about

**three.js was being preloaded on every page.** Your `manualChunks` config
made it a static chunk, so Vite injected `<link rel="modulepreload">` for
951 kB (263 kB gzipped) of 3D library into the HTML of every page — including
`/privacy` and `/contact`, which have no 3D anything. It now splits naturally
off its lazy import and only downloads on the homepage.

**Images could be invisible.** `.img-frame > img` starts at `opacity: 0` and
waits for React's `onLoad`. For an image already in the browser cache, that
event fires before React attaches its handler, so it never arrives and the
image stays invisible. `SmartImage` now checks `img.complete` on mount. This
bug would have become much more likely with pre-rendering, and it may already
be causing intermittent blank image frames on repeat visits today.

---

## What cannot reach 100, honestly

- **Backlinks / Seobility external factors.** Off-site work.
- **Google Analytics.** Needs your GA4 ID.
- **SEO Site Checkup's CDN test.** It checks whether asset hostnames look
  like a CDN. Vercel's edge network serves from your own domain, so this test
  will keep failing while being factually wrong about your delivery.
- **"Average SEO score of top 100 sites."** A moving comparison, not a target.
- **AI Visibility 60/100.** This measures how often ChatGPT, Gemini and
  Perplexity mention Zendale. `llms.txt`, structured data and real HTML help
  the crawl side, but the number is driven by third-party mentions of the
  brand across the web. That is PR and citations, not markup.
- **Content trust 56% / credibility 35%.** The report is right, and it is the
  most valuable thing on the list. It names exactly what is missing: leadership
  bios, a physical address, phone numbers, named testimonials, third-party
  validation. Your `src/config.ts` still has empty strings for
  `whatsappNumber`, `email`, `addressLines` and `socials`. A healthcare group
  asking hospitals and government agencies to partner with it, with no address
  and no phone number on the site, will be read as a risk. **No amount of
  technical SEO substitutes for that.** It is the single highest-value change
  left, and it is content, not code.
