import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const sections = [
  {
    h: "What we collect",
    p: "When you use this website's forms, we collect what you type: your name, contact details, organisation, and the content of your enquiry. We do not collect medical records through this website — clinical information is handled by the relevant facility, under clinical confidentiality, when you become a patient.",
  },
  {
    h: "Why we collect it",
    p: "To respond to your enquiry, prepare proposals you've requested, deliver documents you've asked to download, and — only if you've subscribed — send occasional insights. We do not sell or rent your details, and we do not add you to marketing lists you didn't join.",
  },
  {
    h: "Patient confidentiality",
    p: "Clinical care across the Zendale Healthcare Network is delivered under the confidentiality obligations of medical practice. Case studies on this website never identify patients or clients, and figures are published only when verified and appropriate.",
  },
  {
    h: "Third-party services",
    p: "If you choose to contact us via WhatsApp, that conversation is carried by WhatsApp and covered by its own terms. External facility websites linked from this site have their own privacy practices.",
  },
  {
    h: "Your choices",
    p: "You can ask us at any time what information we hold from your website enquiries, ask us to correct it, or ask us to delete it — use the contact page and we will act on it.",
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy & Compliance"
        description="How Zendale handles the information you share through this website, and the confidentiality standards that govern clinical care across the network."
      />
      <PageHero
        eyebrow="Privacy & Compliance"
        title="Plain language about your information."
        lede="Healthcare runs on trust. Here is exactly what this website collects, why, and what we will never do with it."
      />
      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <div className="border-b border-ink/10 py-8 first:pt-0">
                <h2 className="font-display text-2xl text-ink">{s.h}</h2>
                <p className="mt-3 text-base leading-relaxed text-carbon/85">{s.p}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="mt-8 border-l-2 border-brass pl-5 text-sm leading-relaxed text-carbon/70">
              TODO (legal review): this page states Zendale's working practice in plain
              language. Before launch, have counsel review it against the data
              protection obligations that apply in your operating jurisdictions (e.g.
              the NDPA in Nigeria) and add the formal notices they require.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
