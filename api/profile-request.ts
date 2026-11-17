import { mailRecipients } from "../server/mail-recipients.js";

import { createHash } from "node:crypto";

interface RequestLike {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
}
interface ResponseLike {
  setHeader(name: string, value: string): void;
  status(code: number): ResponseLike;
  json(body: unknown): void;
}
const unavailable = "Email delivery isn’t available right now. Please try again later or contact Zendale.";
const clean = (value: unknown, max: number) =>
  typeof value === "string" && value.length <= max ? value.trim().replace(/[\r\n\t]/g, " ") : "";
const isEmail = (value: string) => /^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)+$/i.test(value);
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const throttle = new Map<string, { count: number; expires: number }>();
const WINDOW = 10 * 60_000;

function allowRequest(key: string, limit: number) {
  const now = Date.now();
  for (const [candidate, entry] of throttle) {
    if (entry.expires <= now) throttle.delete(candidate);
  }
  const entry = throttle.get(key);
  if (entry) {
    if (entry.count >= limit) return false;
    entry.count++;
  } else {
    if (throttle.size >= 1500) throttle.delete(throttle.keys().next().value!);
    throttle.set(key, { count: 1, expires: now + WINDOW });
  }
  return true;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (req.headers?.["sec-fetch-site"] === "cross-site") return res.status(403).json({ error: "Open the profile page and try again." });
  const contentType = req.headers?.["content-type"];
  if (typeof contentType !== "string" || !/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return res.status(415).json({ error: "Invalid form format." });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = typeof req.body === "string" && req.body.length <= 4096 ? JSON.parse(req.body) : req.body;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return res.status(400).json({ error: "Invalid form submission." });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 32);
  const organisation = clean(body.organisation, 160);
  if (body.website || name.length < 2 || !isEmail(email) ||
    !/^\+?[\d ().-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, ""))) {
    return res.status(400).json({ error: "Enter your full name, work email address and a valid phone number." });
  }

  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM?.trim();
  const leadsTo = mailRecipients(process.env.CONTACT_TO, process.env.PROFILE_LEADS_TO);
  let pdfUrl: URL;
  try {
    pdfUrl = new URL(process.env.PROFILE_PDF_URL ?? "");
    if (pdfUrl.protocol !== "https:" || pdfUrl.username || pdfUrl.password) throw new Error();
  } catch {
    return res.status(503).json({ error: unavailable });
  }
  if (!key || !from) return res.status(503).json({ error: unavailable });

  // Local burst protection complements the provider's idempotency and limits.
  // Vercel supplies x-vercel-forwarded-for on the server, never via form data.
  const ip = req.headers?.["x-vercel-forwarded-for"];
  if ((typeof ip === "string" && !allowRequest("ip:" + digest(ip), 15)) ||
      !allowRequest("email:" + digest(email.toLowerCase()), 4)) {
    res.setHeader("Retry-After", "600");
    return res.status(429).json({ error: "Too many requests. Please try again in a few minutes." });
  }

  const requestKey = digest(JSON.stringify([email.toLowerCase(), name, phone, organisation, pdfUrl.href]));
  async function send(message: Record<string, unknown>, purpose: string) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `profile/${purpose}/${requestKey}`,
      },
      body: JSON.stringify({ from, ...message }),
      signal: AbortSignal.timeout(9500),
    });
    if (!response.ok) {
      console.warn(`Profile email provider rejected ${purpose}: ${response.status}`);
      throw new Error("Provider rejected the request");
    }
  }

  try {
    await send({
      to: [email],
      subject: "Your Zendale Limited company profile",
      text: `Hello ${name},\n\nThank you for your interest in Zendale Limited. Our company profile is attached. It introduces our healthcare network, capabilities and partnership opportunities.\n\nTo discuss a partnership, visit https://www.zendalelimited.com/partnerships or contact info@zendalelimited.com.\n\nZendale Limited\nOne Partner. Complete Healthcare Solutions.`,
      attachments: [{ filename: "Zendale-Limited-Company-Profile.pdf", path: pdfUrl.href }],
    }, "delivery");
  } catch {
    return res.status(502).json({ error: "We couldn’t send the company profile. Please try again in a moment." });
  }

  if (leadsTo.length) {
    try {
      await send({
        to: leadsTo,
        reply_to: email,
        subject: "[Zendale] Company profile request",
        text: `A visitor requested the company profile.\n\nFull name: ${name}\nWork email: ${email}\nPhone: ${phone}\nOrganisation: ${organisation || "Not supplied"}`,
      }, "notification");
    } catch {
      console.warn("Profile sent, but internal request notification failed.");
    }
  }
  return res.status(200).json({ ok: true });
}
