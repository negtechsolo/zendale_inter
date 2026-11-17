import { createHash } from "node:crypto";
import { mailRecipients } from "../server/mail-recipients.js";
import { brandedEmail } from "../server/branded-email.js";

interface RequestLike { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> }
interface ResponseLike { status(code: number): ResponseLike; json(body: unknown): void }
const clean = (x: unknown, n: number) => typeof x === "string" ? x.trim().slice(0, n) : "";
const line = (x: unknown, n: number) => clean(x, n).replace(/[\r\n]+/g, " ");
const pathways = new Set(["Corporate Organisation", "Hospital/Clinic", "Government or Non Government Agency", "HMO", "Healthcare Investor", "International Organisation"]);
const categories = new Map([
  ["general", "General enquiry"], ["resource", "Resource request"], ["insights", "Insights signup"],
  ["consultation", "Consultation request"], ["callback", "Callback request"], ["careers", "Careers enquiry"], ["partnership", "Partnership enquiry"],
]);
const validEmail = (x: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x);
const validPhone = (x: string) => /^\+?[\d\s().-]+$/.test(x) && x.replace(/\D/g, "").length >= 7 && x.replace(/\D/g, "").length <= 15;

// Best-effort burst control per instance, without storing raw addresses.
const recent = new Map<string, { count: number; until: number }>();
function allowed(value: string, max: number) {
  const now = Date.now(), key = createHash("sha256").update(value).digest("hex");
  for (const [id, entry] of recent) if (entry.until <= now) recent.delete(id);
  const entry = recent.get(key);
  if (entry) return entry.count++ < max;
  if (recent.size >= 1500) recent.delete(recent.keys().next().value!);
  recent.set(key, { count: 1, until: now + 10 * 60_000 });
  return true;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (req.headers?.["sec-fetch-site"] === "cross-site") return res.status(403).json({ error: "Submit this form from the Zendale website." });
  let b: Record<string, unknown>;
  try {
    b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as Record<string, unknown>;
    if (!b || typeof b !== "object" || Array.isArray(b)) throw Error();
  } catch { return res.status(400).json({ error: "Invalid submission." }); }
  const purpose = clean(b.kind, 30) || "general", pathway = line(b.pathway, 70);
  const name = line(b.name, 120), email = line(b.email, 200), phone = line(b.phone, 40);
  const topic = line(b.subject, 130), message = clean(b.message, 5000), page = line(b.page, 200);
  const category = purpose === "partnership" && pathways.has(pathway) ? (pathway === "HMO" ? "HMO partnership" : `Partnership: ${pathway}`) : purpose === "general" && topic === "HMO enquiry" ? "HMO enquiry" : purpose === "general" && topic === "Partnership" ? "Partnership enquiry" : categories.get(purpose);
  if (!category || !name || !message || !validEmail(email) || (phone && !validPhone(phone)) ||
      (purpose === "partnership" && (!pathways.has(pathway) || !phone)) ||
      (purpose === "callback" && !phone)) return res.status(400).json({ error: "Please complete every required field." });

  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM;
  const to = mailRecipients(process.env.CONTACT_TO);
  if (!key || !from || !to.length) return res.status(503).json({ error: "Mail delivery is not configured." });
  const ip = req.headers?.["x-vercel-forwarded-for"];
  if ((typeof ip === "string" && !allowed("ip:" + ip, 24)) || !allowed("email:" + email.toLowerCase(), 8)) return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  const send = (payload: Record<string, unknown>) => fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, ...payload }), signal: AbortSignal.timeout(9500),
  });
  const detailFields: [string,string][] = Array.isArray(b.details) ? b.details.slice(0, 12).flatMap(row =>
    Array.isArray(row) && row.length === 2 && line(row[0], 65) && clean(row[1], 300)
      ? [[line(row[0], 65), clean(row[1], 300)] as [string,string]] : []) : [];
  try {
    const staff = await send({
      to, reply_to: email, subject: `[Zendale | ${category}] ${topic || name}`,
      ...brandedEmail({ title: topic || "New website submission", category,
        intro: "A new submission has arrived from the Zendale website. Reply to this email to contact the sender.",
        fields: [["Name",name],["Email",email],["Phone",phone],["Source",page],...detailFields,["Message",message]] }),
    });
    if (!staff.ok) return res.status(502).json({ error: "Your request could not be delivered." });
  } catch { return res.status(502).json({ error: "Your request could not be delivered." }); }

  if (process.env.CONTACT_AUTOREPLY !== "off") {
    const intro = purpose === "insights" ? "Thank you for your interest in Zendale’s healthcare insights. Our team has received your signup request." :
      `Thank you, ${name.split(/\s+/)[0]}. We’ve received your request. The relevant team will review it and get back to you using the contact details you provided.`;
    try {
      const receipt = await send({ to: [email], reply_to: to[0], subject: `Zendale Limited | ${category} received`,
        ...brandedEmail({ title: "Thank you for getting in touch", category, intro, fields: [["Subject", topic]],
          note: "You can reply to this email to add information. Please do not send confidential medical records by email." }) });
      if (!receipt.ok) console.warn("Contact acknowledgement was rejected.");
    } catch { console.warn("Contact acknowledgement could not be sent."); }
  }
  return res.status(200).json({ ok: true });
}
