import { technologies, type Technology } from "@/data/technologies";

export function getAllTechnologies(): Technology[] {
    return technologies;
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
    return technologies.find((tech) => tech.slug === slug);
}

export function getAllSlugs(): string[] {
    return technologies.map((tech) => tech.slug);
}

export function getTechnologiesByCategory(category: string): Technology[] {
    return technologies.filter((tech) => tech.category === category);
}

export function compareTechnologies(
    slug1: string,
    slug2: string
): { tech1: Technology | null; tech2: Technology | null } {
    return {
        tech1: getTechnologyBySlug(slug1) ?? null,
        tech2: getTechnologyBySlug(slug2) ?? null,
    };
}

export function getRelatedTechnologies(
    slug: string,
    category: string
): Technology[] {
    return technologies.filter(
        (tech) => tech.category === category && tech.slug !== slug
    );
}
