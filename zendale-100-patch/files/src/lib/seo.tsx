import { useEffect } from "react";
import { SITE } from "../config";

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/** Everything the document head needs, resolved once and used by both renders. */
export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  robots: string;
  /** Extra JSON-LD blocks contributed by the page (article, FAQ, breadcrumbs). */
  jsonLd: string[];
}

/* ------------------------------------------------------------------ */
/*  Server-side collection                                             */
/*  During pre-rendering there is no document to mutate, so the Seo     */
/*  component records what it resolved and scripts/prerender.mjs writes */
/*  it into the static <head>. In the browser none of this runs.        */
/* ------------------------------------------------------------------ */

const isServer = typeof window === "undefined";

let ssrPathname = "/";
let ssrResult: ResolvedSeo | null = null;

/** Called by entry-server before each route is rendered. */
export function beginSsr(pathname: string) {
  ssrPathname = pathname;
  ssrResult = null;
}

/** Called by entry-server after render; returns whatever the page declared. */
export function endSsr(): ResolvedSeo | null {
  return ssrResult;
}

/** Lets a page contribute an extra JSON-LD block to the pre-rendered head. */
export function addJsonLd(json: unknown) {
  if (!isServer || !ssrResult) return;
  ssrResult.jsonLd.push(JSON.stringify(json));
}

function resolve(props: SeoProps, pathname: string): ResolvedSeo {
  const {
    title,
    description,
    canonicalPath,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    noIndex = false,
  } = props;

  /* The homepage uses the short brand so the full tag stays under the
     60-character limit search results are truncated at. */
  const fullTitle =
    title === SITE.tagline
      ? `${SITE.shortName} | ${SITE.tagline}`
      : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    canonical: new URL(canonicalPath ?? pathname, SITE.url).toString(),
    image: new URL(image ?? SITE.socialImage, SITE.url).toString(),
    type,
    publishedTime: type === "article" ? publishedTime : undefined,
    modifiedTime: type === "article" ? modifiedTime : undefined,
    robots: noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd: [],
  };
}

/**
 * Per-route metadata.
 *
 * On the server it records the resolved head for the pre-render step.
 * In the browser it keeps the head in sync as the user navigates.
 */
export function Seo(props: SeoProps) {
  if (isServer) {
    // Render-time on the server only; there is no client effect to race with.
    ssrResult = resolve(props, ssrPathname);
  }

  const {
    title,
    description,
    canonicalPath,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    noIndex = false,
  } = props;

  useEffect(() => {
    const seo = resolve(
      { title, description, canonicalPath, image, type, publishedTime, modifiedTime, noIndex },
      window.location.pathname
    );

    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("robots", seo.robots);

    setMeta("og:title", seo.title, true);
    setMeta("og:description", seo.description, true);
    setMeta("og:type", seo.type, true);
    setMeta("og:site_name", SITE.name, true);
    setMeta("og:url", seo.canonical, true);
    setMeta("og:image", seo.image, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", seo.image);

    if (seo.publishedTime) setMeta("article:published_time", seo.publishedTime, true);
    else removeMeta("article:published_time", true);

    if (seo.modifiedTime) setMeta("article:modified_time", seo.modifiedTime, true);
    else removeMeta("article:modified_time", true);

    setCanonical(seo.canonical);
  }, [title, description, canonicalPath, image, type, publishedTime, modifiedTime, noIndex]);

  return null;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMeta(name: string, property = false) {
  const attr = property ? "property" : "name";
  document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)?.remove();
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}
