/**
 * Contact endpoint for the site's message widget.
 *
 * Runs as a Vercel Serverless Function at /api/contact. It is optional:
 * until RESEND_API_KEY is set in the Vercel project the endpoint reports
 * that it is not configured, and the widget falls back to opening the
 * visitor's own mail client, so no message is ever lost.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   API key from resend.com
 *   CONTACT_TO       Where enquiries land, e.g. info@zendalelimited.com
 *   CONTACT_FROM     A verified sender, e.g. website@zendalelimited.com
 */

interface RequestLike {
  method?: string;
  body?: unknown;
}

interface ResponseLike {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
}

const MAX = { name: 120, email: 200, phone: 40, subject: 160, message: 5000 };

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    // Not an error: the widget handles this by using the visitor's mail client.
    res.status(501).json({ error: "Mail delivery is not configured" });
    return;
  }

  const payload = (typeof req.body === "string" ? safeParse(req.body) : req.body) as
    | Record<string, unknown>
    | undefined;

  const name = clean(payload?.name, MAX.name);
  const email = clean(payload?.email, MAX.email);
  const phone = clean(payload?.phone, MAX.phone);
  const subject = clean(payload?.subject, MAX.subject);
  const message = clean(payload?.message, MAX.message);
  const page = clean(payload?.page, 200);

  if (!name || !email || !subject || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    res.status(400).json({ error: "Please complete every required field." });
    return;
  }

  const html = `
    <h2 style="font:600 16px system-ui;margin:0 0 12px">${escapeHtml(subject)}</h2>
    <p style="font:14px system-ui;margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="font:14px system-ui;margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p style="font:14px system-ui;margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${page ? `<p style="font:14px system-ui;margin:0 0 12px"><strong>Sent from:</strong> ${escapeHtml(page)}</p>` : ""}
    <pre style="font:14px/1.6 system-ui;white-space:pre-wrap;margin:0">${escapeHtml(message)}</pre>
  `;

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  try {
    // 1. The notification. This one matters — if it fails, the enquiry is lost.
    const notification = await send({
      from,
      to: [to],
      reply_to: email,
      subject: `[Website] ${subject} — ${name}`,
      html,
    });

    if (!notification.ok) throw new Error(await notification.text());

    // 2. The confirmation back to the sender, so they know it arrived and
    //    have a copy of what they wrote. Sent after the notification has
    //    succeeded, and never allowed to fail the request: a missing receipt
    //    is a small problem, a lost enquiry is not.
    if (process.env.CONTACT_AUTOREPLY !== "off") {
      try {
        await send({
          from,
          to: [email],
          reply_to: to,
          subject: "We have your message — Zendale Limited",
          html: confirmationHtml({ name, subject, message }),
        });
      } catch {
        /* the enquiry is already safely delivered */
      }
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "The message could not be delivered." });
  }
}

/**
 * Receipt sent to the person who wrote in.
 *
 * Deliberately makes no promise about response times, and repeats the
 * emergency notice, because someone may reach this by email having skipped
 * the widget's own wording.
 */
function confirmationHtml({
  name,
  subject,
  message,
}: {
  name: string;
  subject: string;
  message: string;
}): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] || name);
  return `
  <div style="font:15px/1.65 system-ui,-apple-system,Segoe UI,sans-serif;color:#16233A;max-width:560px">
    <p style="font:600 13px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#855F28;margin:0 0 18px">
      Zendale Limited
    </p>

    <p style="margin:0 0 14px">Dear ${firstName},</p>

    <p style="margin:0 0 14px">
      Thank you for contacting Zendale Limited. Your message has reached our
      team and a member of staff will read it and come back to you.
    </p>

    <p style="margin:0 0 8px"><strong>Your message</strong></p>
    <div style="border-left:2px solid #DCE6F2;padding:2px 0 2px 14px;margin:0 0 18px">
      <p style="margin:0 0 8px;color:#4A6FA5;font-size:13px">${escapeHtml(subject)}</p>
      <pre style="font:14px/1.6 system-ui;white-space:pre-wrap;margin:0">${escapeHtml(message)}</pre>
    </div>

    <p style="margin:0 0 14px">
      If you need to reach us sooner, you can reply to this email or call
      <a href="tel:+2349061829702" style="color:#855F28">+234 906 182 9702</a>.
    </p>

    <p style="margin:0 0 18px;font-size:13px;color:#4A6FA5">
      Please note this inbox is not monitored around the clock. In a medical
      emergency, go to your nearest emergency department.
    </p>

    <p style="margin:0;font-size:13px;color:#4A6FA5">
      Zendale Limited · 42 Oduduwa Crescent, Ikeja GRA, Lagos, Nigeria<br />
      <a href="https://www.zendalelimited.com" style="color:#855F28">zendalelimited.com</a>
    </p>
  </div>`;
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}
