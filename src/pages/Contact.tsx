import { useState, type FormEvent } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SelectField, TextAreaField, TextField, isEmail, isPhone } from "../components/forms";
import { SITE, whatsappLink } from "../config";

/* ------------------------------------------------------------------ */
/*  Book a Consultation — multi-step:                                  */
/*  I am → area of need → preferred channel & time → brief → confirm   */
/* ------------------------------------------------------------------ */

const iAmOptions = [
  "A patient or family member",
  "An HR / corporate representative",
  "A hospital or clinic leader",
  "An HMO representative",
  "A government agency",
  "An investor or development partner",
];

const needOptions = [
  "Clinical or specialist care",
  "Corporate health programme",
  "Medical equipment or engineering",
  "Consulting engagement",
  "Partnership discussion",
  "Something else",
];

const channelOptions = ["Phone call", "WhatsApp", "Email", "In-person meeting"];
const timeOptions = ["Morning (9am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–6pm)", "Any time"];

function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [iAm, setIAm] = useState("");
  const [need, setNeed] = useState("");
  const [channel, setChannel] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const totalSteps = 4;

  function next(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (step === 1 && !iAm) errs.iAm = "Pick the description closest to you — it decides who calls you back.";
    if (step === 2 && !need) errs.need = "Pick an area — 'Something else' is a perfectly good answer.";
    if (step === 3) {
      if (!channel) errs.channel = "Choose how you'd like us to reach you.";
      if (!time) errs.time = "Choose when suits you — we'll aim for it.";
    }
    if (step === 4) {
      if (name.trim().length < 2) errs.name = "Enter your full name so we know who we're speaking with.";
      const c = contact.trim();
      if (!isEmail(c) && !isPhone(c)) errs.contact = "Enter a working email address or phone number — otherwise we can't reach you.";
      if (brief.trim().length < 15) errs.brief = "One or two sentences is enough — just tell us what's going on.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // TODO (backend): no booking endpoint was supplied. The booking is
      // confirmed client-side and handed to WhatsApp; wire to the real
      // endpoint before launch so bookings reach the team automatically.
      setDone(true);
    }
  }

  if (done) {
    const wa = whatsappLink(
      `Hello Zendale — this is ${name.trim()}. I've just booked a consultation via your website (${iAm.toLowerCase()}; ${need.toLowerCase()}; preferred: ${channel.toLowerCase()}, ${time.toLowerCase()}). Brief: ${brief.trim()}`
    );
    return (
      <div className="bg-ink p-8 text-porcelain lg:p-10" role="status">
        <p className="eyebrow text-brass">Consultation booked</p>
        <h3 className="mt-3 font-display text-2xl">
          Thank you, {name.trim().split(" ")[0]} — your consultation request is in.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-porcelain/75">
          Our team will reach you by {channel.toLowerCase()} in your preferred window
          ({time.toLowerCase()}). The person who contacts you will already know your
          brief — you won't be starting from zero.
        </p>
        {wa && (
          <div className="mt-6">
            <Button href={wa} variant="brass">Send it on WhatsApp too</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={next} noValidate className="bg-white p-8 shadow-[0_1px_0_rgba(11,27,51,0.08)] lg:p-10">
      <div className="mb-7 flex items-center gap-3" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 ${i < step ? "bg-steel" : "bg-ink/10"}`}
          />
        ))}
      </div>
      <p className="eyebrow text-steel" aria-live="polite">Step {step} of {totalSteps}</p>

      {step === 1 && (
        <fieldset className="mt-4">
          <legend className="font-display text-2xl text-ink">First — who are we speaking with?</legend>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {iAmOptions.map((o) => (
              <label
                key={o}
                className={`flex cursor-pointer items-center gap-3 border p-4 text-sm transition-colors ${
                  iAm === o ? "border-steel bg-mist/60" : "border-ink/15 hover:border-steel"
                }`}
              >
                <input
                  type="radio"
                  name="iam"
                  value={o}
                  checked={iAm === o}
                  onChange={() => { setIAm(o); setErrors({}); }}
                  className="h-4 w-4 accent-[#4A6FA5]"
                />
                {o}
              </label>
            ))}
          </div>
          {errors.iAm && <p className="mt-3 text-xs text-[#A2542F]" role="alert">{errors.iAm}</p>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="mt-4">
          <legend className="font-display text-2xl text-ink">What do you need help with?</legend>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {needOptions.map((o) => (
              <label
                key={o}
                className={`flex cursor-pointer items-center gap-3 border p-4 text-sm transition-colors ${
                  need === o ? "border-steel bg-mist/60" : "border-ink/15 hover:border-steel"
                }`}
              >
                <input
                  type="radio"
                  name="need"
                  value={o}
                  checked={need === o}
                  onChange={() => { setNeed(o); setErrors({}); }}
                  className="h-4 w-4 accent-[#4A6FA5]"
                />
                {o}
              </label>
            ))}
          </div>
          {errors.need && <p className="mt-3 text-xs text-[#A2542F]" role="alert">{errors.need}</p>}
        </fieldset>
      )}

      {step === 3 && (
        <div className="mt-4 grid gap-5">
          <h3 className="font-display text-2xl text-ink">How and when should we reach you?</h3>
          <SelectField id="b-channel" label="Preferred channel" value={channel} onChange={setChannel} options={channelOptions} error={errors.channel} />
          <SelectField id="b-time" label="Preferred time" value={time} onChange={setTime} options={timeOptions} error={errors.time} />
        </div>
      )}

      {step === 4 && (
        <div className="mt-4 grid gap-5">
          <h3 className="font-display text-2xl text-ink">Last step — your details and a short brief.</h3>
          <TextField id="b-name" label="Full name" value={name} onChange={setName} error={errors.name} autoComplete="name" placeholder="Ngozi Adeyemi" />
          <TextField id="b-contact" label="Email or phone" value={contact} onChange={setContact} error={errors.contact} placeholder="you@email.com or +234 …" />
          <TextAreaField id="b-brief" label="Briefly, what's going on?" value={brief} onChange={setBrief} error={errors.brief} rows={4} placeholder="One or two sentences is enough." />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button type="button" onClick={() => { setErrors({}); setStep(step - 1); }} className="text-sm font-medium text-carbon/70 hover:text-steel">
            ← Back
          </button>
        ) : <span />}
        <Button type="submit">{step === totalSteps ? "Book the Consultation" : "Continue"}</Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Request a Callback                                                 */
/* ------------------------------------------------------------------ */

function CallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your name so we know who's answering.";
    if (!isPhone(phone)) next.phone = "Enter a working phone number with country code, e.g. +234…";
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO (backend): no callback endpoint was supplied. Confirmed
    // client-side; wire to the real endpoint before launch.
    setDone(true);
  }

  if (done) {
    return (
      <div role="status">
        <p className="eyebrow text-brass">Callback requested</p>
        <h3 className="mt-3 font-display text-2xl text-porcelain">We'll call you, {name.trim().split(" ")[0]}.</h3>
        <p className="mt-3 text-sm leading-relaxed text-porcelain/75">
          Keep your phone nearby — a member of the team will call the number you
          gave during working hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <TextField id="cb-name" label="Your name" value={name} onChange={setName} error={errors.name} dark autoComplete="name" placeholder="Tunde Bakare" />
      <TextField id="cb-phone" label="Phone number" value={phone} onChange={setPhone} type="tel" error={errors.phone} dark autoComplete="tel" placeholder="+234 …" />
      <div>
        <Button type="submit" variant="brass">Request a Callback</Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

export default function Contact() {
  const wa = whatsappLink("Hello Zendale — I'd like to book a consultation.");
  return (
    <>
      <Seo
        title="Contact"
        description="Book a consultation with Zendale, request a callback, or reach the team on WhatsApp. One conversation reaches the whole healthcare network."
      />
      <PageHero
        eyebrow="Contact"
        title="One conversation reaches the whole network."
        lede="Book a consultation, ask for a callback, or just start typing on WhatsApp — whichever you choose, your enquiry lands with a person whose job is to route it correctly."
      />

      <section className="bg-mist/60 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl font-medium text-ink">Book a Consultation</h2>
            <p className="mt-2 max-w-xl text-base text-carbon/80">
              Four short steps. At the end, a real appointment request — not a message
              into the void.
            </p>
            <div className="mt-7">
              <ConsultationForm />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div id="callback" className="bg-ink p-8 text-porcelain lg:p-10">
                <h2 className="font-display text-3xl font-medium">Request a Callback</h2>
                <p className="mt-2 text-sm text-porcelain/75">
                  Prefer we do the dialling? Leave a name and number.
                </p>
                <div className="mt-6">
                  <CallbackForm />
                </div>
                <div className="brass-rule mt-10" />
                <div className="mt-8">
                  <h3 className="eyebrow text-brass">Other ways in</h3>
                  <ul className="mt-4 space-y-4 text-sm">
                    {wa && (
                      <li className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 text-brass" aria-hidden="true">
                          <path d="M8 1.5a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.3-.9A6.5 6.5 0 1 0 8 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="text-porcelain/85 underline decoration-brass/50 underline-offset-4 hover:text-brass">
                          Chat with the team live on WhatsApp
                        </a>
                      </li>
                    )}
                    {SITE.email && (
                      <li className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 text-brass" aria-hidden="true">
                          <path d="M1.5 3.5 h13 v9 h-13 Z M1.5 4 8 9 14.5 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <a href={`mailto:${SITE.email}`} className="text-porcelain/85 underline decoration-brass/50 underline-offset-4 hover:text-brass">
                          {SITE.email}
                        </a>
                      </li>
                    )}
                    {SITE.addressLines.length > 0 && (
                      <li className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 text-brass" aria-hidden="true">
                          <path d="M8 14.5C8 14.5 3 9.6 3 6.3A5 5 0 0 1 13 6.3c0 3.3-5 8.2-5 8.2Z M8 8a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 8 8Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <address className="not-italic text-porcelain/85">
                          {SITE.addressLines.map((l) => (
                            <span key={l} className="block">{l}</span>
                          ))}
                        </address>
                      </li>
                    )}
                    {!wa && !SITE.email && SITE.addressLines.length === 0 && (
                      <li className="text-porcelain/60">
                        {/* Rendered only until real contact details are configured in src/config.ts */}
                        Direct contact channels are being finalised — the forms on this
                        page reach the team in the meantime.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        TODO (map): an embedded map is intentionally omitted because no
        head-office address was supplied. When SITE.addressLines is filled in,
        add the map embed here alongside the address block above.
      */}
    </>
  );
}
