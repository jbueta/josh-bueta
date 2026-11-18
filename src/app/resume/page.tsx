import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText, Mail, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/content/site";
import { EDUCATION, ORG_POSITIONS, ACADEMIC_SCHOLARSHIPS, TECH_SCHOLARSHIPS } from "@/content/profile";
import { ALL_CERTIFICATIONS } from "@/content/certifications";
import { TECH_STACK } from "@/content/stack";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${SITE.name} — ${SITE.role} based in ${SITE.location}. Education, leadership, scholarships and verified certifications.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${SITE.name} — Resume`,
    description: `Resume of ${SITE.name}, ${SITE.role}.`,
    url: "/resume",
    type: "profile",
  },
};

export default function ResumePage() {
  const groups = new Map<string, string[]>();
  for (const certification of ALL_CERTIFICATIONS) {
    const list = groups.get(certification.issuer) ?? [];
    list.push(certification.title);
    groups.set(certification.issuer, list);
  }

  return (
    <main id="main-content" className="relative flex min-h-screen flex-col bg-[var(--ink)]">
      <Navbar />

      <div className="flex-1 px-5 pb-12 pt-[calc(var(--header-h)_+_24px)] sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="font-manga inline-flex items-center gap-2 border-2 border-white/40 px-3 py-1.5 text-[10px] tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              BACK TO PORTFOLIO
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={SITE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex items-center gap-2 border-2 border-white/40 px-3 py-1.5 text-[10px] tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                OPEN PDF
              </a>
              <a
                href={SITE.cv}
                download={SITE.cvFileName}
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-3 py-1.5 text-[10px] tracking-[0.3em] text-white shadow-[3px_3px_0_rgba(255,255,255,0.35)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                style={{ background: "var(--seido)" }}
              >
                <Download className="h-3 w-3" aria-hidden="true" />
                DOWNLOAD PDF
              </a>
            </div>
          </div>

          <article className="print-page panel bg-[var(--paper)] p-6 sm:p-10">
            <header className="border-b-4 border-[var(--ink)] pb-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1
                    className="font-manga leading-none tracking-wide text-[var(--ink)]"
                    style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)" }}
                  >
                    {SITE.name.toUpperCase()}
                  </h1>
                  <p className="font-manga mt-2 text-sm tracking-[0.28em] text-[var(--seido)]">
                    {SITE.role.toUpperCase()}
                  </p>
                </div>
                <div className="font-mono text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" aria-hidden="true" />
                    <a href={`mailto:${SITE.email}`} className="underline-offset-2 hover:underline">
                      {SITE.email}
                    </a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {SITE.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3" aria-hidden="true" />
                    <a href={SITE.github} className="underline-offset-2 hover:underline">
                      github.com/{SITE.githubUsername}
                    </a>
                  </span>
                </div>
              </div>
            </header>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                SUMMARY
              </h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                {SITE.headline} with a focus on accessible, typed interfaces and reliable
                data flow. Currently completing a BSCS at {EDUCATION.institution}, leading the
                PLP Computer Society, and shipping full-stack systems across web, AI-assisted
                commerce and IoT monitoring.
              </p>
            </section>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                EDUCATION
              </h2>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-manga text-lg tracking-wide text-[var(--ink)]">
                  {EDUCATION.degree}
                </h3>
                <span className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
                  {EDUCATION.period}
                </span>
              </div>
              <p className="font-sans text-sm text-[var(--ink)]">{EDUCATION.institution}</p>
              <p className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
                GWA {EDUCATION.gwa} · {EDUCATION.honors}
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                Focus: {EDUCATION.focusAreas.join(" · ")}
              </p>
            </section>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                LEADERSHIP
              </h2>
              <ul className="mt-2 flex flex-col gap-2">
                {ORG_POSITIONS.map((position) => (
                  <li key={position.id} className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-sans text-sm text-[var(--ink)]">{position.role}</span>
                    <span className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
                      {position.period}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                SCHOLARSHIPS &amp; GRANTS
              </h2>
                          <ul className="mt-2 flex flex-col gap-2 print-cols">
                    {[...ACADEMIC_SCHOLARSHIPS, ...TECH_SCHOLARSHIPS].map((entry) => (
                      <li key={entry.code} className="font-sans text-sm text-[var(--ink)] break-inside-avoid">
                        <span className="break-inside-avoid">
                          {entry.title} — {entry.organization}
                          <span className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
                            &nbsp;&nbsp;{entry.period}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
            </section>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                CERTIFICATIONS ({ALL_CERTIFICATIONS.length})
              </h2>
              {[...groups.entries()].map(([issuer, titles]) => (
                <div key={issuer} className="mt-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                    {issuer}
                  </p>
                  <ul className="mt-1 print-cols">
                    {titles.map((title) => (
                      <li key={title} className="font-sans text-xs text-[var(--ink)] break-inside-avoid">
                        · {title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="mt-6">
              <h2 className="font-manga border-b-2 border-[var(--ink)] pb-1 text-sm tracking-[0.35em] text-[var(--ink)]">
                TECHNICAL SKILLS
              </h2>
              <p className="mt-2 font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))] print-cols">
                {TECH_STACK.map((tech) => tech.name).join(" · ")}
              </p>
            </section>

            <p className="no-print mt-6 border-t-2 border-[var(--ink)]/15 pt-3 font-mono text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              Tip: print this page (Ctrl / Cmd + P) for a typeset copy, or open the PDF for
              the signed original.
            </p>
          </article>

          <div className="no-print panel mt-6 overflow-hidden bg-[var(--paper)]">
            <div className="flex items-center justify-between border-b-4 border-[var(--ink)] bg-[var(--ink)] px-4 py-2.5">
              <span className="font-manga text-xs tracking-[0.3em] text-white">
                ORIGINAL DOCUMENT
              </span>
              <a
                href={SITE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                OPEN IN NEW TAB ↗
              </a>
            </div>
            <object
              data={SITE.cv}
              type="application/pdf"
              aria-label={`${SITE.name} resume PDF`}
              className="pdf-embed h-[70vh] w-full"
            >
              <p className="p-4 font-mono text-xs text-[var(--ink)]">
                Your browser cannot display PDFs inline.{" "}
                <a href={SITE.cv} className="underline">
                  Download the resume instead
                </a>
                .
              </p>
            </object>
            {/* iOS Safari cannot render PDFs in an <object>; offer the native viewer. */}
            <div className="pdf-ios-fallback flex-col gap-3 p-6">
              <p className="font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                iOS opens PDFs in its own viewer rather than embedding them. Use the button
                below to read or share the résumé.
              </p>
              <a
                href={SITE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex w-fit items-center gap-2 border-2 border-[var(--ink)] px-5 py-3 text-xs tracking-[0.22em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                style={{ background: "var(--seido)" }}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                OPEN THE PDF
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
