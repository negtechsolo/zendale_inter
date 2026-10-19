import { SmartImage } from "./SmartImage";

export function ImageGallery({
  images,
  title = "Inside the facility",
}: {
  images: { src: string; alt: string }[];
  title?: string;
}) {
  if (!images.length) return null;
  return (
    <section className="bg-mist/40 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-steel">Photo Gallery</p>
        <h2 className="mt-3 font-display text-3xl text-ink">{title}</h2>
        <p className="mt-3 text-sm text-carbon/70">
          Select a photograph to open the full image.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <figure key={image.src}>
              <a
                href={`/images/${image.src}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full image: ${image.alt}`}
                className="block overflow-hidden bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-steel"
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                />
              </a>
              <figcaption className="mt-3 text-sm text-carbon/75">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
