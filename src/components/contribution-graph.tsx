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

function formatStamp(iso: string): string {
  return formatSyncStamp(iso);
}

/**
 * Groups days into Sunday-started calendar weeks (GitHub's layout).
 *
 * The series is sorted defensively and the first week is padded, so the grid
 * rows really are Mon…Sun and a single column is one week. Slicing the raw
 * array every 7 entries assumed the source was already sorted and aligned.
 */
function groupWeeks(days: ContributionData["days"]): (ContributionData["days"][number] | null)[] {
  if (days.length === 0) return [];

  const ordered = [...days].sort((a, b) => a[0].localeCompare(b[0]));
  const weeks: (ContributionData["days"][number] | null)[] = [];
  let week: (ContributionData["days"][number] | null)[] = [];

  const firstWeekday = new Date(`${ordered[0][0]}T00:00:00Z`).getUTCDay();
  for (let pad = 0; pad < firstWeekday; pad += 1) week.push(null);

  for (const day of ordered) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(...week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(...week);
  }

  return weeks;
}

/** Flatten the week grid into one row for roving tabindex and arrow-key moves. */
function flattenWeeks(weeks: (ContributionData["days"][number] | null)[]): {
  week: number;
  dayInWeek: number;
  day: ContributionData["days"][number] | null;
}[] {
  const flat: { week: number; dayInWeek: number; day: ContributionData["days"][number] | null }[] = [];
  for (let w = 0; w < weeks.length; w += 7) {
    for (let d = 0; d < 7; d += 1) {
      flat.push({ week: w, dayInWeek: d, day: weeks[w + d] ?? null });
    }
  }
  return flat;
}

const firstDay = (week: (ContributionData["days"][number] | null)[]): ContributionData["days"][number] | null =>
  week.find((day): day is ContributionData["days"][number] => day !== null) ?? null;

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

