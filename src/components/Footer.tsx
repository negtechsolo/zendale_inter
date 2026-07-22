import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { facilities, facilityProfilePath } from "../data/facilities";
import { SITE } from "../config";
import { Logo } from "./Logo";

const explore = [
  { to: "/about", label: "Who We Are" },
  { to: "/network", label: "Healthcare Network" },
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/case-studies", label: "Success Stories" },
  { to: "/resources", label: "Resource Centre" },
  { to: "/downloads", label: "Download Centre" },
];

const workWithUs = [
  { to: "/corporate-health", label: "Corporate Healthcare" },
  { to: "/consulting", label: "Healthcare Consulting" },
  { to: "/medical-technology", label: "Medical Technology" },
  { to: "/partnerships", label: "Partner With Zendale" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy & Compliance" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  }

  return (
    <footer className="bg-ink text-porcelain">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-porcelain/70">
              Zendale Limited is an integrated healthcare group connecting specialist care, consulting, medical technology, corporate health and partnerships through a growing network.
            </p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm" noValidate>
              <label htmlFor="footer-news" className="eyebrow block text-brass">
                Healthcare insights, occasionally
              </label>
              <div className="mt-3 flex">
                <input
                  id="footer-news"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                  placeholder="you@organisation.com"
                  className="w-full border border-porcelain/25 bg-transparent px-4 py-2.5 text-sm placeholder:text-porcelain/40 focus:border-brass focus:outline-none"
                />
                <button type="submit" className="shrink-0 border border-l-0 border-brass bg-brass px-4 py-2.5 text-sm font-medium text-ink hover:bg-[#b98a49]">
                  Subscribe
                </button>
              </div>
              {state === "error" && (
                <p className="mt-2 text-xs text-brass" role="alert">
                  That email address does not look complete. Check it and try again.
                </p>
              )}
              {state === "done" && (
                <p className="mt-2 text-xs text-porcelain/70" role="status">
                  You're on the list. We publish rarely and only when it's worth your time.
                </p>
              )}
            </form>
          </div>

          <nav className="lg:col-span-3" aria-label="Explore">
            <h2 className="eyebrow text-porcelain/50">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-porcelain/80 transition-colors hover:text-brass">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Work with us">
            <h2 className="eyebrow text-porcelain/50">Work With Us</h2>
            <ul className="mt-4 space-y-2.5">
              {workWithUs.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-porcelain/80 transition-colors hover:text-brass">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Healthcare network">
            <h2 className="eyebrow text-porcelain/50">The Network</h2>
            <ul className="mt-4 space-y-2.5">
              {facilities.map((facility) => (
                <li key={facility.id}>
                  <Link
                    to={facilityProfilePath(facility.id)}
                    className="text-sm text-porcelain/80 transition-colors hover:text-brass"
                  >
                    {facility.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="brass-rule mt-14" />
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-porcelain/40">
            © {new Date().getFullYear()} Zendale Limited · One Partner. Complete Healthcare Solutions.
          </p>
          {SITE.socials.length > 0 && (
            <ul className="flex gap-5">
              {SITE.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-porcelain/70 hover:text-brass">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
