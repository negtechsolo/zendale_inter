import { afterEach, expect, it, vi } from "vitest";
import handler from "../api/contact";
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
const body = { kind: "partnership", pathway: "HMO", name: "Test Person", email: "test@example.com", phone: "+234 801 234 5678", page: "/partnerships", subject: "New partnership request", message: "<img src=x> Provider network", details: [["Organisation", "Sample HMO"]] };
async function submit() {
  vi.stubEnv("RESEND_API_KEY", "mock");
  vi.stubEnv("CONTACT_FROM", "Zendale <website@example.org>");
  vi.stubEnv("CONTACT_TO", "info@example.org, team@example.org");
  vi.stubEnv("CONTACT_AUTOREPLY", "");
  const res = {status: vi.fn().mockReturnThis(), json: vi.fn()};
  await handler({method: "POST", body},res);
  return res;
}
it("delivers a labelled and escaped HMO notification to both inboxes and a branded visitor receipt", async () => {
  const send = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", send);
  expect((await submit()).status).toHaveBeenCalledWith(200);
  const [staff, visitor] = send.mock.calls.map(call => JSON.parse(call[1].body));
  expect(staff.to).toEqual(["info@example.org", "team@example.org"]);
  expect(staff.subject).toContain("HMO partnership");
  expect(staff.html).toContain("Sample HMO");
  expect(staff.html).toContain("&lt;img src=x&gt;");
  expect(staff.html).toContain("zendale-logo.png");
  expect(visitor.to).toEqual([body.email]);
  expect(visitor.html).toContain("get back to you");
  expect(visitor.html).not.toContain("Provider network");
});
it("does not acknowledge a request if staff delivery failed", async () => {
  const send = vi.fn().mockResolvedValue({ ok: false });
  vi.stubGlobal("fetch",send);
  expect((await submit()).status).toHaveBeenCalledWith(502);
  expect(send).toHaveBeenCalledTimes(1);
});
