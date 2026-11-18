import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  CalendarDays,
  Layers,
} from "lucide-react";
import { GithubIcon as GithubGlyph } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChapterOpener } from "@/components/chapter-opener";
import { ActBreak } from "@/components/act-break";
import { PROJECTS, getProject } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case file not found" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];
  const previousProject = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const repository = project.fullName
    ? `https://github.com/${project.fullName}`
    : undefined;

  const chapters = [
    { code: "01", title: "CONTEXT", body: <p>{project.caseStudy.context}</p> },
    { code: "02", title: "PROBLEM", body: <p>{project.caseStudy.problem}</p> },
    {
      code: "03",
      title: "CONSTRAINTS",
      body: (
        <ul className="flex flex-col gap-2">
          {project.caseStudy.constraints.map((constraint) => (
            <li key={constraint} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-[var(--seido)]" />
              <span>{constraint}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      code: "04",
      title: "APPROACH",
      body: (
        <ul className="flex flex-col gap-2">
          {project.caseStudy.approach.map((step) => (
            <li key={step} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-[var(--ink)]" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      code: "05",
      title: "ARCHITECTURE",
      body: (
        <dl className="divide-y-2 divide-[var(--ink)]/15 border-2 border-[var(--ink)]">
          {project.caseStudy.architecture.map((entry) => (
            <div key={entry.label} className="grid grid-cols-1 sm:grid-cols-3">
              <dt className="bg-[var(--ink)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                {entry.label}
              </dt>
              <dd className="px-3 py-2 font-sans text-sm text-[var(--ink)] sm:col-span-2">
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      code: "06",
      title: "OUTCOME",
      body: (
        <ul className="flex flex-col gap-2">
          {project.caseStudy.outcome.map((result) => (
            <li key={result} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-[var(--seido)]" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <main id="main-content" className="relative flex min-h-screen flex-col bg-[var(--ink)]">
          <Navbar />

      <div className="flex-1 pt-[var(--header-h)]" id="projects">
        {/* Case file header */}
        <header className="relative overflow-hidden border-b-4 border-[var(--ink)] bg-[var(--paper)] px-5 pb-10 pt-10 sm:px-8">
          <div className="screentone pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <Link
              href="/#projects"
              className="font-manga mb-5 inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-3 py-1.5 text-[10px] tracking-[0.3em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              BACK TO ARCHIVE
            </Link>

            <span
              className="font-manga slash-cut-right mb-3 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
              style={{ background: "var(--seido)" }}
            >
              CASE FILE {String(index + 1).padStart(2, "0")} /{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </span>

            <h1
              className="font-manga leading-[0.92] tracking-wide text-[var(--ink)]"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.4rem)" }}
            >
              {project.name}
            </h1>
            <p className="font-manga mt-2 text-sm tracking-[0.25em] text-[hsl(var(--muted-foreground))] sm:text-base">
              {project.tagline.toUpperCase()}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]">
                <Users className="h-3 w-3" aria-hidden="true" />
                {project.role} · @{project.owner}
              </span>
              <span className="inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]">
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                {project.year}
              </span>
              <span className="inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]">
                <Layers className="h-3 w-3" aria-hidden="true" />
                {project.techStack.join(" · ")}
              </span>
            </div>
          </div>
        </header>

          <div className="px-5 py-8 sm:px-8" style={{ background: "var(--ink)" }}>
          <div className="canvas mx-auto flex max-w-4xl flex-col gap-6">
            <div className="panel bg-[var(--paper)] p-3 sm:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG interface illustration */}
              <img
                src={project.previewImage}
                alt={project.previewAlt}
                width={1280}
                height={744}
                className="h-auto w-full border-2 border-[var(--ink)]"
              />
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                ILLUSTRATED INTERFACE PANEL · NOT A SCREENSHOT
              </p>
            </div>

            <div className="panel bg-[var(--paper)] p-6 sm:p-8">
              <p className="font-sans text-base leading-relaxed text-[var(--ink)]">
                {project.summary}
              </p>
            </div>

            {chapters.map((chapter) => (
              <section key={chapter.code} className="panel bg-[var(--paper)] p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3 border-b-2 border-[var(--ink)] pb-3">
                  <span
                    className="font-manga px-2.5 py-1 text-sm tracking-widest text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    {chapter.code}
                  </span>
                  <h2 className="font-manga text-lg tracking-[0.3em] text-[var(--ink)] sm:text-xl">
                    {chapter.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-2 font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {chapter.body}
                </div>
              </section>
            ))}

            <div className="panel flex flex-wrap items-center justify-between gap-3 bg-[var(--paper)] p-6">
              <div className="flex flex-wrap items-center gap-2">
                {repository && (
                  <a
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-2.5 text-xs tracking-[0.22em] text-white transition-colors hover:bg-[var(--seido)]"
                  >
                    <GithubGlyph className="h-4 w-4" aria-hidden="true" />
                    VIEW REPOSITORY
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-4 py-2.5 text-xs tracking-[0.22em] text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    LIVE DEMO
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
              <Link
                href="/#projects"
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-4 py-2.5 text-xs tracking-[0.22em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
              >
                ALL CASE FILES
              </Link>
            </div>

            <nav
              aria-label="Case file navigation"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <Link
                href={`/projects/${previousProject.slug}`}
                className="panel group flex flex-col gap-1 bg-[var(--paper)] p-4 transition-colors hover:bg-[var(--ink)]"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--muted-foreground))] group-hover:text-white/70">
                  ← PREVIOUS CASE
                </span>
                <span className="font-manga text-sm tracking-wide text-[var(--ink)] group-hover:text-white">
                  {previousProject.name}
                </span>
              </Link>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="panel group flex flex-col gap-1 bg-[var(--paper)] p-4 text-right transition-colors hover:bg-[var(--ink)]"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--muted-foreground))] group-hover:text-white/70">
                  NEXT CASE →
                </span>
                <span className="font-manga text-sm tracking-wide text-[var(--ink)] group-hover:text-white">
                  {nextProject.name}
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
