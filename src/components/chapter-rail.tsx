"use client";

import React, { useEffect, useState } from "react";
import { ACTS } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky chapter index.
 *
 * Codes come from the shared `ACTS` list, so the rail can no longer disagree
 * with the chapter openers (it used to number Background 01 while the page
 * called it ACT. 02). Only rendered on screens wide enough to keep it clear of
 * the 80rem canvas.
 */
export function ChapterRail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ACTS.map(({ section }) =>
      document.getElementById(section),
    ).filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapter index"
      className="chapter-rail fixed left-3 top-1/2 z-40 -translate-y-1/2 gap-1.5 print:hidden"
    >
      {ACTS.map(({ code, name, section, href, interlude }) => {
        const isActive = active === section;
        return (
          <a
            key={code}
            href={href}
            aria-current={isActive ? "location" : undefined}
            aria-label={`${code} — ${name}`}
            className={cn(
              "font-manga group relative flex h-8 w-9 items-center justify-center border-2 text-[10px] transition-colors duration-150",
              interlude ? "tracking-normal" : "tracking-widest",
              isActive
                ? "border-[var(--seido)] bg-[var(--seido)] text-white shadow-[2px_2px_0_var(--seido-quiet)]"
                : "border-[var(--ink)] bg-[var(--paper)]/95 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
            )}
          >
            {code}
            <span className="font-manga pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap border-2 border-[var(--ink)] bg-[var(--ink)] px-2 py-1 text-[10px] tracking-[0.3em] text-white group-hover:block group-focus-visible:block">
              {name.toUpperCase()}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
