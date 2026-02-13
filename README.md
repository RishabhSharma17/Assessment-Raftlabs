# 🔍 Tech Stack Explorer — Complete Project Explanation

A **Next.js** web application jo backend technologies ko explore aur compare karne ke liye bani hai. Yeh project **SEO-first** approach follow karta hai — matlab har page search engines ke liye optimized hai so ki Google ya Bing pe accha rank kare.

---

## 📂 Project Structure — Pura Folder Layout

```
tech-stack-explorer/
├── src/
│   ├── components/          ← Reusable UI building blocks (har jagah use hone wale parts)
│   │   ├── Header.tsx           ← Site ka top navigation bar
│   │   ├── SEO.tsx              ← SEO meta tags inject karta hai har page me
│   │   ├── JsonLd.tsx           ← Google rich results ke liye structured data
│   │   ├── TechnologyCard.tsx   ← Ek technology ka card (home page pe dikhta hai)
│   │   └── ui/                  ← Low-level design system components (design ki building blocks)
│   │       ├── badge.tsx            ← Small colored labels (jaise "Framework", "Database")
│   │       ├── button.tsx           ← Clickable buttons with multiple styles
│   │       ├── card.tsx             ← Container box with header, body, footer sections
│   │       └── separator.tsx        ← Horizontal/vertical line divider
│   ├── data/
│   │   └── technologies.ts     ← Actual data — saari technologies ka database (array)
│   ├── lib/
│   │   ├── techService.ts       ← Data access functions (data se info nikalne ke functions)
│   │   └── utils.ts             ← CSS class merging utility (Tailwind ke liye helper)
│   ├── pages/                   ← Har file = ek web page (Next.js ka rule)
│   │   ├── _app.tsx             ← App wrapper — layout + font loading
│   │   ├── _document.tsx        ← HTML document structure (lang attribute)
│   │   ├── index.tsx            ← Home page — saari technologies ki list
│   │   ├── compare.tsx          ← Compare page — do technologies ki side-by-side tulna
│   │   ├── technology/
│   │   │   └── [slug].tsx       ← Dynamic detail page — ek technology ka full detail
│   │   └── api/
│   │       └── hello.ts         ← Sample API route (default Next.js endpoint)
│   └── styles/
│       └── globals.css          ← Global CSS styles + Tailwind config
├── package.json                 ← Dependencies aur scripts
├── tsconfig.json                ← TypeScript configuration
├── next.config.ts               ← Next.js configuration
├── postcss.config.mjs           ← PostCSS plugin config (Tailwind ke liye)
└── eslint.config.mjs            ← Code linting rules
```

---

## 🧠 Core Concept — Yeh Project Kya Karta Hai?

Socho tum ek website bana rahe ho jahan koi bhi aake **Node.js, Django, FastAPI, PostgreSQL** jaise technologies ke baare me detail me padh sake, aur unko **side-by-side compare** bhi kar sake (jaise "Node.js vs Django — kaun kahan better hai?").

### 3 Main Features:

| Feature | URL Pattern | Example |
|---|---|---|
| **Home Page** | `/` | Saari technologies ki grid |
| **Technology Detail** | `/technology/[slug]` | `/technology/nodejs` → Node.js ka full detail |
| **Compare Page** | `/compare?tech1=X&tech2=Y` | `/compare?tech1=nodejs&tech2=django` |

---

## 📦 Dependencies — Kaunse Packages Use Ho Rahe Hain Aur Kyun?

### Production Dependencies (`dependencies`)

| Package | Version | Kyun chahiye? |
|---|---|---|
| `next` | 16.1.6 | **Framework** — yeh pura app Next.js pe bana hai. React ke upar SSR (server-side rendering) aur SSG (static generation) provide karta hai |
| `react` | 19.2.3 | **UI Library** — components banane ke liye. Har `.tsx` file React use karti hai |
| `react-dom` | 19.2.3 | React ko browser DOM se connect karta hai. React ke saath zaroori hai |
| `class-variance-authority` (CVA) | ^0.7.1 | **Variant system** — buttons aur badges ko multiple styles dene ke liye. Jaise `variant="outline"` ya `size="lg"` likhne ka clean tarika |
| `clsx` | ^2.1.1 | **Conditional classes** — CSS classes ko conditionally merge karne ka helper. Jaise kuch condition ho toh ye class lagao, nahi toh ye lagao |
| `tailwind-merge` | ^3.4.0 | Tailwind CSS classes ko smartly merge karta hai. Agar do conflicting classes hain (jaise `p-4` aur `p-6`), toh last wala rakhta hai |
| `lucide-react` | ^0.563.0 | Icon library — SVG icons provide karta hai (is project me abhi directly use nahi hua, future ke liye rakha hai) |

### Dev Dependencies (`devDependencies`)

| Package | Kyun chahiye? |
|---|---|
| `tailwindcss` | **CSS framework** — utility classes jaise `flex`, `p-4`, `text-lg` deta hai so you don't write raw CSS |
| `@tailwindcss/postcss` | Tailwind v4 ka PostCSS plugin — build time pe CSS generate karta hai |
| `typescript` | **Type safety** — JavaScript me types add karta hai, bugs compile time pe pakadta hai |
| `@types/node`, `@types/react`, `@types/react-dom` | TypeScript ko Node.js aur React ke types batate hain |
| `eslint` + `eslint-config-next` | **Linter** — code quality check karta hai, bad patterns pakadta hai |

---

## 🗄️ Data Layer — Data Kahan Se Aata Hai?

### `src/data/technologies.ts` — The Single Source of Truth

Yeh file project ka **database** hai. Isme ek TypeScript `interface` aur ek `array` hai:

### `Technology` Interface — Ek Technology Ka Blueprint

```typescript
export interface Technology {
    slug: string;        // URL-friendly name, jaise "nodejs" ya "django"
    name: string;        // Display name, jaise "Node.js"
    description: string; // Poora description paragraph
    founded: number;     // Kab bani, jaise 2009
    creator: string;     // Kisne banaya, jaise "Ryan Dahl"
    category: "Runtime" | "Framework" | "Database" | "Library";
    language: string;    // Kaunsi language me likhi hai, jaise "JavaScript"
    useCases: string[];  // Kisko kahan use karta hai (array of strings)
    companies: string[]; // Kaunsi companies use karti hain
    logo: string;        // Emoji as mini logo, jaise "🟢"
    website: string;     // Official website URL
}
```

**Kyun interface zaroori hai?**
TypeScript me `interface` ek contract ki tarah hai. Yeh batata hai ki har technology object me **exactly** yeh fields hone chahiye, aur har field ka type kya hoga. Agar tum galti se `founded` me string daal do instead of number, toh TypeScript turant error dega. Isse bugs compile time pe hi pakad jaate hain, runtime pe nahi.

