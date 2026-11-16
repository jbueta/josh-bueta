import React from "react";
import { GlyphMatrix } from "@/registry/magicui/glyph-matrix";
import { HalftoneOverlay } from "@/components/halftone-overlay";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Certifications } from "@/components/certifications";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="manga-page relative min-h-screen flex flex-col overflow-x-hidden w-full max-w-full selection:bg-[rgba(0,48,135,0.2)] selection:text-[hsl(var(--foreground))]">
      {/* z-0: Katakana rain background */}
      <GlyphMatrix />

      {/* z-1: Global halftone screentone paper texture */}
      <HalftoneOverlay />

      {/* z-50: Navigation */}
      <Navbar />

      {/* z-10: Main content — manga chapter layout */}
      <div className="flex-1 relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <TechStack />
        <Certifications />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
