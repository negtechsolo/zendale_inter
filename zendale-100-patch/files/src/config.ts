/**
 * Site-wide contact configuration.
 *
 * Empty values hide the corresponding interface elements cleanly, so a field
 * can be blanked at any time without leaving a broken row behind.
 */
export const SITE = {
  name: "Zendale Limited",
  shortName: "Zendale",
  url: "https://www.zendalelimited.com",
  socialImage: "/images/zendale-social-card.png",
  tagline: "One Partner. Complete Healthcare Solutions.",

  /** International format, digits only. Empty = WhatsApp UI hidden. */
  whatsappNumber: "2349061829702",
  /** Same line, formatted for reading and for tel: links. */
  phoneDisplay: "+234 906 182 9702",
  phoneE164: "+2349061829702",

  /** Public enquiries email. Empty = email rows hidden. */
  email: "info@zendalelimited.com",
  /** Partnership enquiries, used in structured data. Empty = omitted. */
  partnershipsEmail: "partnerships@zendalelimited.com",

  /** Head-office address lines. Empty array = address block hidden on /contact. */
  addressLines: [
    "42 Oduduwa Crescent",
    "Ikeja GRA",
    "Lagos, Nigeria",
  ] as string[],

  /** Structured form of the same address, for schema.org PostalAddress. */
  address: {
    street: "42 Oduduwa Crescent",
    locality: "Ikeja GRA",
    region: "Lagos",
    country: "NG",
  },

  /**
   * Social profiles. `icon` selects the glyph drawn in the footer.
   * These also become the organisation's `sameAs` list in structured data,
   * which is one of the signals search and answer engines use to confirm a
   * brand is real. Every URL here must resolve to a live profile.
   */
  socials: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/zendalelimited" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/zendalelimited" },
    { label: "X", icon: "x", href: "https://x.com/zendalelimited" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/zendalelimited" },
  ] as { label: string; icon: string; href: string }[],

  /**
   * GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
   *
   * When this is set, the build writes the Google tag into the <head> of every
   * pre-rendered page, so it is present in the static HTML rather than being
   * attached later by JavaScript. Empty = no analytics script, no cookies and
   * no third-party request at all.
   */
  analyticsId: "",
};

/** Builds a wa.me deep link with a pre-filled, page-specific message. */
export function whatsappLink(message: string): string {
  if (!SITE.whatsappNumber) return "";
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
