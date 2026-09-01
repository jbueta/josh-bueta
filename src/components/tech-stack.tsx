"use client";

import React from "react";
import { Marquee, TechCard } from "@/registry/magicui/marquee";
import { BlurFade } from "@/registry/magicui/blur-fade";

export function TechStack() {
  const techList = [
    {
      name: "TypeScript",
      category: "Language",
      icon: (
        <img
          src="/tech/typescript.svg"
          alt="TypeScript Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Next.js",
      category: "Framework",
      icon: (
        <img
          src="/tech/nextjs.svg"
          alt="Next.js Logo"
          className="w-5 h-5 object-contain shrink-0 dark:invert"
        />
      ),
    },
    {
      name: "React",
      category: "Library",
      icon: (
        <img
          src="/tech/react.svg"
          alt="React Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Tailwind CSS",
      category: "Styling",
      icon: (
        <img
          src="/tech/tailwindcss.svg"
          alt="Tailwind CSS Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Figma",
      category: "UI/UX Design",
      icon: (
        <img
          src="/tech/figma.svg"
          alt="Figma Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "PHP",
      category: "Backend",
      icon: (
        <img
          src="/tech/php.svg"
          alt="PHP Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Laravel",
      category: "Framework",
      icon: (
        <img
          src="/tech/laravel.svg"
          alt="Laravel Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Java",
      category: "Language",
      icon: (
        <img
          src="/tech/java.svg"
          alt="Java Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "JavaScript",
      category: "Language",
      icon: (
        <img
          src="/tech/javascript.svg"
          alt="JavaScript Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "HTML5",
      category: "Frontend",
      icon: (
        <img
          src="/tech/html.svg"
          alt="HTML5 Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "CSS3",
      category: "Styling",
      icon: (
        <img
          src="/tech/css.svg"
          alt="CSS3 Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "C++",
      category: "Language / Systems",
      icon: (
        <img
          src="/tech/cpp.svg"
          alt="C++ Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Git",
      category: "VCS",
      icon: (
        <img
          src="/tech/git.svg"
          alt="Git Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
    {
      name: "Framer Motion",
      category: "Animation",
      icon: (
        <img
          src="/tech/framermotion.svg"
          alt="Framer Motion Logo"
          className="w-5 h-5 object-contain shrink-0"
        />
      ),
    },
  ];

  const row1 = techList.slice(0, 7);
  const row2 = techList.slice(7);

  return (
    <section className="py-16 relative z-10 max-w-6xl mx-auto overflow-hidden">
      <BlurFade delay={0.2} inView>
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono tracking-widest text-blue-500 uppercase font-semibold mb-2">
            PROJECT TECH STACK
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Technologies & Tools Used
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 p-4 backdrop-blur-md">
          {/* Row 1 */}
          <Marquee pauseOnHover className="[--duration:26s]">
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
          <Marquee reverse pauseOnHover className="[--duration:26s]">
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
