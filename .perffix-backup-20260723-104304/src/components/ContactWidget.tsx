import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE, whatsappLink } from "../config";

/* ------------------------------------------------------------------ */
/*  Page-aware openers, so a conversation starts already in context     */
/* ------------------------------------------------------------------ */

const openers: Record<string, string> = {
  "/": "Hello Zendale, I'd like to talk to your team.",
  "/about": "Hello Zendale, I'd like to know more about the group.",
  "/network": "Hello Zendale, I have a question about one of your facilities.",
  "/services": "Hello Zendale, I'd like to ask about your services.",
  "/corporate-health":
    "Hello Zendale, I'd like to discuss a corporate health programme for my organisation.",
  "/consulting": "Hello Zendale, I'd like to speak with your consulting practice.",
  "/medical-technology": "Hello Zendale, I have a medical equipment enquiry.",
  "/partnerships": "Hello Zendale, I'd like to discuss a partnership.",
  "/how-we-work": "Hello Zendale, I'd like to understand how an engagement starts.",
  "/case-studies":
    "Hello Zendale, I'd like to discuss a similar engagement for my organisation.",
  "/resources": "Hello Zendale, I have a question about one of your resources.",
  "/downloads": "Hello Zendale, I'd like to request one of your capability guides.",
  "/careers": "Hello Zendale, I have a question about careers at Zendale.",
  "/contact": "Hello Zendale, I'd like to book a consultation.",
};

function openerFor(pathname: string): string {
  if (openers[pathname]) return openers[pathname];
  if (pathname.startsWith("/network/"))
    return "Hello Zendale, I have a question about one of your facilities.";
  if (pathname.startsWith("/resources/"))
    return "Hello Zendale, I have a question about one of your articles.";
  return openers["/"];
}

/** Routes an email enquiry to the right desk without asking the visitor to guess. */
const subjects = [
  "General enquiry",
  "Partnership",
  "Corporate health programme",
  "Healthcare consulting",
  "Medical technology",
  "Careers",
];

type Panel = "choose" | "form" | "sent";

/* ------------------------------------------------------------------ */
/*  Widget                                                             */
/* ------------------------------------------------------------------ */

/**
 * Contact widget.
 *
 * Replaces the round WhatsApp button. Two ways in — WhatsApp for people who
 * want an answer now, a written message for people who want a record — and
 * no third-party chat script, so it costs nothing in load time and carries
 * no other company's branding on a healthcare group's site.
 *
 * The written message posts to /api/contact. If that route is not configured
 * yet, it falls back to opening the visitor's mail client with everything
 * already filled in, so the widget is never a dead end.
 */
