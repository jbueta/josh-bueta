"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/content/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [observedSection, setObservedSection] = useState<string | null>(null);
  const pathname = usePathname();
  // On sub-pages the home anchors do not exist, so nothing is highlighted.
  const activeSection = pathname === "/" ? observedSection : null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy: only on the home page where the sections exist.
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.section),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setObservedSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Mobile menu: Escape to close and background scroll lock.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:border-2 focus:border-[var(--ink)] focus:bg-white focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-[var(--ink)]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b-4 border-[var(--ink)] px-4 py-3 transition-all duration-200 sm:px-8",
          scrolled
            ? "bg-[var(--paper)]/96 shadow-[0_4px_0_rgba(10,10,10,0.12)] backdrop-blur-md"
            : "bg-[var(--paper)]",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <a
            href={pathname === "/" ? "#main-content" : "/"}
            aria-label={`${SITE.name} — home`}
            className="group relative shrink-0 py-1 focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
          >
            <span className="font-manga select-none text-3xl leading-none tracking-widest text-[hsl(var(--foreground))] sm:text-4xl">
              {SITE.shortName}
            </span>
            <span
              className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
              style={{ background: "var(--seido)" }}
              aria-hidden="true"
            />
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden overflow-hidden border-2 border-[hsl(var(--foreground))] md:flex"
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.section;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "font-manga px-3 py-2 text-[11px] tracking-widest transition-colors duration-150 select-none lg:px-4",
                    index < NAV_LINKS.length - 1 &&
                      "border-r-2 border-[hsl(var(--foreground))]",
                    isActive
                      ? "text-white"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]",
                  )}
                  style={isActive ? { background: "var(--seido)" } : undefined}
                >
                  {link.name.toUpperCase()}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={pathname === "/" ? "#contact" : "/#contact"}
              className="font-manga hidden shrink-0 border-2 border-[var(--ink)] px-3 py-2 text-[10px] tracking-[0.25em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none lg:block"
              style={{ background: "var(--seido)" }}
            >
              HIRE ME
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center border-2 border-[hsl(var(--foreground))] bg-transparent focus-visible:outline-4 focus-visible:outline-[var(--seido)] md:hidden"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="absolute block h-[2px] w-5 bg-[hsl(var(--foreground))]"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.14 }}
                className="absolute block h-[2px] w-5 bg-[hsl(var(--foreground))]"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={{ duration: 0.18 }}
                className="absolute block h-[2px] w-5 bg-[hsl(var(--foreground))]"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[49] flex flex-col items-start justify-center border-b-4 border-[hsl(var(--foreground))] px-10"
            style={{ background: "hsl(var(--background))" }}
          >
            <div className="speed-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="screentone-fine pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

            <span className="font-manga relative z-10 mb-8 text-[9px] uppercase tracking-[0.5em] text-[hsl(var(--muted-foreground))]">
              Navigation
            </span>

            <nav aria-label="Mobile navigation" className="relative z-10 flex flex-col gap-1">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.06 + index * 0.06, duration: 0.25 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-manga border-b-2 border-transparent pb-1 text-[clamp(2.5rem,10vw,4.5rem)] leading-tight tracking-wide text-[hsl(var(--foreground))] transition-colors duration-100 hover:border-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
                >
                  {link.name.toUpperCase()}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href={SITE.cv}
              download={SITE.cvFileName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.25 }}
              className="font-manga relative z-10 mt-8 inline-flex border-2 border-[var(--ink)] px-4 py-2 text-[10px] tracking-[0.3em] text-white"
              style={{ background: "var(--seido)" }}
            >
              DOWNLOAD CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
