import { SmartImage } from "./SmartImage";
import { LeaderName } from "./LeaderName";
import { LinkedInLink } from "./LinkedInLink";
import type { Leader } from "../data/leadership";

export function LeadershipCard({ person, detailed = false }: { person: Leader; detailed?: boolean }) {
  return (
    <article id={detailed ? person.id : undefined} className="flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden border border-ink/10 bg-white">
      <SmartImage
        fill
        src={person.image}
        alt={person.name}
        className="aspect-[4/5] w-full"
        imgClassName="object-top"
        sizes={detailed ? "(min-width: 1024px) 390px, (min-width: 640px) 33vw, 100vw" : "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"}
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`font-display leading-snug text-ink ${detailed ? "text-2xl" : "text-xl"}`}><LeaderName person={person} /></h3>
        <p className="mt-3 text-sm leading-relaxed text-carbon/85">{person.title}</p>
        {detailed && (
          <>
            <div className="mt-6 space-y-4 border-t border-ink/10 pt-6 text-base leading-relaxed text-carbon/85">
              {person.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {person.linkedin && <div className="mt-auto pt-5"><LinkedInLink href={person.linkedin} name={person.name} /></div>}
          </>
        )}
      </div>
    </article>
  );
}
