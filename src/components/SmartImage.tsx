import { useState } from "react";

/**
 * Vite bundles every file dropped into /src/assets/images at build time —
 * so the owner adds photos by filename (per IMAGE-MANIFEST.md) without
 * touching code, and missing files never fire 404s in the console.
 */
const images = import.meta.glob("../assets/images/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface SmartImageProps {
  src: string; // filename inside /src/assets/images — see IMAGE-MANIFEST.md
  alt: string;
  className?: string;   // frame classes (aspect, mask, etc.)
  imgClassName?: string;
  eager?: boolean;      // above-the-fold images load eagerly
}

/**
 * Every photograph on the site renders through this component: a real <img>
 * wired to /src/assets/images/<filename>, lazy-loaded, with a shimmer
 * loading state and a graceful awaiting-photo state when the file has not
 * been supplied yet (frame keeps its brand-toned surface).
 */
export function SmartImage({ src, alt, className = "", imgClassName = "", eager = false }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const url = images[`../assets/images/${src}`];
  const missing = !url || errored;

  return (
    <div className={`img-frame ${className}`}>
      {!missing && (
        <img
          src={url}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover ${loaded ? "is-loaded" : ""} ${imgClassName}`}
        />
      )}
      {missing && (
        // Awaiting-photo state: mono label on the ink surface, never a fake icon graphic.
        <span className="absolute inset-0 z-10 flex items-end p-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-steel/70">
            Photo · {src}
          </span>
        </span>
      )}
    </div>
  );
}
