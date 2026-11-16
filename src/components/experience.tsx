"use client";

import React from "react";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
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

/* ================================================================
   ACT. 02 — BACKGROUND (EDUCATION, ORG LEADERSHIP, SCHOLARSHIPS)
   Authentic Manga Page Spread:
   - Unequal panel sizes, vertical & horizontal span variations
   - Zero balanced 50/50 grids; panels interlock around 6px ink gutters
   ================================================================ */

export function Experience() {
  const education = {
    degree: "Bachelor of Science in Computer Science",
    institution: "Pamantasan ng Lungsod ng Pasig",
    period: "2023 – Present",
    gwa: "1.25 – 1.60",
    honors: "President's / Dean's Lister",
    details:
      "Specialized in Software Engineering, Data Structures & Algorithms, and Parallel & Distributed Programming. Capstone Lead for an AI-assisted web platform. A student leader, goal-driven and committed to continuous improvement.",
    focusAreas: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Parallel & Distributed Computing",
      "AI-Assisted Web Capstone Lead",
    ],
  };

  const orgPositions = [
    {
      id: "liaison-officer",
      role: "Liaison Officer I",
      period: "2026 – 2027",
      tag: "CURRENT",
      description:
        "Appointed to represent the organization in official communications and strategic alignments with external partners.",
    },
    {
      id: "evp-external",
      role: "EVP — External Affairs",
      period: "2025 – 2026",
      tag: "EXECUTIVE",
      description:
        "Spearheaded institutional partnerships with external tech organizations across the majority of implemented student programs.",
    },
    {
      id: "evp-internal",
      role: "EVP — Internal Affairs",
      period: "2024 – 2025",
      tag: "EXECUTIVE",
      description:
        "Led internal operations and developed flagship programs aimed at empowering the College of Computer Studies community.",
    },
    {
      id: "cs-rep",
      role: "Freshmen CS Representative",
      period: "2023 – 2024",
      tag: "COUNCIL",
      description:
        "Elected freshmen representative advocating for the computer science student body.",
    },
  ];

  const academicScholarships = [
    {
      code: "SCHOLAR // 01",
      title: "CHED Merit Scholarship Program (CSMP)",
      organization: "StuFAPs NCR / CHED",
      period: "2023 – Present",
      description:
        "Full academic scholarship awarded to top science and technology undergraduate students demonstrating exceptional academic standing in STEM disciplines.",
    },
    {
      code: "SCHOLAR // 02",
      title: "Pasig City Scholar (PCS)",
      organization: "Pasig City Local Government",
      period: "2023 – Present",
      description:
        "Active city scholar recognized for academic excellence, youth leadership, and community development.",
    },
  ];

  const techScholarships = [
    {
      code: "GRANT // 01",
      title: "DataCamp Donates Scholarship",
      organization: "Data Engineering Pilipinas",
      period: "June 2026 – Present",
      description:
        "Full merit access to DataCamp data science, AI engineering, and cloud tracks.",
    },
    {
      code: "GRANT // 02",
      title: "Google Career Certificate Scholar",
      organization: "DTI & Google Philippines",
      period: "July 2026 – Present",
      description:
        "Merit-based national scholarship for professional IT and Cloud Certificate specialization.",
    },
  ];

  return (
    <section id="experience" className="relative z-10">
      {/* ── CHAPTER OPENER — Full-width ink splash ── */}
      <MangaPanelReveal direction="up">
        <div
          className="relative overflow-hidden speed-lines"
          style={{ background: "var(--ink)", padding: "3.5rem 2rem 3rem" }}
        >
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span
                className="font-manga text-[9px] tracking-[0.5em] px-3 py-1 inline-block mb-3 text-white slash-cut-right"
                style={{ background: "var(--seido)" }}
              >
                ACT. 02 // ORIGIN &amp; RANKS
              </span>
              <h2
                className="font-manga text-white leading-none"
                style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              >
                BACKGROUND
              </h2>
              <p
                className="font-manga tracking-[0.28em] text-white/50 mt-1"
                style={{ fontSize: "clamp(0.8rem, 2vw, 1.35rem)" }}
              >
                EDUCATION, LEADERSHIP &amp; SCHOLARSHIP HONORS
              </p>
            </div>
            <div className="border-2 border-white/25 px-4 py-2 bg-white/5 self-start sm:self-end">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 block">
                INSTITUTION
              </span>
              <span className="font-manga text-sm tracking-[0.2em] text-white">
                PAMANTASAN NG LUNGSOD NG PASIG
              </span>
            </div>
          </div>
          <div
            className="absolute right-2 bottom-0 font-manga leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(5rem, 16vw, 14rem)",
              color: "rgba(255,255,255,0.04)",
            }}
            aria-hidden="true"
          >
            02
          </div>
        </div>
      </MangaPanelReveal>

      {/* ── ASYMMETRIC MANGA PAGE SPREAD (12-Column Interlocking Grid) ── */}
      <div
        className="w-full"
        style={{
          background: "var(--ink)",
          padding: "var(--gutter)",
        }}
      >
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: "var(--gutter)" }}
        >
          {/* PANEL A: Dominant Academic Panel (8/12 cols on desktop) */}
          <MangaPanelReveal direction="left" className="lg:col-span-8">
            <div className="panel bg-[var(--paper)] sfx-scholar h-full p-6 sm:p-8 flex flex-col justify-between relative">
              <div
                className="absolute inset-0 screentone-fine opacity-45 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b-2 border-[var(--ink)]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-white shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.3em] text-[hsl(var(--muted-foreground))] block">
                        PANEL 02-A // ACADEMICS
                      </span>
                      <h3 className="font-manga text-lg sm:text-xl tracking-widest leading-none">
                        ACADEMIC FOUNDATION
                      </h3>
                    </div>
                  </div>
                  <span className="font-manga text-xs tracking-[0.25em] px-3 py-1 bg-[var(--ink)] text-white">
                    {education.period}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink)] font-semibold mb-2">
                  <Building className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--seido)" }} />
                  <span>{education.institution}</span>
                </div>

                <h4
                  className="font-manga tracking-wide text-[var(--ink)] leading-none mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}
                >
                  {education.degree.toUpperCase()}
                </h4>

                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed font-sans mb-6 max-w-2xl">
                  {education.details}
                </p>
              </div>

              {/* Focus tags */}
              <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-[var(--ink)]/15">
                {education.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border-2 border-[var(--ink)] bg-white text-[var(--ink)] font-semibold shadow-[2px_2px_0_var(--ink)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </MangaPanelReveal>

          {/* PANEL B: High-Impact Stat Callout Panel (4/12 cols — Unequal Narrow Side Panel) */}
          <MangaPanelReveal direction="right" className="lg:col-span-4">
            <div className="panel bg-[var(--ink)] text-white h-full p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute inset-0 speed-lines opacity-35 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="font-manga text-[9px] tracking-[0.4em] px-2.5 py-0.5 text-white"
                  style={{ background: "var(--seido)" }}
                >
                  ACADEMIC STANDING
                </span>
                <Sparkles className="w-4 h-4 text-white/60" />
              </div>

              <div className="relative z-10 my-6">
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-1">
                  GENERAL WEIGHTED AVERAGE
                </p>
                <div
                  className="font-manga leading-none tracking-wider text-white"
                  style={{ fontSize: "clamp(2.75rem, 5vw, 4.2rem)" }}
                >
                  {education.gwa}
                </div>
                <div className="inline-block mt-3 px-3 py-1 border-2 border-white text-white font-manga text-xs tracking-[0.25em]">
                  {education.honors.toUpperCase()}
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/55">
                <span>CAPSTONE PROJECT LEAD</span>
                <span>BSCS · PLP</span>
              </div>
            </div>
          </MangaPanelReveal>

          {/* PANEL C: Vertical Sidebar Spine for Organization Leadership (4/12 cols) */}
          <MangaPanelReveal direction="left" className="lg:col-span-4">
            <div className="panel bg-[var(--paper)] h-full p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute inset-0 screentone-coarse opacity-35 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--ink)] text-white mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-manga text-[10px] tracking-[0.35em]">
                    STUDENT LEADERSHIP
                  </span>
                </div>
                <h3
                  className="font-manga text-[var(--ink)] leading-[0.92] mb-3"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.1rem)" }}
                >
                  PLP COMPUTER
                  <br />
                  <span style={{ color: "var(--seido)" }}>SOCIETY</span>
                </h3>
                <p className="font-sans text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                  Four consecutive academic years of elected and appointed leadership serving
                  the College of Computer Studies community and building external industry
                  linkages.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t-2 border-[var(--ink)] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[hsl(var(--muted-foreground))] block">
                    TENURE SPAN
                  </span>
                  <span className="font-manga text-lg tracking-widest text-[var(--ink)]">
                    2023 — 2027
                  </span>
                </div>
                <div
                  className="px-3 py-1.5 font-manga text-xs tracking-widest text-white"
                  style={{ background: "var(--seido)" }}
                >
                  4 TERMS
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          {/* PANEL D: Wide Timeline Panel (8/12 cols) */}
          <MangaPanelReveal direction="right" className="lg:col-span-8">
            <div className="panel bg-[var(--paper)] h-full p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-[var(--ink)]/15">
                <span className="font-manga text-xs tracking-[0.35em] text-[hsl(var(--muted-foreground))]">
                  PROGRESSION LOG // REVERSE CHRONOLOGICAL
                </span>
                <Briefcase className="w-4 h-4 text-[var(--ink)]" />
              </div>
              <Timeline activeIndex={3}>
                {orgPositions.map((pos) => (
                  <TimelineItem key={pos.id}>
                    <TimelineDot className="border-2 border-[var(--ink)] bg-[var(--seido)] shadow-none w-4 h-4 rounded-none" />
                    <TimelineConnector className="bg-[var(--ink)]/30 w-[2px]" />
                    <TimelineContent>
                      <TimelineHeader>
                        <div className="flex items-center gap-2 flex-wrap">
                          <TimelineTitle className="font-manga text-lg tracking-wide text-[var(--ink)] group-hover:text-[var(--seido)]">
                            {pos.role}
                          </TimelineTitle>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--ink)] bg-white text-[var(--ink)]">
                            {pos.tag}
                          </span>
                        </div>
                        <TimelineTime className="font-manga text-xs tracking-widest text-[var(--ink)] bg-[var(--ink)]/8 px-2 py-0.5">
                          {pos.period}
                        </TimelineTime>
                      </TimelineHeader>
                      <TimelineDescription className="font-sans text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                        {pos.description}
                      </TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </MangaPanelReveal>

          {/* PANEL E: Asymmetric 3-Panel Scholarship Row (5 cols Academic + 4 cols Tech + 3 cols Emblem Stamp) */}
          <MangaPanelReveal direction="up" className="lg:col-span-5">
            <div className="panel bg-[var(--paper)] h-full p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5 mb-4">
                  <span className="font-manga text-sm tracking-[0.3em] text-[var(--ink)]">
                    ACADEMIC SCHOLARSHIPS
                  </span>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    MERIT
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  {academicScholarships.map((s) => (
                    <div
                      key={s.code}
                      className="border-l-4 border-[var(--ink)] pl-3.5 py-0.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[hsl(var(--muted-foreground))] mb-1">
                        <span className="font-bold text-[var(--ink)]">{s.organization}</span>
                        <span>{s.period}</span>
                      </div>
                      <h4 className="font-manga text-base sm:text-lg tracking-wide text-[var(--ink)] mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          <MangaPanelReveal direction="up" delay={0.06} className="lg:col-span-4">
            <div className="panel bg-[var(--paper)] h-full p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-2.5 mb-4">
                  <span className="font-manga text-sm tracking-[0.3em] text-[var(--ink)]">
                    TECH GRANTS
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-[var(--ink)] text-white">
                    NATIONAL
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  {techScholarships.map((g) => (
                    <div
                      key={g.code}
                      className="border-l-4 border-[var(--seido)] pl-3.5 py-0.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[hsl(var(--muted-foreground))] mb-1">
                        <span className="font-bold text-[var(--ink)]">{g.organization}</span>
                        <span>{g.period}</span>
                      </div>
                      <h4 className="font-manga text-base sm:text-lg tracking-wide text-[var(--ink)] mb-1">
                        {g.title}
                      </h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
                        {g.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MangaPanelReveal>

          <MangaPanelReveal direction="right" delay={0.1} className="lg:col-span-3">
            <div className="panel bg-[var(--ink)] text-white h-full p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px]">
              <div
                className="absolute inset-0 speed-lines opacity-30 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="p-2 border-2 border-white/30 inline-flex mb-3">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-manga text-xl tracking-[0.2em] text-white leading-tight">
                  4x SCHOLAR
                  <br />
                  <span className="text-white/55 text-xs tracking-[0.3em]">
                    STEM &amp; CLOUD
                  </span>
                </h3>
              </div>
              <div className="relative z-10 pt-4 border-t border-white/15">
                <p className="font-mono text-[10px] text-white/65 leading-relaxed">
                  Backed by CHED, Pasig LGU, DTI &amp; Data Engineering Pilipinas.
                </p>
              </div>
              <div
                className="absolute -right-2 -bottom-4 font-manga text-white/10 leading-none select-none pointer-events-none"
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
