import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import JsonLd from "@/components/JsonLd";
import {
    getAllSlugs,
    getTechnologyBySlug,
    getRelatedTechnologies,
    getAllTechnologies,
} from "@/lib/techService";
import type { Technology } from "@/data/technologies";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/**
 * Technology Detail Page (SSG)
 * -----------------------------
 * Pre-rendered at build time for every technology slug.
 *
 * Why SSG (getStaticPaths + getStaticProps)?
 *   The number of technologies is finite and known ahead of time.
 *   Static generation gives the best SEO performance:
 *     - Instant TTFB (served from CDN)
 *     - Fully rendered HTML for crawlers
 *     - No server cost per request
 *
 * SEO strategy:
 *   - Dynamic <title> and <meta description> per technology
 *   - OpenGraph tags for social sharing
 *   - JSON-LD structured data (schema.org/SoftwareApplication)
 *   - Proper heading hierarchy (h1 → h2)
 *   - Internal links to related technologies for crawl depth
 */

interface TechnologyPageProps {
    technology: Technology;
    relatedTechnologies: Technology[];
    allTechnologies: Technology[];
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllSlugs();

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false, // 404 for unknown slugs
    };
};

export const getStaticProps: GetStaticProps<TechnologyPageProps> = async ({
    params,
}) => {
    const slug = params?.slug as string;
    const technology = getTechnologyBySlug(slug);

    // This should never happen with fallback: false, but TypeScript requires it
    if (!technology) {
        return { notFound: true };
    }

    const relatedTechnologies = getRelatedTechnologies(
        slug,
        technology.category
    );
    const allTechnologies = getAllTechnologies();

    return {
        props: {
            technology,
            relatedTechnologies,
            allTechnologies,
        },
    };
};

export default function TechnologyPage({
    technology,
    relatedTechnologies,
    allTechnologies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            {/* Dynamic SEO metadata */}
            <SEO
                title={`${technology.name} — Overview, Use Cases & Companies | Tech Stack Explorer`}
                description={`Learn about ${technology.name}: ${technology.description.slice(0, 150)}...`}
                ogType="article"
                canonicalPath={`/technology/${technology.slug}`}
            />

            {/* JSON-LD structured data for rich search results */}
            <JsonLd technology={technology} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                {/* Breadcrumb navigation */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{technology.name}</span>
                </nav>

                {/* Page Header — h1 for SEO */}
                <header className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl" role="img" aria-label={technology.name}>
                            {technology.logo}
                        </span>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                {technology.name}
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge>{technology.category}</Badge>
                                <Badge variant="outline">{technology.language}</Badge>
                                <span className="text-sm text-muted-foreground">
                                    Est. {technology.founded}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Created by{" "}
                        <span className="font-semibold text-foreground">
                            {technology.creator}
                        </span>
                    </p>
                </header>

                {/* Overview Section — h2 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="text-base leading-relaxed text-foreground/90">
                        {technology.description}
                    </p>
                    <div className="mt-4">
                        <a
                            href={technology.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                        >
                            Visit official website →
                        </a>
                    </div>
                </section>

                <Separator className="my-8" />

                {/* Use Cases Section — h2 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {technology.useCases.map((useCase) => (
                            <Card key={useCase} className="border-border/60">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <span className="text-primary text-lg">▹</span>
                                    <span className="text-sm">{useCase}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <Separator className="my-8" />

                {/* Companies Section — h2 */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Companies Using {technology.name}</h2>
                    <div className="flex flex-wrap gap-2">
                        {technology.companies.map((company) => (
                            <Badge key={company} variant="secondary" className="text-sm py-1 px-3">
                                {company}
                            </Badge>
                        ))}
                    </div>
                </section>

                <Separator className="my-8" />

                {/* Quick Info Card */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Quick Info</h2>
                    <Card>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
                                {[
                                    { label: "Category", value: technology.category },
                                    { label: "Language", value: technology.language },
                                    { label: "Founded", value: String(technology.founded) },
                                    { label: "Use Cases", value: String(technology.useCases.length) },
                                ].map((item) => (
                                    <div key={item.label} className="p-4 text-center">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                            {item.label}
                                        </p>
                                        <p className="text-lg font-semibold mt-1">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Related Technologies — internal linking for SEO crawlability */}
                {relatedTechnologies.length > 0 && (
                    <>
                        <Separator className="my-8" />
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">
                                Related {technology.category} Technologies
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedTechnologies.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/technology/${related.slug}`}
                                        className="group"
                                    >
                                        <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/30">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base flex items-center gap-2">
                                                    <span>{related.logo}</span>
                                                    <span className="group-hover:text-primary transition-colors">
                                                        {related.name}
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {related.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Compare CTA */}
                <Separator className="my-8" />
                <section className="text-center py-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Compare {technology.name} with other technologies
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {allTechnologies
                            .filter((t) => t.slug !== technology.slug)
                            .slice(0, 4)
                            .map((tech) => (
                                <Link
                                    key={tech.slug}
                                    href={`/compare?tech1=${technology.slug}&tech2=${tech.slug}`}
                                >
                                    <Button variant="outline" size="sm" className="cursor-pointer">
                                        {technology.name} vs {tech.name}
                                    </Button>
                                </Link>
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
}
