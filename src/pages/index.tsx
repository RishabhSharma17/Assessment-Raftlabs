import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import TechnologyCard from "@/components/TechnologyCard";
import { getAllTechnologies } from "@/lib/techService";
import type { Technology } from "@/data/technologies";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Home Page (SSG)
 * ----------------
 * Statically generated at build time via getStaticProps.
 *
 * Why SSG?
 *   The technology list is static and changes infrequently.
 *   Pre-rendering gives the fastest possible TTFB and ensures
 *   search engine crawlers see fully rendered HTML on first request.
 *
 * SEO strategy:
 *   - Optimized <title> and <meta description>
 *   - Internal links to every technology page (card grid)
 *   - CTA linking to the /compare page
 *   - Single <h1> with proper heading hierarchy
 */

interface HomeProps {
  technologies: Technology[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const technologies = getAllTechnologies();

  return {
    props: {
      technologies,
    },
  };
};

export default function HomePage({
  technologies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO
        title="Tech Stack Explorer | Discover & Compare Backend Technologies"
        description="Explore and compare popular backend technologies like Node.js, Django, FastAPI, PostgreSQL, and more. In-depth guides, use cases, and side-by-side comparisons."
        canonicalPath="/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Tech Stack{" "}
            <span className="text-primary">Explorer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover, learn about, and compare the most popular backend
            technologies powering modern applications. From runtimes to
            frameworks to databases.
          </p>
          <Link href="/compare?tech1=nodejs&tech2=django">
            <Button size="lg" className="cursor-pointer">
              Compare Technologies →
            </Button>
          </Link>
        </section>

        <Separator className="mb-10" />

        {/* Technology Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            All Technologies
            <span className="text-muted-foreground font-normal text-base ml-2">
              ({technologies.length})
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technologies.map((tech) => (
              <TechnologyCard key={tech.slug} technology={tech} />
            ))}
          </div>
        </section>

        {/* Internal Links Section — boosts crawlability */}
        <Separator className="my-10" />

        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technology/${tech.slug}`}
                className="text-sm text-primary hover:underline"
              >
                {tech.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
