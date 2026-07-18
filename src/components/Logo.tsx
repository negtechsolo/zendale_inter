import { Link } from "react-router-dom";

/** The Zendale mark: a bold geometric Z built from two parallel diagonal strokes. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3" aria-label="Zendale — home">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <rect width="40" height="40" fill={dark ? "#0B1B33" : "#FFFFFF"} />
        <path d="M9 8 h22 v5.5 L17.5 26.5 H31 V32 H9 v-5.5 L22.5 13.5 H9 Z" fill="#4A6FA5" />
      </svg>
      <span className={`font-display text-xl font-medium tracking-tight ${dark ? "text-porcelain" : "text-ink"}`}>
        Zendale
      </span>
    </Link>
  );
}
