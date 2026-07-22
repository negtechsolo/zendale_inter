/**
 * Static pre-rendering.
 *
 * Renders every route to real HTML at build time and writes it into dist/,
 * so the server delivers a complete document instead of an empty <div id="root">.
 * React then hydrates that markup in the browser: same components, same design,
 * same behaviour, but the headings, copy and internal links now exist for
 * crawlers, answer engines and users on a slow connection.
 *
 * It also writes dist/sitemap.xml and dist/404.html.
 *
 * Run automatically as the last step of `npm run build`.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

const ROOT = path.resolve(process.cwd());
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

if (!existsSync(SSR_ENTRY)) {
  console.error("[prerender] dist-ssr/entry-server.js not found. Run `npm run build:server` first.");
  process.exit(1);
}

const { createApp, beginSsr, endSsr, getRoutes, routeModule, SITE_URL, ANALYTICS_ID } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const template = await readFile(path.join(DIST, "index.html"), "utf8");

/* ---- module preloads -------------------------------------------------- */
/* Each route's page chunk is preloaded so hydration never has to wait on a
   round trip, which is what would otherwise flash the "Loading…" fallback
   over pre-rendered content. */
let manifest = {};
const manifestPath = path.join(DIST, ".vite", "manifest.json");
if (existsSync(manifestPath)) {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
}

function preloadsFor(route) {
  const entry = manifest[routeModule(route)];
  if (!entry?.file) return "";
  // Only the page chunk itself: its shared dependencies are already in the
  // entry's own preload graph, and following the full import list would drag
  // heavy optional chunks onto pages that never use them.
  return `    <link rel="modulepreload" crossorigin href="/${entry.file}" />`;
}

/* ---- head construction ------------------------------------------------ */
const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function headFor(seo, route) {
  if (!seo) return "";
  const lines = [
    `    <title>${escape(seo.title)}</title>`,
    `    <meta name="description" content="${escape(seo.description)}" />`,
    `    <meta name="robots" content="${escape(seo.robots)}" />`,
    `    <link rel="canonical" href="${escape(seo.canonical)}" />`,
    `    <meta property="og:type" content="${escape(seo.type)}" />`,
    `    <meta property="og:title" content="${escape(seo.title)}" />`,
    `    <meta property="og:description" content="${escape(seo.description)}" />`,
    `    <meta property="og:url" content="${escape(seo.canonical)}" />`,
    `    <meta property="og:image" content="${escape(seo.image)}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escape(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escape(seo.description)}" />`,
    `    <meta name="twitter:image" content="${escape(seo.image)}" />`,
  ];
  if (seo.publishedTime)
    lines.push(`    <meta property="article:published_time" content="${escape(seo.publishedTime)}" />`);
  if (seo.modifiedTime)
    lines.push(`    <meta property="article:modified_time" content="${escape(seo.modifiedTime)}" />`);

  for (const block of new Set(seo.jsonLd ?? [])) {
    lines.push(
      `    <script type="application/ld+json">${block.replace(/</g, "\\u003c")}</script>`
    );
  }

  const preloads = preloadsFor(route);
  if (preloads) lines.push(preloads);

  /* The Google tag goes into the static HTML rather than being attached by
     the app later, so it is present for auditors and for visitors whose
     first paint happens before hydration. Nothing is emitted when
     SITE.analyticsId is empty. */
  if (ANALYTICS_ID) {
    const id = ANALYTICS_ID.replace(/[^A-Za-z0-9-]/g, "");
    lines.push(
      `    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
      `    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>`
    );
  }

  return lines.join("\n");
}

/**
 * The template already carries the homepage's title, description, canonical
 * and social tags. For every other route those defaults are stripped so the
 * page-specific ones are the only copy in the document.
 */
function stripDefaults(html) {
  return html
    .replace(/\n?[ \t]*<title>[\s\S]*?<\/title>/, "")
    .replace(/\n?[ \t]*<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+name="robots"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<link\s+rel="canonical"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+property="og:type"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+property="og:title"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+property="og:description"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+property="og:url"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+property="og:image"\s+content[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+name="twitter:title"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+name="twitter:description"[\s\S]*?\/>/, "")
    .replace(/\n?[ \t]*<meta\s+name="twitter:image"[\s\S]*?\/>/, "");
}

/* ---- render ----------------------------------------------------------- */
function renderRoute(route) {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString("utf8");
        cb();
      },
    });

    beginSsr(route);
    const stream = renderToPipeableStream(createApp(route), {
      onAllReady() {
        stream.pipe(sink);
        sink.on("finish", () => resolve({ html, seo: endSsr() }));
      },
      onError: reject,
    });
  });
}

const routes = getRoutes();
const written = [];

for (const route of [...routes, "/__404__"]) {
  const is404 = route === "/__404__";
  const { html, seo } = await renderRoute(is404 ? "/this-page-does-not-exist" : route);

  let page = template.replace("<!--app-html-->", html);
  page = seo ? stripDefaults(page) : page;
  page = page.replace("</head>", `${headFor(seo, is404 ? "/__404__" : route)}\n  </head>`);

  const file = is404
    ? path.join(DIST, "404.html")
    : route === "/"
      ? path.join(DIST, "index.html")
      : path.join(DIST, route.slice(1), "index.html");

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page, "utf8");
  if (!is404) written.push(route);
  console.log(`[prerender] ${is404 ? "404.html" : route.padEnd(42)} ${(html.length / 1024).toFixed(1)} kB`);
}

/* ---- sitemap ---------------------------------------------------------- */
const today = new Date().toISOString().slice(0, 10);
const priority = (route) => (route === "/" ? "1.0" : route.split("/").length > 2 ? "0.6" : "0.8");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${written
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route === "/" ? "/" : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priority(route)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

console.log(`[prerender] ${written.length} pages + 404.html + sitemap.xml written to dist/`);
