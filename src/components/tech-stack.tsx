"use client";

import React from "react";
import { Marquee } from "@/registry/magicui/marquee";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { Cpu } from "lucide-react";

function MangaTechCard({
  icon,
  name,
  category,
}: {
  icon: React.ReactNode;
  name: string;
  category?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-2 border-[var(--ink)] bg-white hover:bg-[var(--ink)] group transition-colors duration-150 cursor-pointer select-none shadow-[2px_2px_0_var(--ink)]">
      <div className="flex items-center justify-center w-8 h-8 p-1 shrink-0 border border-[var(--ink)]/30 bg-[var(--paper)]">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-manga text-sm tracking-widest text-[var(--ink)] group-hover:text-white">
          {name.toUpperCase()}
        </span>
        {category && (
          <span className="text-[10px] text-[hsl(var(--muted-foreground))] group-hover:text-white/65 font-mono uppercase tracking-wider">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}

export function TechStack() {
  const techList = [
    {
      name: "TypeScript",
      category: "Language",
      icon: <img src="/tech/typescript.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Next.js",
      category: "Framework",
      icon: <img src="/tech/nextjs.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "React",
      category: "Library",
      icon: <img src="/tech/react.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Tailwind CSS",
      category: "Styling",
      icon: <img src="/tech/tailwindcss.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Figma",
      category: "Design",
      icon: <img src="/tech/figma.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "PHP",
      category: "Backend",
      icon: <img src="/tech/php.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Laravel",
      category: "Framework",
      icon: <img src="/tech/laravel.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Java",
      category: "Language",
      icon: <img src="/tech/java.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "JavaScript",
      category: "Language",
      icon: <img src="/tech/javascript.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "HTML5",
      category: "Frontend",
      icon: <img src="/tech/html.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "CSS3",
      category: "Styling",
      icon: <img src="/tech/css.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "C++",
      category: "Systems",
      icon: <img src="/tech/cpp.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Git",
      category: "VCS",
      icon: <img src="/tech/git.svg" alt="" className="w-5 h-5 object-contain" />,
    },
    {
      name: "Framer Motion",
      category: "Animation",
      icon: <img src="/tech/framermotion.svg" alt="" className="w-5 h-5 object-contain" />,
    },
  ];

  return (
    <section className="relative z-10 overflow-hidden">
      {/* Chapter opener */}
      <MangaPanelReveal direction="up">
        <div
          className="relative w-full overflow-hidden speed-lines"
          style={{ background: "var(--ink)", padding: "3.5rem 2rem" }}
        >
          <div className="relative z-10 max-w-6xl mx-auto">
            <span
              className="font-manga text-[9px] tracking-[0.5em] px-3 py-1 inline-block mb-3 text-white slash-cut-right"
              style={{ background: "var(--seido)" }}
            >
              INTERLUDE // TECH STACK
            </span>
            <h2
              className="font-manga text-white leading-none"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
            >
              ARSENAL
            </h2>
          </div>
          <div
            className="absolute right-4 bottom-0 font-manga leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(6rem, 18vw, 16rem)",
              color: "rgba(255,255,255,0.04)",
            }}
            aria-hidden="true"
          >
            TECH
          </div>
        </div>
      </MangaPanelReveal>

      {/* Asymmetric 2-Panel Spread: 3/12 Core Domain Callout + 9/12 Dual Marquee */}
      <div
        className="w-full"
        style={{ background: "var(--ink)", padding: "var(--gutter)" }}
      >
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: "var(--gutter)" }}
        >
          <MangaPanelReveal direction="left" className="lg:col-span-3">
            <div className="panel bg-[var(--ink)] text-white h-full p-6 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute inset-0 speed-lines opacity-30 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="p-2 border-2 border-white/30 inline-flex mb-3">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-manga text-xl tracking-[0.2em] text-white leading-tight">
                  14 CORE
                  <br />
                  TECHNOLOGIES
                </h3>
                <p className="font-sans text-xs text-white/60 mt-2 leading-relaxed">
                  Modern TypeScript/Next.js frontend architecture paired with PHP/Laravel,
                  Python, and cloud tooling.
                </p>
              </div>
              <div className="relative z-10 pt-3 mt-4 border-t border-white/15 font-mono text-[10px] text-white/55">
                FULL-STACK · UI/UX · CLOUD
              </div>
            </div>
          </MangaPanelReveal>

          <MangaPanelReveal direction="right" className="lg:col-span-9">
            <div className="panel bg-[var(--paper)] h-full overflow-hidden relative flex items-center">
              <div
                className="absolute inset-0 screentone-fine opacity-45 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative w-full flex flex-col items-center gap-3 py-7 overflow-hidden">
                <Marquee pauseOnHover className="[--duration:22s] [--gap:0.6rem]">
                  {techList.slice(0, 7).map((t) => (
                    <MangaTechCard key={t.name} {...t} />
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:22s] [--gap:0.6rem]">
                  {techList.slice(7).map((t) => (
                    <MangaTechCard key={t.name} {...t} />
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
