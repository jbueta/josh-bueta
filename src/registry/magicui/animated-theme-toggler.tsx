"use client";

import * as React from "react";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps {
  className?: string;
}

/**
 * Single-mode Manga Paper & Ink badge (night mode disabled).
 */
export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  return (
    <div
      aria-label="Manga Paper Light Mode Active"
      className={cn(
        "relative flex items-center justify-center w-10 h-10 border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] select-none",
        className
      )}
    >
      <Sun className="w-4 h-4" />
    </div>
  );
}
