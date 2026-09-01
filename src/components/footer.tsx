"use client";

import React, { useState, useEffect } from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowUp, Sparkles, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <>
      <footer className="relative z-10 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/60 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <BlurFade delay={0.1} inView>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80">
              {/* Left Column (6 cols): Brand & Bio */}
              <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                    MJB
                  </span>
                  <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight font-heading">
                    Mark Joshua Bueta
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans leading-relaxed">
                  Web Developer & Aspiring Software Engineer based in Pasig City, Philippines. Dedicated to building intelligent, scalable, and human-centered digital web experiences.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open for Internship Opportunities & Collaborations</span>
                </div>
              </div>

              {/* Middle Column (3 cols): Quick Navigation Links */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <h4 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">
                  Quick Navigation
                </h4>
                <ul className="flex flex-col gap-2 font-sans text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column (3 cols): Social Profiles */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <h4 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">
                  Connect & Socials
                </h4>
                <div className="flex items-center gap-3">
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
                </div>
                <a
                  href="mailto:joshua.bueta13@gmail.com"
                  className="text-xs font-mono text-zinc-500 hover:text-blue-500 transition-colors"
                >
                  joshua.bueta13@gmail.com
                </a>
              </div>
            </div>
          </BlurFade>

          {/* Formalized Bottom Credits */}
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-sans text-xs">
                <span>© {new Date().getFullYear()} Mark Joshua Bueta. All rights reserved.</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Designed & Developed with Next.js, TypeScript & Tailwind CSS</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </footer>

      {/* Floating Tooltip Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-center select-none"
          >
            {/* Tooltip Overlay */}
            <AnimatePresence>
              {hoverTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="mb-2 px-3 py-1.5 rounded-lg bg-zinc-950 dark:bg-zinc-900 text-white text-[11px] font-mono font-medium border border-zinc-800 shadow-xl pointer-events-none whitespace-nowrap"
                >
                  Back to top ↑
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setHoverTooltip(true)}
              onMouseLeave={() => setHoverTooltip(false)}
              aria-label="Scroll back to top"
              className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 border border-blue-400/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
