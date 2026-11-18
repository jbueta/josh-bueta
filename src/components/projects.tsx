"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ContributionGraph } from "@/components/contribution-graph";
import { MangaDialog } from "@/components/ui/manga-dialog";
import { GithubIcon } from "@/components/icons";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  GitFork,
  ImageIcon,
  Star,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "@/content/projects";
import type { GithubData, RepoStat } from "@/lib/github";

const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type CatalogProject = Project & { stats?: RepoStat };

function formatUpdated(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return MONTH_YEAR.format(date).toUpperCase();
}

function repoHref(project: Project): string | undefined {
  if (project.repoUrl) return project.repoUrl;
  if (project.fullName) return `https://github.com/${project.fullName}`;
  return undefined;
}

/**
 * The slot where each project's own capture goes.
 *
 * Set `screenshot` (and optionally `screenshotAlt`) in `src/content/projects.ts`
 * once the capture is in `/public/projects/`, and this frame renders it. Until
 * then it draws a labelled placeholder in the same 16:10 footprint, so the
 * layout does not shift when the real image lands.
 */
function ScreenshotFrame({ project }: { project: CatalogProject }) {
  if (project.screenshot) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element -- user-supplied capture inside a fixed-ratio frame */
      <img
        src={project.screenshot}
        alt={project.screenshotAlt ?? `${project.name} screenshot`}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-[var(--tone)] p-4 text-center"
      aria-hidden="true"
    >
      <span className="screentone-fine absolute inset-0 opacity-70" />
      <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-[var(--ink)]/35" />
      <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-[var(--ink)]/35" />
      <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[var(--ink)]/35" />
      <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[var(--ink)]/35" />

      <ImageIcon className="relative h-6 w-6 text-[var(--ink)]/30" />
      <span className="font-manga relative text-[11px] tracking-[0.36em] text-[var(--ink)]/60">
        SCREENSHOT // PENDING
      </span>
      <span className="relative max-w-full truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ink)]/35">
        16:10 · /projects/{project.slug}.png
      </span>
    </div>
  );
}

interface ProjectFileProps {
  project: CatalogProject;
  index: number;
  onOpen: () => void;
}

