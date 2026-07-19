import { Link } from "react-router-dom";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3"
      aria-label="Zendale Limited — home"
    >
      <img
        src="/zendale-logo.png"
        alt=""
        className="h-10 w-10 object-contain lg:h-12 lg:w-12"
        aria-hidden="true"
      />

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-medium tracking-tight ${
            dark ? "text-porcelain" : "text-ink"
          }`}
        >
          Zendale
        </span>

        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-porcelain/70" : "text-steel"
          }`}
        >
          Limited
        </span>
      </span>
    </Link>
  );
}