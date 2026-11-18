"use client";

import React from "react";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ChapterOpener } from "@/components/chapter-opener";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { GraduationCap, Award, Users, Building, Briefcase, Sparkles } from "lucide-react";
import {
  ACADEMIC_SCHOLARSHIPS,
  CURRENT_ROLE_INDEX,
  EDUCATION,
  ORG_POSITIONS,
  TECH_SCHOLARSHIPS,
} from "@/content/profile";

/**
 * Background: education, student leadership and scholarships.
 * Anchored as #background because the section has no employment history.
 */
export function Experience() {
  return (
    <section id="background" className="relative z-10">
      <ChapterOpener
        act="02"
        label="ORIGIN & RANKS"
        title="BACKGROUND"
        subtitle="EDUCATION, LEADERSHIP & SCHOLARSHIP HONORS"
        meta={
          <div className="border-2 border-white/30 bg-white/5 px-4 py-2">
            <span className="block font-mono text-[10px] tracking-[0.25em] text-white/75">
              INSTITUTION
            </span>
            <span className="font-manga text-sm tracking-[0.2em] text-white">
              {EDUCATION.institution.toUpperCase()}
            </span>
          </div>
        }
      />

      <div
        className="w-full"
        style={{
          background: "var(--tone)",
          padding: "var(--gutter)",
        }}
      >
        <div className="canvas grid grid-cols-1 lg:grid-cols-12" style={{ gap: "var(--gutter)" }}>
          {/* Academic panel */}
          <MangaPanelReveal direction="left" index={0} className="lg:col-span-8">
            <div className="panel sfx-scholar relative flex h-full flex-col justify-between bg-[var(--paper)] p-6 sm:p-8">
              <div className="screentone-fine pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 border-2 border-[var(--ink)] bg-[var(--ink)] p-2 text-white">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                        ACADEMICS
                      </span>
                      <h3 className="text-lg leading-none tracking-widest sm:text-xl">
                        ACADEMIC FOUNDATION
                      </h3>
                    </div>
                  </div>
                  <span className="font-manga bg-[var(--ink)] px-3 py-1 text-xs tracking-[0.25em] text-white">
                    {EDUCATION.period}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--ink)]">
                  <Building className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--seido)" }} aria-hidden="true" />
                  <span>{EDUCATION.institution}</span>
                </div>

                <h4
                  className="mb-4 leading-none tracking-wide text-[var(--ink)]"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}
                >
                  {EDUCATION.degree.toUpperCase()}
                </h4>

                <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {EDUCATION.details}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 border-t border-[var(--ink)]/15 pt-4">
                {EDUCATION.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="border-2 border-[var(--ink)] bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </MangaPanelReveal>

          {/* GWA panel */}
          <MangaPanelReveal direction="right" index={1} className="lg:col-span-4">
            <div className="panel relative flex h-full flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-white sm:p-7">
              <div className="speed-lines pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="font-manga px-2.5 py-0.5 text-[10px] tracking-[0.4em] text-white"
                  style={{ background: "var(--seido)" }}
                >
                  ACADEMIC STANDING
                </span>
                <Sparkles className="h-4 w-4 text-white/70" aria-hidden="true" />
              </div>

              <div className="relative z-10 my-6">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  GENERAL WEIGHTED AVERAGE
                </p>
                <div
                  className="font-manga leading-none tracking-wider text-white"
                  style={{ fontSize: "clamp(2.75rem, 5vw, 4.2rem)" }}
                >
                  {EDUCATION.gwa}
                </div>
                <div className="font-manga mt-3 inline-block border-2 border-white px-3 py-1 text-xs tracking-[0.25em] text-white">
                  {EDUCATION.honors.toUpperCase()}
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[10px] text-white/65">
                <span>CAPSTONE PROJECT LEAD</span>
                <span>BSCS · PLP</span>
              </div>
            </div>
          </MangaPanelReveal>

          {/* Leadership spine */}
          <MangaPanelReveal direction="left" index={0} className="lg:col-span-4">
            <div className="panel relative flex h-full flex-col justify-between overflow-hidden bg-[var(--paper)] p-6 sm:p-7">
              <div className="screentone-coarse pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 bg-[var(--ink)] px-3 py-1 text-white">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-manga text-[10px] tracking-[0.35em]">
                    STUDENT LEADERSHIP
                  </span>
                </div>
                <h3
                  className="mb-3 leading-[0.92] text-[var(--ink)]"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.1rem)" }}
                >
                  PLP COMPUTER
                  <br />
                  <span style={{ color: "var(--seido)" }}>SOCIETY</span>
                </h3>
                {/* The abbreviated "EVP" said nothing to a reader; the post is
                    spelled out at full weight right under the society name. */}
                <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-l-4 border-[var(--seido)] bg-[var(--seido)]/[0.06] py-1.5 pl-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                    Executive Vice President
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--seido)]">
                    External Affairs · 2025–2026
                  </span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                  Four consecutive academic years of elected and appointed leadership serving
                  the College of Computer Studies community — including a term as Executive
                  Vice President for External Affairs, building industry linkages.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t-2 border-[var(--ink)] pt-4">
                <div>
                  <span className="block font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                    TENURE SPAN
                  </span>
                  <span className="font-manga text-lg tracking-widest text-[var(--ink)]">
                    2023 — 2027
                  </span>
                </div>
                <div
                  className="font-manga px-3 py-1.5 text-xs tracking-widest text-white"
                  style={{ background: "var(--seido)" }}
                >
                  4 TERMS
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          {/* Timeline */}
          <MangaPanelReveal direction="right" index={1} className="lg:col-span-8">
            <div className="panel h-full bg-[var(--paper)] p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between border-b-2 border-[var(--ink)]/15 pb-3">
                <span className="font-manga text-xs tracking-[0.35em] text-[hsl(var(--muted-foreground))]">
                  MOST RECENT FIRST
                </span>
                <Briefcase className="h-4 w-4 text-[var(--ink)]" aria-hidden="true" />
              </div>
              <Timeline activeIndex={CURRENT_ROLE_INDEX}>
                {ORG_POSITIONS.map((position) => (
                  <TimelineItem key={position.id}>
                    <TimelineDot className="h-4 w-4 rounded-none border-2 border-[var(--ink)] bg-[var(--seido)] shadow-none" />
                    <TimelineConnector className="w-[2px] bg-[var(--ink)]/30" />
                    <TimelineContent>
                      <TimelineHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <TimelineTitle className="text-lg tracking-wide text-[var(--ink)] group-hover:text-[var(--seido)]">
                            {position.role}
                          </TimelineTitle>
                          <span className="border border-[var(--ink)] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink)]">
                            {position.tag}
                          </span>
                        </div>
                        <TimelineTime className="font-manga bg-[var(--ink)]/10 px-2 py-0.5 text-xs tracking-widest text-[var(--ink)]">
                          {position.period}
                        </TimelineTime>
                      </TimelineHeader>
                      <TimelineDescription className="font-sans text-xs text-[hsl(var(--muted-foreground))] sm:text-sm">
                        {position.description}
                      </TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </MangaPanelReveal>

          {/* Academic scholarships */}
          <MangaPanelReveal direction="up" index={0} className="lg:col-span-5">
            <div className="panel flex h-full flex-col justify-between bg-[var(--paper)] p-6 sm:p-7">
              <div>
                <div className="mb-4 flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5">
                  <span className="font-manga text-sm tracking-[0.3em] text-[var(--ink)]">
                    ACADEMIC SCHOLARSHIPS
                  </span>
                  <span
                    className="px-2 py-0.5 font-mono text-[10px] text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    MERIT
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  {ACADEMIC_SCHOLARSHIPS.map((scholarship) => (
                    <div
                      key={scholarship.code}
                      className="border-l-4 border-[var(--ink)] py-0.5 pl-3.5"
                    >
                      {/* Wraps the period onto its own line before either
                          label is forced to break mid-phrase. */}
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                        <span className="font-bold text-[var(--ink)]">{scholarship.organization}</span>
                        <span className="whitespace-nowrap">{scholarship.period}</span>
                      </div>
                      <h4 className="mb-1 text-base tracking-wide text-[var(--ink)] sm:text-lg">
                        {scholarship.title}
                      </h4>
                      <p className="font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {scholarship.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          {/* Tech grants */}
          <MangaPanelReveal direction="up" index={1} className="lg:col-span-4">
            <div className="panel flex h-full flex-col justify-between bg-[var(--paper)] p-6 sm:p-7">
              <div>
                <div className="mb-4 flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5">
                  <span className="font-manga text-sm tracking-[0.3em] text-[var(--ink)]">
                    TECH GRANTS
                  </span>
                  <span className="bg-[var(--ink)] px-2 py-0.5 font-mono text-[10px] text-white">
                    NATIONAL
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  {TECH_SCHOLARSHIPS.map((grant) => (
                    <div
                      key={grant.code}
                      className="border-l-4 border-[var(--seido)] py-0.5 pl-3.5"
                    >
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                        <span className="font-bold text-[var(--ink)]">{grant.organization}</span>
                        <span className="whitespace-nowrap">{grant.period}</span>
                      </div>
                      <h4 className="mb-1 text-base tracking-wide text-[var(--ink)] sm:text-lg">
                        {grant.title}
                      </h4>
                      <p className="font-sans text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {grant.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          {/* Emblem stamp */}
          <MangaPanelReveal direction="right" index={2} className="lg:col-span-3">
            <div className="panel relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-white">
              <div className="speed-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex border-2 border-white/30 p-2">
                  <Award className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl leading-tight tracking-[0.2em] text-white">
                  4x SCHOLAR
                  <br />
                  <span className="text-xs tracking-[0.3em] text-white/65">STEM &amp; CLOUD</span>
                </h3>
              </div>
              <div className="relative z-10 border-t border-white/15 pt-4">
                <p className="font-mono text-[10px] leading-relaxed text-white/70">
                  Backed by CHED, Pasig LGU, DTI &amp; Data Engineering Pilipinas.
                </p>
              </div>
              <div
                className="font-manga pointer-events-none absolute -bottom-4 -right-2 select-none leading-none text-white/10"
                style={{ fontSize: "6.5rem" }}
                aria-hidden="true"
              >
                ★
              </div>
            </div>
          </MangaPanelReveal>
        </div>
      </div>
    </section>
  );
}
