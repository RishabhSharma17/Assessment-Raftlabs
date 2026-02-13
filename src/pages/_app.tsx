import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

/**
 * Custom App Component
 * ---------------------
 * Wraps every page in a consistent layout with Header and Footer.
 * Loads the Inter font from Google Fonts for clean, modern typography.
 *
 * Architectural decision:
 *   Layout is applied at the _app level so individual pages only need
 *   to concern themselves with their unique content and SEO metadata.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
