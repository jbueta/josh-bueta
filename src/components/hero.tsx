"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, Download, MapPin, X, Sparkles, Code2 } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MangaDialog } from "@/components/ui/manga-dialog";
import { SITE } from "@/content/site";

gsap.registerPlugin(useGSAP);

function CinematicAvatar({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Expand portrait of ${SITE.name}`}
      className="group relative h-full w-full cursor-pointer select-none overflow-hidden bg-white text-left focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]"
    >
      <Image
        src="/avatar-manga.webp"
        alt={`${SITE.name} — manga panel portrait`}
        width={1024}
        height={1024}
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* Crisp Ink-Boxed Manga Caption Plate (Bottom-Right Corner) */}
      <span className="pointer-events-none absolute bottom-4 left-4 right-4 z-[6] sm:left-auto sm:right-4 sm:max-w-xs">
        <span className="block border-[3px] border-[var(--ink)] bg-white/95 px-4 py-3 shadow-[4px_4px_0_var(--ink)]">
          <span className="mb-1 flex items-center justify-between gap-3">
            <span
              className="font-manga text-[10px] tracking-[0.4em] px-2 py-0.5 text-white"
              style={{ background: "var(--seido)" }}
            >
              PROTAGONIST // CS
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--ink)]/70">
              CH. 01
            </span>
          </span>
          <span className="font-manga block text-xl leading-none tracking-[0.12em] text-[var(--ink)] sm:text-2xl">
            {SITE.name.toUpperCase()}
          </span>
        </span>
      </span>

      {/* Visible at every width: the whole portrait is a button, and hiding the
          only affordance on phones left it looking like a plain image. */}
      <span className="absolute right-3 top-3 z-[6]">
        <span className="font-manga block border-2 border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 text-[10px] tracking-[0.3em] text-white shadow-[2px_2px_0_rgba(0,0,0,0.2)] transition-colors group-hover:border-[var(--seido)] group-hover:bg-[var(--seido)] sm:px-2.5 sm:py-1 sm:tracking-[0.35em]">
          EXPAND PANEL ↗
        </span>
      </span>
    </button>
  );
}

export function Hero() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightMidRef = useRef<HTMLDivElement>(null);
  const rightBotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  const socials = [
    { href: SITE.github, label: "GitHub", icon: <GithubIcon className="h-4 w-4" /> },
    { href: SITE.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
    { href: `mailto:${SITE.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <>
      <section
        ref={heroRef}
        id="opening"
        className="relative flex min-h-[100dvh] w-full flex-col justify-stretch pt-[var(--header-h)]"
        style={{ background: "var(--ink)", paddingBottom: "var(--gutter)" }}
        aria-label="Hero"
      >
        <div
          className="grid w-full flex-1 grid-cols-1 lg:grid-cols-12"
          style={{ gap: "var(--gutter)", padding: "var(--gutter)" }}
        >
          {/* PANEL 1 — dominant splash (7/12) */}
          <div
            ref={leftRef}
            className="panel relative min-h-[440px] bg-white sm:min-h-[540px] lg:col-span-7 lg:row-span-3"
          >
            <CinematicAvatar onClick={() => setIsLightboxOpen(true)} />

            <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-1.5">
              <span
                className="font-manga block border-2 border-[var(--ink)] px-3 py-1 text-[10px] tracking-[0.45em] text-white shadow-[2px_2px_0_var(--ink)]"
                style={{ background: "var(--seido)" }}
              >
                ACT. 01 // OPENING
              </span>
            </div>
          </div>

          {/* PANEL 2 — kinetic header strip (5/12) */}
          <div
            ref={rightTopRef}
            className="panel relative flex flex-wrap items-center justify-between gap-x-4 gap-y-2 overflow-hidden bg-[var(--ink)] px-6 py-4 text-white lg:col-span-5"
          >
            <div className="speed-lines pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
            <div className="relative z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/90">
              <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#60a5fa" }} aria-hidden="true" />
              <span>{SITE.location}</span>
            </div>
            <div className="relative z-10 flex shrink-0 items-center gap-1.5 border border-white/25 bg-white/5 px-2.5 py-0.5 whitespace-nowrap">
              <Code2 className="h-3 w-3 text-white/70" aria-hidden="true" />
              <span className="font-manga text-[10px] tracking-[0.25em] text-white/80">
                CS UNDERGRAD · 3RD YR
              </span>
            </div>
          </div>

          {/* PANEL 3 — identity panel (5/12) */}
          <div
            ref={rightMidRef}
            className="panel relative flex flex-col justify-center bg-[var(--paper)] py-10 pl-12 pr-7 sm:pl-14 sm:pr-10 lg:col-span-5 lg:py-9"
          >
            {/* One spine label replaces the ghost "01" and the "CODE" watermark. */}
            <span
              className="absolute inset-y-0 left-0 z-0 hidden w-8 flex-col items-center justify-center border-r-2 border-[var(--ink)]/15 bg-[var(--ink)]/[0.04] sm:flex"
              aria-hidden="true"
            >
              <span
                className="font-manga text-[10px] tracking-[0.5em] text-[var(--ink)]/45"
                style={{ writingMode: "vertical-rl" }}
              >
                ACT 01 — OPENING
              </span>
            </span>
            <div
              className="screentone-fine pointer-events-none absolute inset-0"
              style={{ zIndex: 0, opacity: 0.6 }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-3 py-1 shadow-[3px_3px_0_var(--ink)]">
                <Sparkles className="h-3 w-3" style={{ color: "var(--seido)" }} aria-hidden="true" />
                <span className="font-manga text-[10px] uppercase tracking-[0.35em] text-[var(--ink)]">
                  {SITE.role.toUpperCase()}
                </span>
              </div>

              <h1
                className="font-manga mb-5 leading-[0.86] tracking-wide text-[var(--ink)]"
                style={{ fontSize: "clamp(2.7rem, 5.2vw, 5rem)" }}
              >
                MARK
                <br />
                JOSHUA
                <br />
                <span style={{ color: "var(--seido)" }}>BUETA</span>
              </h1>

              <div className="mb-5 flex items-center gap-2" aria-hidden="true">
                <div style={{ width: 56, height: 4, background: "var(--ink)" }} />
                <div style={{ width: 14, height: 4, background: "var(--seido)" }} />
              </div>

              <p className="max-w-[26rem] font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-[15px]">
                Frontend Developer and UI/UX designer dedicated to crafting intuitive,
                accessible digital experiences and building intelligent, human-centered web
                solutions.
              </p>
            </div>
          </div>

          {/* PANEL 4 — action & status (5/12) */}
          <div
            ref={rightBotRef}
            className="panel relative flex flex-col justify-between gap-5 bg-[var(--paper)] px-7 py-6 sm:px-10 lg:col-span-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)]/15 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping opacity-75"
                    style={{ background: "var(--seido)" }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5"
                    style={{ background: "var(--seido)" }}
                  />
                </span>
                <span className="font-manga text-xs uppercase tracking-[0.28em] text-[var(--ink)]">
                  {SITE.availability}
                </span>
              </div>
              <span className="bg-[var(--ink)] px-2 py-0.5 font-mono text-[10px] text-white">
                STATUS: ACTIVE
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href={SITE.cv}
                download={SITE.cvFileName}
                className="font-manga inline-flex items-center gap-2.5 border-2 border-[var(--ink)] px-6 py-3 text-xs tracking-[0.2em] text-white shadow-[4px_4px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                style={{ background: "var(--seido)" }}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                DOWNLOAD CV
              </a>

              <div className="flex items-center gap-2.5">
                {socials.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:shadow-none"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a
          href="#background"
          className="font-manga relative z-10 mx-auto flex w-fit items-center gap-2 pb-[var(--gutter)] text-[10px] tracking-[0.5em] text-white/45 transition-colors hover:text-white"
        >
          <span
            className="h-5 w-[2px] bg-white/20 transition-colors"
            aria-hidden="true"
          />
          SCROLL TO ACT 02
        </a>
      </section>

      <MangaDialog
        open={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        label={`Portrait of ${SITE.name}`}
        className="max-w-md bg-white"
      >
        <button
          type="button"
          onClick={() => setIsLightboxOpen(false)}
          aria-label="Close portrait"
          className="absolute right-3 top-3 z-10 border-2 border-[var(--ink)] bg-white p-2 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="relative overflow-hidden bg-white" style={{ aspectRatio: "1/1" }}>
          <Image
            src="/avatar-manga.webp"
            alt={`${SITE.name} — manga panel portrait`}
            width={1024}
            height={1024}
            sizes="(min-width: 768px) 448px, 100vw"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="border-t-4 border-[var(--ink)] bg-[var(--ink)] px-5 py-4 text-center">
          <p className="font-manga text-xl tracking-[0.2em] text-white">
            {SITE.name.toUpperCase()}
          </p>
          <p className="mt-1 font-mono text-[10px] text-white/70">{SITE.role}</p>
        </div>
      </MangaDialog>
    </>
  );
}
