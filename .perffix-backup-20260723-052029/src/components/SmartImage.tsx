import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { imageMeta, srcSetFor } from "../lib/imageMeta";

/** useLayoutEffect in the browser, useEffect on the server (no SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /**
   * Rendered width hint for the browser's srcset picker. The default covers
   * the site's dominant pattern: full width on phones, half a 1280px container
   * on desktop.
   */
  sizes?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw";

export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  sizes = DEFAULT_SIZES,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  /* Pre-rendered pages often have the image decoded before React hydrates,
     in which case onLoad never fires. Check the element directly on mount. */
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, [src]);

  // Images are served directly from /public/images
  const url = `/images/${src}`;
  const meta = imageMeta[src];
  const srcSet = srcSetFor(src);
  const missing = errored;

  return (
    <div className={`img-frame ${loaded ? "is-loaded" : ""} ${className}`}>
      {!missing && (
        <img
          ref={ref}
          src={url}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          width={meta?.w}
          height={meta?.h}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          {...(eager ? { fetchpriority: "high" } : {})}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover ${
            loaded ? "is-loaded" : ""
          } ${imgClassName}`}
        />
      )}

      {missing && (
        <span className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
          <svg
            viewBox="0 0 60 60"
            className="h-14 w-14 opacity-[0.28]"
            aria-hidden="true"
          >
            <path
              d="M12 12 H48 L20 42 H48 M12 12 L12 20 M48 42 V48 H12"
              fill="none"
              stroke="#4A6FA5"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
          </svg>

          <span className="absolute bottom-3 left-4 font-mono text-[0.625rem] uppercase tracking-eyebrow text-steel/60">
            Photograph · {src.replace(".webp", "")}
          </span>
        </span>
      )}
    </div>
  );
}