/** One case file in the spread: capture on one side, copy on the other. */
function ProjectFile({ project, index, onOpen }: ProjectFileProps) {
  const repo = repoHref(project);
  const updated = formatUpdated(project.stats?.pushedAt) ?? project.year;
  const stars = project.stats?.stars ?? 0;
  const forks = project.stats?.forks ?? 0;
  const imageRight = index % 2 === 1;

  return (
    <article className="group border-b-[3px] border-[var(--ink)] last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div
          className={cn(
            "relative border-b-[3px] border-[var(--ink)] md:col-span-5 md:border-b-0",
            imageRight ? "md:order-2 md:border-l-[3px]" : "md:border-r-[3px]",
          )}
        >
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open preview for ${project.name}`}
            className="block w-full cursor-zoom-in focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]"
          >
            <span className="block w-full" style={{ aspectRatio: "16 / 10" }}>
              <ScreenshotFrame project={project} />
            </span>
            <span className="font-manga absolute right-2 top-2 inline-flex items-center gap-1 border-2 border-[var(--ink)] bg-white px-2 py-0.5 text-[9px] tracking-[0.25em] text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] transition-colors group-hover:bg-[var(--seido)] group-hover:text-white">
              <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
              EXPAND
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-7 md:col-span-7">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            <span
              className="font-manga px-1.5 py-0.5 text-[10px] tracking-[0.25em] text-white"
              style={{ background: "var(--ink)" }}
            >
              FILE {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.role}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span className="ml-auto flex items-center gap-1.5">
              <Clock className="h-3 w-3" aria-hidden="true" />
              UPDATED {updated}
            </span>
          </div>

          <div>
            <h3 className="font-manga text-2xl leading-none tracking-wide text-[var(--ink)] sm:text-3xl">
              {project.name}
            </h3>
            <p
              className="font-manga mt-1.5 text-[11px] leading-relaxed tracking-[0.22em]"
              style={{ color: "var(--seido)" }}
            >
              {project.tagline.toUpperCase()}
            </p>
          </div>

          <p className="max-w-2xl font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {project.summary}
          </p>

          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/70">
            {project.techStack.map((tech, techIndex) => (
              <React.Fragment key={tech}>
                {techIndex > 0 && (
                  <span className="text-[var(--ink)]/30" aria-hidden="true">
                    ·
                  </span>
                )}
                <span>{tech}</span>
              </React.Fragment>
            ))}
            {(stars > 0 || forks > 0) && (
              <span className="ml-auto flex items-center gap-2.5">
                {stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    {stars}
                  </span>
                )}
                {forks > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" aria-hidden="true" />
                    {forks}
                  </span>
                )}
              </span>
            )}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 border-t-2 border-[var(--ink)]/15 pt-3.5">
            <Link
              href={`/projects/${project.slug}`}
              className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] px-3 py-1.5 text-[10px] tracking-[0.24em] text-white transition-opacity hover:opacity-85 focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
              style={{ background: "var(--seido)" }}
            >
              READ CASE FILE
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-3 py-1.5 text-[10px] tracking-[0.24em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                REPOSITORY
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

interface ProjectsProps {
  data: GithubData;
}

export function Projects({ data }: ProjectsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const catalog = useMemo<CatalogProject[]>(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        stats: (project.fullName
          ? data.repos[project.fullName.toLowerCase()]
          : undefined) as RepoStat | undefined,
      })),
    [data.repos],
  );

  const active = openIndex === null ? null : catalog[openIndex];

  const prev = useCallback(
    () =>
      setOpenIndex((index) =>
        index === null ? null : (index - 1 + catalog.length) % catalog.length,
      ),
    [catalog.length],
  );
  const next = useCallback(
    () =>
      setOpenIndex((index) =>
        index === null ? null : (index + 1) % catalog.length,
      ),
    [catalog.length],
  );

  // ← / → page through captures while the dialog is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, next, prev]);

  return (
    <>
      <section id="projects" className="relative z-10">
        {/* Chapter opener */}
        <MangaPanelReveal direction="up">
          <div
            className="chapter-opener speed-lines relative overflow-hidden"
            style={{ background: "var(--ink)" }}
          >
            <div className="canvas relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span
                  className="font-manga slash-cut-right mb-3 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  ACT. 03 // CASE FILES &amp; BUILDS
                </span>
                <h2
                  className="font-manga leading-none text-white"
                  style={{ fontSize: "clamp(2.6rem, 6.2vw, 5.2rem)" }}
                >
                  PROJECTS
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
                  <p
                    className="font-manga tracking-[0.28em] text-white/60"
                    style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}
                  >
                    {String(catalog.length).padStart(2, "0")} SYSTEMS ON FILE
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/jbueta"
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex items-center gap-2 self-start border-2 border-white/40 px-4 py-2 text-xs tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-[var(--ink)] sm:self-end"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                @JBUETA ARCHIVE ↗
              </a>
            </div>
            <div
              className="font-manga pointer-events-none absolute bottom-0 right-2 select-none leading-none"
              style={{
                fontSize: "clamp(3.75rem, 11vw, 8.5rem)",
                color: "rgba(255,255,255,0.042)",
              }}
              aria-hidden="true"
            >
              03
            </div>
          </div>
        </MangaPanelReveal>

        {/* One board for the whole chapter: telemetry band, then the case files. */}
        <div
          className="w-full"
          style={{ background: "var(--tone)", padding: "var(--gutter)" }}
        >
          <MangaPanelReveal direction="up" className="canvas">
            <div className="panel bg-[var(--paper)]">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b-[3px] border-[var(--ink)] bg-[var(--ink)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 sm:px-5">
                <span>BUILD LOG // SHIPPED WORK &amp; TELEMETRY</span>
                <span className="text-white/45">HOVER A DAY · ← / → TO PAGE</span>
              </div>

              <div className="border-b-[3px] border-[var(--ink)]">
                <ContributionGraph
                  data={data.contributions}
                  meta={data.contributionsMeta}
                />
              </div>

              {catalog.map((project, index) => (
                <ProjectFile
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={() => setOpenIndex(index)}
                />
              ))}
            </div>
          </MangaPanelReveal>
        </div>
      </section>

      <MangaDialog
        open={active !== null}
        onClose={() => setOpenIndex(null)}
        label={active ? `${active.name} preview` : "Project preview"}
        className="max-w-5xl bg-[var(--paper)]"
      >
        {active && (
          <>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b-[3px] border-[var(--ink)] bg-[var(--ink)] px-4 py-3 text-white sm:px-5">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span
                  className="font-manga shrink-0 px-2 py-0.5 text-[10px] tracking-[0.35em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(catalog.length).padStart(2, "0")}
                </span>
                <span className="font-manga truncate text-sm tracking-wider sm:text-lg">
                  {active.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close preview"
                className="shrink-0 border-2 border-white/40 p-1.5 text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-4 focus-visible:outline-white/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--paper)] p-3 sm:p-5">
              {active.screenshot ? (
                /* eslint-disable-next-line @next/next/no-img-element -- user-supplied capture, opened on demand */
                <img
                  src={active.screenshot}
                  alt={active.screenshotAlt ?? `${active.name} screenshot`}
                  width={1600}
                  height={1000}
                  className="mx-auto block h-auto max-h-[calc(92dvh_-_12rem)] w-full border-2 border-[var(--ink)] object-contain"
                />
              ) : (
                <div
                  className="mx-auto w-full max-w-3xl border-2 border-[var(--ink)]"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <ScreenshotFrame project={active} />
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t-[3px] border-[var(--ink)] bg-[var(--paper)] px-4 py-3 sm:px-5">
              <p className="min-w-0 flex-1 basis-[12rem] font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
                {active.tagline}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous project preview"
                  className="flex h-9 w-9 items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next project preview"
                  className="flex h-9 w-9 items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {repoHref(active) && (
                  <a
                    href={repoHref(active)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-[10px] tracking-[0.22em] text-white"
                  >
                    <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" /> REPO
                  </a>
                )}
                <Link
                  href={`/projects/${active.slug}`}
                  className="font-manga inline-flex items-center gap-1.5 px-3 py-2 text-[10px] tracking-[0.22em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  CASE FILE <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </>
        )}
      </MangaDialog>
    </>
  );
}
