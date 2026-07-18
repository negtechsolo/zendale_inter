/**
 * Site-wide contact configuration.
 *
 * TODO (Owner input required): the values below were NOT supplied in the brief and
 * must be replaced with Zendale's real details before launch. Nothing is invented:
 * empty strings hide the corresponding UI cleanly (components check for them).
 */
export const SITE = {
  name: "Zendale",
  tagline: "One Partner. Complete Healthcare Solutions.",
  /** International format, digits only, e.g. "234XXXXXXXXXX". Empty = WhatsApp UI hidden. */
  whatsappNumber: "", // TODO: supply Zendale's WhatsApp business number
  /** Public enquiries email. Empty = email rows hidden. */
  email: "", // TODO: supply Zendale's enquiries email
  /** Head-office address lines. Empty array = address block hidden on /contact. */
  addressLines: [] as string[], // TODO: supply head-office address
  socials: [] as { label: string; href: string }[], // TODO: supply real social profiles
};

/** Builds a wa.me deep link with a pre-filled, page-specific message. */
export function whatsappLink(message: string): string {
  if (!SITE.whatsappNumber) return "";
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
