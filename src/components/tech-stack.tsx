"use client";

import React from "react";
import { Marquee } from "@/registry/magicui/marquee";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ChapterOpener } from "@/components/chapter-opener";
import { Cpu } from "lucide-react";
import { TECH_COUNT, TECH_STACK, type Tech } from "@/content/stack";

function MangaTechCard({ icon, name, category }: Tech) {
  return (
    <div className="group flex cursor-default select-none items-center gap-3 border-2 border-[var(--ink)] bg-white px-4 py-3 shadow-[2px_2px_0_var(--ink)] transition-colors duration-150 hover:bg-[var(--ink)]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--ink)]/30 bg-[var(--paper)] p-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative 20px SVG glyph */}
        <img
          src={icon}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          className="h-5 w-5 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-manga text-sm tracking-widest text-[var(--ink)] group-hover:text-white">
          {name.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] group-hover:text-white/70">
          {category}
        </span>
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="relative z-10 overflow-hidden">
      <ChapterOpener
        act="INT"
        label="TECH STACK"
        title="ARSENAL"
        subtitle={`${TECH_COUNT} CORE TECHNOLOGIES ACROSS FULL-STACK, UI/UX AND CLOUD`}
        ghost="TECH"
      />

      <div className="w-full" style={{ background: "var(--ink)", padding: "var(--gutter)" }}>
        <div className="canvas grid grid-cols-1 lg:grid-cols-12" style={{ gap: "var(--gutter)" }}>
          <MangaPanelReveal direction="left" index={0} className="lg:col-span-3">
            <div className="panel panel-cut-corner relative flex h-full flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-white">
              <div className="speed-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex border-2 border-white/30 p-2">
                  <Cpu className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-manga text-xl leading-tight tracking-[0.2em] text-white">
                  {TECH_COUNT} CORE
                  <br />
                  TECHNOLOGIES
                </h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                  Modern TypeScript/Next.js frontend architecture paired with PHP/Laravel,
                  Python, and cloud tooling.
                </p>
              </div>
              <div className="relative z-10 mt-4 border-t border-white/15 pt-3 font-mono text-[10px] text-white/65">
                FULL-STACK · UI/UX · CLOUD
              </div>
            </div>
          </MangaPanelReveal>

          <MangaPanelReveal direction="right" index={1} className="lg:col-span-9">
            <div className="panel panel-cut-corner relative flex h-full items-center overflow-hidden bg-[var(--paper)]">
              <div className="screentone-fine pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
              <div className="relative flex w-full flex-col items-center gap-3 overflow-hidden py-7">
                <Marquee pauseOnHover className="[--duration:22s] [--gap:0.6rem]">
                  {TECH_STACK.slice(0, 7).map((tech) => (
                    <MangaTechCard key={tech.name} {...tech} />
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:22s] [--gap:0.6rem]">
                  {TECH_STACK.slice(7).map((tech) => (
                    <MangaTechCard key={tech.name} {...tech} />
                  ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--paper)] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--paper)] to-transparent" />
              </div>
            </div>
          </MangaPanelReveal>
        </div>
      </div>
    </section>
  );
}
