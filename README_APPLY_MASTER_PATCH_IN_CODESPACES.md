# Apply the Zendale Network, SEO and 10-Article Blog Master Patch

## Which ZIP to use

Use only:

`ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH.zip`

Do **not** apply these older packages first:

- `ZENDALE_PARTNERSHIP_PURPOSE_CORRECTIONS(2).zip`
- `ZENDALE_NETWORK_SEO_PARTNERSHIP_REFINEMENT(2).zip`

The master patch includes the earlier partnership/purpose corrections, the later network and SEO refinements, and the complete ten-article blog system.

## What the blog system does

- Adds ten complete, researched articles.
- Adds **Read More** links from the Resource Centre to full article pages.
- Adds individual SEO title, meta description, canonical URL, Open Graph article data, Article structured data and FAQ structured data.
- Displays all ten articles in Codespaces development preview for approval.
- Automatically releases articles on the live website every Wednesday and Friday at 9:00 AM WAT from 12 August to 11 September 2026.
- Keeps future articles out of the public Resource Centre until their scheduled release.

## Step 1 — Confirm the project and create a safe branch

Open the Codespaces terminal and run:

```bash
pwd
git status
```

The project path should be:

```text
/workspaces/zendale_inter
```

Create a review branch rather than changing `main` directly:

```bash
git switch -c website-refinement-blog-series
```

If Git says the branch already exists, use:

```bash
git switch website-refinement-blog-series
```

## Step 2 — Upload the ZIP

Drag `ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH.zip` into the project root beside:

```text
package.json
index.html
src
public
```

Do not place it inside `src` or `public`.

Confirm it is present:

```bash
ls -lh ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH.zip
```

## Step 3 — Back up the current project files

```bash
rm -rf /tmp/zendale-before-seo-blog-master
mkdir -p /tmp/zendale-before-seo-blog-master
cp -a src public index.html smoke.test.tsx /tmp/zendale-before-seo-blog-master/
```

## Step 4 — Extract the master patch

```bash
rm -rf /tmp/zendale-seo-blog-master
mkdir -p /tmp/zendale-seo-blog-master
unzip -q ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH.zip -d /tmp/zendale-seo-blog-master
```

Confirm the extracted folder:

```bash
ls /tmp/zendale-seo-blog-master/ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH
```

## Step 5 — Copy the patch into the project

```bash
cp -a /tmp/zendale-seo-blog-master/ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH/. .
```

## Step 6 — Clean temporary files and old build cache

```bash
rm ZENDALE_NETWORK_SEO_10_ARTICLE_MASTER_PATCH.zip
rm -rf /tmp/zendale-seo-blog-master
rm -rf dist node_modules/.vite
```

Keep `/tmp/zendale-before-seo-blog-master` until the preview is approved.

## Step 7 — Build and test

```bash
npm run build
npx vitest run smoke.test.tsx
```

The build must succeed. The smoke test includes the website routes, facility profiles and a full article route.

## Step 8 — Preview in Codespaces

```bash
npm run dev -- --host 0.0.0.0
```

Open port `5173` from the **Ports** panel. Close any older preview tab and perform a hard refresh with `Ctrl + Shift + R`.

Review these routes:

```text
/
/about
/partnerships
/services
/network
/network/lifecentre
/network/lifecentre-support
/resources
/resources/building-stronger-healthcare-institutions-nigeria
/resources/corporate-healthcare-programme-nigeria-hr-checklist
/resources/medical-equipment-lifecycle-management-healthcare-facilities
/resources/why-referral-networks-matter-specialist-healthcare
```

In development preview, all ten articles appear so they can be reviewed before their release dates.

## Step 9 — Commit and push the review branch

Stop the development server with `Ctrl + C`, then run:

```bash
git status
git add index.html smoke.test.tsx src public ZENDALE_5_WEEK_BLOG_CALENDAR.md README_APPLY_MASTER_PATCH_IN_CODESPACES.md
git commit -m "Add network refinements and scheduled SEO article series"
git push -u origin website-refinement-blog-series
```

Vercel should create a preview deployment for the branch. Review that preview before merging.

## Step 10 — Merge into main only after approval

After the branch preview is approved:

```bash
git switch main
git pull --rebase origin main
git merge --no-ff website-refinement-blog-series
git push origin main
```

Do not use force push.

## Rollback before commit

```bash
rm -rf src public
cp -a /tmp/zendale-before-seo-blog-master/src .
cp -a /tmp/zendale-before-seo-blog-master/public .
cp /tmp/zendale-before-seo-blog-master/index.html .
cp /tmp/zendale-before-seo-blog-master/smoke.test.tsx .
npm run build
```

## Final domain note

The source currently uses `https://zendale.vercel.app`. When the official domain is connected, update the domain in:

```text
src/config.ts
index.html
public/robots.txt
public/sitemap.xml
```
