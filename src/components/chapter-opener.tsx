import React from "react";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { actKicker } from "@/content/site";
import { cn } from "@/lib/utils";

interface ChapterOpenerProps {
  /** `01`–`05`, or `INT` for the arsenal interlude. */
  act: string;
  /** Short right-hand label, e.g. `ORIGIN & RANKS`. */
  label: string;
  title: string;
  subtitle?: string;
  /** Ghost numeral; defaults to the act code. `TECH` for the interlude. */
  ghost?: string;
  /** Right-hand info box or link. */
  meta?: React.ReactNode;
  className?: string;
}

/**
 * One chapter opener for the whole portfolio.
 *
 * Each section used to hand-roll its own: five copies with ghost numerals at
 * 0.038/0.04/0.045, two different clamp ranges, three subtitle sizes and one
 * white variant. They now share padding, type scale and watermark.
 */
export function ChapterOpener({
  act,
  label,
  title,
  subtitle,
  ghost = act,
  meta,
  className,
}: ChapterOpenerProps) {
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
              {actKicker(act)}{" // "}{label}
            </span>
            <h2
              className="font-manga leading-none text-white"
              style={{ fontSize: "clamp(2.6rem, 6.2vw, 5.2rem)" }}
            >
              {title}
            </h2>
            {subtitle ? (
              <p
                className="font-manga mt-1.5 max-w-2xl text-balance tracking-[0.28em] text-white/60"
                /* Floors at 13.6px: at 12px it matched body copy, which left the
                   opener with only two visible type steps on phones. */
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
          {meta ? <div className="self-start sm:self-end">{meta}</div> : null}
        </div>

        <div
          className="font-manga pointer-events-none absolute bottom-0 right-2 select-none leading-none tabular-nums"
          style={{
            fontSize: "clamp(3.75rem, 11vw, 8.5rem)",
            color: "rgba(255,255,255,0.042)",
          }}
          aria-hidden="true"
        >
          {ghost}
        </div>
      </div>
    </MangaPanelReveal>
  );
}
