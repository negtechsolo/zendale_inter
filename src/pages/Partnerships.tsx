import { useState, type FormEvent } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { SelectField, TextAreaField, TextField, isEmail, isPhone } from "../components/forms";
import { whatsappLink } from "../config";

/* ------------------------------------------------------------------ */
/*  Partner With Zendale, a selector routes each audience to the      */
/*  form that captures what that audience actually needs.              */
/* ------------------------------------------------------------------ */

type PartnerType =
  | "Corporate"
  | "Hospital"
  | "Government"
  | "HMO"
  | "Investor"
  | "International Organisation";

interface PartnerConfig {
  pitch: string;
  orgLabel: string;
  extraField: { id: string; label: string; kind: "select" | "text"; options?: string[] };
  briefLabel: string;
  confirmation: string;
  waMessage: (org: string, name: string) => string;
}

const partnerConfigs: Record<PartnerType, PartnerConfig> = {
  Corporate: {
    pitch: "A single corporate health partner across all your locations: retainership, medicals, screening and occupational health under one arrangement.",
    orgLabel: "Company name",
    extraField: {
      id: "headcount",
      label: "Approximate workforce size",
      kind: "select",
      options: ["Under 50", "50–200", "200–1,000", "Over 1,000"],
    },
    briefLabel: "What does your organisation need?",
    confirmation:
      "Your corporate enquiry has been recorded. A corporate health adviser will respond with a proposed programme structure tailored to your organisation.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've just sent a corporate partnership enquiry through your website and would like to discuss a corporate health programme.`,
  },
  Hospital: {
    pitch: "Referral pathways, capacity sharing, equipment support and operational collaboration between your hospital and the Zendale network.",
    orgLabel: "Hospital / clinic name",
    extraField: {
      id: "interest",
      label: "Primary interest",
      kind: "select",
      options: ["Referral partnership", "Equipment & biomedical support", "Operational collaboration", "Consulting engagement"],
    },
    briefLabel: "Describe the collaboration you have in mind",
    confirmation:
      "Your hospital partnership enquiry has been recorded. A specialist who can structure the arrangement will contact you.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've submitted a hospital partnership enquiry via your website and would like to discuss collaboration.`,
  },
  Government: {
    pitch: "Public health delivery, healthcare infrastructure and public-private partnership arrangements with a group that operates facilities daily.",
    orgLabel: "Agency / ministry / institution",
    extraField: {
      id: "mandate",
      label: "Area of engagement",
      kind: "select",
      options: ["Public-private partnership", "Public health programme", "Facility development", "Advisory / consulting"],
    },
    briefLabel: "Outline the mandate or programme",
    confirmation:
      "Your enquiry is in. Our consulting practice will respond with relevant experience and a proposed way to begin the conversation.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've submitted a government partnership enquiry via your website regarding public health collaboration.`,
  },
  HMO: {
    pitch: "Provider arrangements across eight facilities in one negotiation: specialist care, critical care, dialysis, fertility and diagnostics for your enrollees.",
    orgLabel: "HMO name",
    extraField: {
      id: "coverage",
      label: "What are you looking to cover?",
      kind: "select",
      options: ["Full network provider agreement", "Specific facilities / services", "Corporate client servicing", "Other arrangement"],
    },
    briefLabel: "Tell us about your enrollee needs",
    confirmation:
      "Your provider enquiry is in. Our team will come back with network coverage details and how an agreement is typically structured.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've submitted an HMO provider enquiry via your website and would like to discuss a network agreement.`,
  },
  Investor: {
    pitch: "Engage a healthcare group with operating facilities, an engineering practice and a consulting arm on development and expansion opportunities.",
    orgLabel: "Firm / fund name",
    extraField: {
      id: "focus",
      label: "Investment focus",
      kind: "select",
      options: ["Facility development", "Healthcare operations", "Medical technology", "Exploratory conversation"],
    },
    briefLabel: "What would you like to explore?",
    confirmation:
      "Your enquiry has been recorded. Group leadership reviews investor conversations directly and will provide a substantive response.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've submitted an investor enquiry via your website and would like to open a conversation.`,
  },
  "International Organisation": {
    pitch: "Programme delivery, technical collaboration and health system strengthening with an operating partner on the ground.",
    orgLabel: "Organisation name",
    extraField: {
      id: "programme",
      label: "Nature of collaboration",
      kind: "select",
      options: ["Programme delivery partner", "Health system strengthening", "Technical collaboration", "Other"],
    },
    briefLabel: "Describe the collaboration or programme",
    confirmation:
      "Your enquiry is in. We'll respond with relevant delivery experience and the right people for a first conversation.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We've submitted a partnership enquiry via your website regarding international collaboration.`,
  },
};

const partnerTypes = Object.keys(partnerConfigs) as PartnerType[];

