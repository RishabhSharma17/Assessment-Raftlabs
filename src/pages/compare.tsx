import { useState } from "react";
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import { compareTechnologies, getAllTechnologies } from "@/lib/techService";
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

interface ComparePageProps {
    tech1: Technology | null;
    tech2: Technology | null;
    allTechnologies: Technology[];
}

export const getServerSideProps: GetServerSideProps<ComparePageProps> = async ({
    query,
}) => {
    const slug1 = (query.tech1 as string) || "";
    const slug2 = (query.tech2 as string) || "";

    const { tech1, tech2 } = compareTechnologies(slug1, slug2);
    const allTechnologies = getAllTechnologies();

    return {
        props: {
            tech1,
            tech2,
            allTechnologies,
        },
    };
};

function CompareRow({
    label,
    value1,
    value2,
}: {
    label: string;
    value1: React.ReactNode;
    value2: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-border/50 last:border-0">
            <div className="text-sm font-medium text-muted-foreground">{label}</div>
            <div className="text-sm">{value1}</div>
            <div className="text-sm">{value2}</div>
        </div>
    );
}

function TechnologySelector({
    allTechnologies,
    initialTech1,
    initialTech2,
}: {
    allTechnologies: Technology[];
    initialTech1?: string;
    initialTech2?: string;
}) {
    const router = useRouter();
    const [selected1, setSelected1] = useState(initialTech1 || "");
    const [selected2, setSelected2] = useState(initialTech2 || "");

    const canCompare = selected1 && selected2 && selected1 !== selected2;

    const handleCompare = () => {
        if (canCompare) {
            router.push(`/compare?tech1=${selected1}&tech2=${selected2}`);
        }
    };

    const selectStyles =
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer";

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-lg">Choose Technologies</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <select
                        id="tech1-select"
                        value={selected1}
                        onChange={(e) => setSelected1(e.target.value)}
                        className={selectStyles}
                        aria-label="Select first technology"
                    >
                        <option value="">Select technology 1</option>
                        {allTechnologies.map((tech) => (
                            <option key={tech.slug} value={tech.slug}>
                                {tech.logo} {tech.name}
                            </option>
                        ))}
                    </select>

                    <span className="text-muted-foreground font-semibold text-sm shrink-0">
                        vs
                    </span>

                    <select
                        id="tech2-select"
                        value={selected2}
                        onChange={(e) => setSelected2(e.target.value)}
                        className={selectStyles}
                        aria-label="Select second technology"
                    >
                        <option value="">Select technology 2</option>
                        {allTechnologies.map((tech) => (
                            <option key={tech.slug} value={tech.slug}>
                                {tech.logo} {tech.name}
                            </option>
                        ))}
                    </select>

                    <Button
                        onClick={handleCompare}
                        disabled={!canCompare}
                        className="w-full sm:w-auto cursor-pointer shrink-0"
                    >
                        Compare
                    </Button>
                </div>
                {selected1 && selected2 && selected1 === selected2 && (
                    <p className="text-sm text-destructive mt-2">
                        Please select two different technologies.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function ComparePage({
    tech1,
    tech2,
    allTechnologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const isValid = tech1 && tech2;

    const title = isValid
        ? `${tech1.name} vs ${tech2.name} — Side-by-Side Comparison | Tech Stack Explorer`
        : "Compare Technologies | Tech Stack Explorer";

    const description = isValid
        ? `Compare ${tech1.name} and ${tech2.name} side by side. See differences in category, founding year, use cases, adoption, and more.`
        : "Select two technologies to compare side by side.";

    return (
        <>
            <SEO
                title={title}
                description={description}
                canonicalPath={
                    isValid
                        ? `/compare?tech1=${tech1.slug}&tech2=${tech2.slug}`
                        : "/compare"
                }
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">Compare</span>
                </nav>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                    {isValid ? (
                        <>
                            {tech1.name}{" "}
                            <span className="text-muted-foreground font-normal text-2xl">
                                vs
                            </span>{" "}
                            {tech2.name}
                        </>
                    ) : (
                        "Compare Technologies"
                    )}
                </h1>

                <p className="text-muted-foreground mb-8">
                    {isValid
                        ? "Change your selection below, or explore the comparison."
                        : "Select two technologies below to see a side-by-side comparison."}
                </p>

                <TechnologySelector
                    allTechnologies={allTechnologies}
                    initialTech1={tech1?.slug}
                    initialTech2={tech2?.slug}
                />

                {isValid ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {[tech1, tech2].map((tech) => (
                                <Link key={tech.slug} href={`/technology/${tech.slug}`}>
                                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader>
                                            <span
                                                className="text-4xl mb-2 block"
                                                role="img"
                                                aria-label={tech.name}
                                            >
                                                {tech.logo}
                                            </span>
                                            <CardTitle className="text-xl">{tech.name}</CardTitle>
                                            <div className="flex justify-center gap-2 mt-2">
                                                <Badge>{tech.category}</Badge>
                                                <Badge variant="outline">{tech.language}</Badge>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Detailed Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 pb-3 border-b-2 border-border">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Attribute
                                    </div>
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {tech1.name}
                                    </div>
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {tech2.name}
                                    </div>
                                </div>

                                <CompareRow
                                    label="Category"
                                    value1={<Badge variant="secondary">{tech1.category}</Badge>}
                                    value2={<Badge variant="secondary">{tech2.category}</Badge>}
                                />
                                <CompareRow
                                    label="Language"
                                    value1={tech1.language}
                                    value2={tech2.language}
                                />
                                <CompareRow
                                    label="Founded"
                                    value1={tech1.founded}
                                    value2={tech2.founded}
                                />
                                <CompareRow
                                    label="Creator"
                                    value1={tech1.creator}
                                    value2={tech2.creator}
                                />
                                <CompareRow
                                    label="Use Cases"
                                    value1={
                                        <ul className="space-y-1">
                                            {tech1.useCases.map((uc) => (
                                                <li key={uc} className="flex items-start gap-1.5">
                                                    <span className="text-primary mt-0.5">▹</span>
                                                    <span>{uc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    value2={
                                        <ul className="space-y-1">
                                            {tech2.useCases.map((uc) => (
                                                <li key={uc} className="flex items-start gap-1.5">
                                                    <span className="text-primary mt-0.5">▹</span>
                                                    <span>{uc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                />
                                <CompareRow
                                    label="Companies"
                                    value1={
                                        <div className="flex flex-wrap gap-1">
                                            {tech1.companies.map((c) => (
                                                <Badge key={c} variant="outline" className="text-xs">
                                                    {c}
                                                </Badge>
                                            ))}
                                        </div>
                                    }
                                    value2={
                                        <div className="flex flex-wrap gap-1">
                                            {tech2.companies.map((c) => (
                                                <Badge key={c} variant="outline" className="text-xs">
                                                    {c}
                                                </Badge>
                                            ))}
                                        </div>
                                    }
                                />
                            </CardContent>
                        </Card>
                        <Separator className="my-8" />
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href={`/technology/${tech1.slug}`}>
                                <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                                    Learn more about {tech1.name} →
                                </Button>
                            </Link>
                            <Link href={`/technology/${tech2.slug}`}>
                                <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                                    Learn more about {tech2.name} →
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <section>
                        <Separator className="my-6" />
                        <p className="text-sm text-muted-foreground mb-4">
                            Or try a popular comparison:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                ["nodejs", "django"],
                                ["fastapi", "expressjs"],
                                ["postgresql", "mongodb"],
                                ["django", "ruby-on-rails"],
                                ["spring-boot", "fastapi"],
                            ].map(([a, b]) => {
                                const nameA =
                                    allTechnologies.find((t) => t.slug === a)?.name ?? a;
                                const nameB =
                                    allTechnologies.find((t) => t.slug === b)?.name ?? b;
                                return (
                                    <Link key={`${a}-${b}`} href={`/compare?tech1=${a}&tech2=${b}`}>
                                        <Button variant="outline" size="sm" className="cursor-pointer">
                                            {nameA} vs {nameB}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                {isValid && (
                    <>
                        <Separator className="my-8" />
                        <section>
                            <h2 className="text-xl font-semibold mb-4">
                                Try Other Comparisons
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {allTechnologies
                                    .filter(
                                        (t) => t.slug !== tech1.slug && t.slug !== tech2.slug
                                    )
                                    .slice(0, 4)
                                    .map((tech) => (
                                        <Link
                                            key={tech.slug}
                                            href={`/compare?tech1=${tech1.slug}&tech2=${tech.slug}`}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="cursor-pointer"
                                            >
                                                {tech1.name} vs {tech.name}
                                            </Button>
                                        </Link>
                                    ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
