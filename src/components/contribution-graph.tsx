"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import type { ContributionData, DatasetMeta } from "@/lib/github";
import { SITE } from "@/content/site";

interface ContributionGraphProps {
  data: ContributionData | null;
  meta: DatasetMeta;
  className?: string;
}

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-[#1a1a1a] border border-white/10",
  1: "bg-[rgba(0,48,135,0.55)] border border-[rgba(0,48,135,0.75)]",
  2: "bg-[#003087] border border-[#1d4ed8]",
  3: "bg-[#2563eb] border border-[#60a5fa]",
  4: "bg-white border border-white shadow-[0_0_6px_rgba(255,255,255,0.65)]",
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
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "UNKNOWN";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .toUpperCase();
}

/** Groups days into calendar weeks (GitHub's calendar starts on Sunday). */
function groupWeeks(days: ContributionData["days"]) {
  const weeks: ContributionData["days"][] = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }
  return weeks;
}

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function ContributionGraph({
  data,
  meta,
  className,
}: ContributionGraphProps) {
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

  const weeks = useMemo(() => (data ? groupWeeks(data.days) : []), [data]);

  const monthLabels = useMemo(
    () =>
      weeks.map((week, index) => {
        const first = week[0];
        if (!first) return "";
        const month = Number(first.date.slice(5, 7)) - 1;
        const previous = weeks[index - 1]?.[0];
        const previousMonth = previous ? Number(previous.date.slice(5, 7)) - 1 : -1;
        return month !== previousMonth ? MONTH_ABBR[month] : "";
      }),
    [weeks],
  );

  const sourceBadge =
    meta.source === "live"
      ? { label: "LIVE", className: "bg-white text-[var(--ink)]" }
      : { label: "CACHED", className: "bg-white/20 text-white" };

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
                <span className="text-[var(--seido)]">{data.total}</span>{" "}
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
            "font-manga border-2 border-[var(--ink)] px-2 py-0.5 text-[9px] tracking-[0.3em]",
            sourceBadge.className,
          )}
        >
          {sourceBadge.label}
        </span>
      </div>

      {data ? (
        <div className="relative w-full border-2 border-[var(--ink)] bg-[#0a0a0a] p-3 sm:p-4">
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex w-full min-w-[680px] flex-col">
              <div className="mb-2 flex w-full justify-between pl-8 pr-1 font-mono text-[11px] text-white/65">
                {monthLabels.map((label, index) => (
                  <span key={index} className="flex-1 text-left">
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex w-full items-center">
                <div className="flex h-[104px] w-8 shrink-0 flex-col justify-between pr-3 font-mono text-[11px] text-white/65">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div className="flex w-full flex-1 items-center justify-between gap-[3px] sm:gap-[4px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-1 flex-col gap-[3px] sm:gap-[4px]">
                      {week.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          tabIndex={-1}
                          aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDay(day.date)}`}
                          onMouseEnter={() => setHovered({ date: day.date, count: day.count })}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered({ date: day.date, count: day.count })}
                          onBlur={() => setHovered(null)}
                          className={cn(
                            "relative aspect-square min-h-[10px] min-w-[10px] cursor-pointer rounded-none transition-all duration-200 hover:scale-125 hover:z-30",
                            LEVEL_CLASS[day.level],
                          )}
                        >
                          {hovered?.date === day.date && (
                            <span
                              className={cn(
                                "pointer-events-none absolute bottom-full z-50 mb-2.5 whitespace-nowrap border-2 border-white bg-[#0a0a0a] px-3 py-1.5 font-mono text-[11px] font-medium text-white",
                                weekIndex > 42
                                  ? "right-0"
                                  : weekIndex < 8
                                    ? "left-0"
                                    : "left-1/2 -translate-x-1/2",
                              )}
                            >
                              <span className="font-bold text-[#60a5fa]">
                                {day.count === 0 ? "No" : day.count} contribution
                                {day.count === 1 ? "" : "s"}
                              </span>{" "}
                              on {formatDay(day.date)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
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
