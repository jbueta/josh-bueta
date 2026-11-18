"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { actCodeForSection, NAV_LINKS, SITE } from "@/content/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [observedSection, setObservedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const onProjectFile = pathname.startsWith("/projects");
  // Case files belong to chapter 03, so the header is not blank on them.
  const activeSection =
    pathname === "/" ? observedSection : onProjectFile ? "projects" : null;
  const chapterCode = actCodeForSection(activeSection);
  const showChapter = pathname === "/" || onProjectFile;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  // Mobile menu: Escape to close, background scroll lock, focus trap and
  // focus restoration. Previously Tab walked into the page behind the overlay.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Capture the toggle now: reading the ref inside cleanup warns, and the
    // button is the same node for the life of the menu.
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const first = menuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      first?.focus();
    }, 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
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
        <div className="canvas flex items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={pathname === "/" ? "#main-content" : "/"}
              aria-label={`${SITE.name} — home`}
              className="group relative py-1 focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
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

            {showChapter && (
              <span
                className="font-manga hidden border-2 border-[var(--ink)] bg-[var(--ink)] px-1.5 py-0.5 text-[10px] tracking-[0.2em] text-white tabular-nums sm:inline-block"
                aria-hidden="true"
              >
                CH. {chapterCode}
              </span>
            )}
          </div>

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
              className="font-manga hidden shrink-0 border-2 border-[var(--ink)] px-3 py-2 text-[10px] tracking-[0.25em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none md:block"
              style={{ background: "var(--seido)" }}
            >
              HIRE ME
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center border-2 border-[hsl(var(--foreground))] bg-transparent focus-visible:outline-4 focus-visible:outline-[var(--seido)] md:hidden"
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

        {/* Scroll progress, drawn over the 4px ink border. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-1 bg-[var(--seido)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[49] flex flex-col overflow-y-auto border-b-4 border-[hsl(var(--foreground))] px-10 pb-16 pt-[calc(var(--header-h)+1.5rem)]"
            style={{ background: "hsl(var(--background))" }}
          >
            <div className="speed-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="screentone-fine pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

            <div className="relative z-10 my-auto flex w-full flex-col items-start gap-2">
              <span className="font-manga mb-6 text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--muted-foreground))]">
                Navigation
              </span>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.06 + index * 0.06, duration: 0.25 }}
                    onClick={() => setMobileMenuOpen(false)}
                    /* Hover paints Seido: the old rule turned the label white on
                       a white overlay, so the item vanished under the cursor.
                       Focus/active mirror it — touch devices rarely fire hover. */
                    className="font-manga flex items-baseline gap-3 border-b-2 border-transparent pb-1 text-[clamp(2.5rem,10vw,4.5rem)] leading-tight tracking-wide text-[hsl(var(--foreground))] transition-colors duration-150 hover:border-[var(--seido)] hover:text-[var(--seido)] focus-visible:border-[var(--seido)] focus-visible:text-[var(--seido)] focus-visible:outline-none active:border-[var(--seido)] active:text-[var(--seido)]"
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.24em] text-[var(--seido)]/35"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{link.name.toUpperCase()}</span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href={SITE.cv}
                download={SITE.cvFileName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.25 }}
                className="font-manga mt-8 inline-flex border-2 border-[var(--ink)] px-4 py-2 text-[10px] tracking-[0.3em] text-white"
                style={{ background: "var(--seido)" }}
              >
                DOWNLOAD CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
