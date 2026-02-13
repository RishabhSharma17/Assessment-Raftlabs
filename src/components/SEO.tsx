import Head from "next/head";

interface SEOProps {
    title: string;
    description: string;
    ogType?: string;
    canonicalPath?: string;
}

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
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Tech Stack Explorer" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
}