**`category` kyun union type hai?**
`"Runtime" | "Framework" | "Database" | "Library"` — yeh ek **union type** hai. Matlab category me sirf inhi 4 values me se koi ek aa sakti hai. Koi bhi random string allowed nahi hai. Isse data consistent rehta hai aur filtering/comparison me koi issue nahi aata.

### `technologies` Array — Actual Data

```typescript
export const technologies: Technology[] = [
    {
        slug: "nodejs",
        name: "Node.js",
        description: "Node.js is a cross-platform...",
        founded: 2009,
        creator: "Ryan Dahl",
        category: "Runtime",
        language: "JavaScript",
        useCases: ["Real-time applications", "REST APIs", ...],
        companies: ["Netflix", "LinkedIn", "Uber", ...],
        logo: "🟢",
        website: "https://nodejs.org",
    },
    // ... Django, FastAPI, PostgreSQL, Ruby on Rails, Spring Boot, Express.js, MongoDB
];
```

Is array me **8 technologies** hain:
1. **Node.js** (Runtime) — JavaScript server-side
2. **Django** (Framework) — Python ka batteries-included web framework
3. **FastAPI** (Framework) — Python ka modern, high-performance API framework
4. **PostgreSQL** (Database) — Powerful open-source relational database
5. **Ruby on Rails** (Framework) — Ruby ka Convention-over-Configuration framework
6. **Spring Boot** (Framework) — Java ka enterprise-grade framework
7. **Express.js** (Framework) — Node.js ka minimal web framework
8. **MongoDB** (Database) — NoSQL document database

**Kyun in-memory data? API kyun nahi?**
Is project me koi external API ya database nahi hai. Saara data ek TypeScript array me hai. Reason:
- **Speed** — koi network call nahi, instant load
- **SEO** — build time pe hi saare pages ban jaate hain (SSG)
- **Simplicity** — project ka focus SEO aur UI architecture pe hai, data fetching pe nahi
- Production me isko CMS ya database se replace kar sakte hain

---

## ⚙️ Service Layer — Data Access Functions

### `src/lib/techService.ts`

Yeh file **data layer aur pages ke beech ka bridge** hai. Direct data import karne ki jagah, yeh functions use hote hain — isse code clean rehta hai aur future me data source change karna easy hota hai.

#### `getAllTechnologies(): Technology[]`
```typescript
export function getAllTechnologies(): Technology[] {
    return technologies;
}
```
**Kya karta hai?** Saari technologies return karta hai.
**Kahan use hota hai?** Home page (`index.tsx`) pe saari technologies ki list dikhane ke liye.
**Kyun direct array import nahi karte?** Abstraction. Kal ko agar database se laana ho toh sirf yeh function change karna padega, har page nahi.

#### `getTechnologyBySlug(slug: string): Technology | undefined`
```typescript
export function getTechnologyBySlug(slug: string): Technology | undefined {
    return technologies.find((tech) => tech.slug === slug);
}
```
**Kya karta hai?** Slug (jaise `"nodejs"`) se ek specific technology dhundh ke return karta hai.
**Kahan use hota hai?** Detail page (`[slug].tsx`) pe — jab user `/technology/nodejs` pe jaata hai.
**Return type kyun `Technology | undefined`?** Agar koi galat slug diya (jaise `"angular"` jo exist nahi karta), toh `undefined` return hoga instead of crashing.

#### `getAllSlugs(): string[]`
```typescript
export function getAllSlugs(): string[] {
    return technologies.map((tech) => tech.slug);
}
```
**Kya karta hai?** Saare slugs ka array return karta hai: `["nodejs", "django", "fastapi", ...]`.
**Kahan use hota hai?** `getStaticPaths` me — Next.js ko batane ke liye ki kaunse-kaunse dynamic pages banane hain build time pe.

#### `getTechnologiesByCategory(category: string): Technology[]`
```typescript
export function getTechnologiesByCategory(category: string): Technology[] {
    return technologies.filter((tech) => tech.category === category);
}
```
**Kya karta hai?** Ek category (jaise `"Framework"`) ki saari technologies return karta hai.
**Kahan use hota hai?** Currently directly use nahi ho raha, but future me category filtering ke liye ready hai.

#### `compareTechnologies(slug1, slug2): { tech1, tech2 }`
```typescript
export function compareTechnologies(slug1: string, slug2: string): {
    tech1: Technology | null;
    tech2: Technology | null;
} {
    return {
        tech1: getTechnologyBySlug(slug1) ?? null,
        tech2: getTechnologyBySlug(slug2) ?? null,
    };
}
```
**Kya karta hai?** Do slugs leke dono technologies return karta hai. Agar koi nahi mili toh `null`.
**Kahan use hota hai?** Compare page (`compare.tsx`) me.
**`?? null` kyun?** `getTechnologyBySlug` `undefined` return kar sakta hai, but compare page ko `null` chahiye (kyunki `undefined` ko Next.js serialize nahi kar sakta props me).

#### `getRelatedTechnologies(slug, category): Technology[]`
```typescript
export function getRelatedTechnologies(slug: string, category: string): Technology[] {
    return technologies.filter(
        (tech) => tech.category === category && tech.slug !== slug
    );
}
```
**Kya karta hai?** Same category ki doosri technologies return karta hai (current technology ko exclude karke).
**Kahan use hota hai?** Detail page pe "Related Technologies" section me.
**Example:** Agar tum Node.js (Runtime) ka page dekh rahe ho, toh yeh... wait, Runtime me sirf Node.js hai, toh empty aayega. But Django (Framework) pe yeh FastAPI, Rails, Spring Boot, Express.js dikhayega.

### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

**Yeh ek choti si but BOHOT important function hai.** Yeh shadcn/ui ka standard helper hai.

**Kya karta hai step by step:**
1. `clsx(inputs)` — Saari CSS classes ko merge karta hai, conditional classes handle karta hai. Jaise `clsx("p-4", isActive && "bg-blue-500")` → agar `isActive` true hai toh `"p-4 bg-blue-500"`, warna `"p-4"`.
2. `twMerge(...)` — Tailwind-specific conflicts resolve karta hai. Jaise agar `"p-4 p-6"` hai toh `"p-6"` rakhega (last wala wins), koi duplicate nahi.

**Kahan use hota hai?** Har ek UI component (`Card`, `Button`, `Badge`, `Separator`) me — taaki tum component ke default classes ke saath apne custom classes bhi pass kar sako bina conflict ke.

