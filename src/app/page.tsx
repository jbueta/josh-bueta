import React from "react";
import { GlyphMatrix } from "@/registry/magicui/glyph-matrix";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Certifications } from "@/components/certifications";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Background Interactive GlyphMatrix Component in Navy Sapphire Accent */}
      <GlyphMatrix />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <div className="flex-1 space-y-12 relative z-10">
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
