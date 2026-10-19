interface RequestLike {
  method?: string;
  body?: unknown;
}
interface ResponseLike {
  status(code: number): ResponseLike;
  json(body: unknown): void;
}
const RECIPIENT = "everester.oguh@zendalelimited.com";
const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const validEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  let body: Record<string, unknown>;
  try {
    const parsed =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
  if (body.website)
    return res.status(400).json({ error: "Unable to accept this request." });
  const name = text(body.name, 120),
    email = text(body.email, 200),
    phone = text(body.phone, 40);
  const organisation = text(body.organisation, 200),
    organisationType = text(body.organisationType, 80);
  const location = text(body.location, 300),
    timeframe = text(body.timeframe, 120),
    notes = text(body.notes, 2000);
  const allowedTypes = [
    "Pharmacy",
    "Hospital",
    "Clinic",
    "Other healthcare organisation",
  ];
  if (
    !name ||
    !validEmail(email) ||
    !/^[+\d][\d\s()-]{6,24}$/.test(phone) ||
    !organisation ||
    !location ||
    !allowedTypes.includes(organisationType) ||
    body.consent !== true
  ) {
    return res
      .status(400)
      .json({
        error:
          "Complete your contact, organisation and delivery details, and agree to be contacted.",
      });
  }
  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length > 30)
    return res
      .status(400)
      .json({
        error:
          "Use a purchasing list for requests with more than 30 medicines.",
      });
  const items = rawItems
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const row = item as Record<string, unknown>;
      return {
        name: text(row.name, 200),
        strength: text(row.strength, 100),
        form: text(row.form, 100),
        quantity: text(row.quantity, 100),
      };
    })
    .filter((row) => row.name || row.strength || row.form || row.quantity);
  if (items.some((row) => !row.name || !row.quantity))
    return res
      .status(400)
      .json({
        error: "Enter a medicine name and quantity for each completed row.",
      });
  const attachments: { filename: string; content: string }[] = [];
  if (body.attachment) {
    const a = body.attachment as Record<string, unknown>;
    const filename = text(a.filename, 160).replace(/[^a-zA-Z0-9._-]/g, "_");
    const content = typeof a.content === "string" ? a.content : "";
    if (
      !/\.(pdf|csv|txt)$/i.test(filename) ||
      !content ||
      content.length > 2800000 ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(content) ||
      content.length % 4 !== 0
    ) {
      return res
        .status(400)
        .json({
          error:
            "Upload a PDF, CSV or text purchasing list no larger than 2 MB.",
        });
    }
    const bytes = Buffer.from(content, "base64");
    if (
      bytes.length > 2 * 1024 * 1024 ||
      (/\.pdf$/i.test(filename) && bytes.subarray(0, 5).toString() !== "%PDF-")
    ) {
      return res
        .status(400)
        .json({ error: "The purchasing list is invalid or too large." });
    }
    attachments.push({ filename, content });
  }
  if (!items.length && !attachments.length)
    return res
      .status(400)
      .json({
        error: "Add at least one medicine or upload a purchasing list.",
      });
  const key = process.env.RESEND_API_KEY,
    from = process.env.CONTACT_FROM;
  if (!key || !from)
    return res
      .status(503)
      .json({
        error:
          "Online delivery is unavailable. Please email your request to everester.oguh@zendalelimited.com.",
      });
  const message = [
    "Zendale Central Store — Supply Quote Request",
    `Name: ${name}`,
    `Organisation: ${organisation}`,
    `Type: ${organisationType}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Delivery location: ${location}`,
    `Required timeframe: ${timeframe || "Not specified"}`,
    "",
    "Medicines requested:",
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.name} | Strength: ${item.strength || "Not specified"} | Form: ${item.form || "Not specified"} | Quantity: ${item.quantity}`,
    ),
    attachments.length ? "Purchasing list attached." : "",
    "",
    `Additional information: ${notes || "None"}`,
    "Consent to contact: Yes",
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email,
        subject: "[Central Store] Supply quote request",
        text: message,
        ...(attachments.length ? { attachments } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return res.status(200).json({ ok: true });
  } catch {
    return res
      .status(502)
      .json({
        error:
          "Your request could not be delivered. Please try again or email everester.oguh@zendalelimited.com.",
      });
  }
}
