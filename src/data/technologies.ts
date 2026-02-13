/**
 * Technology Data Layer
 * ---------------------
 * Structured internal dataset for programmatic SEO pages.
 * Each technology entry provides the data needed for:
 *   - Dynamic page generation (SSG via getStaticPaths)
 *   - SEO metadata (title, description, OG tags)
 *   - JSON-LD structured data (schema.org/SoftwareApplication)
 *   - Internal linking between related technologies
 */

/** TypeScript interface representing a single technology entry */
export interface Technology {
    /** URL-friendly identifier, used as the dynamic route param */
    slug: string;
    /** Display name of the technology */
    name: string;
    /** SEO-friendly description (used in meta tags and page body) */
    description: string;
    /** Year the technology was first released */
    founded: number;
    /** Creator or founding organization */
    creator: string;
    /** High-level category for filtering and comparison */
    category: "Runtime" | "Framework" | "Database" | "Library";
    /** Primary programming language */
    language: string;
    /** Practical use cases for the technology */
    useCases: string[];
    /** Notable companies that use this technology in production */
    companies: string[];
    /** Emoji used as a lightweight logo/icon */
    logo: string;
    /** Official website URL */
    website: string;
}

/**
 * Internal dataset of backend technologies.
 * This acts as the single source of truth — no external API dependency.
 * In production this could be swapped for a CMS or database query.
 */