---

## 🧩 Components — Reusable UI Parts

### `src/components/Header.tsx` — Top Navigation Bar

```tsx
export default function Header() { ... }
```

**Kya karta hai?**
Har page ke top pe ek sticky navigation bar render karta hai jisme:
- **Logo + Title** — "🔍 Tech Stack Explorer" (home pe link karta hai)
- **Nav Links** — "Home" aur "Compare"

**Design decisions:**
- `sticky top-0 z-50` — Scroll karne pe bhi top pe chipak ke rehta hai (sticky position)
- `backdrop-blur-lg` — Background blur effect jisse niche ka content thoda dhundla dikhe through the header (glassmorphism effect)
- `bg-background/80` — 80% opacity ki background, blur ke saath milke frosted glass effect deta hai

**Kyun ek separate component?**
Kyunki yeh har page pe dikhna chahiye. Isko `_app.tsx` me ek baar daala hai, toh automatically saare pages pe show hoga. Agar inline likhte har page me, toh code duplication hoti.

---

### `src/components/SEO.tsx` — Search Engine Optimization Tags

```tsx
interface SEOProps {
    title: string;          // Page ka title (browser tab me dikhta hai)
    description: string;    // Page ka description (Google snippet me dikhta hai)
    ogType?: string;        // OpenGraph type — "website" ya "article"
    canonicalPath?: string; // Is page ka canonical URL path
}
```

**Kya karta hai?**
Har page ke `<head>` section me SEO meta tags inject karta hai:

1. **`<title>`** — Browser tab me dikhne wala text. Google bhi isko heading banata hai search results me.
2. **`<meta name="description">`** — Google search results me page ke niche jo 1-2 line description dikhta hai.
3. **`<link rel="canonical">`** — Google ko batata hai ki is page ka "official" URL kya hai. Isse duplicate content issues nahi hote.
4. **OpenGraph tags** (`og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`) — Jab koi is page ka link Facebook, LinkedIn, ya WhatsApp pe share karta hai, toh ye tags batate hain ki preview me kya dikhana hai.
5. **Twitter card tags** — Twitter pe share karne pe kya dikhega.

**`SITE_URL` constant kyun hai?**
```typescript
const SITE_URL = "https://techstackexplorer.com";
```
Canonical URL aur OG URL ke liye full URL chahiye hoti hai. Yeh constant ek jagah define hai taaki change karna easy ho.

**`ogType` me default value `"website"` kyun?**
- Home page = "website"
- Technology detail pages = "article" (kyunki woh individual content pieces hain)

**Kahan use hota hai?** Har page component me — `index.tsx`, `compare.tsx`, `[slug].tsx`.

---

### `src/components/JsonLd.tsx` — Structured Data for Google

```tsx
interface JsonLdProps {
    technology: Technology;
}
```

**Kya karta hai?**
Google ke liye **JSON-LD structured data** inject karta hai page ke `<head>` me.

**JSON-LD kya hota hai? (Simple explanation)**
Socho tum Google ho aur tum ek web page padh rahe ho. Tum dekho likha hai "Node.js" — but tumhe kaise pata ki yeh ek software hai, ek company hai, ya ek insaan ka naam? JSON-LD Google ko ek **machine-readable format** me clear taur pe batata hai ki:
- Yeh ek `SoftwareApplication` hai
- Iska naam "Node.js" hai
- Isko "Ryan Dahl" ne banaya hai
- Free hai (price: $0)
- 2009 me bana tha

Isse Google **rich search results** dikha sakta hai — jaise rating stars, price, author info directly search results me.

**Actual data structure:**
```json
{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Node.js",
    "description": "...",
    "url": "https://nodejs.org",
    "applicationCategory": "Runtime",
    "datePublished": "2009-01-01",
    "author": { "@type": "Person", "name": "Ryan Dahl" },
    "operatingSystem": "Cross-platform",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

**`dangerouslySetInnerHTML` kyun use ho raha hai?**
React me tum directly `<script>` tag ke andar JSON nahi daal sakte. `dangerouslySetInnerHTML` React ko batata hai ki "bhai trust kar, yeh HTML mujhe directly inject karne de." Yahan safe hai kyunki data humara apna hai (user input nahi), toh XSS ka koi risk nahi.

**Kahan use hota hai?** Sirf technology detail page (`[slug].tsx`) pe — kyunki structured data individual technology ke baare me hoti hai.

---

### `src/components/TechnologyCard.tsx` — Technology Preview Card

```tsx
interface TechnologyCardProps {
    technology: Technology;
}
```

**Kya karta hai?**
Home page ki grid me har technology ka ek clickable card render karta hai jisme dikhta hai:
- Emoji logo (🟢, 🐍, ⚡, etc.)
- Category badge ("Runtime", "Framework", etc.)
- Technology name
- Language + founding year
- Short description (max 3 lines, truncated)
- "Learn more →" link

**Design decisions:**
- `line-clamp-3` — Description ko max 3 lines tak dikhaata hai, baaki `...` se cut hota hai
- `hover:-translate-y-1` — Hover pe card thoda upar uthta hai (lift effect)
- `hover:shadow-lg` — Hover pe shadow badh jaata hai (depth effect)
- `group` + `group-hover:text-primary` — Jab poore card pe hover karo, toh title ka color change ho. `group` Tailwind ka feature hai jisse parent hover pe child ka style change kar sakte ho

**Pura card ek `<Link>` ke andar kyun hai?**
Taaki user card ke kisi bhi part pe click kare, toh detail page pe jaaye. Sirf "Learn more" pe nahi, poore card pe clickable hai.

---

## 🧱 UI Primitives — Design System Components (`src/components/ui/`)

Yeh components **shadcn/ui** se inspired hain. Shadcn/ui ek popular approach hai jisme UI components directly tumhare code me hote hain (npm package nahi), so tum puri control rakh sako design pe.

### 🃏 `card.tsx` — Card Component System

Yeh ek nahi, **6 sub-components** export karta hai:

| Component | Kya karta hai? |
|---|---|
| `Card` | Outer container — rounded border, shadow, background |
| `CardHeader` | Top section — title aur meta info ke liye |
| `CardTitle` | Title text — bold, tracked |
| `CardDescription` | Subtitle/description — muted color, small text |
| `CardContent` | Main body area |
| `CardFooter` | Bottom section — actions/links ke liye |

**`React.forwardRef` kyun use ho raha hai?**
Yeh React ka ek advanced pattern hai. Normally jab tum ek custom component banate ho, toh uske andar ke actual DOM element ka `ref` access nahi hota parent se. `forwardRef` se tum ref ko "forward" kar sakte ho through the component directly inner `<div>` tak. Yeh zaroori hai:
- Animations libraries (Framer Motion) ke saath
- Focus management ke liye
- Third-party libraries jo DOM element chahti hain

**`cn()` function har component me kyun call ho raha hai?**
Taaki tum component ke default classes ke saath **apne custom classes bhi add** kar sako:
```tsx
// Default: "rounded-xl border border-border bg-card..."
// Custom: "mb-8" add karo
<Card className="mb-8" />
// Result: "rounded-xl border border-border bg-card... mb-8"
```

**`displayName` kyun set karna padta hai?**
`React.forwardRef` use karne pe React DevTools me component ka naam "ForwardRef" dikhaega instead of "Card". `displayName` explicitly naam set karta hai debugging ke liye.

---

### 🏷️ `badge.tsx` — Badge/Label Component

**Kya hai?** Choti si colored pill-shaped label. Jaise category dikhana ho ("Framework"), language ("Python"), ya company name.

**CVA (class-variance-authority) kaise kaam karta hai?**
```typescript
const badgeVariants = cva(
    "base-classes-jo-har-badge-pe-lagegi",  // Common styles
    {
        variants: {
            variant: {
                default: "primary color styles",
                secondary: "grey/subtle styles",
                destructive: "red/danger styles",
                outline: "sirf border, no fill",
            },
        },
        defaultVariants: {
            variant: "default",  // Agar kuch specify nahi kiya toh yeh use hoga
        },
    }
);
```

**Usage example:**
```tsx
<Badge>Default</Badge>                    // Primary color, filled
<Badge variant="secondary">Category</Badge>  // Grey, subtle
<Badge variant="outline">Language</Badge>     // Sirf border
```

**`BadgeProps` interface:**
```typescript
export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,  // Saare standard div props (onClick, className, etc.)
    VariantProps<typeof badgeVariants> {}           // Plus variant prop from CVA