const SMALL_QUERY = "(max-width: 639px)";

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
  /** Only the last 26 weeks so the grid fits a small phone without a scroll box. */
  const visibleWeeks = isSmall ? weeks.slice(-26) : weeks;

  const flat: { week: number; dayInWeek: number; day: ContributionData["days"][number] | null }[] =
    useMemo(() => flattenWeeks(visibleWeeks), [visibleWeeks]);

  const monthLabels = useMemo(
    () =>
      flat.map(({ week, dayInWeek }) => {
        const first = firstDay(visibleWeeks.slice(week, week + 7));
        if (!first) return "";
        const month = Number(first[0].slice(5, 7)) - 1;
        const previousWeek = week - 7;
        const previous = previousWeek >= 0 ? firstDay(visibleWeeks.slice(previousWeek, previousWeek + 7)) : null;
        const previousMonth = previous ? Number(previous[0].slice(5, 7)) - 1 : -1;
        return month !== previousMonth ? MONTH_ABBR[month] : "";
      }),
    [visibleWeeks],
  );

  const weekColumns = Math.max(visibleWeeks.length, 1);
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${weekColumns}, minmax(0, 1fr))`,
  };

  const sourceBadge =
    meta.source === "live"
      ? { label: "LIVE", className: "bg-white text-[var(--ink)]" }
      : { label: "CACHED", className: "bg-white/20 text-white" };

  const total = data?.total ?? 0;

  function moveFocus(from: string, delta: number) {
    const target = flat.find(({ day }) => day !== null && day[0] === from);
    if (!target) return;
    const index = flat.findIndex(({ day }) => day !== null && day[0] === from);
    let next = index;
    if (delta < 0) {
      while (next > 0 && flat[next - 1].day === null) next -= 1;
      next -= 1;
    } else {
      while (next < flat.length - 1 && flat[next + 1].day === null) next += 1;
      next += 1;
    }
    const { week, dayInWeek } = flat[next] ?? target;
    const candidate = visibleWeeks[week + dayInWeek];
    if (candidate === null) return;
    const node = gridRef.current?.querySelector<HTMLElement>(`[data-day="${candidate[0]}"]`);
    if (node) {
      node.focus();
      setFocusedDay(candidate[0]);
    }
  }

  function onCellKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const day = flat.find((f) => f.day !== null && f.day[0] === focusedDay)?.day;
    if (day === null) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveFocus(day[0], event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(day[0], event.key === "ArrowUp" ? -7 : 7);
    } else if (event.key === "Home") {
      event.preventDefault();
      const first = flat.find((f) => f.day !== null)?.day;
      if (first) {
        const node = gridRef.current?.querySelector<HTMLElement>(`[data-day="${first[0]}"]`);
        node?.focus();
        setFocusedDay(first[0]);
      }
    } else if (event.key === "End") {
      event.preventDefault();
      const last = flat.findLast((f) => f.day !== null)?.day;
      if (last) {
        const node = gridRef.current?.querySelector<HTMLElement>(`[data-day="${last[0]}"]`);
        node?.focus();
        setFocusedDay(last[0]);
      }
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
          <h3 className="font-manga text-sm tracking-widest text-[var(--ink)] sm:text-base">
            {data ? (
              <>
                <span className="text-[var(--seido)] tabular-nums">{total}</span>{" "}
                CONTRIBUTIONS IN THE LAST YEAR
              </>
            ) : (
              "CONTRIBUTION SYNC UNAVAILABLE"
            )}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            SYNCED {formatStamp(meta.syncedAt)} · {meta.source === "live" ? "GITHUB API" : "REPO SNAPSHOT"}
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
            Contribution calendar for the last year: {total} contributions. On a visible
            day, focus it and use the arrow keys to move between dates; Home and End jump
            to the first and last day shown.
          </div>

          <div className="relative w-full border-2 border-[var(--ink)] bg-[#0a0a0a] p-3 sm:p-4">
            {/* pt-10 reserves room inside the scroll box for the top row's
                tooltip, which would otherwise be clipped by overflow. */}
            <div className="w-full overflow-x-auto overflow-y-hidden pb-2 pt-10">
              <div className="flex w-full min-w-[560px] sm:min-w-[680px] flex-col">
                <div className="mb-2 flex w-full">
                  <div className="w-8 shrink-0 pr-3" aria-hidden="true" />
                  <div
                    className="grid w-full flex-1 gap-[3px] font-mono text-[11px] text-white/65 sm:gap-[4px]"
                    style={gridStyle}
                    aria-hidden="true"
                  >
                    {monthLabels.map((label, index) => (
                      <span
                        key={index}
                        className="min-w-0 whitespace-nowrap text-left"
                        style={{ gridColumnStart: index + 1 }}
                      >
                        {label}
                      </span>
                    ))}
                    {isSmall ? (
                      <span
                        className="min-w-0 whitespace-nowrap text-left text-[hsl(var(--muted-foreground))]"
                        style={{ gridColumnStart: weekColumns + 1, writingMode: "vertical-rl" }}
                      >
                        LAST 6 MONTHS ({String(visibleWeeks.length).padStart(2, "0")} WEEKS)
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex w-full items-stretch">
                  <div
                    className="grid w-8 shrink-0 gap-[3px] pr-3 font-mono text-[11px] text-white/65 sm:gap-[4px]"
                    aria-hidden="true"
                    style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
                  >
                    <span />
                    <span>Mon</span>
                    <span />
                    <span>Wed</span>
                    <span />
                    <span>Fri</span>
                    <span />
                  </div>

                  <div
                    ref={gridRef}
                    role="grid"
                    aria-label="Contribution days"
                    className="grid w-full flex-1 gap-[3px] sm:gap-[4px]"
                    style={gridStyle}
                  >
                    {flat.map(({ week, dayInWeek, day }) =>
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
                            "relative aspect-square min-h-[10px] min-w-[10px] cursor-pointer rounded-none transition-all duration-200 hover:scale-125",
                            LEVEL_CLASS[day[2] as 0 | 1 | 2 | 3 | 4],
                          )}
                        >
                          {active?.date === day[0] && (
                            <span
                              className={cn(
                                "pointer-events-none absolute bottom-full z-50 mb-2.5 whitespace-nowrap border-2 border-white bg-[#0a0a0a] px-3 py-1.5 font-mono text-[11px] font-medium text-white",
                                week > 36
                                  ? "right-0"
                                  : week < 6
                                    ? "left-0"
                                    : "left-1/2 -translate-x-1/2",
                              )}
                            >
                              <span className="font-bold text-[#60a5fa]">
                                {day[1] === 0 ? "No" : day[1]} contribution
                                {day[1] === 1 ? "" : "s"}
                              </span>{" "}
                              on {formatDay(day[0])}
                            </span>
                          )}
                        </button>
                      ) : (
                        <span
                          key={`pad-${week}-${dayInWeek}`}
                          aria-hidden="true"
                          className="aspect-square min-h-[10px] min-w-[10px]"
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-end border-t border-white/15 pt-3 font-mono text-[11px] text-white/65">
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
