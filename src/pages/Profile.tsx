import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { Button } from "../components/Button";
import { SmartImage } from "../components/SmartImage";
import { FacilityLogo } from "../components/FacilityLogo";
import { facilities, facilityProfilePath } from "../data/facilities";
import { pillars } from "../data/pillars";

const symbols: Record<string, string> = {
  lattice: "M3 21h18M6 21V8h12v13M9 8V3h6v5m-3-4v3m-1.5-1.5h3M9 12h1m4 0h1m-6 4h1m4 0h1m-4 5v-3h2v3",
  briefcase: "M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2H5Zm-1-8a2 2 0 1 0 0-4m16 4a2 2 0 0 0 0-4M1 18v-2a3 3 0 0 1 3-3m19 5v-2a3 3 0 0 0-3-3",
  circuit: "m9 3-.6 2.5-2.3 1.3-2.5-.7-2 3.4 1.9 1.8v2.6l-1.9 1.8 2 3.4 2.5-.7 2.3 1.3L9 22h4l.6-2.3 2.3-1.3 2.5.7 2-3.4-1.9-1.8v-2.6l1.9-1.8-2-3.4-2.5.7-2.3-1.3L13 3H9Zm2 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  compass: "M3 21h18M5 21v-6h3v6m3 0V10h3v11m3 0V5h3v16M4 11l5-4 4 1 6-6",
  rings: "m10 14 4-4m-6 6-2 2a3 3 0 0 1-4-4l4-4a3 3 0 0 1 4 0m4 4a3 3 0 0 0 4 0l4-4a3 3 0 0 0-4-4l-2 2",
  chain: "m12 3 9 4.5v9L12 21l-9-4.5v-9L12 3Zm0 9v9m0-9 9-4.5M12 12 3 7.5m4.5-2.2 9 4.5V14",
};
function Icon({ name }: { name: string }) {
  return <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"><path d={symbols[name]} /></svg>;
}

function ProfileRequest() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    busy.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/profile-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || "We couldn’t send the profile. Please try again.");
      setMessage(String(data.get("email")).trim());
      setStatus("sent");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error && error.name === "Error" ? error.message : "We couldn’t send the profile. Please try again.");
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  const fields = [
    ["name", "Full name", "text", "name", 120, true],
    ["email", "Work email address", "email", "email", 200, true],
    ["phone", "Phone number", "tel", "tel", 32, true],
    ["organisation", "Organisation", "text", "organization", 160, false],
  ] as const;

  return <section id="request-profile" aria-labelledby="request-profile-title" className="scroll-mt-24 border-y border-ink/10 bg-[#f1eade]">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[.85fr_1.55fr] lg:gap-16 lg:py-16">
      <div className="mx-auto w-full max-w-[17rem]">
        <div aria-label="Decorative Zendale Company Profile cover" role="img" className="relative isolate mx-auto aspect-[4/5] -rotate-3 overflow-hidden border border-white/10 bg-ink shadow-[0_16px_32px_rgba(8,28,51,0.25)]">
          <SmartImage src="home-hero/lifecentre.webp" alt="" fill sizes="280px" className="!absolute inset-x-0 bottom-0 h-2/3" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink from-30% via-ink/85 to-transparent" />
          <div className="relative p-6 text-porcelain">
            <p className="eyebrow text-brass">Zendale Limited</p>
            <p className="mt-9 font-display text-3xl leading-none">Company<br />Profile</p>
            <span className="mt-5 block h-0.5 w-10 bg-brass" />
            <p className="mt-3 max-w-32 text-[0.62rem] font-medium uppercase tracking-widest">Integrated healthcare group</p>
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow text-steel">Corporate Profile</p>
        <h2 id="request-profile-title" className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">Get the Zendale Company Profile</h2>
        <p className="mt-3 max-w-2xl text-carbon/85">Explore our capabilities, healthcare network and partnership opportunities. We’ll email the PDF to your work address.</p>
        {status === "sent" ? (
          <div className="mt-6 rounded-lg border border-steel/25 bg-white p-5 text-ink" role="status">
            <p className="font-medium">Your profile email is on its way.</p>
            <p className="mt-2 text-sm">Check your inbox at <strong className="break-all">{message}</strong>. If it doesn’t arrive in a few minutes, check your junk folder.</p>
            <button type="button" className="mt-4 text-sm text-steel underline" onClick={() => { setStatus("idle"); setMessage(""); }}>Use another email address</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6" aria-busy={status === "sending"}>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(([name,label,type,autoComplete,maxLength,required]) => <label key={name} className="grid gap-1.5 text-sm font-medium text-ink">
                <span>{label}{required ? <span aria-hidden="true" className="text-[#9a512d]"> *</span> : <span className="font-normal text-carbon/70"> (optional)</span>}</span>
                <input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required={required} className="min-h-11 w-full min-w-0 rounded-md border border-ink/30 bg-white/80 px-3 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-steel" />
              </label>)}
            </div>
            <div className="hidden" aria-hidden="true"><label>Leave blank <input name="website" autoComplete="off" tabIndex={-1} /></label></div>
            <p className="mt-4 text-xs leading-relaxed text-carbon/80">We use your details to fulfil this request. See our <Link to="/privacy" className="underline underline-offset-2">privacy notice</Link>.</p>
            <button type="submit" disabled={status === "sending"} className="mt-4 min-h-12 w-full rounded-md bg-brass px-6 py-3 text-sm font-semibold text-ink hover:bg-[#b98a49] disabled:opacity-60">{status === "sending" ? "Sending your profile…" : "Email Me the PDF"}</button>
            {status === "error" && <p role="alert" className="mt-3 text-sm font-medium text-[#8d3424]">{message}</p>}
          </form>
        )}
      </div>
    </div>
  </section>;
}

