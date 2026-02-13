import Head from "next/head";

/**
 * SEO Component
 * --------------
 * Centralised <Head> management for consistent SEO across all pages.
 * Renders <title>, <meta description>, OpenGraph tags, and canonical URL.
 *
 * Architectural decision:
 *   Every page passes SEO data through props rather than hardcoding tags,
 *   ensuring a single, testable component controls all meta output.
 */

interface SEOProps {
    title: string;
    description: string;
    /** OpenGraph type — defaults to "website" */
    ogType?: string;
    /** Canonical URL path, e.g. "/technology/nodejs" */
    canonicalPath?: string;
}

/** Base URL used for canonical and OG URLs */
const SITE_URL = "https://techstackexplorer.com";

export default function SEO({
    title,
    description,
    ogType = "website",
    canonicalPath = "",
}: SEOProps) {
    const fullUrl = `${SITE_URL}${canonicalPath}`;

    return (
        <Head>
            {/* Primary SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* OpenGraph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Tech Stack Explorer" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
}
