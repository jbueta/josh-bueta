"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience",     href: "#experience" },
    { name: "Projects",       href: "#projects" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-200 px-4 py-3 sm:px-8 border-b-4 border-[var(--ink)]",
          scrolled
            ? "bg-[var(--paper)]/96 backdrop-blur-md shadow-[0_4px_0_rgba(10,10,10,0.12)]"
            : "bg-[var(--paper)]"
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <a href="#" aria-label="Mark Joshua Bueta" className="relative group py-1 focus:outline-none">
            <span className="font-manga text-3xl sm:text-4xl tracking-widest text-[hsl(var(--foreground))] leading-none select-none">
              MJB
            </span>
            {/* Seido underline — single accent */}
            <span
              className="absolute bottom-0 left-0 w-full h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
              style={{ background: "var(--seido)" }}
              aria-hidden="true"
            />
          </a>

          {/* Desktop nav — ink-bordered pill */}
          <nav
            className="hidden md:flex items-center border-2 border-[hsl(var(--foreground))] overflow-hidden"
            aria-label="Main navigation"
          >
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "px-5 py-2 font-manga text-xs tracking-widest text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] transition-colors duration-150 select-none",
                  i < navLinks.length - 1 && "border-r-2 border-[hsl(var(--foreground))]"
                )}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Right: hamburger only (no theme toggle) */}
          <div className="flex items-center gap-2">

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden relative w-10 h-10 flex items-center justify-center border-2 border-[hsl(var(--foreground))] bg-transparent focus:outline-none"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45,  y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="absolute w-5 h-[2px] bg-[hsl(var(--foreground))] block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.14 }}
                className="absolute w-5 h-[2px] bg-[hsl(var(--foreground))] block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={{ duration: 0.18 }}
                className="absolute w-5 h-[2px] bg-[hsl(var(--foreground))] block"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay — ink panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: "-100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[49] flex flex-col items-start justify-center px-10 border-b-4 border-[hsl(var(--foreground))]"
            style={{ background: "hsl(var(--background))" }}
          >
            {/* Speed lines bg */}
            <div className="absolute inset-0 speed-lines opacity-40 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 screentone-fine opacity-50 pointer-events-none" aria-hidden="true" />

            <span className="font-manga text-[9px] tracking-[0.5em] text-[hsl(var(--muted-foreground))] mb-8 relative z-10 uppercase">
              Navigation
            </span>

            <nav className="flex flex-col gap-1 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x:  0 }}
                  exit={{   opacity: 0, x: -30 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.25 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-manga text-[clamp(2.5rem,10vw,4.5rem)] tracking-wide text-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] border-b-2 border-transparent hover:border-[hsl(var(--foreground))] leading-tight pb-1 transition-colors duration-100"
                  style={{ WebkitTextStroke: "0px" }}
                >
                  {link.name.toUpperCase()}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
