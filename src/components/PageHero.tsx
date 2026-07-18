import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}

/** Standard inner-page opening: ink surface, mono eyebrow, display headline, optional diagonal-masked photo. */
export function PageHero({ eyebrow, title, lede, image, children }: PageHeroProps) {
  return (
    <section className="bg-ink pb-16 pt-32 text-porcelain lg:pb-24 lg:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className={image ? "lg:col-span-6" : "lg:col-span-8"}>
          <Reveal>
            <p className="eyebrow text-brass">{eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-porcelain/75 sm:text-lg">{lede}</p>
            {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
          </Reveal>
        </div>
        {image && (
          <Reveal className="lg:col-span-6" delay={0.15} variant="sweep">
            <SmartImage
              src={image.src}
              alt={image.alt}
              eager
              className="diag-mask aspect-[4/3] w-full"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
