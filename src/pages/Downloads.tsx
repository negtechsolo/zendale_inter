import { useState } from "react";
import { Seo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { LeadGateForm } from "../components/forms";
import { audiences, downloadItems, type Audience } from "../data/downloads";

/**
 * Professional Download Centre. Each document is gated behind a short lead
 * form; once any form is completed in the session, the centre stays unlocked.
 *
 * TODO (documents): the guide PDFs themselves were not supplied. Download
 * links point to /downloads-files/<name>.pdf — drop the real PDFs into
 * public/downloads-files/ (filenames listed in IMAGE-MANIFEST.md) and the
 * links work with no code change. Until then, the button click shows a
 * clear "being prepared" note rather than a broken download.
 */
export default function Downloads() {
  const [tab, setTab] = useState<Audience>("Healthcare Professionals");
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("zendale-lead") === "1");
  const [gatingId, setGatingId] = useState<string | null>(null);
  const visible = downloadItems.filter((d) => d.audiences.includes(tab));

  return (
    <>
      <Seo
        title="Professional Download Centre"
        description="Download Zendale's capability guides: the Endoscopy Guide, ICU Guide, Fertility Guide, Equipment Guide, Corporate Health Guide and the Zendale Company Profile."
      />
      <PageHero
        eyebrow="Professional Download Centre"
        title="The guides your team will actually use."
        lede="Referral criteria, admission pathways, programme structures and lifecycle practice — written as working documents, filed by the audience they serve."
      />

      <section className="bg-porcelain py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Audience">
              {audiences.map((a) => (
                <button
                  key={a}
                  type="button"
                  role="tab"
                  aria-selected={tab === a}
                  onClick={() => setTab(a)}
                  className={`border px-4 py-2.5 text-sm transition-colors ${
                    tab === a
                      ? "border-steel bg-steel text-porcelain"
                      : "border-ink/20 bg-white text-carbon hover:border-steel hover:text-steel"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2">
            {visible.map((d, i) => (
              <Reveal key={d.id} delay={(i % 2) * 0.07}>
                <article className="z-sweep flex h-full flex-col justify-between bg-porcelain p-8">
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-eyebrow text-brass">
                      {d.fileType} · {d.file}
                    </p>
                    <h2 className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">{d.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-carbon/80">{d.description}</p>
                  </div>
                  <div className="mt-6">
                    {unlocked ? (
                      <DownloadButton file={d.file} title={d.title} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setGatingId(gatingId === d.id ? null : d.id)}
                        aria-expanded={gatingId === d.id}
                        className="inline-flex items-center gap-2 border border-steel px-5 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-steel hover:text-porcelain"
                      >
                        Download {shortName(d.title)}
                      </button>
                    )}
                    {!unlocked && gatingId === d.id && (
                      <div className="mt-5 border-t border-ink/10 pt-5">
                        <p className="text-sm text-carbon/80">
                          Tell us who's receiving it, and the download unlocks — along
                          with every other guide in the centre.
                        </p>
                        <div className="mt-4">
                          <LeadGateForm
                            idPrefix={`gate-${d.id}`}
                            itemLabel={shortName(d.title)}
                            submitLabel={`Unlock & download ${shortName(d.title)}`}
                            onComplete={() => {
                              sessionStorage.setItem("zendale-lead", "1");
                              setUnlocked(true);
                              setGatingId(null);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function shortName(title: string): string {
  if (title.includes("Company Profile")) return "the Company Profile";
  const key = ["Endoscopy", "ICU", "Fertility", "Equipment", "Corporate Health"].find((k) => title.includes(k));
  return key ? `the ${key} Guide` : "the guide";
}

function DownloadButton({ file, title }: { file: string; title: string }) {
  const [missing, setMissing] = useState(false);
  async function tryDownload() {
    try {
      const res = await fetch(`/downloads-files/${file}`, { method: "HEAD" });
      const type = res.headers.get("content-type") ?? "";
      if (res.ok && type.includes("pdf")) {
        window.location.href = `/downloads-files/${file}`;
      } else {
        setMissing(true);
      }
    } catch {
      setMissing(true);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={tryDownload}
        className="inline-flex items-center gap-2 bg-steel px-5 py-2.5 text-sm font-medium text-porcelain transition-colors hover:bg-[#3d5d8c]"
      >
        {/* File-type glyph: small utility UI, as permitted */}
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <path d="M8 2 v8 M4.5 7 8 10.5 11.5 7 M3 13 H13" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        Download {shortName(title)}
      </button>
      {missing && (
        <p className="mt-3 text-xs leading-relaxed text-[#A2542F]" role="status">
          This document is still being prepared for release. Ask us on the contact page
          and we'll send it to you directly the moment it's ready.
        </p>
      )}
    </div>
  );
}
