/**
 * Site-wide contact configuration.
 *
 * Add Zendale's approved public contact details before final launch.
 * Empty values hide the corresponding interface elements cleanly.
 */
export const SITE = {
  name: "Zendale Limited",
  shortName: "Zendale",
  url: "https://zendale.vercel.app",
  socialImage: "/images/zendale-social-card.png",
  tagline: "One Partner. Complete Healthcare Solutions.",
  /** International format, digits only, e.g. "234XXXXXXXXXX". Empty = WhatsApp UI hidden. */
  whatsappNumber: "", // Add the approved Zendale WhatsApp business number before final launch
  /** Public enquiries email. Empty = email rows hidden. */
  email: "", // Add the approved Zendale enquiries email before final launch
  /** Head-office address lines. Empty array = address block hidden on /contact. */
  addressLines: [] as string[], // Add the approved head-office address before final launch
  socials: [] as { label: string; href: string }[], // Add approved social profile links before final launch
};

/** Builds a wa.me deep link with a pre-filled, page-specific message. */
export function whatsappLink(message: string): string {
  if (!SITE.whatsappNumber) return "";
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
