import Link from "next/link";

/**
 * Header Component
 * -----------------
 * Sticky navigation bar providing consistent branding and navigation.
 * Links back to home for single-click crawlability from any page.
 */

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto flex h-14 items-center px-4 sm:px-6">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-xl" role="img" aria-label="logo">
                        🔍
                    </span>
                    <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                        Tech Stack Explorer
                    </span>
                </Link>
                <nav className="ml-auto flex items-center space-x-4 text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/compare?tech1=nodejs&tech2=django"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Compare
                    </Link>
                </nav>
            </div>
        </header>
    );
}
