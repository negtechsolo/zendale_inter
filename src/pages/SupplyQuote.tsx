import { useRef, useState, type FormEvent } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";

type Item = {
  id: number;
  name: string;
  strength: string;
  form: string;
  quantity: string;
};
const emptyItem = (id: number): Item => ({
  id,
  name: "",
  strength: "",
  form: "",
  quantity: "",
});
const fieldClass =
  "mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-carbon focus:border-steel focus:outline-none";

export default function SupplyQuote() {
  const [items, setItems] = useState<Item[]>([emptyItem(0)]);
  const nextId = useRef(1);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  function update(id: number, field: keyof Omit<Item, "id">, value: string) {
    setItems((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const active = items.filter(
      (row) =>
        row.name.trim() ||
        row.quantity.trim() ||
        row.strength.trim() ||
        row.form.trim(),
    );
    if (
      (!active.length && !file) ||
      active.some((row) => !row.name.trim() || !row.quantity.trim())
    ) {
      setError(
        "Enter a medicine name and quantity for each row, or upload your purchasing list.",
      );
      return;
    }
    setState("sending");
    setError("");
    try {
      let attachment;
      if (file) {
        if (file.size > 2 * 1024 * 1024 || !/\.(pdf|csv|txt)$/i.test(file.name))
          throw new Error(
            "Choose a PDF, CSV or text file no larger than 2 MB.",
          );
        const content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = () =>
            reject(new Error("The file could not be read."));
          reader.readAsDataURL(file);
        });
        attachment = { filename: file.name, content };
      }
      const data = new FormData(form);
      const response = await fetch("/api/supply-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          consent: data.get("consent") === "on",
          items: active.map(({ id: _id, ...item }) => item),
          attachment,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true)
        throw new Error(
          result.error ||
            "Your request could not be delivered. Please try again or email our team.",
        );
      setState("done");
      window.gtag?.("event", "supply_quote_submitted");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Your request could not be delivered.",
      );
      setState("idle");
    }
  }
  return (
    <>
      <Seo
        title="Request a Supply Quote | Zendale Central Store"
        description="Request competitively priced bulk pharmaceutical supply for your pharmacy or hospital."
        canonicalPath="/supply-quote"
      />
      <PageHero
        eyebrow="Zendale Central Store"
        title="Request a Supply Quote"
        lede="Tell us which medicines you need. Our team will confirm availability, competitive pricing and delivery arrangements."
      />
      <section className="bg-porcelain px-5 py-16">
        <div className="mx-auto max-w-4xl">
          {state === "done" ? (
            <div role="status" className="border border-steel/30 bg-white p-10">
              <h2 className="font-display text-3xl text-ink">
                Your supply request has been received.
              </h2>
              <p className="mt-4 leading-relaxed">
                Our team will contact you to confirm availability, pricing and
                delivery arrangements.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-10">
              <fieldset
                disabled={state === "sending"}
                className="space-y-8 disabled:opacity-60"
              >
                <legend className="font-display text-2xl text-ink">
                  Your organisation and contact details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["name", "Contact name", "text", "name"],
                    ["organisation", "Organisation", "text", "organization"],
                    ["email", "Email", "email", "email"],
                    ["phone", "Phone / WhatsApp", "tel", "tel"],
                  ].map(([name, label, type, auto]) => (
                    <label key={name} className="block text-sm font-medium">
                      {label}
                      <input
                        name={name}
                        type={type}
                        autoComplete={auto}
                        required
                        maxLength={name === "phone" ? 40 : 200}
                        className={fieldClass}
                      />
                    </label>
                  ))}
                  <label className="block text-sm font-medium">
                    Organisation type
                    <select
                      name="organisationType"
                      required
                      className={fieldClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {[
                        "Pharmacy",
                        "Hospital",
                        "Clinic",
                        "Other healthcare organisation",
                      ].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-medium">
                    Delivery location
                    <input
                      name="location"
                      required
                      maxLength={300}
                      placeholder="Address, city and state"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block text-sm font-medium sm:col-span-2">
                    Required timeframe (optional)
                    <input
                      name="timeframe"
                      maxLength={120}
                      placeholder="When would you need the supply?"
                      className={fieldClass}
                    />
                  </label>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink">
                    Medicines required
                  </h2>
                  <p className="mt-2 text-sm text-carbon/75">
                    Enter a medicine name and quantity for each item, or upload
                    your purchasing list below. Please specify packs, cartons or
                    units.
                  </p>
                  <div className="mt-5 space-y-4">
                    {items.map((item, index) => (
                      <fieldset
                        key={item.id}
                        className="border border-ink/15 bg-white p-5"
                      >
                        <legend className="px-2 text-sm font-medium">
                          Medicine {index + 1}
                        </legend>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {(
                            [
                              ["name", "Medicine name"],
                              ["strength", "Strength (optional)"],
                              ["form", "Dosage form (optional)"],
                              ["quantity", "Quantity and unit"],
                            ] as const
                          ).map(([key, label]) => (
                            <label key={key} className="text-sm">
                              {label}
                              <input
                                value={item[key]}
                                onChange={(e) =>
                                  update(item.id, key, e.target.value)
                                }
                                maxLength={key === "name" ? 200 : 100}
                                className={fieldClass}
                                placeholder={
                                  key === "quantity"
                                    ? "e.g. 10 packs"
                                    : undefined
                                }
                              />
                            </label>
                          ))}
                        </div>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setItems((rows) =>
                                rows.filter((row) => row.id !== item.id),
                              )
                            }
                            className="mt-4 text-sm text-steel underline"
                          >
                            Remove medicine {index + 1}
                          </button>
                        )}
                      </fieldset>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={items.length >= 30}
                    onClick={() =>
                      setItems((rows) => [...rows, emptyItem(nextId.current++)])
                    }
                    className="mt-4 border border-steel px-5 py-3 text-sm text-steel disabled:opacity-50"
                  >
                    + Add another medicine
                  </button>
                </div>
                <label className="block text-sm font-medium">
                  Upload a purchasing list (optional)
                  <input
                    type="file"
                    accept=".pdf,.csv,.txt"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] ?? null;
                      if (
                        selected &&
                        (selected.size > 2 * 1024 * 1024 ||
                          !/\.(pdf|csv|txt)$/i.test(selected.name))
                      ) {
                        e.target.value = "";
                        setFile(null);
                        setError(
                          "Choose a PDF, CSV or text file no larger than 2 MB.",
                        );
                      } else {
                        setFile(selected);
                        setError("");
                      }
                    }}
                    className={fieldClass}
                  />
                  <span className="mt-2 block font-normal text-carbon/70">
                    PDF, CSV or text · Maximum 2 MB
                  </span>
                </label>
                <label className="block text-sm font-medium">
                  Additional information (optional)
                  <textarea
                    name="notes"
                    rows={4}
                    maxLength={2000}
                    className={fieldClass}
                  />
                </label>
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1"
                  />
                  <span>
                    I agree to be contacted about this supply request.{" "}
                    <a href="/privacy" className="text-steel underline">
                      Privacy policy
                    </a>
                  </span>
                </label>
                <p className="text-sm text-carbon/70">
                  This is an enquiry. Pricing, availability and delivery will be
                  confirmed by our team.
                </p>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="bg-steel px-7 py-4 font-medium text-white disabled:opacity-60"
                >
                  {state === "sending"
                    ? "Sending request…"
                    : "Submit Supply Request"}
                </button>
              </fieldset>
              {error && (
                <p
                  role="alert"
                  className="border border-[#A2542F]/30 bg-white p-4 text-[#A2542F]"
                >
                  {error}
                </p>
              )}
              <p className="text-sm">
                You can also email{" "}
                <a
                  className="break-all text-steel underline"
                  href="mailto:everester.oguh@zendalelimited.com"
                >
                  everester.oguh@zendalelimited.com
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
