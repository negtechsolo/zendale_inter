import { Link } from "react-router-dom";
import { SmartImage } from "./SmartImage";
import type { UpdateStory } from "../data/updates";
export function StoryCards({ stories }: { stories: UpdateStory[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stories.map((story) => (
        <article
          key={story.path}
          className="flex flex-col border border-ink/10 bg-white"
        >
          <Link to={story.path} aria-label={story.title}>
            <SmartImage
                fill
              src={story.image}
              alt={story.imageAlt}
              className="aspect-[4/3] w-full"
            />
          </Link>
          <div className="flex flex-1 flex-col p-6">
            <p className="eyebrow text-steel">{story.category}</p>
            <h3 className="mt-3 font-display text-2xl text-ink">
              <Link to={story.path}>{story.title}</Link>
            </h3>
            <p className="my-4 text-sm leading-relaxed text-carbon/75">
              {story.summary}
            </p>
            <Link
              to={story.path}
              className="mt-auto text-sm font-medium text-steel"
            >
              Read More →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
