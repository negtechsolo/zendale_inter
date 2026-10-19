import { SmartImage } from "./SmartImage";
import type { leadership } from "../data/leadership";

type Leader = (typeof leadership)[number];
export function LeadershipCard({
  person,
  detailed = false,
}: {
  person: Leader;
  detailed?: boolean;
}) {
  const qualification =
    person.credential === "Zendale Limited" ? "" : person.credential;
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden border border-ink/10 bg-white">
      <SmartImage
        fill
        src={person.image}
        alt={person.name}
        className="aspect-[4/5] w-full"
        imgClassName="object-top"
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-[2.75em] font-display text-xl leading-snug text-ink">
          {person.name}
        </h3>
        <p className="mt-2 min-h-[5em] text-sm leading-relaxed text-carbon/85">
          {person.title}
        </p>
        <p className="mt-3 min-h-5 text-xs font-medium text-steel">
          {qualification}
        </p>
        {detailed && (
          <p className="mt-5 border-t border-ink/10 pt-5 text-sm leading-relaxed text-carbon/80">
            {person.bio}
          </p>
        )}
      </div>
    </article>
  );
}
