"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ChapterOpener } from "@/components/chapter-opener";
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

const DOMAIN_TABS = [
  { id: "all", label: "ALL", count: CERTIFICATION_COUNT },
  ...CERTIFICATION_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.id.toUpperCase(),
    count: category.certs.length,
  })),
];

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [domain, setDomain] = useState<string>("all");

  const visibleCategories = useMemo(
    () =>
      domain === "all"
        ? CERTIFICATION_CATEGORIES
        : CERTIFICATION_CATEGORIES.filter((category) => category.id === domain),
    [domain],
  );

  const visibleCount = visibleCategories.reduce(
    (total, category) => total + category.certs.length,
    0,
  );

  return (
    <>
      {/* No `overflow-hidden`: it would turn this section into the sticky
          domain strip's scroll container and stop it from sticking. */}
      <section id="credentials" className="relative z-10">
        <ChapterOpener
          act="04"
          label="VERIFIED LICENSES"
          title="CREDENTIALS"
          subtitle="TECHNICAL CERTIFICATIONS & SPECIALIZATIONS"
          meta={
            <div className="border-[3px] border-white/30 bg-white/5 px-4 py-2.5">
              <span className="block font-mono text-[10px] tracking-[0.25em] text-white/70">
                TOTAL VERIFIED
              </span>
              <span className="font-manga text-lg tracking-[0.2em] text-white tabular-nums">
                {CERTIFICATION_COUNT} CERTIFICATIONS · TAP TO INSPECT
              </span>
            </div>
          }
        />

        {/* Category spreads */}
        <div
          className="w-full"
          style={{
            background: "var(--tone)",
            padding: "var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--gutter) * 2)",
          }}
        >
          <div className="canvas sticky top-[calc(var(--header-h)+8px)] z-30">
            <div className="panel flex flex-wrap items-center justify-between gap-3 bg-[var(--paper)] px-4 py-3">
              <div
                role="group"
                aria-label="Filter credentials by domain"
                className="flex flex-wrap items-center gap-2"
              >
                {DOMAIN_TABS.map((tab) => {
                  const isActive = domain === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDomain(tab.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-3 py-1.5 text-[10px] tracking-[0.3em] transition-colors focus-visible:outline-4 focus-visible:outline-[var(--seido)]",
                        isActive
                          ? "bg-[var(--seido)] text-white"
                          : "bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
                      )}
                    >
                      {tab.label}
                      <span className="font-mono text-[10px] tabular-nums opacity-70">
                        {String(tab.count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
              <span
                aria-live="polite"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]"
              >
                {String(visibleCount).padStart(2, "0")} SHOWN
              </span>
            </div>
          </div>

          {visibleCategories.map((category, categoryIndex) => (
            <MangaPanelReveal key={category.id} direction="up" index={categoryIndex}>
              <div className="canvas flex flex-col" style={{ gap: "var(--gutter)" }}>
                <div className="panel flex flex-wrap items-center justify-between gap-3 bg-[var(--ink)] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 text-white" style={{ background: "var(--seido)" }}>
                      {CATEGORY_ICONS[category.icon]}
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] tracking-[0.35em] text-white/60">
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
                    const titleId = `cert-title-${category.id}-${certIndex}`;
                    const descriptionId = `cert-desc-${category.id}-${certIndex}`;
                    return (
                      <button
                        key={cert.title}
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        aria-labelledby={titleId}
                        aria-describedby={descriptionId}
                        className={cn(
                          spanClass,
                          // Alternating tilt turns the mosaic into a board of
                          // pasted-up panels instead of an even card grid.
                          certIndex % 2 === 0 ? "panel-paste panel-paste-l" : "panel-paste panel-paste-r",
                          "panel panel-cut-corner group relative flex flex-col justify-between bg-white p-5 text-left transition-colors duration-150 hover:bg-[var(--ink)] focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--seido)]",
                        )}
                      >
                        {cert.featured && (
                          <MangaSlashAccent
                            variant="bottom-left"
                            className="opacity-35 transition-opacity group-hover:opacity-0"
                          />
                        )}

                        <span className="relative z-10 block">
                          {/* In flow, not absolutely positioned: the badge used to
                              overlap the date chip, which forced every card to
                              reserve 96px and misaligned dates across the grid. */}
                          {cert.featured && (
                            <span
                              className="font-manga slash-cut-right mb-2.5 inline-block px-2.5 py-0.5 text-[10px] tracking-[0.3em] text-white"
                              style={{ background: "var(--seido)" }}
                            >
                              KEY SPECIALIZATION
                            </span>
                          )}
                          <span className="mb-3 flex flex-wrap items-start justify-between gap-2">
                            <span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))] group-hover:text-white/70">
                              {cert.issuer}
                            </span>
                            <span className="font-manga shrink-0 border border-[var(--ink)] px-2 py-0.5 text-[10px] tracking-widest text-[var(--ink)] group-hover:border-white/30 group-hover:text-white">
                              {cert.date}
                            </span>
                          </span>

                          <span
                            id={titleId}
                            className="font-manga mb-2 flex items-start justify-between gap-2 text-lg tracking-wide text-[var(--ink)] group-hover:text-white sm:text-xl"
                          >
                            <span>{cert.title}</span>
                          </span>

                          <span
                            id={descriptionId}
                            className="mb-5 block font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))] group-hover:text-white/75 sm:text-[13px]"
                          >
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
