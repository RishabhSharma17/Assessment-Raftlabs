# Tech Stack Explorer

Tech Stack Explorer is a Next.js web application that allows users to explore backend technologies and compare them side by side. The platform displays a collection of runtimes, frameworks, and databases, provides a dedicated detail page for each technology, and includes a comparison page where two technologies can be evaluated across key attributes such as language, category, use cases, and adoption.

The project fulfills the assessment requirements in the following ways:

* **Next.js with SSR/SSG:** The home page and technology detail pages are statically generated for fast loading and SEO, while the comparison page uses server-side rendering to handle dynamic query parameters.
* **Structured data selection:** The application uses a typed dataset of backend technologies, enabling consistent, programmatic generation of multiple pages from a single data source.
* **SEO optimization:** Each page includes optimized titles, descriptions, canonical URLs, OpenGraph metadata, and structured JSON-LD data so search engines can properly index and understand the content.
* **Programmatic SEO pages:** Multiple technology pages are automatically generated using dynamic routes and build-time data fetching, ensuring scalable content creation.
* **Responsive UI and usability:** The interface is clean, mobile-friendly, and includes interactive client-side comparison selection for better user experience.
* **Deployment ready:** The project is production-ready and can be deployed directly on platforms like Vercel.

Overall, the project demonstrates how to build a structured, SEO-friendly Next.js application that combines static generation, server-side rendering, and reusable components to create a scalable technology exploration and comparison platform.