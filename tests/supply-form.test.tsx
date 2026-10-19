import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import SupplyQuote from "../src/pages/SupplyQuote";
let host: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root.render(
      <MemoryRouter>
        <SupplyQuote />
      </MemoryRouter>,
    ),
  );
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});
async function fillAndSubmit() {
  const values: Record<string, string> = {
    name: "Buyer",
    organisation: "Example Pharmacy",
    email: "buyer@example.com",
    phone: "+2348000000000",
    organisationType: "Pharmacy",
    location: "Ikeja",
    notes: "Please confirm pack sizes",
  };
  for (const [name, value] of Object.entries(values))
    (host.querySelector(`[name="${name}"]`) as HTMLInputElement).value = value;
  (host.querySelector('[name="consent"]') as HTMLInputElement).checked = true;
  const file = host.querySelector('input[type="file"]') as HTMLInputElement;
  Object.defineProperty(file, "files", {
    value: [
      new File(["Medicine,Quantity\nItem,10 packs"], "list.csv", {
        type: "text/csv",
      }),
    ],
  });
  await act(async () => {
    file.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await act(async () => {
    host
      .querySelector("form")!
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 40));
  });
}
it("confirms receipt only after a successful API response", async () => {
  const send = vi
    .fn()
    .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
  vi.stubGlobal("fetch", send);
  await fillAndSubmit();
  expect(host.textContent).toContain("Your supply request has been received.");
  const body = JSON.parse(send.mock.calls[0][1].body);
  expect(body.organisation).toBe("Example Pharmacy");
  expect(body.attachment.filename).toBe("list.csv");
  expect(body.consent).toBe(true);
});
it("retains the form and entered details after failed delivery", async () => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Delivery unavailable" }),
      }),
  );
  await fillAndSubmit();
  expect(host.querySelector('[role="alert"]')?.textContent).toBe(
    "Delivery unavailable",
  );
  expect(host.textContent).not.toContain(
    "Your supply request has been received.",
  );
  expect(
    (host.querySelector('[name="notes"]') as HTMLTextAreaElement).value,
  ).toBe("Please confirm pack sizes");
});
