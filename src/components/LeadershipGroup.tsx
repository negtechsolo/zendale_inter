import { leadership } from "../data/leadership";
import { LeadershipCard } from "./LeadershipCard";
import { SmartImage } from "./SmartImage";

export function LeadershipGroup() {
  const [ceo, ...team] = leadership;
  return (
    <div>
      <article className="grid overflow-hidden border border-ink/10 bg-white md:grid-cols-[0.8fr_1.2fr]">
        <SmartImage fill src={ceo.image} alt={ceo.name} className="aspect-[4/5] w-full" imgClassName="object-top" sizes="(min-width: 768px) 480px, 100vw" />
        <div className="flex flex-col justify-center px-7 py-10 sm:p-10 lg:p-14">
          <p className="eyebrow text-steel">Chief Executive Officer</p>
          <h3 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{ceo.name}</h3>
          <p className="mt-3 text-sm font-medium text-steel">{ceo.credential}</p>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-carbon/85">{ceo.bio}</p>
          <a href="https://www.linkedin.com/in/rita-irurhe/" target="_blank" rel="noopener noreferrer" className="mt-7 self-start text-sm font-medium text-steel underline underline-offset-4">View LinkedIn profile ↗</a>
        </div>
      </article>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {team.map(person => <LeadershipCard key={person.name} person={person} />)}
      </div>
    </div>
  );
}
