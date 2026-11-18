import React from "react";

interface ActBreakProps {
  /** Code of the act that follows, e.g. `03` or `INT`. */
  next: string;
  label: string;
}

/**
 * Chapter break between acts.
 *
 * Decorative (the next opener repeats the same information), but it gives the
 * page a beat: every section used to butt directly against the 6px ink gutter.
 */
export function ActBreak({ next, label }: ActBreakProps) {
  return (
    <div className="act-break" aria-hidden="true">
      <span className="act-break-rule" />
      {/* Both labels are shrink-0, so on narrow phones the longer one is
          dropped rather than pushing the strip past the viewport. */}
      <span className="font-manga hidden shrink-0 text-[10px] tracking-[0.5em] text-[var(--ink)]/45 sm:inline">
        TO BE CONTINUED
      </span>
      <span className="font-manga shrink-0 border-2 border-[var(--ink)]/25 px-2.5 py-1 text-[10px] tracking-[0.22em] text-[var(--ink)]/75 sm:tracking-[0.35em]">
        NEXT // {next} {label.toUpperCase()}
      </span>
      <span className="act-break-rule" />
    </div>
  );
}
