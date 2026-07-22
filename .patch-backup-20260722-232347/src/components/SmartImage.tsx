import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Images are served directly from /public/images
  const url = `/images/${src}`;
  const missing = errored;

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