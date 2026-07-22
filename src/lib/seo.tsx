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

/**
 * Per-route metadata for the client-rendered application.
 * The static defaults in index.html cover link previews that do not execute
 * JavaScript; this component supplies unique titles, descriptions, canonical
 * URLs and social metadata after each route mounts.
 */
export function Seo({
  title,
  description,
  canonicalPath,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title === SITE.tagline
      ? `${SITE.name} | ${SITE.tagline}`
      : `${title} | ${SITE.name}`;
    const canonicalUrl = new URL(canonicalPath ?? window.location.pathname, SITE.url).toString();
    const imageUrl = new URL(image ?? SITE.socialImage, SITE.url).toString();

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", SITE.name, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", imageUrl, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);

    if (type === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, true);
    } else {
      removeMeta("article:published_time", true);
    }

    if (type === "article" && modifiedTime) {
      setMeta("article:modified_time", modifiedTime, true);
    } else {
      removeMeta("article:modified_time", true);
    }

    setCanonical(canonicalUrl);
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
