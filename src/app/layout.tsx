import type { Metadata } from "next";
import { League_Spartan, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MJB | Mark Joshua Bueta - Software Engineer & Architect Portfolio",
  description:
    "Personal Portfolio of Mark Joshua Bueta (MJB). Explore software engineering projects, education, experience, live GitHub commits, and technical certifications.",
  keywords: [
    "Mark Joshua Bueta",
    "MJB",
    "Software Engineer",
    "Web Developer",
    "Next.js Portfolio",
    "TypeScript",
    "UI/UX Design",
  ],
  authors: [{ name: "Mark Joshua Bueta" }],
  openGraph: {
    title: "MJB | Mark Joshua Bueta Portfolio",
    description:
      "Interactive developer portfolio featuring live GitHub commit integrations, technical experience, and project showcases.",
    type: "website",
  },
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
      className={`${leagueSpartan.variable} ${montserrat.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
