"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          // Copies 2..n exist only to make the loop seamless; screen readers
          // used to announce the whole arsenal four times.
          aria-hidden={i > 0 ? true : undefined}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

interface TechCardProps {
  icon: React.ReactNode;
  name: string;
  category?: string;
  className?: string;
}

export function TechCard({ icon, name, category, className }: TechCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 border-2 border-[var(--ink)] bg-white hover:bg-[var(--ink)] group transition-colors duration-150 shadow-[2px_2px_0_var(--ink)] cursor-pointer select-none",
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 p-1 shrink-0 bg-[var(--paper)] border border-[var(--ink)]/30">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-manga tracking-widest text-[var(--ink)] group-hover:text-white">
          {name.toUpperCase()}
        </span>
        {category && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] group-hover:text-white/65">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