export default function Profile() {
  return <>
    <Seo title="Company Profile & Partnerships" description="Request the Zendale Limited company profile and explore our healthcare capabilities, subsidiary network and partnership opportunities." canonicalPath="/profile" />
    <section className="bg-ink pt-16 text-porcelain lg:pt-20">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto grid max-w-7xl min-w-0 items-center lg:grid-cols-2">
          <div className="relative z-10 px-5 py-12 sm:px-8 lg:py-16">
            <p className="eyebrow text-brass">Corporate Profile &amp; Partnerships</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-4xl leading-[1.07] sm:text-5xl xl:text-6xl">Building Stronger Healthcare Institutions.</h1>
            <p className="mt-5 text-xl leading-snug">One Partner. Complete Healthcare Solutions.</p>
            <p className="mt-3 max-w-md text-porcelain/80">Zendale Limited is an integrated healthcare group supporting healthcare delivery, institutional development and strategic partnerships across Nigeria.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#request-profile" className="inline-flex items-center justify-center border border-brass bg-brass px-6 py-3 text-sm font-medium text-ink hover:bg-[#b98a49]">Get the Company Profile ↓</a>
              <Button to="/partnerships" variant="light">Explore Partnerships →</Button>
            </div>
          </div>
          <div className="profile-hero-photo h-64 w-full bg-brass lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[53%]">
            <SmartImage src="real/project-4.webp" alt="A consultation during a community health outreach" eager fill className="h-full w-full" imgClassName="object-[center_52%]" sizes="(min-width: 1024px) 53vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="profile-capabilities" className="bg-porcelain">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8">
        <div className="mb-4 h-0.5 w-14 bg-brass" />
        <h2 id="profile-capabilities" className="font-display text-3xl text-ink sm:text-4xl">What We Bring Together</h2>
        <p className="mt-2 text-carbon/85">Integrated capabilities across the healthcare value chain.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(pillar => <Link key={pillar.id} to={pillar.route} className="flex items-start gap-4 rounded-xl border border-ink/15 bg-white/40 p-4 hover:border-steel hover:bg-white">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e3ebf5] text-ink"><Icon name={pillar.motif} /></span>
            <span><strong className="block text-base leading-snug text-ink">{pillar.name}</strong><span className="mt-1 block text-sm leading-snug text-carbon/85">{pillar.summary}</span></span>
          </Link>)}
        </div>
      </div>
    </section>
    <section aria-labelledby="profile-network" className="bg-porcelain">
      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-4 h-0.5 w-14 bg-brass" />
        <h2 id="profile-network" className="font-display text-3xl text-ink sm:text-4xl">A Growing Healthcare Network</h2>
        <p className="mt-2 text-carbon/85">A coordinated network of healthcare institutions and specialist centres.</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {facilities.map(facility => <li key={facility.id}><Link to={facilityProfilePath(facility.id)} aria-label={facility.name} className="flex h-28 items-center justify-center rounded-xl border border-ink/15 bg-white/60 p-4 hover:border-steel hover:bg-white">
            <FacilityLogo src={facility.logo!} alt={facility.name} sizes="170px" className="max-h-full max-w-full object-contain" />
          </Link></li>)}
        </ul>
      </div>
    </section>
    <ProfileRequest />
    <section className="bg-porcelain px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[73rem] flex-wrap items-center justify-between gap-5 rounded-xl bg-[#dce7f5] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="mt-1 hidden text-ink sm:block"><Icon name="rings" /></span>
          <div><h2 className="font-display text-2xl text-ink sm:text-3xl">Partner With Zendale Limited</h2><p className="mt-2 max-w-xl text-sm text-carbon/85">Hospitals, HMOs, companies, investors and institutions: let’s discuss how we can work together to strengthen healthcare delivery.</p></div>
        </div>
        <Button to="/partnerships">Discuss a Partnership →</Button>
      </div>
    </section>
  </>;
}
