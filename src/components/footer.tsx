"use client";

import React, { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowUp, Download, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
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
        <div
          className="absolute inset-0 speed-lines opacity-25 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 screentone-fine opacity-15 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-16">
          {/* Employer-Facing Recruitment Banner Panel */}
          <div className="border-4 border-white bg-[var(--paper)] text-[var(--ink)] p-6 sm:p-10 mb-12 relative overflow-hidden shadow-[6px_6px_0_var(--seido)]">
            <div
              className="absolute inset-0 screentone-fine opacity-45 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-white font-manga text-[10px] tracking-[0.35em]" style={{ background: "var(--seido)" }}>
                  <Briefcase className="w-3.5 h-3.5" />
                  AVAILABLE FOR SOFTWARE ENGINEERING &amp; FRONTEND ROLES
                </div>
                <h2
                  className="font-manga text-[var(--ink)] leading-[0.94] tracking-wide mb-3"
                  style={{ fontSize: "clamp(2rem, 4.8vw, 3.6rem)" }}
                >
                  READY TO CONTRIBUTE TO YOUR ENGINEERING TEAM?
                </h2>
                <p className="font-sans text-sm sm:text-[15px] text-[hsl(var(--muted-foreground))] leading-relaxed">
                  Whether you are hiring for a software engineering internship, full-stack
                  project collaboration, or frontend UI/UX role, I would love to discuss how I
                  can bring immediate value to your team.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="mailto:joshua.bueta13@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-manga tracking-[0.22em] text-xs text-white border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ background: "var(--seido)" }}
                >
                  <Mail className="w-4 h-4" />
                  SCHEDULE A CONVERSATION →
                </a>
                <a
                  href="/Mark_Joshua_Bueta_CV.pdf"
                  download="Mark_Joshua_Bueta_CV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3.5 font-manga tracking-[0.22em] text-xs bg-white text-[var(--ink)] border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] hover:bg-[var(--ink)] hover:text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
            {/* Brand */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div
                className="font-manga leading-none tracking-widest text-white select-none"
                style={{ fontSize: "clamp(3.5rem, 10vw, 6.5rem)" }}
              >
                MJB
              </div>
              <div>
                <p className="font-manga text-xl sm:text-2xl tracking-[0.28em] text-white/90">
                  MARK JOSHUA BUETA
                </p>
                <p className="text-sm text-white/55 font-sans mt-1.5 max-w-sm leading-relaxed">
                  Web Developer &amp; Aspiring Software Engineer · Pasig City, Philippines.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="font-manga text-[10px] tracking-[0.45em] text-white/45 pb-1 border-b border-white/15">
                SECTIONS
              </span>
              {navLinks.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="font-manga text-lg tracking-widest text-white/75 hover:text-white transition-colors duration-150 leading-tight"
                >
                  {l.name.toUpperCase()}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="font-manga text-[10px] tracking-[0.45em] text-white/45 pb-1 border-b border-white/15">
                DIRECT CHANNELS
              </span>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/jbueta",
                    label: "GitHub",
                    icon: <GithubIcon className="w-5 h-5" />,
                  },
                  {
                    href: "https://linkedin.com/in/jbueta",
                    label: "LinkedIn",
                    icon: <LinkedinIcon className="w-5 h-5" />,
                  },
                  {
                    href: "mailto:joshua.bueta13@gmail.com",
                    label: "Email",
                    icon: <Mail className="w-5 h-5" />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="w-11 h-11 flex items-center justify-center border-2 border-white/30 text-white/75 hover:bg-white hover:text-[var(--ink)] hover:border-white transition-all duration-150"
                  >
                    {icon}
                  </a>
                ))}
              </div>
              <a
                href="mailto:joshua.bueta13@gmail.com"
                className="text-xs font-mono text-white/50 hover:text-white transition-colors mt-1"
              >
                joshua.bueta13@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/40 pt-6">
            <span>
              &copy; {new Date().getFullYear()} Mark Joshua Bueta. All rights reserved.
            </span>
            <span>Engineered with Next.js, TypeScript, Tailwind CSS &amp; GSAP</span>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top FAB — ink stamp */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 p-4 border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150 shadow-[3px_3px_0_var(--ink)] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
