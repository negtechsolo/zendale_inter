import { useId, useState, type ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  kicker?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** Accessible expandable panel — chevron is small utility UI, as permitted. */
export function AccordionItem({ title, kicker, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="z-sweep flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span>
            {kicker && <span className="eyebrow block text-steel">{kicker}</span>}
            <span className="mt-1 block font-display text-xl text-ink sm:text-2xl">{title}</span>
          </span>
          <svg
            viewBox="0 0 20 20"
            className={`h-5 w-5 shrink-0 text-brass transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M4 7.5 10 13.5 16 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </h3>
      <div id={`${id}-panel`} hidden={!open} className="pb-8">
        {children}
      </div>
    </div>
  );
}
