import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../api/supply-quote";
const valid = {
  name: "Quote Test",
  email: "buyer@example.com",
  phone: "+2348000000000",
  organisation: "Example Pharmacy",
  organisationType: "Pharmacy",
  location: "Ikeja, Lagos",
  consent: true,
  items: [
    {
      name: "Requested medicine",
      strength: "Customer specified",
      form: "Tablet",
      quantity: "10 packs",
    },
  ],
};
function response() {
  return {
    code: 0,
    body: {} as any,
    status(code: number) {
      this.code = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
    },
  };
}
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_FROM", "website@example.com");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("supply quote delivery", () => {
  it("sends validated requests only to the designated recipient", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", send);
    const res = response();
    await handler(
      { method: "POST", body: { ...valid, to: "other@example.com" } },
      res,
    );
    expect(res.code).toBe(200);
    expect(res.body.ok).toBe(true);
    const payload = JSON.parse(send.mock.calls[0][1].body);
    expect(payload.to).toEqual(["everester.oguh@zendalelimited.com"]);
    expect(payload.reply_to).toBe(valid.email);
    expect(payload.text).toContain("10 packs");
  });
  it("does not show success when the email provider rejects delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const res = response();
    await handler({ method: "POST", body: valid }, res);
    expect(res.code).toBe(502);
    expect(res.body.ok).not.toBe(true);
  });
  it("reports missing mail configuration honestly", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = response();
    await handler({ method: "POST", body: valid }, res);
    expect(res.code).toBe(503);
  });
  it("rejects missing consent, incomplete medicines and invalid contact details", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    for (const body of [
      { ...valid, consent: false },
      { ...valid, email: "bad" },
      { ...valid, phone: "abc" },
      { ...valid, items: [{ name: "Medicine" }] },
      { ...valid, items: [] },
    ]) {
      const res = response();
      await handler({ method: "POST", body }, res);
      expect(res.code).toBe(400);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("supports a purchasing list without typed medicines", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", send);
    const res = response();
    await handler(
      {
        method: "POST",
        body: {
          ...valid,
          items: [],
          attachment: {
            filename: "list.csv",
            content: Buffer.from(
              "Medicine,Quantity\nRequested medicine,10 packs",
            ).toString("base64"),
          },
        },
      },
      res,
    );
    expect(res.code).toBe(200);
    expect(JSON.parse(send.mock.calls[0][1].body).attachments[0].filename).toBe(
      "list.csv",
    );
  });
  it("rejects invalid attachments and honeypot submissions", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    for (const extra of [
      { website: "spam" },
      { attachment: { filename: "list.exe", content: "AAAA" } },
      {
        attachment: {
          filename: "list.pdf",
          content: Buffer.from("not pdf").toString("base64"),
        },
      },
      { attachment: { filename: "list.txt", content: "A".repeat(2800004) } },
    ]) {
      const res = response();
      await handler({ method: "POST", body: { ...valid, ...extra } }, res);
      expect(res.code).toBe(400);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects unsupported methods and malformed requests", async () => {
    let res = response();
    await handler({ method: "GET" }, res);
    expect(res.code).toBe(405);
    res = response();
    await handler({ method: "POST", body: "{" }, res);
    expect(res.code).toBe(400);
  });
});
