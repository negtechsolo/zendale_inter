import type { Leader } from "../data/leadership";

export function LeaderName({ person }: { person: Leader }) {
  return (
    <>
      <span>{person.name}</span>
      {person.postnominal && (
        <span className="ml-2 inline-block align-baseline font-sans text-xs font-medium tracking-normal text-steel sm:text-sm">
          {person.postnominal}
        </span>
      )}
    </>
  );
}
