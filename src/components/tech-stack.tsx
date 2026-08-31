"use client";

import React from "react";
import { Marquee, TechCard } from "@/registry/magicui/marquee";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  Code,
  Layers,
  Database,
  Cpu,
  Globe,
  Server,
  Terminal,
  Zap,
  Box,
  Layout,
  Flame,
  GitBranch,
} from "lucide-react";

export function TechStack() {
  const techList = [
    { name: "TypeScript", icon: <Code className="w-4 h-4 text-blue-500" />, category: "Language" },
    { name: "Next.js", icon: <Globe className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />, category: "Framework" },
    { name: "React", icon: <Layers className="w-4 h-4 text-cyan-400" />, category: "Library" },
    { name: "Tailwind CSS", icon: <Layout className="w-4 h-4 text-teal-400" />, category: "Styling" },
    { name: "Node.js", icon: <Server className="w-4 h-4 text-emerald-500" />, category: "Runtime" },
    { name: "Python", icon: <Terminal className="w-4 h-4 text-amber-400" />, category: "Language" },
    { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-indigo-400" />, category: "Database" },
    { name: "Docker", icon: <Box className="w-4 h-4 text-sky-500" />, category: "DevOps" },
    { name: "Git", icon: <GitBranch className="w-4 h-4 text-orange-500" />, category: "VCS" },
    { name: "Framer Motion", icon: <Zap className="w-4 h-4 text-purple-400" />, category: "Animation" },
    { name: "GraphQL", icon: <Cpu className="w-4 h-4 text-pink-500" />, category: "API" },
    { name: "Redis", icon: <Flame className="w-4 h-4 text-red-500" />, category: "Cache" },
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
