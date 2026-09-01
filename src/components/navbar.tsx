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
        {/* Left: Initials Logo MJB Navy Sapphire gradient */}
        <a
          href="#"
          className="group flex items-center font-mono font-extrabold text-xl tracking-wider text-zinc-900 dark:text-zinc-100 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-[2px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 font-black text-sm">
                MJB
              </span>
            </div>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
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
