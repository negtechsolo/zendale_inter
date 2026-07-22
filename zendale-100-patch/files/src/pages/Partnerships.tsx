import { useState, type FormEvent } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { SelectField, TextAreaField, TextField, isEmail, isPhone } from "../components/forms";
import { whatsappLink } from "../config";
import { facilities } from "../data/facilities";

type PartnerType =
  | "Corporate Organisation"
  | "Hospital/Clinic"
  | "Government or Non Government Agency"
  | "HMO"
  | "Healthcare Investor"
  | "International Organisation";

type DynamicField = {
  id: string;
  label: string;
  kind: "select" | "text";
  options?: string[];
  placeholder?: string;
};

interface PartnerConfig {
  code: string;
  headline: string;
  pitch: string;
  orgLabel: string;
  fields: DynamicField[];
  briefLabel: string;
  focusPoints: string[];
  confirmation: string;
  waMessage: (org: string, name: string) => string;
}

const partnerTypes: PartnerType[] = [
  "Corporate Organisation",
  "Hospital/Clinic",
  "Government or Non Government Agency",
  "HMO",
  "Healthcare Investor",
  "International Organisation",
];

const partnerConfigs: Record<PartnerType, PartnerConfig> = {
  "Corporate Organisation": {
    code: "01",
    headline: "Build a healthier workforce across every location.",
    pitch:
      "Create one coordinated arrangement for retainership, medicals, screening, occupational health and specialist referrals.",
    orgLabel: "Company name",
    fields: [
      {
        id: "workforce-size",
        label: "Approximate workforce size",
        kind: "select",
        options: ["Under 50", "50 to 200", "201 to 1,000", "Over 1,000"],
      },
      {
        id: "corporate-need",
        label: "Primary healthcare need",
        kind: "select",
        options: [
          "Corporate retainership",
          "Pre-employment or annual medicals",
          "Workplace screening programme",
          "Occupational health support",
          "Executive health programme",
          "Multiple services",
        ],
      },
      {
        id: "locations",
        label: "Number or location of offices",
        kind: "text",
        placeholder: "For example: Lagos and Abuja, 3 locations",
      },
    ],
    briefLabel: "Tell us what you want the programme to achieve",
    focusPoints: [
      "One accountable corporate healthcare partner",
      "Multi-location programme coordination",
      "Specialist referral pathways when required",
    ],
    confirmation:
      "Your corporate partnership enquiry has been received. A corporate healthcare adviser will review the information and contact you with the appropriate next step.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted a corporate partnership enquiry through your website and would like to discuss a corporate healthcare programme.`,
  },
  "Hospital/Clinic": {
    code: "02",
    headline: "Extend capability without working in isolation.",
    pitch:
      "Develop referral pathways, capacity-sharing arrangements, equipment support, consulting engagements and operational collaboration.",
    orgLabel: "Hospital or clinic name",
    fields: [
      {
        id: "facility-type",
        label: "Facility type",
        kind: "select",
        options: [
          "Hospital",
          "Specialist clinic",
          "Diagnostic centre",
          "Day clinic",
          "Other healthcare facility",
        ],
      },
      {
        id: "hospital-interest",
        label: "Primary partnership interest",
        kind: "select",
        options: [
          "Referral partnership",
          "Specialist capacity support",
          "Equipment and biomedical support",
          "Operational transformation",
          "Healthcare consulting",
          "Joint service development",
        ],
      },
      {
        id: "facility-location",
        label: "Facility location",
        kind: "text",
        placeholder: "City and state",
      },
    ],
    briefLabel: "Describe the collaboration or operational need",
    focusPoints: [
      "Referral and specialist access",
      "Operational and clinical capacity support",
      "Long-term institutional collaboration",
    ],
    confirmation:
      "Your hospital or clinic partnership enquiry has been received. The relevant Zendale team will review the proposed collaboration and contact you.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted a hospital or clinic partnership enquiry through your website and would like to discuss collaboration.`,
  },
  "Government or Non Government Agency": {
    code: "03",
    headline: "Translate healthcare mandates into delivery programmes.",
    pitch:
      "Work with an operating healthcare group on public health programmes, institutional development, infrastructure and health-system strengthening.",
    orgLabel: "Agency, ministry or organisation name",
    fields: [
      {
        id: "agency-type",
        label: "Organisation type",
        kind: "select",
        options: [
          "Government ministry or agency",
          "Non Government Agency",
          "Development organisation",
          "Foundation",
          "Public institution",
        ],
      },
      {
        id: "programme-area",
        label: "Area of engagement",
        kind: "select",
        options: [
          "Public health programme",
          "Facility development",
          "Public-private partnership",
          "Community healthcare delivery",
          "Health-system strengthening",
          "Advisory or consulting",
        ],
      },
      {
        id: "coverage-area",
        label: "Geographic coverage",
        kind: "text",
        placeholder: "Community, state, region or national coverage",
      },
    ],
    briefLabel: "Outline the mandate, programme or delivery challenge",
    focusPoints: [
      "Programme design and implementation support",
      "Institutional and operational strengthening",
      "Measurable community healthcare impact",
    ],
    confirmation:
      "Your agency partnership enquiry has been received. Our team will review the mandate and contact you with the most relevant pathway for discussion.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted an agency partnership enquiry through your website regarding healthcare programme collaboration.`,
  },
  HMO: {
    code: "04",
    headline: "Give your enrollees coordinated access to specialist care.",
    pitch:
      "Discuss provider arrangements across the Zendale network, including specialist services, critical care, dialysis, fertility, diagnostics and corporate client support.",
    orgLabel: "HMO name",
    fields: [
      {
        id: "enrollee-size",
        label: "Approximate enrollee size",
        kind: "select",
        options: ["Under 1,000", "1,000 to 10,000", "10,001 to 50,000", "Over 50,000"],
      },
      {
        id: "coverage-interest",
        label: "Coverage interest",
        kind: "select",
        options: [
          "Full network provider agreement",
          "Specific facilities or services",
          "Specialist referral access",
          "Corporate client servicing",
          "Exploratory discussion",
        ],
      },
      {
        id: "hmo-coverage",
        label: "Current geographic coverage",
        kind: "text",
        placeholder: "Cities, states or regions served",
      },
    ],
    briefLabel: "Tell us about the provider arrangement you need",
    focusPoints: [
      "One network conversation",
      "Specialist and critical-care pathways",
      "Coordinated support for corporate clients",
    ],
    confirmation:
      "Your HMO partnership enquiry has been received. Our partnerships team will review the coverage requirement and contact you.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted an HMO partnership enquiry through your website and would like to discuss a provider arrangement.`,
  },
  "Healthcare Investor": {
    code: "05",
    headline: "Invest in healthcare institutions built for lasting impact.",
    pitch:
      "Open a structured conversation around facility development, healthcare operations, medical technology, expansion and institution-building opportunities.",
    orgLabel: "Firm, fund or investor name",
    fields: [
      {
        id: "investment-focus",
        label: "Investment focus",
        kind: "select",
        options: [
          "Facility development",
          "Healthcare operations",
          "Medical technology",
          "Expansion capital",
          "Strategic investment",
          "Exploratory conversation",
        ],
      },
      {
        id: "investment-stage",
        label: "Current stage",
        kind: "select",
        options: [
          "Early exploration",
          "Active opportunity review",
          "Due diligence",
          "Seeking an operating partner",
        ],
      },
      {
        id: "investment-geography",
        label: "Geographic focus",
        kind: "text",
        placeholder: "Nigeria, West Africa or another focus",
      },
    ],
    briefLabel: "Describe the opportunity or investment thesis",
    focusPoints: [
      "Operating healthcare experience",
      "Institution-building and expansion capability",
      "Long-term healthcare impact",
    ],
    confirmation:
      "Your healthcare investment enquiry has been received. The relevant leadership team will review the information and contact you directly.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted a healthcare investment enquiry through your website and would like to open a conversation.`,
  },
  "International Organisation": {
    code: "06",
    headline: "Deliver programmes with an experienced operating partner on the ground.",
    pitch:
      "Explore programme delivery, technical collaboration, institutional support and health-system strengthening across communities and healthcare organisations.",
    orgLabel: "Organisation name",
    fields: [
      {
        id: "collaboration-type",
        label: "Nature of collaboration",
        kind: "select",
        options: [
          "Programme delivery partner",
          "Health-system strengthening",
          "Technical collaboration",
          "Institutional capacity building",
          "Community health programme",
          "Other collaboration",
        ],
      },
      {
        id: "programme-stage",
        label: "Programme stage",
        kind: "select",
        options: [
          "Concept development",
          "Partner identification",
          "Funded and preparing for delivery",
          "Existing programme requiring support",
        ],
      },
      {
        id: "programme-location",
        label: "Country or programme location",
        kind: "text",
        placeholder: "Country, state or target communities",
      },
    ],
    briefLabel: "Describe the programme and the support required",
    focusPoints: [
      "Local operating capability",
      "Programme and institutional support",
      "Shared expertise and accountable delivery",
    ],
    confirmation:
      "Your international partnership enquiry has been received. Our team will review the programme and contact you with the most relevant representatives for a first discussion.",
    waMessage: (org, name) =>
      `Hello Zendale, this is ${name} from ${org}. We have submitted an international organisation partnership enquiry through your website and would like to discuss collaboration.`,
  },
};

