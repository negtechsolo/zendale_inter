import { afterEach, beforeEach, expect, it, vi } from "vitest";
import handler from "../api/profile-request";

const valid = { name: "Preview Visitor", email: "visitor@example.com", phone: "+234 801 234 5678", organisation: "Example Group" };
const headers = { "content-type": "application/json", "sec-fetch-site": "same-origin" };

async function submit(body: unknown) {
  const response = { status: vi.fn().mockReturnThis(), json: vi.fn(), setHeader: vi.fn() };
  await handler({ method: "POST", headers, body }, response);
  return response;
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_FROM", "Zendale <profiles@example.com>");
  vi.stubEnv("PROFILE_PDF_URL", "https://example.com/final-profile.pdf");
  vi.stubEnv("PROFILE_LEADS_TO", "");
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it("does not send anything when required data or the final PDF is missing", async () => {
  const send = vi.fn();
  vi.stubGlobal("fetch", send);
  expect((await submit({ ...valid, phone: "1" })).status).toHaveBeenCalledWith(400);
  vi.stubEnv("PROFILE_PDF_URL", "");
  expect((await submit(valid)).status).toHaveBeenCalledWith(503);
  expect(send).not.toHaveBeenCalled();
});

it("emails the configured PDF to the visitor and sends lead fields only to the configured inbox", async () => {
  const send = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", send);
  vi.stubEnv("PROFILE_LEADS_TO", "partnerships@example.com");
  expect((await submit(valid)).status).toHaveBeenCalledWith(200);
  const delivery = JSON.parse(send.mock.calls[0][1].body);
  const notification = JSON.parse(send.mock.calls[1][1].body);
  expect(delivery.to).toEqual([valid.email]);
  expect(delivery.attachments).toEqual([{ filename: "Zendale-Limited-Company-Profile.pdf", path: "https://example.com/final-profile.pdf" }]);
  expect(delivery.text).not.toContain(valid.phone);
  expect(notification.to).toEqual(["partnerships@example.com"]);
  expect(notification.text).toContain(valid.phone);
});

it("reports a delivery error instead of showing success when the email provider rejects the request", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
  expect((await submit({ ...valid, email: "other@example.com" })).status).toHaveBeenCalledWith(502);
});
