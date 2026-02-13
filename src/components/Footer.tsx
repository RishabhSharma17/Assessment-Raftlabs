/**
 * Footer Component
 * -----------------
 * Simple, clean footer with site branding and copyright.
 */

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-muted/30">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 py-8 px-4 sm:px-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Built with{" "}
                    <span className="font-semibold text-foreground">Next.js</span>,{" "}
                    <span className="font-semibold text-foreground">TypeScript</span> &{" "}
                    <span className="font-semibold text-foreground">Tailwind CSS</span>
                </p>
                <p className="text-xs text-muted-foreground">
                    © {year} Tech Stack Explorer. Programmatic SEO demo.
                </p>
            </div>
        </footer>
    );
}
