"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, Download, MapPin, X, Sparkles, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ----------------------------------------------------------------
   MANGA PORTRAIT PANEL — True Drawn Manga Panel Illustration
   Uses /avatar-manga.jpg directly with zero artificial CSS filters
   so the G-pen linework, sumi-ink hair highlights, Ben-Day screentone
   suit shading, and intersecting action slashes render with 100%
   native print clarity.
   ---------------------------------------------------------------- */
function CinematicAvatar({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="relative w-full h-full cursor-pointer select-none overflow-hidden group bg-white"
      onClick={onClick}
    >
      {/* True Manga Panel Portrait Illustration */}
      <img
        src="/avatar-manga.jpg"
        alt="Mark Joshua Bueta — Manga Panel Portrait"
        fetchPriority="high"
        loading="eager"
        decoding="sync"
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        draggable={false}
      />

      {/* Crisp Ink-Boxed Manga Caption Plate (Bottom-Right Corner) */}
      <div
        className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs pointer-events-none"
        style={{ zIndex: 6 }}
      >
        <div className="border-3 border-[var(--ink)] bg-white/95 px-4 py-3 shadow-[4px_4px_0_var(--ink)]">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span
              className="font-manga text-[9px] tracking-[0.4em] px-2 py-0.5 text-white"
              style={{ background: "var(--seido)" }}
            >
              PROTAGONIST // CS
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--ink)]/70">
              CH. 01
            </span>
          </div>
          <p className="font-manga text-xl sm:text-2xl tracking-[0.12em] text-[var(--ink)] leading-none">
            MARK JOSHUA BUETA
          </p>
        </div>
      </div>

      {/* Tap hint badge (top right, clear of the slash) */}
      <div className="absolute top-3 right-3 hidden sm:block" style={{ zIndex: 6 }}>
        <span className="font-manga text-[9px] tracking-[0.35em] bg-[var(--ink)] text-white border-2 border-[var(--ink)] px-2.5 py-1 block group-hover:bg-[var(--seido)] group-hover:border-[var(--seido)] transition-colors shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
          EXPAND PANEL ↗
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   HERO — Asymmetric Multi-Panel Manga Spread (ACT. 01)
   ---------------------------------------------------------------- */
