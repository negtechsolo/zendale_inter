import { imageMeta, srcSetFor } from "../lib/imageMeta";

interface FacilityLogoProps {
  /** Public path as stored in the facility data, e.g. "/images/facility-logos/x.webp". */
  src: string;
  alt: string;
  className?: string;
  /** CSS width the logo actually occupies; drives which variant is fetched. */
  sizes?: string;
  eager?: boolean;
}

/**
 * Facility logos are supplied at ~1000px but render at 44–80px tall.
 * This component serves the pre-generated small variant and always emits
 * intrinsic width/height so the box never shifts while loading.
 */
export function FacilityLogo({
  src,
  alt,
  className = "",
  sizes = "320px",
  eager = false,
}: FacilityLogoProps) {
  const key = src.replace(/^\/images\//, "");
  const meta = imageMeta[key];
  const srcSet = srcSetFor(key);
  const small =
    meta?.v.includes(400) ? src.replace(/\.(webp|png|jpe?g)$/i, "-400.webp") : src;

  return (
    <img
      src={small}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      width={meta?.w}
      height={meta?.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
