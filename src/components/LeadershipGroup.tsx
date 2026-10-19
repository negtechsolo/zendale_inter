import { leadership } from "../data/leadership";
import { LeadershipCard } from "./LeadershipCard";
import { SmartImage } from "./SmartImage";
import { LeaderName } from "./LeaderName";
import { LinkedInLink } from "./LinkedInLink";

/** Full biographies live on the leadership page, separate from the home preview. */
export function LeadershipGroup() {
  const [ceo, ...team] = leadership;
  return (
    <div>
      <article id={ceo.id} className="grid scroll-mt-28 overflow-hidden border border-ink/10 bg-white md:grid-cols-[0.8fr_1.2fr]">
        <SmartImage fill src={ceo.image} alt={ceo.name} className="aspect-[4/5] w-full" imgClassName="object-top" sizes="(min-width: 768px) 480px, 100vw" />
        <div className="flex flex-col justify-center px-7 py-10 sm:p-10 lg:p-14">
          <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl"><LeaderName person={ceo} /></h3>
          <p className="mt-3 text-base font-medium text-steel">{ceo.title}</p>
          <p className="mt-2 text-sm text-carbon/70">{ceo.credential}</p>
          <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-carbon/85">
            {ceo.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {ceo.linkedin && <div className="mt-6"><LinkedInLink href={ceo.linkedin} name={ceo.name} /></div>}
        </div>
      </article>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {team.map(person => <LeadershipCard key={person.id} person={person} detailed />)}
      </div>
    </div>
  );
}