export function Hero() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightMidRef = useRef<HTMLDivElement>(null);
  const rightBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.05 });
      tl.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      )
        .fromTo(
          rightTopRef.current,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(
          rightMidRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          rightBotRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          "-=0.3"
        );
    },
    { scope: heroRef }
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-[100dvh] pt-[60px] flex flex-col justify-stretch"
        style={{ background: "var(--ink)", paddingBottom: "var(--gutter)" }}
        aria-label="Hero"
      >
        <div
          className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: "var(--gutter)", padding: "var(--gutter)" }}
        >
          {/* ── PANEL 1 (LEFT DOMINANT SPLASH — 7/12 cols on desktop, spans all 3 rows) ── */}
          <div
            ref={leftRef}
            className="lg:col-span-7 lg:row-span-3 relative panel bg-white min-h-[440px] sm:min-h-[540px] lg:min-h-[calc(100dvh-76px)]"
          >
            <CinematicAvatar onClick={() => setIsLightboxOpen(true)} />

            {/* Chapter badge — Seido fill */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-1.5">
              <span
                className="font-manga text-[10px] tracking-[0.45em] px-3 py-1 block text-white border-2 border-[var(--ink)] shadow-[2px_2px_0_var(--ink)]"
                style={{ background: "var(--seido)" }}
              >
                ACT. 01 // OPENING
              </span>
            </div>
          </div>

          {/* ── PANEL 2 (RIGHT TOP — Narrow Kinetic Header Strip, 5/12 cols) ── */}
          <div
            ref={rightTopRef}
            className="lg:col-span-5 panel bg-[var(--ink)] text-white px-6 py-4 flex items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 speed-lines opacity-25 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-white/90">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#60a5fa" }} />
              <span>Pasig City, Philippines</span>
            </div>
            <div className="relative z-10 flex items-center gap-1.5 border border-white/25 px-2.5 py-0.5 bg-white/5">
              <Code2 className="w-3 h-3 text-white/70" />
              <span className="font-manga text-[9px] tracking-[0.35em] text-white/80">
                CS UNDERGRAD · 3RD YR
              </span>
            </div>
          </div>

          {/* ── PANEL 3 (RIGHT CENTER — Dominant Identity & Narrative Panel, 5/12 cols) ── */}
          <div
            ref={rightMidRef}
            className="lg:col-span-5 panel bg-[var(--paper)] sfx-code px-7 sm:px-10 py-10 lg:py-12 flex flex-col justify-center relative"
          >
            <div
              className="absolute inset-0 screentone-fine pointer-events-none"
              style={{ zIndex: 0, opacity: 0.6 }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Manga speech-tag eyebrow */}
              <div className="inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-3 py-1 mb-5 shadow-[3px_3px_0_var(--ink)]">
                <Sparkles className="w-3 h-3" style={{ color: "var(--seido)" }} />
                <span className="font-manga text-[10px] tracking-[0.35em] text-[var(--ink)] uppercase">
                  WEB DEVELOPER &amp; ASPIRING SOFTWARE ENGINEER
                </span>
              </div>

              {/* Giant Manga Name Stack */}
              <h1
                className="font-manga leading-[0.86] tracking-wide text-[var(--ink)] mb-5"
                style={{ fontSize: "clamp(3.4rem, 6.5vw, 6.8rem)" }}
              >
                MARK
                <br />
                JOSHUA
                <br />
                <span style={{ color: "var(--seido)" }}>BUETA</span>
              </h1>

              {/* Diagonal ink divider bar */}
              <div className="flex items-center gap-2 mb-5" aria-hidden="true">
                <div style={{ width: 56, height: 4, background: "var(--ink)" }} />
                <div style={{ width: 14, height: 4, background: "var(--seido)" }} />
              </div>

              {/* Bio */}
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))] max-w-[26rem]">
                Frontend Developer and UI/UX designer dedicated to crafting intuitive,
                accessible digital experiences and building intelligent, human-centered web
                solutions.
              </p>
            </div>
          </div>

          {/* ── PANEL 4 (RIGHT BOTTOM — Action & Status Panel, 5/12 cols) ── */}
          <div
            ref={rightBotRef}
            className="lg:col-span-5 panel bg-[var(--paper)] px-7 sm:px-10 py-6 flex flex-col justify-between gap-5 relative"
          >
            {/* Availability Strip */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b-2 border-[var(--ink)]/15">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full opacity-75"
                    style={{ background: "var(--seido)" }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5"
                    style={{ background: "var(--seido)" }}
                  />
                </span>
                <span className="font-manga text-xs tracking-[0.28em] text-[var(--ink)] uppercase">
                  Open for Internship &amp; Collaborations
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[var(--ink)] text-white">
                STATUS: ACTIVE
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href="/Mark_Joshua_Bueta_CV.pdf"
                download="Mark_Joshua_Bueta_CV.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-manga tracking-[0.2em] text-xs text-white border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                style={{ background: "var(--seido)" }}
              >
                <Download className="w-4 h-4 shrink-0" />
                DOWNLOAD CV
              </a>

              <div className="flex items-center gap-2.5">
                {[
                  {
                    href: "https://github.com/jbueta",
                    label: "GitHub",
                    icon: <GithubIcon className="w-4 h-4" />,
                  },
                  {
                    href: "https://linkedin.com/in/jbueta",
                    label: "LinkedIn",
                    icon: <LinkedinIcon className="w-4 h-4" />,
                  },
                  {
                    href: "mailto:joshua.bueta13@gmail.com",
                    label: "Email",
                    icon: <Mail className="w-4 h-4" />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLightboxOpen(false)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 cursor-zoom-out select-none"
                style={{ background: "rgba(10,10,10,0.92)" }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-md w-full z-[100000] panel bg-white"
                >
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-10 p-2 border-2 border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div
                    className="relative overflow-hidden bg-white"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <img
                      src="/avatar-manga.jpg"
                      alt="Mark Joshua Bueta — Manga Panel Portrait"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="px-5 py-4 border-t-4 border-[var(--ink)] bg-[var(--ink)] text-center">
                    <p className="font-manga text-xl tracking-[0.2em] text-white">
                      MARK JOSHUA BUETA
                    </p>
                    <p className="text-[10px] font-mono text-white/60 mt-1">
                      Web Developer · Aspiring Software Engineer
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
