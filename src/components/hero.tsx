"use client";

import React from "react";
import { PixelImage } from "@/registry/magicui/pixel-image";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import {
  Mail,
  Download,
  Terminal,
  MapPin,
  Sparkles,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Availability Status Badge */}
      <BlurFade delay={0.1}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          AVAILABLE FOR NEW OPPORTUNITIES & ARCHITECTURE PROJECTS
        </div>
      </BlurFade>

      {/* Center Layout: Avatar & Titles */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full mb-10 text-center md:text-left">
        {/* MagicUI PixelImage Component */}
        <BlurFade delay={0.2} className="shrink-0">
          <PixelImage
            src="/avatar.png"
            alt="Mark Jason Bueta"
            rows={4}
            cols={6}
            className="w-44 h-44 sm:w-52 sm:h-52"
          />
        </BlurFade>

        {/* Text Content */}
        <div className="flex flex-col max-w-2xl">
          <BlurFade delay={0.3}>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Manila, Philippines</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Terminal className="w-3.5 h-3.5 text-indigo-500" />
              <span>Full-Stack & Systems Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-3">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Mark Jason Bueta
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              Software Engineer & Technical Solutions Architect
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Specializing in high-performance web applications, distributed systems,
              and reactive UI architectures. Passionate about clean code, developer experience,
              and crafting scalable digital products.
            </p>
          </BlurFade>

          {/* Social Links & CTA */}
          <BlurFade delay={0.6}>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View Projects</span>
                <Sparkles className="w-4 h-4" />
              </a>

              {/* CV Button */}
              <a
                href="/cv-mark-jason-bueta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-all duration-300 shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Download CV</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/jbueta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com/in/jbueta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="mailto:contact@mjbueta.dev"
                  aria-label="Email Contact"
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
