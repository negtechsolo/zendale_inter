import { Seo } from "../lib/seo";
import { Button } from "../components/Button";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for doesn't exist on the Zendale website." />
      <section className="flex min-h-[70vh] items-center bg-ink pt-20 text-porcelain">
        <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
          <p className="font-mono text-sm uppercase tracking-eyebrow text-brass">404 / Page not found</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
            This page isn't part of the network.
          </h1>
          <p className="mt-4 max-w-xl text-base text-porcelain/75">
            The address may have been typed incorrectly, or the page may have moved.
            Everything that exists is one step from here.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/" variant="brass">Go to the homepage</Button>
            <Button to="/network" variant="light">Explore Our Healthcare Network</Button>
            <Button to="/contact" variant="light">Talk to Our Team</Button>
          </div>
        </div>
      </section>
    </>
  );
}
