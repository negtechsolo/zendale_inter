import { Link } from "react-router-dom";
import { leadership } from "../data/leadership";
import { LeadershipCard } from "./LeadershipCard";
import { Button } from "./Button";
export function LeadershipPreview() {
  return (
    <section className="bg-porcelain px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-steel">Our Leadership</p>
            <h2 className="mt-4 font-display text-4xl text-ink">
              People behind the connected group.
            </h2>
          </div>
          <Button to="/leadership" variant="outline">
            Meet Our Leadership
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person) => (
            <Link
              key={person.name}
              to="/leadership"
              className="block h-full transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-steel"
            >
              <LeadershipCard person={person} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
