/**
 * Technology Service Layer
 * -------------------------
 * Abstracts all data access for the technology dataset.
 *
 * Architectural decision:
 *   Pages never import the raw data array directly. Instead they call
 *   service functions, making it trivial to swap the data source
 *   (e.g. switch from a static file to a CMS or database) without
 *   touching any page code.
 */

import { technologies, type Technology } from "@/data/technologies";

/** Returns the full list of technologies */
export function getAllTechnologies(): Technology[] {
    return technologies;
}

/** Returns a single technology by its URL slug, or undefined if not found */
export function getTechnologyBySlug(slug: string): Technology | undefined {
    return technologies.find((tech) => tech.slug === slug);
}

/** Returns all slugs — used by getStaticPaths to pre-render every tech page */
export function getAllSlugs(): string[] {
    return technologies.map((tech) => tech.slug);
}

/** Returns technologies filtered by category */
export function getTechnologiesByCategory(category: string): Technology[] {
    return technologies.filter((tech) => tech.category === category);
}

/**
 * Compares two technologies by slug.
 * Returns both Technology objects or null values if slugs are invalid.
 * Used by the SSR /compare page.
 */
export function compareTechnologies(
    slug1: string,
    slug2: string
): { tech1: Technology | null; tech2: Technology | null } {
    return {
        tech1: getTechnologyBySlug(slug1) ?? null,
        tech2: getTechnologyBySlug(slug2) ?? null,
    };
}

/**
 * Returns technologies in the same category, excluding the given slug.
 * Powers the "Related Technologies" section for internal linking / crawlability.
 */
export function getRelatedTechnologies(
    slug: string,
    category: string
): Technology[] {
    return technologies.filter(
        (tech) => tech.category === category && tech.slug !== slug
    );
}