export const technologies: Technology[] = [
    {
        slug: "nodejs",
        name: "Node.js",
        description:
            "Node.js is a cross-platform, open-source JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Chrome's V8 engine, it enables developers to use JavaScript for server-side scripting, producing dynamic web page content before the page is sent to the user's browser.",
        founded: 2009,
        creator: "Ryan Dahl",
        category: "Runtime",
        language: "JavaScript",
        useCases: [
            "Real-time applications",
            "REST APIs",
            "Microservices",
            "Streaming applications",
            "Server-side rendering",
            "CLI tools",
        ],
        companies: ["Netflix", "LinkedIn", "Uber", "PayPal", "NASA", "Walmart"],
        logo: "🟢",
        website: "https://nodejs.org",
    },
    {
        slug: "django",
        name: "Django",
        description:
            "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the model-template-views (MTV) architectural pattern, and its 'batteries-included' philosophy provides almost everything developers need out of the box — from authentication to database ORM.",
        founded: 2005,
        creator: "Adrian Holovaty & Simon Willison",
        category: "Framework",
        language: "Python",
        useCases: [
            "Content management systems",
            "Social networks",
            "Scientific computing platforms",
            "Financial platforms",
            "E-commerce backends",
            "Data-driven applications",
        ],
        companies: [
            "Instagram",
            "Pinterest",
            "Mozilla",
            "Disqus",
            "Bitbucket",
            "The Washington Post",
        ],
        logo: "🐍",
        website: "https://djangoproject.com",
    },
    {
        slug: "fastapi",
        name: "FastAPI",
        description:
            "FastAPI is a modern, high-performance Python web framework for building APIs. It leverages Python type hints for automatic data validation, serialization, and interactive API documentation. FastAPI delivers performance on par with Node.js and Go frameworks while maintaining Python's developer-friendly syntax.",
        founded: 2018,
        creator: "Sebastián Ramírez",
        category: "Framework",
        language: "Python",
        useCases: [
            "High-performance APIs",
            "Machine learning model serving",
            "Microservices",
            "Real-time data pipelines",
            "IoT backends",
            "Async web applications",
        ],
        companies: [
            "Microsoft",
            "Uber",
            "Netflix",
            "Explosion AI",
            "ING Bank",
            "Starbucks",
        ],
        logo: "⚡",
        website: "https://fastapi.tiangolo.com",
    },
    {
        slug: "postgresql",
        name: "PostgreSQL",
        description:
            "PostgreSQL is a powerful, open-source object-relational database system with over 35 years of active development. It has earned a strong reputation for reliability, feature robustness, extensibility, and performance. PostgreSQL supports both SQL (relational) and JSON (non-relational) querying.",
        founded: 1986,
        creator: "Michael Stonebraker (UC Berkeley)",
        category: "Database",
        language: "C",
        useCases: [
            "OLTP systems",
            "Data warehousing",
            "Geospatial applications (PostGIS)",
            "Financial systems",
            "Web application backends",
            "Time-series data",
        ],
        companies: [
            "Apple",
            "Reddit",
            "Spotify",
            "Instagram",
            "Twitch",
            "The Guardian",
        ],
        logo: "🐘",
        website: "https://postgresql.org",
    },
    {
        slug: "ruby-on-rails",
        name: "Ruby on Rails",
        description:
            "Ruby on Rails, often simply called Rails, is a server-side web application framework written in Ruby. It emphasizes Convention over Configuration (CoC) and the Don't Repeat Yourself (DRY) principle. Rails provides default structures for databases, web services, and web pages, making it a full-stack framework.",
        founded: 2004,
        creator: "David Heinemeier Hansson",
        category: "Framework",
        language: "Ruby",
        useCases: [
            "Rapid prototyping",
            "SaaS applications",
            "E-commerce platforms",
            "Content management systems",
            "Social networking (Basecamp, GitHub)",
            "Marketplace applications",
        ],
        companies: [
            "GitHub",
            "Shopify",
            "Airbnb",
            "Basecamp",
            "Twitch",
            "SoundCloud",
        ],
        logo: "💎",
        website: "https://rubyonrails.org",
    },
    {
        slug: "spring-boot",
        name: "Spring Boot",
        description:
            "Spring Boot is an open-source Java-based framework that simplifies the creation of stand-alone, production-grade Spring applications. It minimizes boilerplate configuration through opinionated defaults and auto-configuration, enabling developers to focus on business logic rather than infrastructure setup.",
        founded: 2014,
        creator: "Pivotal (VMware Tanzu)",
        category: "Framework",
        language: "Java",
        useCases: [
            "Enterprise applications",
            "Microservices architecture",
            "Cloud-native applications",
            "RESTful APIs",
            "Batch processing",
            "Event-driven systems",
        ],
        companies: [
            "Netflix",
            "Amazon",
            "Google",
            "Alibaba",
            "Intuit",
            "Capital One",
        ],
        logo: "🍃",
        website: "https://spring.io/projects/spring-boot",
    },
    {
        slug: "expressjs",
        name: "Express.js",
        description:
            "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. As the de facto standard server framework for Node.js, Express powers millions of APIs and web applications and forms the 'E' in popular stacks like MEAN and MERN.",
        founded: 2010,
        creator: "TJ Holowaychuk",
        category: "Framework",
        language: "JavaScript",
        useCases: [
            "REST APIs",
            "Single-page application backends",
            "Middleware-based architectures",
            "Server-side rendering",
            "Rapid API prototyping",
            "Proxy servers",
        ],
        companies: ["IBM", "Accenture", "Fox Sports", "Myntra", "Yandex", "Kuali"],
        logo: "🚂",
        website: "https://expressjs.com",
    },
    {
        slug: "mongodb",
        name: "MongoDB",
        description:
            "MongoDB is a source-available, cross-platform, document-oriented NoSQL database. Instead of storing data in tables of rows and columns like SQL databases, MongoDB stores data as flexible JSON-like documents with dynamic schemas (BSON format), making it ideal for applications that need to evolve rapidly.",
        founded: 2009,
        creator: "Dwight Merriman, Eliot Horowitz & Kevin Ryan",
        category: "Database",
        language: "C++",
        useCases: [
            "Content management",
            "Real-time analytics",
            "IoT data storage",
            "Catalog management",
            "Mobile application backends",
            "Gaming leaderboards",
        ],
        companies: [
            "eBay",
            "Adobe",
            "Verizon",
            "Cisco",
            "Toyota",
            "Forbes",
        ],
        logo: "🍃",
        website: "https://mongodb.com",
    },
];
