"use client";

import React from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/60 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80">
            {/* Left: Pure Typography Initials Logo MJB without container */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  MJB
                </span>
                <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight font-heading">
                  Mark Joshua Bueta
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm font-sans">
                Architecting modern web solutions, responsive applications, and developer-first user experiences.
              </p>
            </div>

            {/* Right: Quick Links & Socials */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jbueta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 shadow-sm"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/jbueta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all duration-300 shadow-sm"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href="mailto:joshua.bueta13@gmail.com"
                aria-label="Email Contact"
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>

              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-blue-500/10 hover:bg-blue-600 text-blue-500 hover:text-white transition-all duration-300 shadow-sm cursor-pointer ml-2"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Bottom Credits */}
        <BlurFade delay={0.2} inView>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} Mark Joshua Bueta. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-1 font-sans">
              <span>Built with Next.js, MagicUI & Tailwind CSS</span>
            </div>
          </div>
        </BlurFade>
      </div>
    </footer>
  );
}