export function ContactWidget() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState<Panel>("choose");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const hasWhatsApp = Boolean(SITE.whatsappNumber);
  const hasEmail = Boolean(SITE.email);

  // Appears once the visitor has committed to the page.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes; focus stays inside while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('a[href], button, input, select, textarea')
        ?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, panel, close]);

  // A route change closes the widget rather than leaving it floating.
  useEffect(() => {
    setOpen(false);
    setPanel("choose");
  }, [pathname]);

  if (!hasWhatsApp && !hasEmail) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      `Subject: ${data.subject}`,
      "",
      data.message,
      "",
      `Sent from ${pathname}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setPanel("sent");
    } catch {
      // The mail route is not live yet: hand the message to the visitor's
      // own mail client rather than losing it.
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `${data.subject} — ${data.name}`
      )}&body=${encodeURIComponent(body)}`;
      setError("Opening your email app to send this message.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full border border-porcelain/25 bg-transparent px-3 py-2 text-sm text-porcelain outline-none transition-colors placeholder:text-porcelain/45 focus:border-brass";
  const labelCls = "eyebrow block text-porcelain/70";

  return (
    <>
      {/* Launcher — square, like every other surface on the site. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close the contact panel" : "Talk to our team"}
        className={`fixed right-5 z-[60] flex items-center gap-2.5 border border-brass/60 bg-ink px-4 py-3 text-porcelain shadow-[0_10px_30px_rgba(11,27,51,0.35)] transition-all duration-300 hover:border-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-brass" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          ) : (
            /* The Zendale Z-stroke, the same mark used across the site */
            <path
              d="M5 5h14L5 19h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          )}
        </svg>
        <span className="eyebrow hidden sm:inline">{open ? "Close" : "Talk to us"}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-label="Talk to the Zendale team"
          className="fixed right-5 z-[59] flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden border border-brass/45 bg-ink text-porcelain shadow-[0_24px_60px_rgba(11,27,51,0.45)]"
          style={{
            bottom: "calc(5.25rem + env(safe-area-inset-bottom, 0px))",
            maxHeight: "calc(100vh - 7.5rem)",
          }}
        >
          {/* Header */}
          <div className="shrink-0 border-b border-porcelain/15 px-5 pb-3.5 pt-4">
            <p className="eyebrow text-brass">Zendale Limited</p>
            <p className="mt-1 font-display text-lg leading-snug">
              {panel === "sent" ? "Message sent." : "Tell us the problem."}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-porcelain/70">
              {panel === "sent"
                ? "A member of the team will read this and come back to you."
                : "We'll bring the right part of the network to it."}
            </p>
          </div>

          {/* Choose a channel */}
          {panel === "choose" && (
            <div className="overflow-y-auto p-5">
              <div className="space-y-px bg-porcelain/15">
                {hasWhatsApp && (
                  <a
                    href={whatsappLink(openerFor(pathname))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 bg-ink px-4 py-3.5 transition-colors hover:bg-carbon"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#4FCE7E]" fill="currentColor" aria-hidden="true">
                      <path d="M12 2a9.9 9.9 0 0 0-8.5 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9 1-1.2 2.3-.4 3.8a11.7 11.7 0 0 0 4.6 4.4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.5-.2Z" />
                    </svg>
                    <span>
                      <span className="block text-sm font-medium">Chat on WhatsApp</span>
                      <span className="block text-xs text-porcelain/70">
                        Fastest way to reach a person
                      </span>
                    </span>
                  </a>
                )}

                {hasEmail && (
                  <button
                    type="button"
                    onClick={() => setPanel("form")}
                    className="flex w-full items-center gap-3.5 bg-ink px-4 py-3.5 text-left transition-colors hover:bg-carbon"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M3 6h18v12H3z" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    <span>
                      <span className="block text-sm font-medium">Write a message</span>
                      <span className="block text-xs text-porcelain/70">
                        For detailed or formal enquiries
                      </span>
                    </span>
                  </button>
                )}
              </div>

              {SITE.phoneDisplay && (
                <p className="mt-4 text-xs text-porcelain/70">
                  Or call{" "}
                  <a
                    href={`tel:${SITE.phoneE164}`}
                    className="text-brass underline decoration-brass/40 underline-offset-4"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </p>
              )}

              <p className="mt-4 border-t border-porcelain/15 pt-3 text-[0.6875rem] leading-relaxed text-porcelain/60">
                This channel is not monitored around the clock. In a medical
                emergency, go to your nearest emergency department.
              </p>
            </div>
          )}

          {/* Write a message */}
          {panel === "form" && (
            <form onSubmit={handleSubmit} className="grid gap-2.5 overflow-y-auto p-5" noValidate={false}>
              <div>
                <label className={labelCls} htmlFor="zw-name">
                  Name
                </label>
                <input id="zw-name" name="name" required autoComplete="name" className={`${field} mt-1`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="zw-email">
                  Email
                </label>
                <input id="zw-email" name="email" type="email" required autoComplete="email" className={`${field} mt-1`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="zw-phone">
                  Phone <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input id="zw-phone" name="phone" type="tel" autoComplete="tel" className={`${field} mt-1`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="zw-subject">
                  Subject
                </label>
                <select id="zw-subject" name="subject" required className={`${field} mt-1`} defaultValue={subjects[0]}>
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-ink text-porcelain">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls} htmlFor="zw-message">
                  Message
                </label>
                <textarea id="zw-message" name="message" required rows={3} className={`${field} mt-1 resize-none`} />
              </div>

              <p className="text-[0.6875rem] leading-relaxed text-porcelain/60">
                Please don't include clinical details or medical records here.
              </p>

              {error && (
                <p role="status" className="text-xs text-brass">
                  {error}
                </p>
              )}

              <div className="mt-1 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send message"}
                </button>
                <button
                  type="button"
                  onClick={() => setPanel("choose")}
                  className="text-xs text-porcelain/70 underline underline-offset-4 hover:text-porcelain"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Sent */}
          {panel === "sent" && (
            <div className="p-5">
              <button
                type="button"
                onClick={close}
                className="bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
