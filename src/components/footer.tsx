"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowUp, Download, Briefcase, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/content/site";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const socials = [
    { href: SITE.github, label: "GitHub", icon: <GithubIcon className="h-5 w-5" /> },
    { href: SITE.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5" /> },
    { href: `mailto:${SITE.email}`, label: "Email", icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <>
      <footer
        className="relative z-10 overflow-hidden"
        style={{
          background: "var(--ink)",
          borderTop: "var(--gutter) solid var(--ink)",
        }}
      >
        <div className="speed-lines pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="screentone-fine pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10">
          {/* Recruitment banner */}
          <div className="relative mb-12 overflow-hidden border-4 border-white bg-[var(--paper)] p-6 text-[var(--ink)] shadow-[6px_6px_0_var(--seido)] sm:p-10">
            <div className="screentone-fine pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
            <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div
                  className="font-manga mb-3 inline-flex items-center gap-2 px-3 py-1 text-[10px] tracking-[0.35em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                  AVAILABLE FOR SOFTWARE ENGINEERING &amp; FRONTEND ROLES
                </div>
                <h2
                  className="font-manga mb-3 leading-[0.94] tracking-wide text-[var(--ink)]"
                  style={{ fontSize: "clamp(2rem, 4.8vw, 3.6rem)" }}
                >
                  READY TO CONTRIBUTE TO YOUR ENGINEERING TEAM?
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-[15px]">
                  Whether you are hiring for a software engineering internship, full-stack
                  project collaboration, or frontend UI/UX role, I would love to discuss how I
                  can bring immediate value to your team.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-6 py-3.5 text-xs tracking-[0.22em] text-white shadow-[4px_4px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  style={{ background: "var(--seido)" }}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  SCHEDULE A CONVERSATION →
                </Link>
                <a
                  href={SITE.cv}
                  download={SITE.cvFileName}
                  className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-5 py-3.5 text-xs tracking-[0.22em] text-[var(--ink)] shadow-[4px_4px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[var(--ink)] hover:text-white hover:shadow-none"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-10 md:grid-cols-12">
            <div className="flex flex-col gap-4 md:col-span-6">
              <div
                className="font-manga select-none leading-none tracking-widest text-white"
                style={{ fontSize: "clamp(3.5rem, 10vw, 6.5rem)" }}
              >
                {SITE.shortName}
              </div>
              <div>
                <p className="font-manga text-xl tracking-[0.28em] text-white/90 sm:text-2xl">
                  {SITE.name.toUpperCase()}
                </p>
                <p className="mt-1.5 max-w-sm font-sans text-sm leading-relaxed text-white/65">
                  {SITE.role} · {SITE.location}.
                </p>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-col gap-3 md:col-span-3">
              <span className="font-manga border-b border-white/15 pb-1 text-[10px] tracking-[0.45em] text-white/60">
                SECTIONS
              </span>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-manga text-lg leading-tight tracking-widest text-white/80 transition-colors duration-150 hover:text-white"
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
              <Link
                href="/resume"
                className="font-manga inline-flex items-center gap-1.5 text-lg leading-tight tracking-widest text-white/80 transition-colors duration-150 hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                RESUME
              </Link>
            </nav>

            <div className="flex flex-col gap-3 md:col-span-3">
              <span className="font-manga border-b border-white/15 pb-1 text-[10px] tracking-[0.45em] text-white/60">
                DIRECT CHANNELS
              </span>
              <div className="flex gap-3">
                {socials.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center border-2 border-white/30 text-white/80 transition-all duration-150 hover:border-white hover:bg-white hover:text-[var(--ink)]"
                  >
                    {icon}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 font-mono text-xs text-white/65 transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 pt-6 font-mono text-[11px] text-white/50 sm:flex-row">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <span>Engineered with Next.js, TypeScript, Tailwind CSS &amp; GSAP</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 border-2 border-[var(--ink)] bg-[var(--paper)] p-4 text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] transition-colors duration-150 hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
