"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, Download, MapPin, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { MangaDialog } from "@/components/ui/manga-dialog";
import { SITE } from "@/content/site";

gsap.registerPlugin(useGSAP);

/**
 * The role line cycles instead of listing four titles in a row, so the hero
 * introduces one role at a time without growing taller.
 */
const ROLES = ["Student Leader", "Frontend Developer", "Software Engineer", "Conscious Builder"];

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % ROLES.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <p
      className="mb-4 flex min-h-[1.6rem] flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)] sm:text-xs sm:tracking-[0.24em]"
      aria-label={`Roles: ${ROLES.map((role) => `a ${role}`).join(", ")}`}
    >
      <span aria-hidden="true" className="text-[hsl(var(--muted-foreground))]">
        A
      </span>
      <span aria-hidden="true" className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROLES[index]}
            initial={{ y: "0.85em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-0.85em", opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="inline-block whitespace-nowrap font-semibold"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true" className="h-3 w-[3px] shrink-0 bg-[var(--seido)]" />
    </p>
  );
}

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
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      <span className="pointer-events-none absolute bottom-3 left-3 z-[6] flex items-center gap-2 border-2 border-[var(--ink)] bg-white/95 px-2.5 py-1 shadow-[3px_3px_0_var(--ink)]">
        <span
          className="font-manga text-[9px] tracking-[0.3em] text-white"
          style={{ background: "var(--seido)", padding: "1px 6px" }}
        >
          PROTAGONIST
        </span>
        <span className="font-mono text-[9px] tracking-[0.16em] text-[var(--ink)]/70">CH. 01</span>
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
  const identityRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ delay: 0.05 });
      tl.fromTo(
        identityRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      ).fromTo(
        portraitRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.32",
      );
    },
    { scope: heroRef },
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
        /*
         * No `min-h-[100dvh]`: at 1440×900 that forced a full screen of gutter
         * around four stacked panels. The hero now ends where its copy ends.
         */
        className="relative w-full pt-[var(--header-h)]"
        style={{ background: "var(--ink)", paddingBottom: "var(--gutter)" }}
        aria-label="Hero"
      >
        <div
          className="grid w-full grid-cols-1 lg:grid-cols-12 lg:items-stretch"
          style={{ gap: "var(--gutter)", padding: "var(--gutter)" }}
        >
          {/* PANEL A — who I am (7/12) */}
          <div
            ref={identityRef}
            className="panel relative flex flex-col justify-center bg-[var(--paper)] px-6 py-7 sm:px-9 sm:py-9 lg:col-span-7 lg:px-11"
          >
            <div
              className="screentone-fine pointer-events-none absolute inset-0"
              style={{ zIndex: 0, opacity: 0.55 }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <span
                  className="font-manga block border-2 border-[var(--ink)] px-3 py-1 text-[10px] tracking-[0.4em] text-white shadow-[2px_2px_0_var(--ink)]"
                  style={{ background: "var(--seido)" }}
                >
                  ACT. 01 // OPENING
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--seido)" }} aria-hidden="true" />
                  Mark Joshua Bueta · Pasig City, PH
                </span>
              </div>

              <h1
                className="mb-4 leading-[0.9] tracking-wide text-[var(--ink)]"
                style={{ fontSize: "clamp(2.6rem, 4.8vw, 4.4rem)" }}
              >
                HI, I&apos;M
                <br />
                <span style={{ color: "var(--seido)" }}>JOSH!</span>
              </h1>

              <RoleRotator />

              <p className="max-w-[34rem] font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-[15px]">
                CS undergraduate from Pasig City building accessible, human-centered web
                products — from frontend interfaces to AI-assisted tools. I like shipping
                things that real people can actually use.
              </p>

              {/* One container: CV download and the social links travel together. */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-2 border-[var(--ink)] bg-white p-2.5 shadow-[4px_4px_0_var(--ink)] sm:flex-nowrap">
                <a
                  href={SITE.cv}
                  download={SITE.cvFileName}
                  className="font-manga inline-flex flex-1 items-center justify-center gap-2 border-2 border-[var(--ink)] px-5 py-2.5 text-[11px] tracking-[0.2em] text-white transition-colors duration-150 hover:bg-[var(--ink)] sm:flex-none"
                  style={{ background: "var(--seido)" }}
                >
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  DOWNLOAD CV
                </a>

                <div className="flex items-center gap-2 sm:ml-auto">
                  {socials.map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center border-2 border-[var(--ink)] text-[var(--ink)] transition-colors duration-150 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL B — portrait, sized to the copy beside it (5/12) */}
          {/* Fixed heights below `lg`: the 1:1 portrait would otherwise grow to
              614px on a tablet and make the hero two screens tall. */}
          <div
            ref={portraitRef}
            className="panel relative h-[260px] bg-white sm:h-[340px] lg:col-span-5 lg:h-auto lg:min-h-[400px]"
          >
            <CinematicAvatar onClick={() => setIsLightboxOpen(true)} />
          </div>
        </div>
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
