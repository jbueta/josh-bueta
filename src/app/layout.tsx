import type { Metadata } from "next";
import { League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      className={`${leagueSpartan.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
