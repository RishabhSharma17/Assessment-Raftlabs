import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document
 * ----------------
 * Sets lang="en" on the <html> element for accessibility and SEO.
 * This is the correct place for attributes that apply to every page.
 */

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
