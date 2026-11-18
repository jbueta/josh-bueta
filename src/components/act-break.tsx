import React from "react";

interface ActBreakProps {
  label: string;
}

/**
 * Rule between two sections.
 */
export function ActBreak({ label }: ActBreakProps) {
  return (
    <div className="act-break" aria-hidden="true">
      <span className="act-break-rule" />
      <span className="font-manga shrink-0 border-2 border-[var(--ink)]/25 px-2.5 py-1 text-[10px] tracking-[0.22em] text-[var(--ink)]/75 sm:tracking-[0.35em]">
        {label.toUpperCase()}
      </span>
      <span className="act-break-rule" />
    </div>
  );
}