```
Yeh pattern **intersection type** hai — dono types ke props merge ho jaate hain ek interface me.

---

### 🔘 `button.tsx` — Button Component

Badge jaisa hi pattern, but zyada variants:

**Variant options (button ka look):**
| Variant | Visual | Kab use karte hain? |
|---|---|---|
| `default` | Solid primary color | Primary actions ("Compare Technologies →") |
| `destructive` | Solid red | Dangerous actions ("Delete") |
| `outline` | Border only, no fill | Secondary actions ("Learn more about Node.js →") |
| `secondary` | Grey/subtle fill | Less important actions |
| `ghost` | No border, no fill, hover pe dikhta hai | Minimal actions ("Node.js vs Django") |
| `link` | Underlined text, no button look | Text links styled as buttons |

**Size options (button ka size):**
| Size | Dimensions | Kab? |
|---|---|---|
| `default` | `h-9 px-4` | Normal buttons |
| `sm` | `h-8 px-3 text-xs` | Small buttons (compare suggestions) |
| `lg` | `h-10 px-8` | Large CTA ("Compare Technologies →") |
| `icon` | `h-9 w-9` (square) | Icon-only buttons |

---

### ➖ `separator.tsx` — Divider Line

**Kya hai?** Ek simple horizontal (ya vertical) line jo sections ke beech visual separation deti hai.

**Props:**
- `orientation` — `"horizontal"` (default) ya `"vertical"`
- `decorative` — `true` (default): visually decorative hai, screen readers ignore karenge. `false`: semantically meaningful separator hai.

**Kahan use hota hai?** Har page pe sections ke beech — jaise Home page pe hero section ke baad, technology list ke baad, etc.

---

## 📄 Pages — Saare Web Pages Ka Detail

### `src/pages/_app.tsx` — The App Wrapper (Special File)

```tsx
export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
            <Header />
            <main className="flex-1">
                <Component {...pageProps} />
            </main>
        </div>
    );
}
```

**Yeh kya hai?**
Next.js me `_app.tsx` ek **special file** hai. Yeh har page ke around wrapper ki tarah kaam karta hai. Jab bhi koi bhi page load hota hai, pehle `_app.tsx` run hota hai aur actual page content `<Component />` ke through andar aata hai.

**Kyun zaroori hai?**
1. **Layout consistency** — `<Header />` sirf yahan ek baar daala hai, toh saare pages pe automatically show hoga. Har page me alag se Header import nahi karna padta.
2. **Font loading** — Inter font Google Fonts se load hota hai aur `--font-inter` CSS variable set hota hai. Yeh variable se pura app consistent font use karta hai.
3. **Flex layout** — `min-h-screen flex flex-col` se page minimum full screen height ka hoga, aur `<main className="flex-1">` se content area pura remaining space fill karega (future me footer add karne pe useful).

**`Inter` font setup kaise kaam karta hai?**
```typescript
const inter = Inter({
    subsets: ["latin"],      // Sirf Latin characters load karo (size optimization)
    variable: "--font-inter", // CSS variable name
});
```
- `subsets: ["latin"]` — Poori font file nahi, sirf Latin characters download hogi (performance)
- `variable: "--font-inter"` — Ek CSS custom property create hogi jo Tailwind ke `font-sans` class me use hogi

---

### `src/pages/_document.tsx` — HTML Document Shell (Special File)

```tsx
export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
```

**Yeh kya hai?**
Yeh Next.js ki doosri special file hai. `_app.tsx` React level pe kaam karta hai, but `_document.tsx` **actual HTML document** (`<html>`, `<head>`, `<body>`) ko customize karta hai.

**Yahan kya specific changes hain?**
1. `lang="en"` — HTML element pe language attribute set karta hai. SEO aur accessibility ke liye CRITICAL hai. Screen readers ko pata chalta hai ki content English me hai.
2. `antialiased` — Font rendering smooth karti hai. Bina iske text thoda pixelated/rough dikhta hai.

**`_app.tsx` vs `_document.tsx` — Difference kya hai?**
| | `_app.tsx` | `_document.tsx` |
|---|---|---|
| **Level** | React application | Raw HTML document |
| **Runs** | Client + Server | Server only |
| **Purpose** | Layout, state, providers | `<html>`, `<body>` attributes |
| **Hooks allowed?** | Yes (`useState`, etc.) | No (server-only) |

---

### `src/pages/index.tsx` — Home Page

**URL:** `/`

**Data Fetching — `getStaticProps` (SSG)**
```typescript
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const technologies = getAllTechnologies();
    return { props: { technologies } };
};
```

**SSG (Static Site Generation) kya hai?**
`getStaticProps` Next.js ko bolta hai: "Bhai jab `npm run build` chale, tab yeh function ek baar run kar aur result ko HTML file me bake kar de." Ab jab koi user yeh page visit karega, toh koi server processing nahi hogi — seedha ready-made HTML serve hogi CDN se. **Blazing fast!**

**Kyun SSG use kiya yahan?**
- Technology data fixed hai (in-memory array) — change nahi hota har request pe
- SEO ke liye best — Google ko fully rendered HTML milta hai
- **Zero server cost** per request — static file serve hoti hai

**Interface:**
```typescript
interface HomeProps {
    technologies: Technology[];
}
```
Yeh batata hai ki Home page component ko props me `technologies` array milega. `GetStaticProps<HomeProps>` se Next.js ko pata chalta hai ki `getStaticProps` ka return type kya hoga, aur component ko `InferGetStaticPropsType<typeof getStaticProps>` se automatically correct types mil jaate hain.

**Page structure:**
1. **SEO Component** — Title + description set karta hai
2. **Hero Section** — Big title "Tech Stack Explorer" + subtitle + CTA button
3. **Separator** — Visual divider line
4. **Technology Grid** — 3-column responsive grid me saare `TechnologyCard` components
5. **Quick Links** — Text links to all technology detail pages (SEO ke liye extra internal links)

---

### `src/pages/technology/[slug].tsx` — Technology Detail Page (Dynamic Route)

**URL Pattern:** `/technology/nodejs`, `/technology/django`, etc.

**Dynamic Route kya hai?**
`[slug]` square brackets me ho toh Next.js isko **dynamic route** maanta hai. Matlab yeh ek file 8 alag-alag pages generate karegi (ek har technology ke liye). `slug` ki value URL se aati hai.

**Data Fetching — `getStaticPaths` + `getStaticProps` (SSG)**

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllSlugs(); // ["nodejs", "django", "fastapi", ...]
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
};
```

