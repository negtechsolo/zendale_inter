import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE, whatsappLink } from "../config";

/** Page-aware pre-filled messages so the conversation starts in context. */
const messages: Record<string, string> = {
  "/": "Hello Zendale, I'd like to talk to your team.",
  "/network": "Hello Zendale, I have a question about one of your facilities.",
  "/corporate-health": "Hello Zendale, I'd like to discuss a corporate health programme for my organisation.",
  "/consulting": "Hello Zendale, I'd like to speak with your consulting practice.",
  "/medical-technology": "Hello Zendale, I have a medical equipment enquiry.",
  "/partnerships": "Hello Zendale, I'd like to discuss a partnership.",
  "/downloads": "Hello Zendale, I'd like to request one of your capability guides.",
  "/case-studies": "Hello Zendale, I'd like to discuss a similar engagement for my organisation.",
  "/careers": "Hello Zendale, I have a question about careers at Zendale.",
  "/contact": "Hello Zendale, I'd like to book a consultation.",
};

/**
 * Live WhatsApp action: appears after first scroll, respects mobile safe areas,
 * pre-fills a message for the current page. Hidden entirely until a real
 * WhatsApp number is configured in src/config.ts.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!SITE.whatsappNumber) return null;
  const href = whatsappLink(messages[pathname] ?? messages["/"]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zendale on WhatsApp"
      className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#128C4B] text-white shadow-lg transition-all duration-300 hover:scale-105 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12 2a9.9 9.9 0 0 0-8.5 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9 1-1.2 2.3-.4 3.8a11.7 11.7 0 0 0 4.6 4.4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.5-.2Z" />
      </svg>
    </a>
  );
}
