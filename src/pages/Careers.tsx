import { useState, type FormEvent } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { SelectField, TextAreaField, TextField, isEmail } from "../components/forms";
import { Button } from "../components/Button";

const disciplines = [
  "Clinical (doctors, nurses, allied health)",
  "Biomedical engineering & technical",
  "Healthcare consulting",
  "Corporate health delivery",
  "Operations & administration",
  "Other",
];

const reasons = [
  {
    title: "A network of career paths, not one job",
    copy: "Clinicians work across specialist facilities. Engineers support equipment ranging from dialysis machines to endoscopy suites. Consultants move between advisory and operations. One employer offers many career paths.",
  },
  {
    title: "You'll work where the standard is set",
    copy: "The standards we recommend to clients, including maintenance discipline, clinical governance and structured referrals, are the same standards you will work within every day.",
  },
  {
    title: "Growth is structural, not accidental",
    copy: "Because the group spans care, engineering and consulting, you can progress your career without changing employer.",
  },
];

export default function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name as it appears on your CV.";
    if (!isEmail(email)) next.email = "Enter a valid email address so we can reach you about roles.";
    if (!discipline) next.discipline = "Pick the discipline closest to your background.";
    if (about.trim().length < 30) next.about = "Give us a few sentences about your role, experience and the work you are looking for.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone(true);
  }

  return (
    <>
      <Seo
        title="Careers"
        description="Careers at Zendale: clinical, biomedical engineering, consulting, corporate health and operations roles across an integrated healthcare group."
      />
      <PageHero
        eyebrow="Careers"
        title="Build a career across a whole healthcare system."
        lede="Zendale hires clinicians, engineers, consultants and operators who want their work to contribute to something larger than a single facility."
        image={{ src: "careers-hero.webp", alt: "Zendale team members during a working day across the network" }}
      />

      <section className="bg-porcelain py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-px bg-ink/10 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="z-sweep h-full bg-porcelain p-8 lg:p-10">
                  <span className="eyebrow text-brass">0{i + 1}</span>
                  <h2 className="mt-3 font-display text-2xl text-ink">{r.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/80">{r.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist/60 py-20 lg:py-28" id="apply">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Join the talent network</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Roles open as the network grows. Be who we call first.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-carbon/85">
              Rather than list stale vacancies, we keep a live talent network. Tell us
              who you are and what you do; when a role matching your discipline opens
              anywhere in the group, you hear about it before it's advertised.
            </p>
            <div className="mt-8">
              <SmartImage
                src="careers-team.webp"
                alt="Colleagues from clinical and engineering teams collaborating at a network facility"
                className="diag-mask aspect-[16/10] w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {done ? (
              <div className="bg-ink p-8 text-porcelain lg:p-10" role="status">
                <p className="eyebrow text-brass">You're in the network</p>
                <h3 className="mt-3 font-display text-2xl">Thank you, we've got your details.</h3>
                <p className="mt-3 text-sm leading-relaxed text-porcelain/75">
                  When a role opens in your discipline, we'll contact you at the email
                  you gave. No newsletters, no noise, just real openings.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 bg-white p-8 shadow-[0_1px_0_rgba(11,27,51,0.08)] lg:p-10">
                <TextField id="c-name" label="Full name" value={name} onChange={setName} error={errors.name} autoComplete="name" placeholder="Yewande Balogun" />
                <TextField id="c-email" label="Email" value={email} onChange={setEmail} type="email" error={errors.email} autoComplete="email" placeholder="you@email.com" />
                <SelectField id="c-disc" label="Your discipline" value={discipline} onChange={setDiscipline} options={disciplines} error={errors.discipline} />
                <TextAreaField
                  id="c-about"
                  label="About you"
                  value={about}
                  onChange={setAbout}
                  error={errors.about}
                  rows={5}
                  placeholder="Your current role, years of experience, and the kind of work you're looking for."
                />
                <div>
                  <Button type="submit">Join the Talent Network</Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
