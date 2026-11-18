"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "left" | "right" | "up" | "none";

interface MangaPanelRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Position in a grid; multiplied by `stagger` instead of hand-set delays. */
  index?: number;
  /** Seconds between siblings. */
  stagger?: number;
}

/**
 * One shared IntersectionObserver drives every panel reveal.
 *
 * The previous implementation created a GSAP ScrollTrigger per panel (~22 on
 * the home page). This is one observer, honours `prefers-reduced-motion`, and
 * leaves content visible when JavaScript is unavailable.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.removeAttribute("data-reveal");
          element.setAttribute("data-revealed", "true");
          sharedObserver?.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
  }
  return sharedObserver;
}

export function MangaPanelReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  index = 0,
  stagger = 0.055,
}: MangaPanelRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const resolvedDelay = delay + Math.max(index, 0) * stagger;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.setAttribute("data-revealed", "true");
      return;
    }

    // Only hide panels that start below the fold; above-the-fold content and
    // no-JS visitors never see a blank page.
    const { top } = element.getBoundingClientRect();
    if (top < window.innerHeight * 0.92) {
      element.setAttribute("data-revealed", "true");
      return;
    }

    element.style.setProperty("--reveal-delay", `${resolvedDelay}s`);
    element.setAttribute("data-reveal", "pending");

    const observer = getObserver();
    if (!observer) {
      element.removeAttribute("data-reveal");
      return;
    }

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [resolvedDelay]);

  return (
    <div
      ref={ref}
      data-direction={direction}
      className={cn("panel-reveal", className)}
    >
      {children}
    </div>
  );
}
