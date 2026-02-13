import Head from "next/head";
import type { Technology } from "@/data/technologies";

/**
 * JSON-LD Structured Data Component
 * -----------------------------------
 * Injects a <script type="application/ld+json"> block into <head>
 * using the schema.org SoftwareApplication type.
 *
 * This structured data helps search engines understand the page content
 * and can trigger rich snippets in search results.
 */

interface JsonLdProps {
    technology: Technology;
}

export default function JsonLd({ technology }: JsonLdProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: technology.name,
        description: technology.description,
        url: technology.website,
        applicationCategory: technology.category,
        datePublished: `${technology.founded}-01-01`,
        author: {
            "@type": "Person",
            name: technology.creator,
        },
        operatingSystem: "Cross-platform",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </Head>
    );
}
