"use client";

import React, { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import { formatSyncStamp } from "@/lib/format";
import type { ContributionData, DatasetMeta } from "@/lib/github";
import { SITE } from "@/content/site";

interface ContributionGraphProps {
  data: ContributionData | null;
  meta: DatasetMeta;
  className?: string;
}

type Day = ContributionData["days"][number];

/** One coherent five-step navy ramp; no arbitrary blues. */
const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-[var(--seido-0)] border border-white/10",
  1: "bg-[var(--seido-1)] border border-white/10",
  2: "bg-[var(--seido-2)] border border-white/15",
  3: "bg-[var(--seido-3)] border border-white/20",
  4: "bg-[var(--seido-4)] border border-white/40",
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return DATE_FORMAT.format(new Date(Date.UTC(year, month - 1, day)));
}

/**
 * Groups days into Sunday-started calendar weeks (GitHub's layout).
 *
 * Each entry is a whole week, so column and row indices are known up front and
 * a month label belongs to a *column*, not to a day cell.
 */
function groupWeeks(days: Day[]): (Day | null)[][] {
  if (days.length === 0) return [];

  const ordered = [...days].sort((a, b) => a[0].localeCompare(b[0]));
  const weeks: (Day | null)[][] = [];

  const firstWeekday = new Date(`${ordered[0][0]}T00:00:00Z`).getUTCDay();
  let week: (Day | null)[] = Array.from({ length: firstWeekday }, () => null);

  for (const day of ordered) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

const firstDayOf = (week: (Day | null)[] | undefined): Day | null =>
  week?.find((day): day is Day => day !== null) ?? null;

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** 18 columns keeps the squares legible on a phone; below that they turn to mush. */
const SMALL_QUERY = "(max-width: 639px)";
const SMALL_WEEKS = 18;

function subscribeSmall(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(SMALL_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSmallSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(SMALL_QUERY).matches;
}

export function ContributionGraph({
  data,
  meta,
  className,
}: ContributionGraphProps) {
  const [active, setActive] = useState<{ date: string; count: number } | null>(null);
  const [focusedDay, setFocusedDay] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isSmall = useSyncExternalStore(subscribeSmall, getSmallSnapshot, () => false);

  const weeks = useMemo(() => (data ? groupWeeks(data.days) : []), [data]);
  const visibleWeeks = useMemo(
    () => (isSmall ? weeks.slice(-SMALL_WEEKS) : weeks),
    [isSmall, weeks],
  );

  const weekColumns = Math.max(visibleWeeks.length, 1);
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${weekColumns}, minmax(0, 1fr))`,
  };

  /**
   * One label per week column, shown only when the month actually turns over
   * and never closer than three columns to the previous label. The old code
   * emitted a label per *day cell* and placed the 180+ of them by grid column
   * index, which blew the grid out and pushed the whole calendar sideways.
   */
  const monthLabels = useMemo(() => {
    // Built with an index loop rather than map(): the spacing rule needs to
    // remember the last labelled column, and mutating that from inside a
    // callback trips react-hooks/immutability.
    const labels: string[] = Array.from(
      { length: visibleWeeks.length },
      () => "",
    );
    let lastShown = -99;
    for (let column = 0; column < visibleWeeks.length; column += 1) {
      const first = firstDayOf(visibleWeeks[column]);
      if (!first) continue;
      const month = Number(first[0].slice(5, 7)) - 1;
      const previous = firstDayOf(visibleWeeks[column - 1]);
      const previousMonth = previous ? Number(previous[0].slice(5, 7)) - 1 : -1;
      if (month === previousMonth || column - lastShown < 3) continue;
      lastShown = column;
      labels[column] = MONTH_ABBR[month];
    }
    return labels;
  }, [visibleWeeks]);

  const flat = useMemo(
    () =>
      visibleWeeks.flatMap((week, column) =>
        Array.from({ length: 7 }, (_, dayInWeek) => ({
          column,
          dayInWeek,
          day: week[dayInWeek] ?? null,
        })),
      ),
    [visibleWeeks],
  );

  const sourceBadge =
    meta.source === "live"
      ? { label: "LIVE", className: "bg-white text-[var(--ink)]" }
      : { label: "CACHED", className: "bg-white/20 text-white" };

  const total = data?.total ?? 0;

  function focusDay(iso: string) {
    const node = gridRef.current?.querySelector<HTMLElement>(`[data-day="${iso}"]`);
    if (!node) return;
    node.focus();
    setFocusedDay(iso);
  }

  function moveFocus(from: string, delta: number) {
    const index = flat.findIndex(({ day }) => day !== null && day[0] === from);
    if (index === -1) return;
    // Step past padded cells so focus always lands on a real day.
    let next = index + delta;
    while (next >= 0 && next < flat.length && flat[next]?.day == null) next += delta;
    const candidate = next >= 0 && next < flat.length ? flat[next]?.day ?? null : null;
    if (candidate) focusDay(candidate[0]);
  }

  function onCellKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const day = flat.find((cell) => cell.day !== null && cell.day[0] === focusedDay)?.day;
    if (!day) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveFocus(day[0], event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(day[0], event.key === "ArrowUp" ? -7 : 7);
    } else if (event.key === "Home") {
      event.preventDefault();
      const first = flat.find((cell) => cell.day !== null)?.day;
      if (first) focusDay(first[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      const last = flat.findLast((cell) => cell.day !== null)?.day;
      if (last) focusDay(last[0]);
    }
  }

  return (
    <div
      className={cn(
        "relative w-full select-none overflow-hidden bg-[var(--paper)] p-4 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm tracking-widest text-[var(--ink)] sm:text-base">
            {data ? (
              <>
                <span className="tabular-nums" style={{ color: "var(--seido)" }}>
                  {total}
                </span>{" "}
                CONTRIBUTIONS {isSmall ? "IN 18 WEEKS" : "IN THE LAST YEAR"}
              </>
            ) : (
              "CONTRIBUTION SYNC UNAVAILABLE"
            )}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            SYNCED {formatSyncStamp(meta.syncedAt)} ·{" "}
            {meta.source === "live" ? "GITHUB API" : "REPO SNAPSHOT"}
          </p>
        </div>
        <span
          className={cn(
            "font-manga border-2 border-[var(--ink)] px-2 py-0.5 text-[10px] tracking-[0.3em] tabular-nums",
            sourceBadge.className,
          )}
        >
          {sourceBadge.label}
        </span>
      </div>

      {data ? (
        <>
          <div className="sr-only">
            Contribution calendar: {total} contributions. Focus a visible day and use the
            arrow keys to move between dates; Home and End jump to the first and last day
            shown.
          </div>

          <div className="relative w-full border-2 border-[var(--ink)] bg-[#0a0a0a] px-2.5 pb-3 pt-2 sm:px-4 sm:pb-4">
            <div className="w-full pb-1 pt-9 sm:pt-10">
              {/* Month labels: one per week column, same track as the squares. */}
              <div className="mb-1.5 flex w-full" aria-hidden="true">
                <div className="w-7 shrink-0 sm:w-8" />
                <div
                  className="grid min-w-0 flex-1 gap-[2px] font-mono text-[9px] leading-none text-white/60 sm:gap-1 sm:text-[10px]"
                  style={gridStyle}
                >
                  {monthLabels.map((label, column) => (
                    <span
                      key={column}
                      className="whitespace-nowrap pl-[1px] text-left"
                      style={{ gridColumnStart: column + 1 }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-stretch">
                <div
                  className="relative w-7 shrink-0 pr-2 font-mono text-[9px] text-white/55 sm:w-8 sm:text-[10px]"
                  aria-hidden="true"
                >
                  {["Mon", "Wed", "Fri"].map((label, index) => (
                    <span
                      key={label}
                      className="absolute right-2 -translate-y-1/2 leading-none"
                      style={{ top: `${(((index * 2 + 1) / 7) * 100).toFixed(2)}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div
                  ref={gridRef}
                  role="grid"
                  aria-label="Contribution days"
                  className="grid min-w-0 flex-1 gap-[2px] sm:gap-1"
                  style={gridStyle}
                >
                  {flat.map(({ column, dayInWeek, day }) =>
                    day ? (
                      <button
                        key={day[0]}
                        type="button"
                        tabIndex={focusedDay === day[0] ? 0 : -1}
                        data-day={day[0]}
                        aria-label={`${day[1]} contribution${day[1] === 1 ? "" : "s"} on ${formatDay(day[0])}`}
                        onMouseEnter={() => setActive({ date: day[0], count: day[1] })}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => {
                          setFocusedDay(day[0]);
                          setActive({ date: day[0], count: day[1] });
                        }}
                        onBlur={() => {
                          setActive(null);
                          setFocusedDay(null);
                        }}
                        onKeyDown={onCellKeyDown}
                        className={cn(
                          "relative aspect-square w-full min-w-0 cursor-pointer rounded-none transition-transform duration-150 hover:scale-110",
                          LEVEL_CLASS[day[2] as 0 | 1 | 2 | 3 | 4],
                        )}
                      >
                        {active?.date === day[0] && (
                          <span
                            className={cn(
                              "pointer-events-none absolute bottom-full z-50 mb-2 whitespace-nowrap border-2 border-white bg-[#0a0a0a] px-2.5 py-1 font-mono text-[10px] font-medium text-white shadow-lg sm:px-3 sm:py-1.5 sm:text-[11px]",
                              column < 3
                                ? "left-0"
                                : column > weekColumns - 4
                                  ? "right-0"
                                  : "left-1/2 -translate-x-1/2",
                            )}
                          >
                            <span className="font-bold" style={{ color: "#8fb6ff" }}>
                              {day[1] === 0 ? "No" : day[1]} contribution
                              {day[1] === 1 ? "" : "s"}
                            </span>{" "}
                            on {formatDay(day[0])}
                          </span>
                        )}
                      </button>
                    ) : (
                      <span
                        key={`pad-${column}-${dayInWeek}`}
                        aria-hidden="true"
                        className="aspect-square w-full min-w-0"
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end border-t border-white/15 pt-2.5 font-mono text-[10px] text-white/60 sm:text-[11px]">
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={cn("h-3 w-3", LEVEL_CLASS[level as 0 | 1 | 2 | 3 | 4])}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-start gap-3 border-2 border-[var(--ink)] bg-white p-5 shadow-[4px_4px_0_var(--ink)]">
          <p className="max-w-md font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
            GitHub did not return the contribution calendar for this sync. Rather than
            drawing an estimated grid, this panel stays empty — the live calendar is one
            click away.
          </p>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-[var(--ink)] px-3 py-1.5 text-[10px] tracking-[0.3em] text-white transition-colors hover:bg-[var(--seido)]"
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            VIEW @{SITE.githubUsername.toUpperCase()}
          </a>
        </div>
      )}
    </div>
  );
}
