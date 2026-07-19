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
        // Awaiting-photo state: a composed brand frame (outlined Z watermark +
        // mono caption), so unshipped slots read as designed, never broken.
        <span className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
          <svg viewBox="0 0 60 60" className="h-14 w-14 opacity-[0.28]" aria-hidden="true">
            <path d="M12 12 H48 L20 42 H48 M12 12 L12 20 M48 42 V48 H12" fill="none" stroke="#4A6FA5" strokeWidth="2.5" strokeLinecap="square" />
          </svg>
          <span className="absolute bottom-3 left-4 font-mono text-[0.625rem] uppercase tracking-eyebrow text-steel/60">
            Photograph · {src.replace(".jpg", "")}
          </span>
        </span>
      )}
    </div>
  );
}
