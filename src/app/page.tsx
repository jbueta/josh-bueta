import React from "react";
import { GlyphMatrix } from "@/registry/magicui/glyph-matrix";
import { HalftoneOverlay } from "@/components/halftone-overlay";
import { Navbar } from "@/components/navbar";
import { ChapterRail } from "@/components/chapter-rail";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ActBreak } from "@/components/act-break";
import { JsonLd } from "@/components/json-ld";
import { getGithubData } from "@/lib/github";

// GitHub telemetry is refreshed hourly; the rest of the page is static content.
export const revalidate = 3600;

export default async function Home() {
  const github = await getGithubData();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      /* No `overflow-x-hidden` here: it would make <main> the scroll container
         and silently disable every `position: sticky` child. Horizontal
         clipping stays on <body>, which propagates to the viewport. */
      className="manga-page relative flex min-h-screen w-full max-w-full flex-col selection:bg-[rgba(0,48,135,0.2)] selection:text-[hsl(var(--foreground))]"
    >
      <GlyphMatrix />
      <HalftoneOverlay />
      <Navbar />
      <ChapterRail />

      <div className="relative z-10 flex-1">
        <Hero />
        <ActBreak next="02" label="Background" />
        <Experience />
        <ActBreak next="03" label="Projects" />
        <Projects data={github} />
        <ActBreak next="INT" label="Arsenal" />
        <TechStack />
        <ActBreak next="04" label="Credentials" />
        <Certifications />
        <ActBreak next="05" label="Contact" />
        <Contact />
      </div>

      <Footer />
      <JsonLd />
    </main>
  );
}
