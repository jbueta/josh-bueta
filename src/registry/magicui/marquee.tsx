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
        "flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:bg-white dark:hover:bg-zinc-800/80 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none",
        className
      )}
    >
      <div className="flex items-center justify-center w-9 h-9 p-1.5 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 font-mono">
          {name}
        </span>
        {category && (
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
