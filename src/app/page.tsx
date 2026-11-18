import React from "react";
import { GlyphMatrix } from "@/registry/magicui/glyph-matrix";
import { HalftoneOverlay } from "@/components/halftone-overlay";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getGithubData } from "@/lib/github";

// GitHub telemetry is refreshed hourly; the rest of the page is static content.
export const revalidate = 3600;

export default async function Home() {
  const github = await getGithubData();

  return (
    <main
      id="main-content"
      className="manga-page relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden selection:bg-[rgba(0,48,135,0.2)] selection:text-[hsl(var(--foreground))]"
    >
      <GlyphMatrix />
      <HalftoneOverlay />
      <Navbar />

      <div className="relative z-10 flex-1">
        <Hero />
        <Experience />
        <Projects data={github} />
        <TechStack />
        <Certifications />
        <Contact />
      </div>

      <Footer />
      <JsonLd />
    </main>
  );
}
