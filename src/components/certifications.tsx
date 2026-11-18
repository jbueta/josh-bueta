"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { MangaSlashAccent } from "@/components/manga-slash-accent";
import { MangaDialog } from "@/components/ui/manga-dialog";
import {
  Sparkles,
  Cloud,
  Code,
  ExternalLink,
  Download,
  X,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CERTIFICATION_CATEGORIES,
  CERTIFICATION_COUNT,
  type Certification,
} from "@/content/certifications";

const CATEGORY_ICONS = {
  ai: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  cloud: <Cloud className="h-4 w-4" aria-hidden="true" />,
  code: <Code className="h-4 w-4" aria-hidden="true" />,
} as const;

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <>
      <section id="credentials" className="relative z-10 overflow-hidden">
        {/* Chapter opener */}
        <MangaPanelReveal direction="up">
          <div
            className="relative w-full overflow-hidden border-y-4 border-[var(--ink)] bg-white"
            style={{ padding: "3.75rem 2rem 3.5rem" }}
          >
            <div
              className="screentone pointer-events-none absolute inset-0"
              style={{
                opacity: 0.35,
                maskImage: "linear-gradient(110deg, transparent 35%, black 100%)",
                WebkitMaskImage: "linear-gradient(110deg, transparent 35%, black 100%)",
              }}
              aria-hidden="true"
            />
            <MangaSlashAccent variant="both" />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span
                  className="font-manga slash-cut-right mb-3 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  ACT. 04 // VERIFIED LICENSES
                </span>
                <h2
                  className="font-manga leading-none text-[var(--ink)]"
                  style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
                >
                  CREDENTIALS
                </h2>
                <p
                  className="font-manga mt-1 tracking-[0.28em] text-[hsl(var(--muted-foreground))]"
                  style={{ fontSize: "clamp(0.85rem, 2vw, 1.35rem)" }}
                >
                  TECHNICAL CERTIFICATIONS &amp; SPECIALIZATIONS
                </p>
              </div>
              <div className="border-[3px] self-start border-[var(--ink)] bg-white px-4 py-2.5 shadow-[4px_4px_0_var(--ink)] sm:self-end">
                <span className="block font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
                  TOTAL VERIFIED
                </span>
                <span className="font-manga text-lg tracking-[0.2em] text-[var(--ink)]">
                  {CERTIFICATION_COUNT} CERTIFICATIONS · SELECT ANY PANEL TO INSPECT
                </span>
              </div>
            </div>
            <div
              className="font-manga pointer-events-none absolute bottom-0 right-4 select-none leading-none"
              style={{
                fontSize: "clamp(6rem, 18vw, 16rem)",
                color: "rgba(10,10,10,0.045)",
              }}
              aria-hidden="true"
            >
              04
            </div>
          </div>
        </MangaPanelReveal>

        {/* Category spreads */}
        <div
          className="w-full"
          style={{
            background: "var(--ink)",
            padding: "var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--gutter) * 2)",
          }}
        >
          {CERTIFICATION_CATEGORIES.map((category, categoryIndex) => (
            <MangaPanelReveal key={category.id} direction="up" delay={categoryIndex * 0.05}>
              <div className="mx-auto flex max-w-6xl flex-col" style={{ gap: "var(--gutter)" }}>
                <div className="panel flex flex-wrap items-center justify-between gap-3 bg-[var(--ink)] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 text-white" style={{ background: "var(--seido)" }}>
                      {CATEGORY_ICONS[category.icon]}
                    </span>
                    <div>
                      <span className="block font-mono text-[9px] tracking-[0.35em] text-white/60">
                        {category.code}
                      </span>
                      <h3 className="font-manga text-base leading-none tracking-[0.22em] text-white sm:text-lg">
                        {category.category.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <span className="border border-white/30 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-white/80">
                    {category.subtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "var(--gutter)" }}>
                  {category.certs.map((cert, certIndex) => {
                    const spanClass = category.spans[certIndex] || "lg:col-span-6";
                    return (
                      <button
                        key={cert.title}
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        aria-label={`Inspect ${cert.title} certificate`}
                        className={cn(
                          spanClass,
                          "panel group relative flex flex-col justify-between bg-white p-5 text-left transition-colors duration-150 hover:bg-[var(--ink)] focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]",
                        )}
                      >
                        {cert.featured && (
                          <>
                            <MangaSlashAccent
                              variant="bottom-left"
                              className="opacity-35 transition-opacity group-hover:opacity-0"
                            />
                            <span
                              className="font-manga slash-cut-left absolute right-0 top-0 z-10 px-2.5 py-0.5 text-[8px] tracking-[0.35em] text-white"
                              style={{ background: "var(--seido)" }}
                            >
                              KEY SPECIALIZATION
                            </span>
                          </>
                        )}

                        <span className="relative z-10 block">
                          <span className="mb-3 flex flex-wrap items-start justify-between gap-2 pr-24">
                            <span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))] group-hover:text-white/70">
                              {cert.issuer}
                            </span>
                            <span className="font-manga shrink-0 border border-[var(--ink)] px-2 py-0.5 text-[10px] tracking-widest text-[var(--ink)] group-hover:border-white/30 group-hover:text-white">
                              {cert.date}
                            </span>
                          </span>

                          <span className="font-manga mb-2 flex items-start justify-between gap-2 text-lg tracking-wide text-[var(--ink)] group-hover:text-white sm:text-xl">
                            <span>{cert.title}</span>
                          </span>

                          <span className="mb-5 block font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))] group-hover:text-white/75 sm:text-[13px]">
                            {cert.description}
                          </span>
                        </span>

                        <span className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ink)]/20 pt-3 group-hover:border-white/20">
                          <span className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="border border-[var(--ink)] bg-white px-2 py-0.5 font-mono text-[10px] text-[var(--ink)] group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white"
                              >
                                {skill}
                              </span>
                            ))}
                          </span>
                          <span className="font-manga flex shrink-0 items-center gap-1 text-[11px] tracking-widest text-[var(--ink)] group-hover:text-white">
                            <span>INSPECT CERTIFICATE</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </MangaPanelReveal>
          ))}
        </div>
      </section>

      <MangaDialog
        open={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        label={selectedCert ? `${selectedCert.title} certificate` : "Certificate"}
        className="max-w-4xl bg-white"
      >
        {selectedCert && (
          <>
            <div className="flex shrink-0 items-center justify-between border-b-4 border-[var(--ink)] bg-[var(--ink)] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="border-2 border-white/30 p-2" style={{ background: "var(--seido)" }}>
                  <Award className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-manga text-sm tracking-wide text-white sm:text-base">
                    {selectedCert.title.toUpperCase()}
                  </h3>
                  <p className="font-mono text-[10px] text-white/70">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="border-2 border-white/40 bg-transparent p-2 text-white transition-colors hover:bg-white hover:text-[var(--ink)] focus-visible:outline-4 focus-visible:outline-white/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="screentone-fine relative flex max-h-[60vh] items-center justify-center overflow-y-auto bg-white p-4 sm:p-6">
              <Image
                src={selectedCert.previewImage}
                alt={`Certificate: ${selectedCert.title} (${selectedCert.issuer}, ${selectedCert.date})`}
                width={selectedCert.previewWidth}
                height={selectedCert.previewHeight}
                sizes="(min-width: 1024px) 896px, 100vw"
                className="h-auto w-full border-2 border-[var(--ink)] object-contain shadow-2xl"
              />
            </div>

            <div className="flex shrink-0 flex-col items-start justify-between gap-3 border-t-4 border-[var(--ink)] bg-white px-5 py-4 sm:flex-row sm:items-center">
              <p className="line-clamp-2 max-w-md font-sans text-xs text-[hsl(var(--muted-foreground))]">
                {selectedCert.description}
              </p>
              <a
                href={selectedCert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga inline-flex w-full items-center justify-center gap-2 border-2 border-[var(--ink)] px-5 py-2.5 text-xs tracking-widest text-white shadow-[3px_3px_0_var(--ink)] transition-opacity hover:opacity-85 sm:w-auto"
                style={{ background: "var(--seido)" }}
              >
                <Download className="h-4 w-4" aria-hidden="true" /> DOWNLOAD PDF
              </a>
            </div>
          </>
        )}
      </MangaDialog>
    </>
  );
}
