"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import { ContributionGraph } from "@/components/contribution-graph";
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
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/* ================================================================
   DATA TYPES & CURATED HOMEPAGE PLACEHOLDER MAPPING
   Each project now includes a dedicated manga-adapted homepage/landing
   preview image (`previewImage`) stored in /public/projects/*.svg
   ================================================================ */
interface ProcessedProject {
  id: number;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  previewImage: string;
  stars: number;
  forks: number;
  techStack: string[];
  updatedAt: string;
  role: "Owner" | "Contributor" | "Collaborator";
  ownerName: string;
  coDevelopers?: string[];
  hasReadme?: boolean;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name?: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  topics?: string[];
  owner?: { login: string };
}

const EXCLUDED = [
  "josh-bueta",
  "jbueta",
  "bueta-app",
  "my-first-app",
  "is_machine_learning",
  "is-machine-learning",
  "cs2a_grademanagementsystem",
  "cs2a-grademanagementsystem",
  "bueta-portfolio",
];

const CUSTOM: Record<
  string,
  { name: string; tagline: string; description: string; previewImage: string }
> = {
  "indie-studio-saas": {
    name: "StudioSprint — Workforce Optimization Platform",
    tagline: "GNN Critical Path & Predictive Resource Allocation",
    description:
      "Workforce optimization platform for startup tech organizations. Integrates resource allocation with predictive ML using Graph Neural Networks and Critical Path Algorithm to optimize project timelines.",
    previewImage: "/projects/studiosprint.svg",
  },
  "plp-smart-attendance-monitoring-system": {
    name: "PLP Smart Attendance Monitoring System",
    tagline: "Real-Time QR Gate Terminal & Institutional Analytics",
    description:
      "Smart entrance and exit monitoring for PLP students and employees. Flag ceremony attendance tracking with real-time QR analytics and institutional decision support.",
    previewImage: "/projects/plp-attendance.svg",
  },
  "baq-physio-clinic": {
    name: "BAQ Physiotherapy Clinic Management System",
    tagline: "Digital Healthcare Portal & Rehab Progress Tracking",
    description:
      "Digital healthcare platform for Bayt Al Qudra Physiotherapy Clinic. Patient scheduling, treatment tracking, digital intake forms, and automated consultation workflows.",
    previewImage: "/projects/baq-clinic.svg",
  },
  "lumora_ai-powered_e-commerce_website": {
    name: "Lumora — AI Powered E-Commerce Platform",
    tagline: "Filipino Artisan Marketplace with OpenAI Concierge",
    description:
      "AI-assisted e-commerce storefront for Local Filipino Artisans. Personalized product recommendations, real-time inventory, automated chat concierge, and secure payment processing.",
    previewImage: "/projects/lumora-ai.svg",
  },
  "iot-sensor-based-soil-moisture-and-humidity-detection": {
    name: "IoT Soil Moisture & Humidity Detection",
    tagline: "Microcontroller Telemetry & Flask Real-Time Dashboard",
    description:
      "Real-time IoT environmental monitoring dashboard using Python Flask, MySQL, and Chart.js. Microcontroller-based smart environmental detection for agricultural applications.",
    previewImage: "/projects/iot-sensor.svg",
  },
};

function resolvePreviewImage(fullName: string, index: number): string {
  const lower = fullName.toLowerCase();
  for (const [slug, meta] of Object.entries(CUSTOM)) {
    if (lower.includes(slug)) return meta.previewImage;
  }
  const fallbacks = [
    "/projects/studiosprint.svg",
    "/projects/plp-attendance.svg",
    "/projects/baq-clinic.svg",
    "/projects/lumora-ai.svg",
    "/projects/iot-sensor.svg",
  ];
  return fallbacks[index % fallbacks.length];
}

