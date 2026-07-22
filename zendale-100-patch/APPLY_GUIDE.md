# Applying the Zendale patch in GitHub Codespaces

Everything below runs in the Codespaces terminal. Total time is about ten
minutes, most of which is `npm install`.

---

## 1. Open a Codespace on a new branch

Work on a branch so `main` stays exactly as it is until you have seen the
result with your own eyes.

```bash
git checkout -b seo-performance-patch
```

If you are starting a fresh Codespace, open it from the repository page:
**Code → Codespaces → Create codespace on main**, then run the command above.

---

## 2. Get the patch folder into the repository

Drag `zendale-100-patch.zip` from your computer into the Codespaces file
explorer (drop it on the root folder, next to `package.json`). Then:

```bash
unzip -q zendale-100-patch.zip
ls zendale-100-patch
```

You should see `files/`, `apply-patch.sh`, `APPLY_GUIDE.md`,
`ZENDALE_AUDIT_ANALYSIS.md`, `GOOGLE_ANALYTICS_AND_CONTACT_SETUP.md` and
`CHANGES.md`.

---

## 3. Apply it

From the repository root:

```bash
bash zendale-100-patch/apply-patch.sh
```

The script backs up every file it is about to replace into
`.patch-backup-<timestamp>/`, copies the patched files in, installs `sharp`,
and runs `npm install`.

If you ever want to undo the whole thing:

```bash
cp -r .patch-backup-<timestamp>/. .
```

---

## 4. Build

```bash
npm run build
```

This now runs four steps instead of one:

| Step | What it does |
|---|---|
| `tsc -b` | Type-checks the whole project |
| `vite build` | Builds the browser bundle into `dist/` |
| `vite build --ssr` | Builds a server copy of the app into `dist-ssr/` |
| `node scripts/prerender.mjs` | Renders every route to real HTML inside `dist/`, plus `404.html` and `sitemap.xml` |

You should see a list ending like this:

```
[prerender] /                                          56.7 kB
[prerender] /about                                     23.9 kB
...
[prerender] 23 pages + 404.html + sitemap.xml written to dist/
```

If the pre-render step is missing from the output, the build stopped early —
scroll up and read the first error rather than the last.

---

## 5. Check it locally

`npm run dev` is **not** the right check any more: the dev server always
serves the empty shell, so it will not show you the pre-rendered HTML. Serve
the built output instead, which is exactly what Vercel will serve:

```bash
npm run serve
```

Codespaces will offer to forward port **4173** — open it in the browser.

### Look at these five things

1. **The site looks identical.** Same hero, same 3D network graphic, same
   opening curtain, same spacing, same typography. The one intentional
   difference is described in `ZENDALE_AUDIT_ANALYSIS.md` under "Contrast".
2. **Click through every page.** Home, network, each facility, services,
   partnerships, how we work, case studies, resources, downloads, careers,
   contact, privacy. Navigation should feel the same or faster.
3. **View source on the homepage** (Ctrl+U). You should now see the actual
   headline text, the `<h1>`, the navigation links and the footer links in the
   HTML — not an empty `<div id="root">`.
4. **Visit a URL that does not exist**, e.g. `/does-not-exist`. You should get
   the Zendale 404 page.
5. **Open DevTools → Console.** There should be no red errors. A hydration
   warning on the resources page is expected and harmless (article publish
   dates are evaluated fresh in the browser).

### Confirm the fixes from the terminal

```bash
# The homepage now contains real content
grep -c "<h1" dist/index.html                 # -> 1
grep -o "<h2" dist/index.html | wc -l         # -> 9  (was 12)

# Canonical points at the real domain
grep canonical dist/index.html

# The sitemap has every route on the right domain
head -20 dist/sitemap.xml

# The 404 page exists and is not indexable
grep robots dist/404.html
```

---

## 6. Commit and open a pull request

```bash
git add -A
git commit -m "SEO, performance and accessibility: pre-render all routes, fix canonical domain, responsive images, WCAG AA contrast"
git push -u origin seo-performance-patch
```

Open the pull request on GitHub. Vercel will build a **preview deployment** —
run PageSpeed Insights against that preview URL before you merge.

---

## 7. After merging — three things only you can do

1. **Set the production domain in Vercel.** Project → Settings → Domains.
   `www.zendalelimited.com` should be the primary, with the apex redirecting
   to it. The canonical tags now say `www`, so the two must agree.
2. **Google Analytics.** Follow `GOOGLE_ANALYTICS_AND_CONTACT_SETUP.md` in
   this folder — it walks through creating the GA4 property and finding your
   Measurement ID. It is a one-line change in `src/config.ts` afterwards.
   **That same document also lists three things you must verify about the new
   contact details and social links before this goes live.**
3. **Resubmit the sitemap** in Google Search Console:
   `https://www.zendalelimited.com/sitemap.xml`

---

## Day-to-day, after this patch

**Adding or replacing an image:**

```bash
npm run images    # regenerates the small variants + src/lib/imageMeta.ts
```

Commit the generated files. If you skip this, the new image still works — it
just gets served at full resolution.

**Adding a page:** add the route to `src/App.tsx` as before, then add its path
to `staticRoutes` and `routeModule()` in `src/entry-server.tsx` so it gets
pre-rendered and appears in the sitemap.

**Publishing an article:** articles with a future `publishAt` are not
pre-rendered, and they still appear on schedule through the SPA fallback.
But `/resources` itself is pre-rendered, so the listing page will not show a
newly live article to a crawler until the next deploy. Redeploy on the days
articles go live, or set up a Vercel deploy hook on a schedule.
