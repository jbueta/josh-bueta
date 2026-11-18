import React from "react";
import { cn } from "@/lib/utils";

type SlashVariant = "both" | "bottom-left" | "top-right";

interface MangaSlashAccentProps {
  variant?: SlashVariant;
  className?: string;
}

/**
 * G-pen action slashes used on chapter openers and featured panels.
 * Purely decorative: hidden from assistive technology and never interactive.
 *
 * `preserveAspectRatio="none"` stretches the viewBox to the panel, so every
 * line carries `vectorEffect="non-scaling-stroke"` — otherwise the same 3px
 * stroke renders hairlines on wide panels and slabs on tall ones.
 */
export function MangaSlashAccent({
  variant = "both",
  className,
}: MangaSlashAccentProps) {
  const showBottomLeft = variant === "both" || variant === "bottom-left";
  const showTopRight = variant === "both" || variant === "top-right";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full select-none",
        className,
      )}
      fill="none"
    >
      {showTopRight && (
        <g strokeLinecap="square">
          <line x1="360" y1="-20" x2="600" y2="132" stroke="var(--ink)" strokeWidth="3" opacity="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="384" y1="-20" x2="600" y2="96" stroke="var(--ink)" strokeWidth="1.5" opacity="0.3" vectorEffect="non-scaling-stroke" />
          <line x1="330" y1="-20" x2="600" y2="178" stroke="var(--seido)" strokeWidth="4" opacity="0.55" vectorEffect="non-scaling-stroke" />
          <line x1="430" y1="-20" x2="600" y2="50" stroke="var(--ink)" strokeWidth="1" opacity="0.22" vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {showBottomLeft && (
        <g strokeLinecap="square">
          <line x1="-20" y1="320" x2="196" y2="150" stroke="var(--ink)" strokeWidth="3" opacity="0.45" vectorEffect="non-scaling-stroke" />
          <line x1="-20" y1="272" x2="152" y2="150" stroke="var(--ink)" strokeWidth="1.4" opacity="0.28" vectorEffect="non-scaling-stroke" />
          <line x1="28" y1="320" x2="236" y2="150" stroke="var(--seido)" strokeWidth="4" opacity="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="-20" y1="228" x2="112" y2="150" stroke="var(--ink)" strokeWidth="1" opacity="0.2" vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </svg>
  );
}
