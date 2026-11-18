import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This panel does not exist in the archive.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="relative flex min-h-screen flex-col bg-[var(--ink)]">
      <Navbar />

      <div className="flex flex-1 items-center px-5 pb-16 pt-[calc(var(--header-h)_+_24px)] sm:px-8">
        <div className="panel relative mx-auto w-full max-w-3xl overflow-hidden bg-[var(--paper)] p-8 sm:p-12">
          <div className="speed-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="screentone-fine pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative z-10">
            <span
              className="font-manga slash-cut-right mb-4 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
              style={{ background: "var(--seido)" }}
            >
              MISSING PANEL
            </span>

            <div className="flex items-start gap-4">
              <div className="border-2 border-[var(--ink)] bg-[var(--ink)] p-3 text-white">
                <FileQuestion className="h-6 w-6" aria-hidden="true" />
              </div>
              <h1
                className="font-manga leading-[0.9] tracking-wide text-[var(--ink)]"
                style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)" }}
              >
                404
                <br />
                <span style={{ color: "var(--seido)" }}>PANEL NOT FOUND</span>
              </h1>
            </div>

            <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              This chapter was never drawn, or the panel was moved. The archive, case files
              and resume are still intact.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-5 py-3 text-xs tracking-[0.22em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                style={{ background: "var(--seido)" }}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                BACK TO CHAPTER 01
              </Link>
              <Link
                href="/resume"
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-5 py-3 text-xs tracking-[0.22em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
              >
                RESUME
              </Link>
            </div>

            <div className="mt-8 border-t-2 border-[var(--ink)]/15 pt-4">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
                TRY A CASE FILE
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PROJECTS.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="border-2 border-[var(--ink)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                  >
                    {project.name.split("—")[0].trim()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