**`getStaticPaths` ka kaam:**
Dynamic routes me Next.js ko build time pe batana padta hai ki kaunse-kaunse possible paths hain. Yeh function bolega:
- `/technology/nodejs` banao ✓
- `/technology/django` banao ✓
- ... 8 pages total

**`fallback: false` matlab?**
Agar koi `/technology/angular` jaaye (jo humne define nahi kiya), toh **404 page** dikhega. Koi fallback rendering nahi hogi.

```typescript
export const getStaticProps: GetStaticProps<TechnologyPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const technology = getTechnologyBySlug(slug);
    if (!technology) return { notFound: true };
    const relatedTechnologies = getRelatedTechnologies(slug, technology.category);
    const allTechnologies = getAllTechnologies();
    return { props: { technology, relatedTechnologies, allTechnologies } };
};
```

**Har page ke liye:**
1. Slug se technology dhoondho
2. Agar nahi mili → 404
3. Same category ki related technologies nikalo
4. Saari technologies nikalo (compare CTA ke liye)

**Interface:**
```typescript
interface TechnologyPageProps {
    technology: Technology;           // Main technology ka data
    relatedTechnologies: Technology[]; // Same category ki doosri technologies
    allTechnologies: Technology[];     // Saari technologies (compare buttons ke liye)
}
```

**Page sections:**
1. **SEO** — Dynamic title jaise "Node.js — Overview, Use Cases & Companies | Tech Stack Explorer"
2. **JSON-LD** — Google structured data
3. **Breadcrumb** — "Home / Node.js" navigation trail
4. **Header** — Logo emoji + name + category badge + language badge + founded year + creator
5. **Overview** — Full description + official website link
6. **Use Cases** — 2-column grid of use case cards
7. **Companies** — Badges showing companies using this tech
8. **Quick Info** — 4-column stat grid (category, language, founded, use case count)
9. **Related Technologies** — Cards linking to same-category technologies (internal linking!)
10. **Compare CTA** — Buttons like "Node.js vs Django", "Node.js vs FastAPI" etc.

**Internal linking kyun important hai SEO ke liye?**
Google ka crawler (Googlebot) links follow karke hi naye pages discover karta hai. Jitne zyada internal links, utna crawler ko easy hota hai saare pages crawl karna. Related technologies section + compare CTAs + quick links — sab SEO ke liye hain.

---

### `src/pages/compare.tsx` — Technology Comparison Page

**URL:** `/compare?tech1=nodejs&tech2=django`

**Data Fetching — `getServerSideProps` (SSR)**
```typescript
export const getServerSideProps: GetServerSideProps<ComparePageProps> = async ({ query }) => {
    const slug1 = (query.tech1 as string) || "";
    const slug2 = (query.tech2 as string) || "";
    const { tech1, tech2 } = compareTechnologies(slug1, slug2);
    const allTechnologies = getAllTechnologies();
    return { props: { tech1, tech2, allTechnologies } };
};
```

**SSR (Server-Side Rendering) kyun? SSG kyun nahi?**
Compare page pe **query parameters** se data aata hai (`?tech1=nodejs&tech2=django`). Query params infinite combinations ho sakti hain, toh har possible combination ke liye static page banana feasible nahi. Isliye SSR — har request pe server pe fresh render hota hai.

**Note:** Technically 8 technologies se sirf 28 unique combinations banti hain (8 choose 2), toh SSG bhi possible tha. But query-parameter-based routing ke saath SSR zyada natural hai.

**Interface:**
```typescript
interface ComparePageProps {
    tech1: Technology | null;   // Pehli technology (null agar invalid slug)
    tech2: Technology | null;   // Doosri technology (null agar invalid slug)
    allTechnologies: Technology[]; // Dropdown me dikhane ke liye
}
```

**`null` kyun aur `undefined` kyun nahi?**
Next.js `getServerSideProps` me `undefined` values serialize nahi hoti (JSON me `undefined` nahi hota). Isliye explicitly `null` use karna padta hai.

**Sub-Components (Compare page ke andar hi defined):**

#### `CompareRow` — Comparison Table Ki Ek Row
```tsx
function CompareRow({ label, value1, value2 }: {
    label: string;
    value1: React.ReactNode;
    value2: React.ReactNode;
}) { ... }
```
Ek comparison table header ke liye reusable row component. `React.ReactNode` type accept karta hai — matlab value me plain text bhi ho sakta hai, aur JSX bhi (jaise Badge components ya lists).

#### `TechnologySelector` — Interactive Dropdown
```tsx
function TechnologySelector({
    allTechnologies,
    initialTech1,
    initialTech2,
}: { ... }) { ... }
```

Yeh ek **interactive client-side component** hai jisme:
- Do `<select>` dropdowns hain (technology 1 aur technology 2 choose karne ke liye)
- `useState` se selected values track hoti hain
- "Compare" button pe `router.push()` se new URL pe navigate hota hai
- Validation: same technology dono me select nahi kar sakte

