import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

/**
 * Per-route document metadata. Dependency-free alternative to react-helmet:
 * sets <title>, meta description and Open Graph tags on route mount.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = `${title} — Zendale`;
    setMeta("description", description);
    setMeta("og:title", `${title} — Zendale`, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
  }, [title, description]);
  return null;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
