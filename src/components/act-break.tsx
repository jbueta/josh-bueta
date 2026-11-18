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
      <span className="font-manga shrink-0 text-[10px] tracking-[0.5em] text-white/45">
        TO BE CONTINUED
      </span>
      <span className="font-manga shrink-0 border-2 border-white/25 px-2.5 py-1 text-[10px] tracking-[0.35em] text-white/75">
        NEXT // {next} {label.toUpperCase()}
      </span>
      <span className="act-break-rule" />
    </div>
  );
}