const CURATED: ProcessedProject[] = [
  {
    id: 1,
    name: CUSTOM["indie-studio-saas"].name,
    tagline: CUSTOM["indie-studio-saas"].tagline,
    fullName: "MJTeopaco/indie-studio-saas",
    description: CUSTOM["indie-studio-saas"].description,
    githubUrl: "https://github.com/MJTeopaco/indie-studio-saas",
    liveUrl: "https://indie-studio-saas.vercel.app",
    previewImage: CUSTOM["indie-studio-saas"].previewImage,
    stars: 18,
    forks: 5,
    techStack: ["Next.js", "TypeScript", "Tailwind", "ML"],
    updatedAt: "Aug 2026",
    role: "Collaborator",
    ownerName: "MJTeopaco",
    coDevelopers: ["jbueta", "MJTeopaco"],
    hasReadme: true,
  },
  {
    id: 2,
    name: CUSTOM["plp-smart-attendance-monitoring-system"].name,
    tagline: CUSTOM["plp-smart-attendance-monitoring-system"].tagline,
    fullName: "jbueta/plp-smart-attendance-monitoring-system",
    description: CUSTOM["plp-smart-attendance-monitoring-system"].description,
    githubUrl: "https://github.com/jbueta/plp-smart-attendance-monitoring-system",
    previewImage: CUSTOM["plp-smart-attendance-monitoring-system"].previewImage,
    stars: 24,
    forks: 6,
    techStack: ["PHP", "MySQL", "JavaScript", "Tailwind"],
    updatedAt: "Aug 2026",
    role: "Owner",
    ownerName: "jbueta",
    coDevelopers: ["jbueta"],
    hasReadme: true,
  },
  {
    id: 3,
    name: CUSTOM["baq-physio-clinic"].name,
    tagline: CUSTOM["baq-physio-clinic"].tagline,
    fullName: "MJTeopaco/baq-physio-clinic",
    description: CUSTOM["baq-physio-clinic"].description,
    githubUrl: "https://github.com/MJTeopaco/baq-physio-clinic",
    previewImage: CUSTOM["baq-physio-clinic"].previewImage,
    stars: 15,
    forks: 4,
    techStack: ["React", "Node.js", "Express", "Tailwind"],
    updatedAt: "Jul 2026",
    role: "Collaborator",
    ownerName: "MJTeopaco",
    coDevelopers: ["jbueta", "MJTeopaco"],
    hasReadme: true,
  },
  {
    id: 4,
    name: CUSTOM["lumora_ai-powered_e-commerce_website"].name,
    tagline: CUSTOM["lumora_ai-powered_e-commerce_website"].tagline,
    fullName: "MJTeopaco/lumora_ai-powered_e-commerce_website",
    description: CUSTOM["lumora_ai-powered_e-commerce_website"].description,
    githubUrl: "https://github.com/MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
    previewImage: CUSTOM["lumora_ai-powered_e-commerce_website"].previewImage,
    stars: 32,
    forks: 9,
    techStack: ["React", "Next.js", "Tailwind", "OpenAI"],
    updatedAt: "Jul 2026",
    role: "Collaborator",
    ownerName: "MJTeopaco",
    coDevelopers: ["jbueta", "MJTeopaco"],
    hasReadme: true,
  },
  {
    id: 5,
    name: CUSTOM["iot-sensor-based-soil-moisture-and-humidity-detection"].name,
    tagline: CUSTOM["iot-sensor-based-soil-moisture-and-humidity-detection"].tagline,
    fullName: "jbueta/iot-sensor-based-soil-moisture-and-humidity-detection",
    description:
      CUSTOM["iot-sensor-based-soil-moisture-and-humidity-detection"].description,
    githubUrl:
      "https://github.com/jbueta/IoT-sensor-based-soil-moisture-and-humidity-detection",
    previewImage:
      CUSTOM["iot-sensor-based-soil-moisture-and-humidity-detection"].previewImage,
    stars: 21,
    forks: 5,
    techStack: ["Python", "Flask", "MySQL", "Chart.js"],
    updatedAt: "Jun 2026",
    role: "Owner",
    ownerName: "jbueta",
    coDevelopers: ["jbueta"],
    hasReadme: true,
  },
];