**`useState` yahan kyun use ho raha hai?**
Dropdown selection ek **client-side state** hai. Jab tak user "Compare" button nahi dabata, tab tak server ko kuch nahi bhejna. `useState` React se component ke andar hi state manage hoti hai.

**`useRouter` kya karta hai?**
Next.js ka router hook hai. `router.push(url)` se programmatically navigate kar sakte ho without full page reload.

**Main Compare page flow:**
1. Check: kya dono technologies valid hain? (`isValid = tech1 && tech2`)
2. **Valid hai toh:**
   - Summary cards show karo (logo + name + category + language)
   - Detailed comparison table (category, language, founded, creator, use cases, companies)
   - "Learn more" buttons dono technologies ke liye
   - "Try Other Comparisons" section
3. **Valid nahi hai toh:**
   - Popular comparisons suggest karo (jaise "Node.js vs Django", "FastAPI vs Express.js")

---

### `src/pages/api/hello.ts` — Sample API Route

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    res.status(200).json({ name: "John Doe" });
}
```

**Kya hai?** Next.js ka default API route example hai. Yeh project me actually kaam nahi aa raha — sirf boilerplate hai.

**Kaise kaam karta hai?**
- `pages/api/` folder me jo bhi file hoti hai, woh ek serverless API endpoint ban jaati hai
- `/api/hello` pe GET request bhejo toh response aayega: `{ "name": "John Doe" }`
- `NextApiRequest` aur `NextApiResponse` types Next.js provide karta hai HTTP request aur response handle karne ke liye

**`type Data` kyun define kiya?**
`NextApiResponse<Data>` se TypeScript ko pata chalta hai ki response me sirf `{ name: string }` format ka data bhej sakte hain. Agar tum `{ age: 25 }` bhejo, toh compile error aayega.

---

## 🎨 Styles — `src/styles/globals.css`

Yeh file Tailwind CSS v4 import karti hai aur global styles define karti hai. Tailwind Utility-first CSS framework hai — tum directly HTML me `className="flex p-4 text-lg"` likh ke style karte ho instead of separate CSS files me classes banake.

**Key CSS token categories used in the project:**
- **Layout**: `flex`, `grid`, `grid-cols-3`, `gap-4`, `mx-auto`, `px-4`
- **Spacing**: `p-4`, `mb-8`, `py-12`, `space-y-1`
- **Typography**: `text-lg`, `font-bold`, `tracking-tight`, `leading-relaxed`
- **Colors**: `text-primary`, `bg-background`, `text-muted-foreground`, `border-border`
- **Effects**: `shadow-sm`, `hover:shadow-lg`, `backdrop-blur-lg`, `transition-colors`
- **Responsive**: `sm:grid-cols-2`, `lg:grid-cols-3`, `sm:text-5xl`

---

## ⚙️ Configuration Files

### `tsconfig.json`
TypeScript compiler configuration. Key settings:
- **Path alias**: `@/*` → `src/*` (so `import Header from "@/components/Header"` works instead of `"../../components/Header"`)
- **Strict mode**: Enabled — catches more bugs at compile time

### `next.config.ts`
Next.js configuration. Currently minimal/default settings.

### `postcss.config.mjs`
PostCSS plugins — includes `@tailwindcss/postcss` for Tailwind v4 processing.

### `eslint.config.mjs`
ESLint rules — uses `eslint-config-next` for Next.js-specific linting rules.

---

## 🔁 Data Flow — Pura Flow Kaise Kaam Karta Hai?

```
technologies.ts (data) 
    ↓
techService.ts (functions to query data)
    ↓
getStaticProps / getServerSideProps (Next.js data fetching)
    ↓
Page Component (receives data as props)
    ↓
Child Components (TechnologyCard, SEO, JsonLd, etc.)
    ↓
UI Components (Card, Badge, Button, Separator)
    ↓
Rendered HTML (user ko dikhta hai)
```

**Step by step example — User `/technology/nodejs` visit karta hai:**

1. **Build time pe** `getStaticPaths` run hota hai → `["nodejs", "django", ...]` slugs return
2. Har slug ke liye `getStaticProps` run hota hai
3. `getStaticProps` call karta hai `getTechnologyBySlug("nodejs")` → Node.js data milta hai
4. `getRelatedTechnologies("nodejs", "Runtime")` → same category ki doosri technologies
5. Yeh saara data `TechnologyPage` component ko props me jaata hai
6. Component render karta hai: `SEO` (meta tags) + `JsonLd` (structured data) + content sections
7. Content sections me `Card`, `Badge`, `Button`, `Separator` UI components use hote hain
8. Final HTML static file ke roop me save hoti hai
9. User visit karta hai → CDN se instant serve hoti hai

---

## 🏗️ Architecture Patterns

### 1. Separation of Concerns
- **Data** (`technologies.ts`) — pure data, no logic
- **Service** (`techService.ts`) — data access logic, no UI
- **Components** — UI rendering, no data fetching
- **Pages** — data fetching + composition of components

### 2. Composition Pattern
Small UI primitives (Card, Badge, Button) se bade components (TechnologyCard) bante hain, aur unse pages bante hain. Like LEGO blocks.

### 3. Props-based Data Flow
Data always top-down flow karta hai: Page → Component → UI Primitive. Koi component apna data khud fetch nahi karta (except `TechnologySelector` jo client-side state manage karta hai).

### 4. SEO-First Architecture
- Har page pe `<SEO />` component
- Detail pages pe `<JsonLd />` structured data
- Internal links everywhere (related technologies, compare buttons, quick links)
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<h1>`→`<h2>` hierarchy)
- Canonical URLs for duplicate prevention
- SSG for instant page loads

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

**Development server** `http://localhost:3000` pe chalega.

---

## 📝 Summary Table — Saari Files Ek Nazar Me

| File | Type | Purpose |
|---|---|---|
| `technologies.ts` | Data | Technology data + TypeScript interface |
| `techService.ts` | Service | Data query functions |
| `utils.ts` | Utility | CSS class merging helper |
| `_app.tsx` | Layout | App wrapper, font, header |
| `_document.tsx` | Config | HTML document structure |
| `index.tsx` | Page | Home — technology grid |
| `[slug].tsx` | Page | Technology detail |
| `compare.tsx` | Page | Side-by-side comparison |
| `api/hello.ts` | API | Sample endpoint (unused) |
| `Header.tsx` | Component | Navigation bar |
| `SEO.tsx` | Component | Meta tags for SEO |
| `JsonLd.tsx` | Component | Structured data for Google |
| `TechnologyCard.tsx` | Component | Technology preview card |
| `card.tsx` | UI | Card container primitives |
| `badge.tsx` | UI | Label/tag component |
| `button.tsx` | UI | Button component with variants |
| `separator.tsx` | UI | Divider line component |

---

## ✅ Assessment Requirements — Kaise Fulfill Ho Rahe Hain?

Niche har assessment task ka detail hai ki project me **exactly kahan aur kaise** fulfill ho raha hai. Har point ke saath specific file/component ka reference diya hai.

---

### 1. ✅ Project Setup — Next.js with SSR/SSG

> **Requirement:** "Set up the project using Next.js to enable server-side rendering (SSR) for SEO optimization. Organize your project with appropriate folder structures."

| Requirement | Fulfilled? | Kahan/Kaise? |
|---|---|---|
| Next.js project setup | ✅ Yes | `package.json` me `next@16.1.6` as dependency. `npm run dev` se development server chalta hai |
| SSR configured | ✅ Yes | `compare.tsx` me `getServerSideProps` use ho raha hai — har request pe server pe render hota hai |
| SSG configured | ✅ Yes | `index.tsx` me `getStaticProps` aur `[slug].tsx` me `getStaticPaths` + `getStaticProps` — build time pe pages generate hote hain |
| Proper folder structure | ✅ Yes | `src/components/`, `src/pages/`, `src/data/`, `src/lib/`, `src/styles/` — clean separation of concerns |
| Components organized | ✅ Yes | Business components (`Header`, `SEO`, `JsonLd`, `TechnologyCard`) alag hain aur UI primitives (`ui/card`, `ui/badge`, `ui/button`, `ui/separator`) alag sub-folder me hain |

**Evidence:**
- SSR: `src/pages/compare.tsx` → `getServerSideProps` line 27-43
- SSG: `src/pages/index.tsx` → `getStaticProps` line 14-22
- SSG Dynamic: `src/pages/technology/[slug].tsx` → `getStaticPaths` line 52-59 + `getStaticProps` line 61-85

---

### 2. ✅ Data Selection — Backend Technologies

> **Requirement:** "Research and choose a type of data. Provide explanation, find source, describe structure."

| Requirement | Fulfilled? | Kahan/Kaise? |
|---|---|---|
| Data type chosen | ✅ Yes | **Backend Technologies** (runtimes, frameworks, databases) — tech industry ka trending topic |
| Data source described | ✅ Yes | In-memory TypeScript array in `src/data/technologies.ts` — curated dataset of 8 popular technologies |
| Data structure described | ✅ Yes | `Technology` interface (line 13-36) me 11 typed fields hain: `slug`, `name`, `description`, `founded`, `creator`, `category`, `language`, `useCases`, `companies`, `logo`, `website` |
| Dynamic page generation | ✅ Yes | 8 individual technology pages + 1 home page + compare pages, sab data-driven |

**Kyun yeh data choose kiya?**
- **High search volume** — "Node.js vs Django", "best backend framework" jaise queries Google pe lakho baar search hoti hain
- **Comparison potential** — Technologies ko naturally compare kiya ja sakta hai (framework vs framework, database vs database)
- **Structured format** — Har technology ke same fields hain (name, category, use cases, companies), toh programmatic pages banana easy hai
- **Evergreen content** — Technology info baar baar change nahi hoti, toh SSG perfect fit hai

---

### 3. ✅ SEO Optimization & Keyword Research

> **Requirement:** "Conduct keyword research. Implement meta tags, titles, descriptions, OpenGraph tags."

| Requirement | Fulfilled? | Kahan/Kaise? |
|---|---|---|
| SEO-friendly titles | ✅ Yes | `SEO.tsx` component har page pe dynamic `<title>` set karta hai. Example: `"Node.js — Overview, Use Cases & Companies | Tech Stack Explorer"` |
| Meta descriptions | ✅ Yes | `SEO.tsx` me `<meta name="description">` tag with dynamic content per page |
| OpenGraph tags | ✅ Yes | `SEO.tsx` me `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name` — 5 OG tags per page |
| Twitter Card tags | ✅ Yes | `SEO.tsx` me `twitter:card`, `twitter:title`, `twitter:description` |
| Canonical URLs | ✅ Yes | `SEO.tsx` me `<link rel="canonical">` with full URL path — duplicate content prevention |
| Keyword-optimized content | ✅ Yes | Page titles me target keywords hain: "backend technologies", "compare", technology names |
| Proper heading hierarchy | ✅ Yes | Har page me ek `<h1>` + multiple `<h2>` — correct heading structure for SEO |
| Semantic HTML | ✅ Yes | `<header>`, `<nav>`, `<main>`, `<section>` tags use ho rahe hain throughout pages |
| `lang` attribute | ✅ Yes | `_document.tsx` me `<Html lang="en">` — accessibility + SEO signal |

**Keyword strategy jo apply hua:**
- **Technology name pages:** Target keywords = `"[tech name] overview"`, `"[tech name] use cases"`, `"companies using [tech name]"`
- **Compare pages:** Target keywords = `"[tech1] vs [tech2]"`, `"[tech1] vs [tech2] comparison"`
- **Home page:** Target keywords = `"backend technologies"`, `"compare backend technologies"`, `"tech stack explorer"`

**Evidence files:**
- `src/components/SEO.tsx` — All meta tag implementation
- `src/pages/technology/[slug].tsx` line 95-100 — Dynamic SEO per technology
- `src/pages/compare.tsx` line 153-159 — Dynamic SEO for comparisons
- `src/pages/_document.tsx` line 12 — `lang="en"`

---

### 4. ✅ Building Programmatic SEO Pages with SSR

> **Requirement:** "Use getServerSideProps. Generate at least 3 SEO pages. Include JSON-LD, OpenGraph, dynamic titles."

| Requirement | Fulfilled? | Kahan/Kaise? |
|---|---|---|
| `getServerSideProps` used | ✅ Yes | `compare.tsx` line 27-43 — server-side rendering on every request |
| At least 3 SEO pages | ✅ Yes | **10+ pages generated:** 1 home page + 8 technology detail pages + compare pages (dynamic) |
| Dynamic title tags | ✅ Yes | Har page pe unique title — `SEO.tsx` se inject hota hai |
| Dynamic description tags | ✅ Yes | Har page pe unique meta description — data-driven |
| JSON-LD schema | ✅ Yes | `JsonLd.tsx` — `schema.org/SoftwareApplication` structured data har technology detail page pe |
| OpenGraph metadata | ✅ Yes | `SEO.tsx` me 5 OpenGraph tags (title, description, type, url, site_name) |
| Proper indexing | ✅ Yes | Canonical URLs + semantic HTML + proper heading hierarchy ensures correct indexing |

**Programmatic SEO kaise kaam kar raha hai?**

Ek `technologies.ts` data file se **automatically** 8+ unique pages generate hote hain — bina manually har page ka HTML likhein:

```
technologies.ts (8 entries)
    ↓ getStaticPaths → 8 slugs
    ↓ getStaticProps → 8 pages rendered with unique content
    ↓ Each page gets: unique title, description, JSON-LD, OG tags
```

Yahi **programmatic SEO** hai — ek template, multiple data entries, dozens of optimized pages.

**Total SEO-optimized pages:**
| Page | Count | Rendering |
|---|---|---|
| Home | 1 | SSG (`getStaticProps`) |
| Technology Details | 8 | SSG (`getStaticPaths` + `getStaticProps`) |
| Compare | Dynamic (28 possible) | SSR (`getServerSideProps`) |
| **Total** | **9+ static, unlimited dynamic** | |

---

### 5. ✅ Design and UI/UX

> **Requirement:** "Clean, visually appealing UI. Responsive, mobile-friendly. Client-side features like filtering."

| Requirement | Fulfilled? | Kahan/Kaise? |
|---|---|---|
| Clean modern UI | ✅ Yes | Tailwind CSS v4 + shadcn/ui inspired components. Inter font, consistent spacing, card-based layout |
| Responsive design | ✅ Yes | `sm:`, `lg:` breakpoints throughout — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Mobile-friendly | ✅ Yes | Mobile-first design, responsive grids, proper touch targets, flexible containers (`max-w-4xl mx-auto px-4 sm:px-6`) |
| Accessibility | ✅ Yes | `role="img"` + `aria-label` on emojis, `aria-label` on selects, semantic HTML, `lang="en"`, proper heading hierarchy |
| Client-side interactivity | ✅ Yes | `TechnologySelector` component me dropdown filtering — users do technologies select karke compare kar sakte hain |
| Visual appeal | ✅ Yes | Glassmorphism header (`backdrop-blur-lg`), hover animations (`hover:-translate-y-1`), smooth transitions, card shadows |
| Cards for data display | ✅ Yes | `TechnologyCard.tsx` home page pe, `Card` components throughout detail + compare pages |

**Responsive breakpoints used:**
- **Mobile** (default): Single column grid, stacked layout
- **`sm:` (640px+)**: 2-column grids, side-by-side layouts
- **`lg:` (1024px+)**: 3-column technology card grid

**Client-side feature — Technology Selector:**
`compare.tsx` ke andar `TechnologySelector` component:
- `useState` se 2 dropdown selections track hoti hain
- Same technology validation (dono me ek hi nahi select kar sakte)
- `useRouter` se dynamic URL navigation
- Full keyboard accessible (`<select>` elements)

---

### 6. ⏳ Deployment

> **Requirement:** "Deploy on Vercel, Netlify, or similar. Provide live URL."

| Requirement | Status | Notes |
|---|---|---|
| Deployment ready | ✅ Yes | `npm run build` se production build ban jaata hai. Vercel pe deploy karna one-click hai (Next.js + Vercel = native integration) |
| Live URL | ⏳ Pending | Vercel pe deploy karna baaki hai — GitHub repo connect karo aur auto-deploy hoga |

**Vercel pe deploy kaise karein:**
1. [vercel.com](https://vercel.com) pe sign up karo (GitHub se)
2. "Import Project" → GitHub repo select karo
3. Vercel automatically detect karega ki Next.js project hai
4. "Deploy" click karo — 2-3 minute me live hoga
5. Live URL mil jaayega (jaise `tech-stack-explorer.vercel.app`)

---

### 7. ⏳ Testing and Debugging

> **Requirement:** "Test SSR rendering. Use Lighthouse for SEO score. Debug issues."

| Requirement | Status | Notes |
|---|---|---|
| SSR rendering works | ✅ Yes | `compare.tsx` server-side render hota hai correctly — query params se data fetch hota hai |
| SSG rendering works | ✅ Yes | `index.tsx` aur `[slug].tsx` build time pe static HTML generate karte hain |
| Lighthouse testing | ⏳ Pending | Deploy ke baad Google Lighthouse se SEO, Performance, Accessibility scores check karne hain |
| Debugging | ✅ Ongoing | TypeScript strict mode se compile-time bugs pakad jaate hain. ESLint se code quality maintained hai |

**Expected Lighthouse scores (deploy ke baad):**
- **SEO: 90-100** — All meta tags, semantic HTML, proper headings, canonical URLs, JSON-LD
- **Performance: 85-95** — SSG pages CDN se serve, optimized font loading, no unnecessary JS bundles
- **Accessibility: 85-95** — `lang` attribute, ARIA labels, semantic elements, proper heading hierarchy
- **Best Practices: 90-100** — HTTPS (Vercel default), no console errors, proper image handling

---

### 📊 Assessment Fulfillment Summary

| Task | Status | Key Evidence |
|---|---|---|
| 1. Project Setup (Next.js + SSR) | ✅ Complete | Next.js 16, SSR + SSG configured, clean folder structure |
| 2. Data Selection | ✅ Complete | Backend technologies, 8 entries, typed TypeScript interface |
| 3. SEO Optimization | ✅ Complete | Meta tags, OG tags, Twitter cards, canonical URLs, JSON-LD, semantic HTML |
| 4. Programmatic SEO Pages | ✅ Complete | 9+ auto-generated pages, `getServerSideProps`, `getStaticPaths`/`getStaticProps` |
| 5. Design & UI/UX | ✅ Complete | Responsive, mobile-friendly, accessible, interactive dropdowns, modern design |
| 6. Deployment | ⏳ Pending | Build ready, Vercel deployment pending |
| 7. Testing & Debugging | ⏳ Pending | App works locally, Lighthouse testing pending post-deployment |

**Bonus points jo assessment me explicitly nahi maange but project me hain:**
- ✨ **TypeScript** — Full type safety across all files
- ✨ **shadcn/ui design system** — Professional, accessible UI components
- ✨ **CVA (class-variance-authority)** — Clean variant management for buttons/badges
- ✨ **Glassmorphism header** — Modern frosted glass design effect
- ✨ **Internal linking strategy** — Related technologies + compare CTAs for SEO crawl depth
- ✨ **Service layer abstraction** — Clean data access pattern (easy to swap data source later)
- ✨ **Breadcrumb navigation** — Better UX + additional SEO signal
