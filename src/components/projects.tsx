"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ContributionGraph } from "@/components/contribution-graph";
import { MangaDialog } from "@/components/ui/manga-dialog";
import { GithubIcon } from "@/components/icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ExternalLink,
  GitCommit,
  Star,
  GitFork,
  Users,
  Code2,
  GitPullRequest,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  ArrowRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "@/content/projects";
import type { GithubData, RepoStat } from "@/lib/github";

gsap.registerPlugin(useGSAP);

const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

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

interface ProjectsProps {
  data: GithubData;
}

export function Projects({ data }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  const catalog = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        stats: (project.fullName
          ? data.repos[project.fullName.toLowerCase()]
          : undefined) as RepoStat | undefined,
      })),
    [data.repos],
  );

  const current = catalog[activeIndex] ?? catalog[0];

  useGSAP(
    () => {
      if (!heroCardRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        heroCardRef.current,
        { scale: 0.985, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" },
      );
    },
    { dependencies: [activeIndex] },
  );

  const prev = useCallback(
    () => setActiveIndex((index) => (index - 1 + catalog.length) % catalog.length),
    [catalog.length],
  );
  const next = useCallback(
    () => setActiveIndex((index) => (index + 1) % catalog.length),
    [catalog.length],
  );

  // ← / → page through previews while the lightbox is open.
  useEffect(() => {
    if (!lightboxOpen) return;
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
  }, [lightboxOpen, next, prev]);

  const repo = repoHref(current);
  const updated = formatUpdated(current.stats?.pushedAt) ?? current.year;
  const stars = current.stats?.stars ?? 0;
  const forks = current.stats?.forks ?? 0;
  const language = current.stats?.language ?? current.techStack[0];

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
                  <GitCommit className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
                  <p
                    className="font-manga tracking-[0.28em] text-white/60"
                    style={{ fontSize: "clamp(0.72rem, 1.3vw, 0.95rem)" }}
                  >
                    HOMEPAGE PREVIEWS &amp; LIVE GITHUB TELEMETRY
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
                color: "rgba(255,255,255,0.038)",
              }}
              aria-hidden="true"
            >
              03
            </div>
          </div>
        </MangaPanelReveal>

                    <div className="w-full" style={{ background: "var(--ink)", padding: "var(--gutter)" }}>
          <div
            className="canvas grid grid-cols-1 lg:grid-cols-12"
            style={{ gap: "var(--gutter)" }}
          >
            {/* Row 1 left: contribution matrix */}
            <MangaPanelReveal direction="left" className="lg:col-span-9">
              <div className="panel h-full bg-[var(--paper)] flex items-start w-full">
                <ContributionGraph
                  data={data.contributions}
                  meta={data.contributionsMeta}
                />
              </div>
            </MangaPanelReveal>

            {/* Row 1 right: telemetry callout */}
            <MangaPanelReveal direction="right" className="lg:col-span-3">
              <div className="panel relative flex h-full flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-white">
                <div className="speed-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
                <div className="relative z-10">
                  <span
                    className="font-manga mb-3 inline-block px-2.5 py-0.5 text-[10px] tracking-[0.4em] text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    BUILD LOG
                  </span>
                  <h3 className="font-manga text-2xl leading-tight tracking-wider text-white">
                    SHIPPING
                    <br />
                    FULL-STACK
                    <br />
                    SYSTEMS
                  </h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                    Production web apps, AI-assisted platforms, and IoT dashboards built for
                    real-world institutional and client use.
                  </p>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                  <div>
                    <span className="block font-mono text-[10px] text-white/60">
                      FEATURED WORKS
                    </span>
                    <span className="font-manga text-2xl tracking-widest text-white">
                      {String(catalog.length).padStart(2, "0")} SYSTEMS
                    </span>
                  </div>
                  <Layers className="h-6 w-6 text-white/50" aria-hidden="true" />
                </div>
              </div>
            </MangaPanelReveal>

            {/* Row 2 left: featured preview */}
            <MangaPanelReveal direction="left" className="lg:col-span-8">
              <div
                ref={heroCardRef}
                className="panel group flex h-full flex-col justify-between bg-[var(--paper)]"
              >
                <div className="flex items-center justify-between gap-2 border-b-4 border-[var(--ink)] bg-[var(--ink)] px-4 py-2.5 text-white sm:px-5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="font-manga shrink-0 px-2 py-0.5 text-[10px] tracking-[0.35em] text-white"
                      style={{ background: "var(--seido)" }}
                    >
                      PANEL {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-mono text-[11px] text-white/85">
                      {current.fullName ?? current.slug}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "font-manga inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[10px] tracking-[0.35em]",
                      current.role === "Owner"
                        ? "bg-white text-[var(--ink)]"
                        : "bg-[var(--seido)] text-white",
                    )}
                  >
                    {current.role === "Owner" ? (
                      <Code2 className="h-2.5 w-2.5" aria-hidden="true" />
                    ) : (
                      <GitPullRequest className="h-2.5 w-2.5" aria-hidden="true" />
                    )}
                    {current.role.toUpperCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Inspect ${current.name} homepage preview`}
                  className="relative w-full cursor-zoom-in overflow-hidden bg-[var(--paper)] focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]"
                  style={{ aspectRatio: "16/9.3" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration, fixed-aspect frame */}
                  <img
                    src={current.previewImage}
                    alt={current.previewAlt}
                    width={1280}
                    height={744}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  />

                  <span className="font-manga absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 border-2 border-white bg-[var(--ink)] px-3 py-1 text-[10px] tracking-[0.3em] text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)] transition-colors group-hover:bg-[var(--seido)]">
                    <Maximize2 className="h-3 w-3" aria-hidden="true" />
                    INSPECT LANDING PAGE
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-3 pt-8 sm:px-5">
                    <span className="block text-left">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/75">
                        HOMEPAGE / INTERFACE PREVIEW
                      </span>
                      <span className="font-manga block text-base leading-tight tracking-wider text-white sm:text-xl">
                        {current.tagline.toUpperCase()}
                      </span>
                    </span>
                  </span>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--ink)]/15 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous project"
                      className="flex h-8 w-8 items-center justify-center border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="font-manga px-2 text-xs tracking-widest text-[var(--ink)]">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(catalog.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next project"
                      className="flex h-8 w-8 items-center justify-center border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <Link
                    href={`/projects/${current.slug}`}
                    className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--seido)] px-3 py-1.5 text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-85 focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                  >
                    READ CASE FILE
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </MangaPanelReveal>

            {/* Row 2 right: index */}
            <MangaPanelReveal direction="right" className="lg:col-span-4">
              <div className="panel flex h-full flex-col justify-between bg-[var(--paper)]">
                <div className="flex items-center justify-between border-b-4 border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-white">
                  <span className="font-manga text-xs tracking-[0.35em]">CASE FILE INDEX</span>
                  <span className="font-mono text-[10px] text-white/70">SELECT TO VIEW</span>
                </div>

                <div className="flex flex-1 flex-col divide-y-2 divide-[var(--ink)]/15">
                  {catalog.map((project, index) => {
                    const active = index === activeIndex;
                    return (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-pressed={active}
                        aria-label={`View ${project.name}`}
                        className={cn(
                          "group relative flex w-full items-start gap-3 px-4 py-3.5 text-left transition-all duration-150 focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]",
                          active
                            ? "bg-[var(--ink)] text-white"
                            : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)]/10",
                        )}
                      >
                        {active && (
                          <span
                            className="absolute bottom-0 left-0 top-0 w-1.5"
                            style={{ background: "var(--seido)" }}
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={cn(
                            "font-manga shrink-0 border px-2 py-0.5 text-base tracking-widest",
                            active
                              ? "border-white/40 bg-[var(--seido)] text-white"
                              : "border-[var(--ink)]/30 text-[var(--ink)]",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "font-manga line-clamp-1 block text-sm leading-tight tracking-wide",
                              active ? "text-white" : "text-[var(--ink)]",
                            )}
                          >
                            {project.name}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block truncate font-mono text-[10px]",
                              active ? "text-white/70" : "text-[hsl(var(--muted-foreground))]",
                            )}
                          >
                            {project.techStack.slice(0, 3).join(" · ")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="border-t-2 border-[var(--ink)]/15 px-4 py-2.5 font-mono text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">
                  PREVIEWS ARE ILLUSTRATED INTERFACE PANELS, NOT SCREENSHOTS.
                </p>
              </div>
            </MangaPanelReveal>

            {/* Row 3 left: overview */}
            <MangaPanelReveal direction="up" className="lg:col-span-7">
              <div className="panel panel-cut-corner sfx-deploy flex h-full flex-col justify-between bg-[var(--paper)] p-6 sm:p-8">
                <div>
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b-2 border-[var(--ink)] pb-4">
                    <div>
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
                        ARCHITECTURAL OVERVIEW // {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-manga text-2xl leading-none tracking-wide text-[var(--ink)] sm:text-3xl">
                        {current.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 border-2 border-[var(--ink)] bg-white px-3 py-1 font-mono text-xs text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
                      {stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" aria-hidden="true" />
                          {stars}
                        </span>
                      )}
                      {forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                          {forks}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {updated}
                      </span>
                    </div>
                  </div>

                  <p className="max-w-2xl font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {current.summary}
                  </p>
                  <p className="mt-2 max-w-2xl font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                    <span className="font-semibold text-[var(--ink)]">Problem: </span>
                    {current.caseStudy.problem}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {current.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border-2 border-[var(--ink)] bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--ink)]/15 pt-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      {current.collaborators.map((person) => `@${person}`).join(" · ")}
                    </span>
                    <span>{language}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {repo && (
                      <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-3 py-1.5 text-[10px] tracking-[0.22em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                      >
                        <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        REPOSITORY
                      </a>
                    )}
                    <Link
                      href={`/projects/${current.slug}`}
                      className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] px-3 py-1.5 text-[10px] tracking-[0.22em] text-white transition-opacity hover:opacity-85"
                      style={{ background: "var(--seido)" }}
                    >
                      FULL CASE FILE
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </MangaPanelReveal>

            {/* Row 3 right: thumbnail strip */}
            <MangaPanelReveal direction="right" className="lg:col-span-5">
              <div className="panel panel-cut-corner flex h-full flex-col justify-between bg-[var(--paper)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-manga text-xs tracking-[0.3em] text-[var(--ink)]">
                    QUICK SELECT
                  </span>
                  <span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                    {catalog.length} PANELS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {catalog.map((project, index) => {
                    const active = index === activeIndex;
                    return (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-pressed={active}
                        aria-label={`Select ${project.name}`}
                        className={cn(
                          "group relative overflow-hidden border-2 text-left transition-all focus-visible:outline-4 focus-visible:outline-[var(--seido)]",
                          active
                            ? "border-[var(--seido)] ring-2 ring-[var(--seido)]"
                            : "border-[var(--ink)] opacity-80 hover:opacity-100",
                          index === 0 && "col-span-2",
                        )}
                        style={{ aspectRatio: index === 0 ? "16/6.5" : "16/9.5" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration inside a fixed-ratio frame */}
                        <img
                          src={project.previewImage}
                          alt={`${project.name} illustrated preview`}
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/85 px-2 py-1">
                          <span className="font-manga truncate text-[10px] tracking-widest text-white">
                            {String(index + 1).padStart(2, "0")} ·{" "}
                            {project.name.split("—")[0].trim()}
                          </span>
                          {active && (
                            <span
                              className="h-2 w-2 shrink-0"
                              style={{ background: "var(--seido)" }}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </MangaPanelReveal>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Now viewing {current.name}, {activeIndex + 1} of {catalog.length}
        </p>
      </section>

      <MangaDialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        label={`${current.name} homepage preview`}
        className="max-w-5xl bg-[var(--paper)]"
      >
        <div className="flex items-center justify-between border-b-4 border-[var(--ink)] bg-[var(--ink)] px-5 py-3.5 text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-manga px-2 py-0.5 text-[10px] tracking-[0.4em] text-white"
              style={{ background: "var(--seido)" }}
            >
              HOMEPAGE PREVIEW
            </span>
            <span className="font-manga text-base tracking-wider sm:text-lg">
              {current.name}
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-white/50 sm:inline">
              ← / → TO PAGE
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close preview"
            className="border-2 border-white/40 p-1.5 text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-4 focus-visible:outline-white/60"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="screentone-fine min-h-0 flex-1 overflow-y-auto bg-[var(--paper)] p-3 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration, opened on demand */}
          <img
            src={current.previewImage}
            alt={current.previewAlt}
            width={1280}
            height={744}
            className="mx-auto h-auto max-h-[calc(92dvh_-_13rem)] w-full border-2 border-[var(--ink)] object-contain shadow-xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t-4 border-[var(--ink)] bg-[var(--paper)] px-5 py-3.5">
          <p className="min-w-0 flex-1 font-mono text-xs text-[hsl(var(--muted-foreground))]">
            {current.tagline}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project preview"
              className="flex h-9 w-9 items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="font-manga px-1 text-[10px] tracking-widest text-[var(--ink)]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(catalog.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next project preview"
              className="flex h-9 w-9 items-center justify-center border-2 border-[var(--ink)] bg-white text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-2 text-xs tracking-widest text-white"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" /> GITHUB REPO
              </a>
            )}
            <Link
              href={`/projects/${current.slug}`}
              className="font-manga inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest text-white"
              style={{ background: "var(--seido)" }}
            >
              CASE FILE <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </MangaDialog>
    </>
  );
}