/* ================================================================
   PROJECTS SECTION — Asymmetric Multi-Panel Manga Spread
   - Row 1: Unequal 9/3 split (GitHub Matrix + Commit Summary Panel)
   - Row 2: Dominant 8/4 Manga Climax Spread (Landing Page Preview
            with halftone print frame + Vertical Chapter Selector)
   - Row 3: Unequal 7/5 Spec Breakdown + Quick-Select Thumbnail Strip
            of all project landing page previews
   ================================================================ */
export function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>(CURATED);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    async function fetch5() {
      try {
        const h = { Accept: "application/vnd.github.v3+json" };
        const r = await fetch(
          "https://api.github.com/users/jbueta/repos?type=all&sort=pushed&per_page=30",
          { headers: h }
        );
        if (!r.ok) throw new Error();
        const data: GithubRepo[] = await r.json();
        const filtered = data
          .filter((x) => !EXCLUDED.includes(x.name.toLowerCase()))
          .slice(0, 5);
        const list: ProcessedProject[] = filtered.map((repo, idx) => {
          const isOwner = repo.owner?.login.toLowerCase() === "jbueta";
          const slug = repo.name.toLowerCase();
          const c = CUSTOM[slug];
          const fullName = repo.full_name || repo.name;
          return {
            id: repo.id,
            name: c?.name || repo.name.replace(/[-_]/g, " "),
            tagline: c?.tagline || "Production Web & Systems Engineering",
            fullName,
            description:
              c?.description ||
              repo.description ||
              `Software engineering project by @${repo.owner?.login}.`,
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || undefined,
            previewImage: c?.previewImage || resolvePreviewImage(fullName, idx),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            techStack: (repo.topics?.length
              ? repo.topics
              : [repo.language || "TypeScript"]
            ).slice(0, 4),
            updatedAt: new Date(
              repo.pushed_at || repo.updated_at
            ).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            role: isOwner ? "Owner" : "Collaborator",
            ownerName: repo.owner?.login || "jbueta",
            coDevelopers: isOwner
              ? ["jbueta"]
              : ["jbueta", repo.owner?.login || "MJTeopaco"],
            hasReadme: true,
          };
        });
        if (list.length) setProjects(list);
      } catch {
        setProjects(CURATED);
      }
    }
    fetch5();
  }, []);

  /* GSAP kinetic snap on project switch */
  useGSAP(
    () => {
      if (!heroCardRef.current) return;
      gsap.fromTo(
        heroCardRef.current,
        { scale: 0.985, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" }
      );
    },
    { dependencies: [activeIndex] }
  );

  const all = projects;
  const cur = all[activeIndex] ?? all[0];
  const prev = () => setActiveIndex((i) => (i - 1 + all.length) % all.length);
  const next = () => setActiveIndex((i) => (i + 1) % all.length);

  return (
    <>
      <section id="projects" className="relative z-10">
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
                  ACT. 03 // CASE FILES &amp; BUILDS
                </span>
                <h2
                  className="font-manga text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
                >
                  PROJECTS
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <GitCommit className="w-3.5 h-3.5 text-white/50" />
                  <p
                    className="font-manga tracking-[0.28em] text-white/50"
                    style={{ fontSize: "clamp(0.75rem, 1.8vw, 1.25rem)" }}
                  >
                    HOMEPAGE PREVIEWS &amp; LIVE GITHUB TELEMETRY
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/jbueta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white/35 text-white font-manga text-xs tracking-[0.25em] hover:bg-white hover:text-[var(--ink)] transition-colors self-start sm:self-end"
              >
                <GithubIcon className="w-4 h-4" />
                @JBUETA ARCHIVE ↗
              </a>
            </div>
            <div
              className="absolute right-2 bottom-0 font-manga leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem, 16vw, 14rem)",
                color: "rgba(255,255,255,0.038)",
              }}
              aria-hidden="true"
            >
              03
            </div>
          </div>
        </MangaPanelReveal>

        {/* ── ASYMMETRIC MANGA PAGE SPREAD (12-Column Interlocking Grid) ── */}
        <div
          className="w-full"
          style={{ background: "var(--ink)", padding: "var(--gutter)" }}
        >
          <div
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12"
            style={{ gap: "var(--gutter)" }}
          >
            {/* ROW 1 LEFT (9/12 cols): GitHub Contribution Matrix */}
            <MangaPanelReveal direction="left" className="lg:col-span-9">
              <div className="panel bg-[var(--paper)] h-full">
                <ContributionGraph username="jbueta" mangaTheme />
              </div>
            </MangaPanelReveal>

            {/* ROW 1 RIGHT (3/12 cols): Narrow Vertical Telemetry Callout Panel */}
            <MangaPanelReveal direction="right" className="lg:col-span-3">
              <div className="panel bg-[var(--ink)] text-white h-full p-6 flex flex-col justify-between relative overflow-hidden">
                <div
                  className="absolute inset-0 speed-lines opacity-30 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <span
                    className="font-manga text-[9px] tracking-[0.4em] px-2.5 py-0.5 inline-block mb-3 text-white"
                    style={{ background: "var(--seido)" }}
                  >
                    BUILD LOG
                  </span>
                  <h3 className="font-manga text-2xl tracking-wider text-white leading-tight">
                    SHIPPING
                    <br />
                    FULL-STACK
                    <br />
                    SYSTEMS
                  </h3>
                  <p className="font-sans text-xs text-white/60 mt-2 leading-relaxed">
                    Production web apps, AI-assisted platforms, and IoT dashboards built for
                    real-world institutional and client use.
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-white/45 block">
                      FEATURED WORKS
                    </span>
                    <span className="font-manga text-2xl tracking-widest text-white">
                      0{all.length} SYSTEMS
                    </span>
                  </div>
                  <Layers className="w-6 h-6 text-white/40" />
                </div>
              </div>
            </MangaPanelReveal>

            {/* ROW 2 LEFT (8/12 cols): Dominant Landing Page / Homepage Showcase Panel */}
            <MangaPanelReveal direction="left" className="lg:col-span-8">
              <div
                ref={heroCardRef}
                className="panel bg-[var(--paper)] h-full flex flex-col justify-between group"
              >
                {/* Top Manga Panel Strip */}
                <div className="bg-[var(--ink)] text-white px-4 sm:px-5 py-2.5 flex items-center justify-between gap-2 border-b-4 border-[var(--ink)]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="font-manga text-[10px] tracking-[0.35em] px-2 py-0.5 text-white shrink-0"
                      style={{ background: "var(--seido)" }}
                    >
                      PANEL 0{activeIndex + 1}
                    </span>
                    <span className="font-mono text-[11px] text-white/80 truncate">
                      {cur.fullName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "font-manga text-[9px] tracking-[0.35em] px-2 py-0.5 inline-flex items-center gap-1",
                        cur.role === "Owner"
                          ? "bg-white text-[var(--ink)]"
                          : "bg-[var(--seido)] text-white"
                      )}
                    >
                      {cur.role === "Owner" ? (
                        <Code2 className="w-2.5 h-2.5" />
                      ) : (
                        <GitPullRequest className="w-2.5 h-2.5" />
                      )}
                      {cur.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Homepage / Landing Page Preview Canvas */}
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="relative w-full overflow-hidden bg-[var(--paper)] cursor-zoom-in"
                  style={{ aspectRatio: "16/9.3" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={cur.previewImage}
                      src={cur.previewImage}
                      alt={`${cur.name} Homepage Preview`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.22 }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Expand Homepage Preview Stamp */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(true);
                    }}
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--ink)] text-white border-2 border-white font-manga text-[9px] tracking-[0.3em] shadow-[3px_3px_0_rgba(0,0,0,0.5)] hover:bg-[var(--seido)] transition-colors"
                  >
                    <Maximize2 className="w-3 h-3" />
                    INSPECT LANDING PAGE
                  </button>

                  {/* Bottom Manga Caption Overlay Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 sm:px-5 pt-8 pb-3 flex items-end justify-between gap-3">
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.3em] text-white/65 uppercase block">
                        HOMEPAGE / INTERFACE PREVIEW
                      </span>
                      <p className="font-manga text-base sm:text-xl tracking-wider text-white leading-tight">
                        {cur.tagline.toUpperCase()}
                      </p>
                    </div>

                    {/* Prev / Next Controls */}
                    <div
                      className="flex items-center gap-1.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={prev}
                        aria-label="Previous project"
                        className="w-8 h-8 border-2 border-white bg-[var(--ink)] text-white flex items-center justify-center hover:bg-white hover:text-[var(--ink)] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-manga text-xs tracking-widest text-white px-2">
                        0{activeIndex + 1} / 0{all.length}
                      </span>
                      <button
                        onClick={next}
                        aria-label="Next project"
                        className="w-8 h-8 border-2 border-white bg-[var(--ink)] text-white flex items-center justify-center hover:bg-white hover:text-[var(--ink)] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </MangaPanelReveal>

            {/* ROW 2 RIGHT (4/12 cols): Vertical Manga Chapter Index Selector */}
            <MangaPanelReveal direction="right" className="lg:col-span-4">
              <div className="panel bg-[var(--paper)] h-full flex flex-col justify-between">
                <div className="bg-[var(--ink)] text-white px-5 py-3 border-b-4 border-[var(--ink)] flex items-center justify-between">
                  <span className="font-manga text-xs tracking-[0.35em]">
                    CASE FILE INDEX
                  </span>
                  <span className="font-mono text-[10px] text-white/60">
                    SELECT TO VIEW
                  </span>
                </div>

                <div className="flex-1 flex flex-col divide-y-2 divide-[var(--ink)]/15">
                  {all.map((p, i) => {
                    const active = i === activeIndex;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                          "w-full text-left px-4 py-3.5 transition-all duration-150 flex items-start gap-3 group relative",
                          active
                            ? "bg-[var(--ink)] text-white"
                            : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)]/8"
                        )}
                      >
                        {/* Active Seido Accent Bar */}
                        {active && (
                          <span
                            className="absolute left-0 top-0 bottom-0 w-1.5"
                            style={{ background: "var(--seido)" }}
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={cn(
                            "font-manga text-base tracking-widest shrink-0 px-2 py-0.5 border",
                            active
                              ? "border-white/40 bg-[var(--seido)] text-white"
                              : "border-[var(--ink)]/30 text-[var(--ink)]"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "font-manga text-sm tracking-wide leading-tight line-clamp-1",
                              active ? "text-white" : "text-[var(--ink)]"
                            )}
                          >
                            {p.name}
                          </p>
                          <p
                            className={cn(
                              "font-mono text-[10px] mt-0.5 truncate",
                              active
                                ? "text-white/65"
                                : "text-[hsl(var(--muted-foreground))]"
                            )}
                          >
                            {p.techStack.slice(0, 3).join(" · ")}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </MangaPanelReveal>

            {/* ROW 3 LEFT (7/12 cols): Narrative Case Study & Action Links Panel */}
            <MangaPanelReveal direction="up" className="lg:col-span-7">
              <div className="panel bg-[var(--paper)] sfx-deploy h-full p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-4 border-b-2 border-[var(--ink)]">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--muted-foreground))] uppercase block mb-1">
                        ARCHITECTURAL OVERVIEW // 0{activeIndex + 1}
                      </span>
                      <h3 className="font-manga text-2xl sm:text-3xl tracking-wide text-[var(--ink)] leading-none">
                        {cur.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--ink)] border-2 border-[var(--ink)] bg-white px-3 py-1 shadow-[2px_2px_0_var(--ink)]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" style={{ color: "var(--seido)" }} />
                        {cur.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {cur.forks}
                      </span>
                      <span className="text-[hsl(var(--muted-foreground))]">
                        {cur.updatedAt}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] text-[hsl(var(--muted-foreground))] leading-relaxed font-sans mb-6">
                    {cur.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Stack & Contributors Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--ink)]/15">
                    <div className="flex flex-wrap gap-2">
                      {cur.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 font-manga text-[10px] tracking-widest bg-[var(--ink)] text-white"
                        >
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    {cur.coDevelopers && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                        <Users className="w-3.5 h-3.5 shrink-0 text-[var(--ink)]" />
                        {cur.coDevelopers.map((d, i) => (
                          <span
                            key={i}
                            className="border border-[var(--ink)] px-2 py-0.5 bg-white text-[var(--ink)] font-semibold"
                          >
                            @{d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={cur.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-manga tracking-widest text-xs border-2 border-[var(--ink)] bg-white text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] hover:bg-[var(--ink)] hover:text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                    >
                      <GithubIcon className="w-4 h-4" /> VIEW SOURCE REPO
                    </a>
                    {cur.liveUrl && (
                      <a
                        href={cur.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 font-manga tracking-widest text-xs text-white border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        style={{ background: "var(--seido)" }}
                      >
                        LIVE DEPLOYMENT <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 font-manga tracking-widest text-xs border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> FULLSCREEN PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            </MangaPanelReveal>

            {/* ROW 3 RIGHT (5/12 cols): Manga Contact Sheet — All 5 Homepage Thumbnails */}
            <MangaPanelReveal direction="up" delay={0.06} className="lg:col-span-5">
              <div className="panel bg-[var(--paper)] h-full p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[var(--ink)]">
                  <span className="font-manga text-xs tracking-[0.3em] text-[var(--ink)]">
                    LANDING PAGE FILMSTRIP
                  </span>
                  <span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                    5 PREVIEWS
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
                  {all.map((proj, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                          "relative overflow-hidden border-2 transition-all text-left group",
                          isSelected
                            ? "border-[var(--seido)] ring-2 ring-[var(--seido)]"
                            : "border-[var(--ink)] opacity-75 hover:opacity-100",
                          idx === 0 && "col-span-2 sm:col-span-1 lg:col-span-2"
                        )}
                        style={{ aspectRatio: idx === 0 ? "16/6.5" : "16/9.5" }}
                      >
                        <img
                          src={proj.previewImage}
                          alt={proj.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/85 px-2 py-1 flex items-center justify-between">
                          <span className="font-manga text-[9px] tracking-widest text-white truncate">
                            0{idx + 1} · {proj.name.split("—")[0].trim()}
                          </span>
                          {isSelected && (
                            <span
                              className="w-2 h-2 shrink-0"
                              style={{ background: "var(--seido)" }}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </MangaPanelReveal>
          </div>
        </div>
      </section>

      {/* Lightbox for Fullscreen Homepage Preview */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxOpen(false)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 cursor-zoom-out select-none"
                style={{ background: "rgba(10,10,10,0.94)" }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-5xl w-full z-[100000] panel bg-[var(--paper)]"
                >
                  <div className="flex items-center justify-between px-5 py-3.5 bg-[var(--ink)] text-white border-b-4 border-[var(--ink)]">
                    <div>
                      <span
                        className="font-manga text-[9px] tracking-[0.4em] px-2 py-0.5 mr-2 text-white"
                        style={{ background: "var(--seido)" }}
                      >
                        HOMEPAGE PREVIEW
                      </span>
                      <span className="font-manga text-base sm:text-lg tracking-wider">
                        {cur.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setLightboxOpen(false)}
                      aria-label="Close preview"
                      className="p-1.5 border-2 border-white/40 text-white hover:bg-white hover:text-[var(--ink)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 sm:p-5 bg-[var(--paper)] screentone-fine">
                    <img
                      src={cur.previewImage}
                      alt={cur.name}
                      className="w-full h-auto border-2 border-[var(--ink)] shadow-xl"
                    />
                  </div>

                  <div className="px-5 py-3.5 border-t-4 border-[var(--ink)] bg-[var(--paper)] flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                      {cur.tagline}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <a
                        href={cur.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-white font-manga text-xs tracking-widest"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> GITHUB REPO
                      </a>
                      {cur.liveUrl && (
                        <a
                          href={cur.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-white font-manga text-xs tracking-widest"
                          style={{ background: "var(--seido)" }}
                        >
                          LIVE DEMO <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
