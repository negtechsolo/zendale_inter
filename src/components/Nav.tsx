import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const primary = [
  { to: "/about", label: "Who We Are" },
  { to: "/network", label: "Healthcare Network" },
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/case-studies", label: "Success Stories" },
  { to: "/resources", label: "Resources" },
];

const secondary = [
  { to: "/corporate-health", label: "Corporate Healthcare" },
  { to: "/consulting", label: "Healthcare Consulting" },
  { to: "/medical-technology", label: "Medical Technology" },
  { to: "/partnerships", label: "Partner With Zendale" },
  { to: "/downloads", label: "Download Centre" },
  { to: "/careers", label: "Careers" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const solidHeader = scrolled || open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solidHeader
          ? "bg-porcelain/95 shadow-[0_1px_0_rgba(11,27,51,0.08)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
        <Logo dark={!solidHeader} />

        <nav
          className="hidden items-center gap-7 xl:flex"
          aria-label="Primary"
        >
          {primary.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-steel"
                    : solidHeader
                      ? "text-carbon/80 hover:text-steel"
                      : "text-porcelain/80 hover:text-porcelain"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="border border-steel bg-steel px-5 py-2.5 text-sm font-medium text-porcelain transition-colors hover:bg-[#3d5d8c]"
          >
            Talk to Our Team
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex h-11 w-11 items-center justify-center xl:hidden"
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>

          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              solidHeader ? "text-ink" : "text-porcelain"
            }`}
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M5 5 19 19 M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            ) : (
              <path
                d="M3 7 H21 M3 12 H21 M3 17 H21"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="site-menu"
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-porcelain px-6 pb-24 pt-6 xl:hidden"
        >
          <p className="eyebrow mb-4 text-steel">
            Explore Zendale
          </p>

          <nav className="grid gap-1" aria-label="Site">
            {[
              ...primary,
              ...secondary,
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-ink/10 py-3.5 font-display text-2xl ${
                    isActive ? "text-steel" : "text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-block bg-steel px-6 py-3 text-sm font-medium text-porcelain"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}