import { Head, Html, Main, NextScript } from "next/document";

const CRITICAL_FONTS = [
  "/fonts/Redaction_100-Bold.woff2",
  "/fonts/Redaction_10-Regular.woff2",
  "/fonts/Redaction_70-Bold.woff2",
  "/fonts/Redaction-Regular.woff2",
  "/fonts/Redaction_35-Bold.woff2",
  "/fonts/Redaction_100-Regular.woff2",
  "/fonts/Redaction_20-Regular.woff2",
  "/fonts/Redaction_50-Bold.woff2",
];

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {CRITICAL_FONTS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#171717" />
        <meta name="theme-color" content="#171717" />
        <meta name="msapplication-TileColor" content="#171717" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
