import { SmartImage } from "./SmartImage";
import type { leadership } from "../data/leadership";

type Leader = (typeof leadership)[number];
export function LeadershipCard({ person }: { person: Leader }) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden border border-ink/10 bg-white">
      <SmartImage fill src={person.image} alt={person.name} className="aspect-[4/5] w-full" imgClassName="object-top" sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-snug text-ink">{person.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-carbon/85">{person.title}</p>
        {person.credential && <p className="mt-3 text-xs font-medium text-steel">{person.credential}</p>}
      </div>
    </article>
  );
}
