"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, Download, MapPin, Maximize2, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MangaDialog } from "@/components/ui/manga-dialog";
import { SITE } from "@/content/site";

gsap.registerPlugin(useGSAP);

const ROLES = ["Student Leader", "Frontend Developer", "Software Engineer", "Conscious Builder"];

const NAME = "MARK JOSHUA";

/** Upper-case glyphs only: the scrambled line keeps the width of the real name. */
const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>=/+";

/**
 * Deterministic glyph for a (letter, churn step) pair, so the server and the
 * first client paint agree on the scrambled name instead of flashing the real
 * one. Random churn would hydrate mismatched.
 */
function noiseGlyph(index: number, step: number) {
  let hash = (index + 1) * 374761393 + step * 668265263;
  hash = (hash ^ (hash >> 13)) * 1274126177;
  hash ^= hash >> 16;
  return NOISE[Math.abs(hash) % NOISE.length];
}

/**
 * Draws the name out of churning glyphs, the way the old HyperText did before
 * the redesign dropped it: every letter keeps flickering until its own turn to
 * lock in, left to right.
 */
function ScrambleName({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [chars, setChars] = useState(() =>
    text.split("").map((char, index) => (char === " " ? " " : noiseGlyph(index, 0))),
  );

  useEffect(() => {
    // Reduced motion keeps the plain name.
    if (reduced) return;

    const target = text.split("");
    const lockStep = 1000 / target.length;
    const churnEvery = 55;
    const end = lockStep * target.length + lockStep * 2;

    let step = 0;
    let frame = 0;
    let started = false;
    let start = 0;
    let lastChurn = 0;
    let painted = "";

    const tick = (now: number) => {
      // The clock starts on the first frame, not at mount: a page that loads in
      // a background tab never runs rAF, so anchoring at mount would swallow the
      // whole animation and drop the finished name in on the first frame.
      if (!started) {
        started = true;
        start = now;
      }

      const elapsed = now - start;

      if (elapsed - lastChurn >= churnEvery) {
        lastChurn = elapsed;
        step += 1;
      }

      const next = target
        .map((char, index) => {
          if (char === " ") return " ";
          // A letter jitters for one extra beat after its slot, so the reveal
          // reads as settling rather than snapping into place.
          return elapsed >= lockStep * (index + 1) + lockStep * 0.8
            ? char
            : noiseGlyph(index, step);
        })
        .join("");

      if (next !== painted) {
        painted = next;
        setChars(next.split(""));
      }

      if (elapsed < end) frame = requestAnimationFrame(tick);
      else if (painted !== text) setChars(target);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {reduced ? text : chars.join("")}
      </span>
    </>
  );
}

function RoleLine() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % ROLES.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p
      className="mb-4 min-h-[1.6rem] font-sans text-[15px] font-medium tracking-wide text-[var(--ink)] sm:text-base"
      aria-label={`Roles: ${ROLES.join(", ")}`}
    >
      <span aria-hidden="true" className="inline-block align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROLES[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeInOut" }}
            className="inline-block whitespace-nowrap"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
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

      <span className="absolute right-3 top-3 z-[6] inline-flex border-2 border-[var(--ink)] bg-white p-1.5 text-[var(--ink)] transition-colors group-hover:bg-[var(--seido)] group-hover:text-white">
        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
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
        className="relative w-full pt-[var(--header-h)]"
        style={{ background: "var(--ink)", paddingBottom: "var(--gutter)" }}
        aria-label="Introduction"
      >
        <div
          className="grid w-full grid-cols-1 lg:grid-cols-12 lg:items-stretch"
          style={{ gap: "var(--gutter)", padding: "var(--gutter)" }}
        >
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
              <span className="mb-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--seido)" }} aria-hidden="true" />
                Pasig City, Philippines
              </span>

              <h1
                className="mb-3 leading-[0.95] tracking-tight text-[var(--ink)]"
                style={{ fontSize: "clamp(1.85rem, 5vw, 3.75rem)" }}
              >
                <span className="mb-1.5 block text-[0.32em] font-medium uppercase leading-normal tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                  Hi, I&apos;m
                </span>
                <span className="block">
                  <ScrambleName text={NAME} />
                </span>
              </h1>

              <RoleLine />

              <p className="max-w-[34rem] font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-[15px]">
                CS undergraduate from Pasig City building accessible, human-centered web
                products — from frontend interfaces to AI-assisted tools. I like shipping
                things that real people can actually use.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-1.5 border-2 border-[var(--ink)] bg-white p-2 shadow-[4px_4px_0_var(--ink)] sm:flex-nowrap">
                <a
                  href={SITE.cv}
                  download={SITE.cvFileName}
                  className="font-manga inline-flex flex-1 items-center justify-center gap-2 border-2 border-[var(--ink)] px-4 py-2.5 text-[11px] tracking-[0.18em] text-white transition-colors duration-150 hover:bg-[var(--ink)] sm:flex-none"
                  style={{ background: "var(--seido)" }}
                >
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  DOWNLOAD CV
                </a>

                <div className="flex items-center gap-1.5">
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

          <div
            ref={portraitRef}
            className="panel relative mx-auto aspect-square w-full max-w-[26rem] bg-white lg:col-span-5 lg:mx-0 lg:max-w-none lg:aspect-auto lg:h-auto lg:min-h-[400px]"
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
