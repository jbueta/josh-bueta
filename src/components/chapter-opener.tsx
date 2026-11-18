import React from "react";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { cn } from "@/lib/utils";

interface ChapterOpenerProps {
  /** Watermark numeral behind the opener, e.g. `03`. */
  act?: string;
  /** Small line above the title, e.g. `ORIGIN & RANKS`. */
  label: string;
  title: string;
  subtitle?: string;
  /** Overrides the watermark text. */
  ghost?: string;
  /** Right-hand info box or link. */
  meta?: React.ReactNode;
  className?: string;
}

/**
 * Shared section opener: one label, one title, one optional subtitle.
 */
export function ChapterOpener({
  act,
  label,
  title,
  subtitle,
  ghost,
  meta,
  className,
}: ChapterOpenerProps) {
  const watermark = ghost ?? act;

  return (
    <MangaPanelReveal direction="up">
      <div
        className={cn(
          "chapter-opener speed-lines relative w-full overflow-hidden",
          className,
        )}
        style={{ background: "var(--ink)" }}
      >
        <div className="canvas relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span
              className="font-manga slash-cut-right mb-3 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
              style={{ background: "var(--seido)" }}
            >
              {label}
            </span>
            <h2
              className="leading-none tracking-[0.04em] text-white"
              style={{ fontSize: "clamp(2.6rem, 6.2vw, 5.2rem)" }}
            >
              {title}
            </h2>
            {subtitle ? (
              <p
                className="font-manga mt-1.5 max-w-2xl text-balance tracking-[0.28em] text-white/60"
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
          {meta ? <div className="self-start sm:self-end">{meta}</div> : null}
        </div>

        {watermark ? (
          <div
            className="font-manga pointer-events-none absolute bottom-0 right-2 select-none leading-none tabular-nums"
            style={{
              fontSize: "clamp(3.75rem, 11vw, 8.5rem)",
              color: "rgba(255,255,255,0.042)",
            }}
            aria-hidden="true"
          >
            {watermark}
          </div>
        ) : null}
      </div>
    </MangaPanelReveal>
  );
}
