import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "brass";

const styles: Record<Variant, string> = {
  primary:
    "bg-steel text-porcelain hover:bg-[#3d5d8c] border border-steel",
  outline:
    "border border-carbon/25 text-carbon hover:border-steel hover:text-steel",
  light:
    "border border-porcelain/40 text-porcelain hover:border-porcelain hover:bg-porcelain/10",
  brass:
    "bg-brass text-ink hover:bg-[#b98a49] border border-brass",
};

interface ButtonProps {
  to?: string;        // internal route
  href?: string;      // external link (new tab)
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

/** Buttons state exactly what happens; vocabulary is consistent site-wide. */
export function Button({ to, href, onClick, type = "button", variant = "primary", children, className = "" }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 px-6 py-3 font-sans text-sm font-medium transition-colors duration-200 ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
