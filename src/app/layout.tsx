import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MJB | Mark Jason Bueta - Software Engineer & Architect Portfolio",
  description:
    "Personal Portfolio of Mark Jason Bueta (MJB). Explore software architecture projects, experience, live GitHub commits, and technical certifications.",
  keywords: [
    "Mark Jason Bueta",
    "MJB",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Portfolio",
    "TypeScript",
    "Web Architect",
  ],
  authors: [{ name: "Mark Jason Bueta" }],
  openGraph: {
    title: "MJB | Mark Jason Bueta Portfolio",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
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