function PartnerForm({ type }: { type: PartnerType }) {
  const cfg = partnerConfigs[type];
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<null | { wa: string }>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name so we know who to address.";
    if (org.trim().length < 2) next.org = `Enter your ${cfg.orgLabel.toLowerCase()}, it's how we route this internally.`;
    if (!isEmail(email)) next.email = "Enter a valid email address, our written response goes there.";
    if (phone && !isPhone(phone)) next.phone = "That phone number doesn't look right, include the country code, e.g. +234…";
    if (!extra) next.extra = "Pick the closest option, it routes your enquiry to the right team.";
    if (brief.trim().length < 20) next.brief = "Give us at least a sentence or two, the more specific, the faster our reply is useful.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted({ wa: whatsappLink(cfg.waMessage(org.trim(), name.trim())) });
  }

  if (submitted) {
    return (
      <div className="bg-ink p-8 text-porcelain lg:p-10" role="status">
        <p className="eyebrow text-brass">Enquiry received</p>
        <h3 className="mt-3 font-display text-2xl">{cfg.confirmation}</h3>
        {submitted.wa && (
          <>
            <p className="mt-4 text-sm text-porcelain/75">
              Want to move faster? Continue the conversation on WhatsApp, your message
              is already written for you.
            </p>
            <div className="mt-6">
              <Button href={submitted.wa} variant="brass">Continue on WhatsApp</Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 bg-white p-8 shadow-[0_1px_0_rgba(11,27,51,0.08)] lg:p-10">
      <p className="text-sm leading-relaxed text-carbon/80">{cfg.pitch}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="p-name" label="Your full name" value={name} onChange={setName} error={errors.name} autoComplete="name" placeholder="Chidi Eze" />
        <TextField id="p-org" label={cfg.orgLabel} value={org} onChange={setOrg} error={errors.org} autoComplete="organization" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="p-email" label="Work email" value={email} onChange={setEmail} type="email" error={errors.email} autoComplete="email" placeholder="you@organisation.com" />
        <TextField id="p-phone" label="Phone" value={phone} onChange={setPhone} type="tel" error={errors.phone} optional autoComplete="tel" placeholder="+234 …" />
      </div>
      <SelectField id="p-extra" label={cfg.extraField.label} value={extra} onChange={setExtra} options={cfg.extraField.options ?? []} error={errors.extra} />
      <TextAreaField id="p-brief" label={cfg.briefLabel} value={brief} onChange={setBrief} error={errors.brief} rows={5} placeholder="A few sentences is plenty to start." />
      <div>
        <Button type="submit">Send Partnership Enquiry</Button>
      </div>
    </form>
  );
}

export default function Partnerships() {
  const [type, setType] = useState<PartnerType>("Corporate");
  return (
    <>
      <Seo
        title="Partner With Zendale"
        description="Partner with Zendale: structured collaboration for corporate organisations, hospitals, government agencies, HMOs, investors and international organisations."
      />
      <PageHero
        eyebrow="Partner With Zendale"
        title="Six kinds of partner. Six different conversations."
        lede="Tell us what type of organisation you represent. The form and follow-up will then be tailored to the partnership you want to discuss."
        image={{ src: "partnerships-hero.webp", alt: "Partnership discussion between Zendale leadership and a partner organisation" }}
      />

      <section className="bg-mist/60 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <fieldset>
              <legend className="eyebrow text-steel">I represent…</legend>
              <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Partner type">
                {partnerTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={type === t}
                    onClick={() => setType(t)}
                    className={`border px-4 py-2.5 text-sm transition-colors ${
                      type === t
                        ? "border-steel bg-steel text-porcelain"
                        : "border-ink/20 bg-white text-carbon hover:border-steel hover:text-steel"
                    }`}
                  >
                    {t === "Corporate" ? "A Corporate Organisation" : t === "Government" ? "A Government Agency" : t === "Hospital" ? "A Hospital or Clinic" : t === "HMO" ? "An HMO" : t === "Investor" ? "A Healthcare Investor" : "An International Organisation"}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>
          <Reveal className="mt-8" delay={0.05}>
            {/* key remounts the form on audience change so fields never carry over */}
            <PartnerForm key={type} type={type} />
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Why partners choose a network</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              One agreement opens eight doors.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon/85">
              Whatever the partnership, whether a provider agreement, referral pathway or delivery
              programme, you negotiate once and gain access to the whole ecosystem:
              specialist facilities, critical care, diagnostics, engineering and
              consulting. That is the arithmetic that makes a Zendale partnership worth
              the conversation.
            </p>
          </Reveal>
          <Reveal variant="sweep" delay={0.1}>
            <SmartImage
              src="partnerships-network.webp"
              alt="Coordinated handover between two facilities in the Zendale network"
              className="diag-mask aspect-[16/10] w-full"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
