import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";

/*
 * Reading text and titles share one face: Space Grotesk is drawn alongside
 * Space Mono, so copy and data sit in the same family, and Bebas Neue supplies
 * the condensed contrast for stamps. Montserrat and League Spartan were both
 * geometric sans, which left titles and body reading as one voice at two sizes.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Real mono face for telemetry labels; `font-mono` used to fall back to the OS.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const title = `${SITE.shortName} | ${SITE.name} — Software Engineer Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${SITE.shortName} — ${SITE.name}`,
    title,
    description: SITE.description,
    url: "/",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  // The page is stark white; a black browser chrome sat on top of it.
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[hsl(var(--background))] font-sans text-[hsl(var(--foreground))] antialiased">
        {children}
      </body>
    </html>
  );
}
