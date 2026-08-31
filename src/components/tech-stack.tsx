"use client";

import React from "react";
import { Marquee, TechCard } from "@/registry/magicui/marquee";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  TypeScriptLogo,
  NextjsLogo,
  ReactLogo,
  TailwindLogo,
  NodejsLogo,
  PythonLogo,
  PostgresqlLogo,
  DockerLogo,
  GitLogo,
  FramerMotionLogo,
  GraphQLLogo,
  RedisLogo,
} from "@/components/tech-logos";

export function TechStack() {
  const techList = [
    { name: "TypeScript", icon: <TypeScriptLogo className="w-5 h-5" />, category: "Language" },
    { name: "Next.js", icon: <NextjsLogo className="w-5 h-5" />, category: "Framework" },
    { name: "React", icon: <ReactLogo className="w-5 h-5" />, category: "Library" },
    { name: "Tailwind CSS", icon: <TailwindLogo className="w-5 h-5" />, category: "Styling" },
    { name: "Node.js", icon: <NodejsLogo className="w-5 h-5" />, category: "Runtime" },
    { name: "Python", icon: <PythonLogo className="w-5 h-5" />, category: "Language" },
    { name: "PostgreSQL", icon: <PostgresqlLogo className="w-5 h-5" />, category: "Database" },
    { name: "Docker", icon: <DockerLogo className="w-5 h-5" />, category: "DevOps" },
    { name: "Git", icon: <GitLogo className="w-5 h-5" />, category: "VCS" },
    { name: "Framer Motion", icon: <FramerMotionLogo className="w-5 h-5" />, category: "Animation" },
    { name: "GraphQL", icon: <GraphQLLogo className="w-5 h-5" />, category: "API" },
    { name: "Redis", icon: <RedisLogo className="w-5 h-5" />, category: "Cache" },
  ];

  const row1 = techList.slice(0, 6);
  const row2 = techList.slice(6);

  return (
    <section className="py-16 relative z-10 max-w-6xl mx-auto overflow-hidden">
      <BlurFade delay={0.2} inView>
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono tracking-widest text-emerald-500 uppercase font-semibold mb-2">
            CORE COMPETENCIES
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Technologies & Modern Stack
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 p-4 backdrop-blur-md">
          {/* Row 1 */}
          <Marquee pauseOnHover className="[--duration:25s]">
            {row1.map((tech) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                category={tech.category}
              />
            ))}
          </Marquee>

          {/* Row 2 (Reverse) */}
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {row2.map((tech) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                category={tech.category}
              />
            ))}
          </Marquee>

          {/* Side Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent" />
        </div>
      </BlurFade>
    </section>
  );
}