function PartnerGlyph({ type }: { type: PartnerType }) {
  const paths: Record<PartnerType, string> = {
    "Corporate Organisation": "M5 18V8h14v10M8 8V5h8v3M9 12h2m2 0h2m-6 3h2m2 0h2",
    "Hospital/Clinic": "M4 19V7h16v12M9 7V4h6v3M12 9v6m-3-3h6",
    "Government or Non Government Agency": "M3 9h18M5 9V6l7-3 7 3v3M6 9v8m4-8v8m4-8v8m4-8v8M3 20h18",
    HMO: "M12 21s8-4.5 8-11V5l-8-3-8 3v5c0 6.5 8 11 8 11Zm-3-9h6m-3-3v6",
    "Healthcare Investor": "M4 18 9 13l4 3 7-9M15 7h5v5M4 21h16",
    "International Organisation": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-18c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M3 12h18M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9",
  };

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function PartnerForm({ type }: { type: PartnerType }) {
  const cfg = partnerConfigs[type];
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<null | { wa: string }>(null);

  function updateDetail(id: string, value: string) {
    setDetails((current) => ({ ...current, [id]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};

    if (name.trim().length < 2) next.name = "Enter your full name so we know who to address.";
    if (org.trim().length < 2) next.org = `Enter your ${cfg.orgLabel.toLowerCase()} so the enquiry can be routed correctly.`;
    if (!isEmail(email)) next.email = "Enter a valid email address for the written response.";
    if (!phone.trim()) {
      next.phone = "Enter a phone number. It is required for partnership enquiries.";
    } else if (!isPhone(phone)) {
      next.phone = "Enter a valid phone number with the country code, for example +234 800 000 0000.";
    }
    if (!contactMethod) next.contactMethod = "Select how you would prefer the team to contact you.";

    cfg.fields.forEach((field) => {
      if (!details[field.id]?.trim()) next[field.id] = "Complete this field so we can understand the partnership request.";
    });

    if (brief.trim().length < 20) {
      next.brief = "Provide at least a sentence or two about the partnership you want to discuss.";
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitted({ wa: whatsappLink(cfg.waMessage(org.trim(), name.trim())) });
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden bg-ink p-8 text-porcelain lg:p-10" role="status">
        <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rotate-45 border border-brass/30" aria-hidden="true" />
        <p className="eyebrow text-brass">Enquiry received</p>
        <h3 className="mt-3 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{cfg.confirmation}</h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-porcelain/70">
          Your selected pathway was <strong className="font-medium text-porcelain">{type}</strong>. The information will be used to route the conversation to the appropriate Zendale team.
        </p>
        {submitted.wa && (
          <div className="mt-7">
            <Button href={submitted.wa} variant="brass">Continue on WhatsApp</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 bg-white p-7 shadow-[0_1px_0_rgba(11,27,51,0.08)] sm:p-8 lg:p-10">
      <div className="border-l-2 border-brass pl-4">
        <p className="eyebrow text-steel">Selected pathway</p>
        <h3 className="mt-2 font-display text-2xl text-ink">{type}</h3>
        <p className="mt-2 text-sm leading-relaxed text-carbon/75">{cfg.pitch}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="p-name" label="Your full name" value={name} onChange={setName} error={errors.name} autoComplete="name" placeholder="Chidi Eze" />
        <TextField id="p-org" label={cfg.orgLabel} value={org} onChange={setOrg} error={errors.org} autoComplete="organization" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="p-email" label="Work email" value={email} onChange={setEmail} type="email" error={errors.email} autoComplete="email" placeholder="you@organisation.com" />
        <TextField id="p-phone" label="Phone number" value={phone} onChange={setPhone} type="tel" error={errors.phone} autoComplete="tel" placeholder="+234 800 000 0000" />
      </div>

      <SelectField
        id="p-contact-method"
        label="Preferred contact method"
        value={contactMethod}
        onChange={setContactMethod}
        options={["Phone call", "Email", "WhatsApp"]}
        error={errors.contactMethod}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {cfg.fields.map((field) =>
          field.kind === "select" ? (
            <SelectField
              key={field.id}
              id={`p-${field.id}`}
              label={field.label}
              value={details[field.id] ?? ""}
              onChange={(value) => updateDetail(field.id, value)}
              options={field.options ?? []}
              error={errors[field.id]}
            />
          ) : (
            <TextField
              key={field.id}
              id={`p-${field.id}`}
              label={field.label}
              value={details[field.id] ?? ""}
              onChange={(value) => updateDetail(field.id, value)}
              error={errors[field.id]}
              placeholder={field.placeholder}
            />
          )
        )}
      </div>

      <TextAreaField
        id="p-brief"
        label={cfg.briefLabel}
        value={brief}
        onChange={setBrief}
        error={errors.brief}
        rows={6}
        placeholder="Share the objective, current situation and the kind of support you want to explore."
      />

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-relaxed text-carbon/70">
          By submitting this enquiry, you confirm that Zendale may contact you about this partnership request.
        </p>
        <Button type="submit">Send Partnership Enquiry</Button>
      </div>
    </form>
  );
}

export default function Partnerships() {
  const [type, setType] = useState<PartnerType>("Corporate Organisation");
  const cfg = partnerConfigs[type];

  return (
    <>
      <Seo
        title="Partner With Zendale"
        description="Explore tailored partnership pathways with Zendale Limited for corporate organisations, hospitals, agencies, HMOs, healthcare investors and international organisations."
        canonicalPath="/partnerships"
      />
      <PageHero
        eyebrow="Partnerships"
        title="Build stronger healthcare institutions through the right partnership."
        lede="Select the organisation you represent. The questions and first response will be tailored to the partnership you want to explore."
        image={{ src: "partnerships-hero.webp", alt: "Partnership discussion between Zendale leadership and a partner organisation" }}
      />

      <section className="relative overflow-hidden bg-mist/60 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-steel/50 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-steel">Select your organisation type</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
              Six pathways. Each designed for a different partnership conversation.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-carbon/80">
              Choose the option that best describes your organisation. The form will adapt so our team receives the context needed for a useful first discussion.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Partnership type">
            {partnerTypes.map((partnerType, index) => {
              const item = partnerConfigs[partnerType];
              const selected = type === partnerType;
              return (
                <Reveal key={partnerType} delay={index * 0.05}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setType(partnerType)}
                    className={`group relative flex h-full w-full items-start gap-4 overflow-hidden border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-steel bg-ink text-porcelain shadow-[0_18px_45px_rgba(11,27,51,0.16)]"
                        : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-steel/50"
                    }`}
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center border ${selected ? "border-brass/60 text-brass" : "border-steel/30 text-steel"}`}>
                      <PartnerGlyph type={partnerType} />
                    </span>
                    <span>
                      <span className={`font-mono text-[0.625rem] uppercase tracking-eyebrow ${selected ? "text-brass" : "text-carbon/70"}`}>{item.code}</span>
                      <span className="mt-1 block font-display text-xl leading-tight">{partnerType}</span>
                      <span className={`mt-2 block text-xs leading-relaxed ${selected ? "text-porcelain/65" : "text-carbon/65"}`}>{item.headline}</span>
                    </span>
                    <span className={`absolute bottom-0 left-0 h-1 transition-all ${selected ? "w-full bg-brass" : "w-0 bg-steel group-hover:w-full"}`} aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 grid items-stretch gap-0 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <aside className="relative h-full overflow-hidden bg-ink p-7 text-porcelain lg:p-9">
                <div className="absolute -right-16 -top-16 h-40 w-40 rotate-45 border border-brass/20" aria-hidden="true" />
                <p className="eyebrow text-brass">{cfg.code} · Partnership focus</p>
                <h2 className="mt-4 font-display text-3xl leading-tight">{cfg.headline}</h2>
                <p className="mt-5 text-sm leading-relaxed text-porcelain/70">{cfg.pitch}</p>
                <div className="mt-8 space-y-4">
                  {cfg.focusPoints.map((point, index) => (
                    <div key={point} className="flex gap-3 border-t border-porcelain/10 pt-4">
                      <span className="font-mono text-xs text-brass">0{index + 1}</span>
                      <span className="text-sm leading-relaxed text-porcelain/80">{point}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-l border-brass pl-4 text-xs leading-relaxed text-porcelain/55">
                  Phone number is required so the appropriate team can follow up directly when clarification is needed.
                </p>
              </aside>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.05}>
              <PartnerForm key={type} type={type} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-steel">Why partners choose a network</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              One partnership can connect care, expertise and infrastructure.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-carbon/85">
              Zendale brings operating facilities, specialist care, healthcare consulting, biomedical engineering and corporate health delivery into one ecosystem. The network provides a stronger foundation for partnerships that need more than a single service provider.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-px bg-ink/10">
              {[
                [String(facilities.length).padStart(2, "0"), "Current institutions"],
                ["05", "Capability pillars"],
                ["01", "Coordinated partner"],
              ].map(([number, label]) => (
                <div key={label} className="bg-porcelain py-5 pr-3">
                  <p className="font-display text-3xl text-steel">{number}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-carbon/70">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" variant="sweep" delay={0.1}>
            <SmartImage
              src="partnerships-network.webp"
              alt="Coordinated handover between two facilities in the Zendale network"
              className="diag-mask aspect-[16/10] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-16 text-porcelain lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brass">What happens next</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">A clear route from enquiry to a useful first conversation.</h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-porcelain/10 md:grid-cols-3">
            {[
              ["01", "Review", "The enquiry is reviewed against the selected partnership pathway and routed to the appropriate team."],
              ["02", "Clarify", "A Zendale representative contacts you to clarify the objective, scope and decision-making context."],
              ["03", "Structure", "The teams agree the right next step, which may be a discovery meeting, information request, proposal or site discussion."],
            ].map(([number, title, copy]) => (
              <Reveal key={number}>
                <div className="h-full bg-ink p-7 lg:p-9">
                  <p className="font-mono text-xs tracking-eyebrow text-brass">{number}</p>
                  <h3 className="mt-4 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-porcelain/65">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
