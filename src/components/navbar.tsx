"use client";

import React, { useState, useEffect } from "react";
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 py-3 sm:px-8",
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Pure Typography Initials Logo MJB without container */}
        <a
          href="#"
          aria-label="Mark Joshua Bueta Initials Logo"
          className="group flex items-center focus:outline-none py-1 overflow-visible"
        >
          <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block leading-none">
            MJB
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 font-sans"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggler */}
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  );
}
