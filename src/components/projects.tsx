"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { ContributionGraph } from "@/components/contribution-graph";
import { GithubIcon } from "@/components/icons";
import {
  ExternalLink,
  GitCommit,
  Star,
  GitFork,
  Users,
  Code2,
  GitPullRequest,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  owner?: {
    login: string;
    avatar_url?: string;
  };
}

interface ProcessedProject {
  id: number;
  name: string;
  fullName: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  techStack: string[];
  updatedAt: string;
  role: "Owner" | "Contributor" | "Collaborator";
  ownerName: string;
  coDevelopers?: string[];
  hasReadme?: boolean;
}

const EXCLUDED_REPOS = [
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

const CUSTOM_TITLE_MAP: Record<string, { name: string; description?: string }> = {
  "indie-studio-saas": {
    name: "StudioSprint: A Smart Workforce Optimization Platform for Startups",
    description:
      "A robust workforce optimization platform designed for startup tech organizations. StudioSprint integrates powerful resource allocation and workforce management tools with predictive machine learning algorithms using Graph Neural Networks and Critical Path Algorithm to optimize project timelines, resource allocation, and workflow management.",
  },
  "plp-smart-attendance-monitoring-system": {
    name: "PLP Smart Attendance Monitoring System",
    description:
      "Smart Entrance and Exit Monitoring PLP Students & Employee Attendance System for Flag Ceremonies with Entrance and Exit Analytics at PLP. Designed to utilize data from entrance and exit scans for institutional decision support of the institution. Features integrated real-time QR analytics monitoring system.",
  },
  "baq-physio-clinic": {
    name: "BAQ Physiotherapy Clinic Management System",
    description:
      "A Comprehensive digital healthcare and physiotherapy clinic management platform for Bayt Al Qudra Physiotherapy and Physical Therapy Clinic, supporting patient scheduling, treatment tracking, digital intake forms, and automated consultation workflows.",
  },
  "lumora_ai-powered_e-commerce_website": {
    name: "Lumora: AI Powered E-Commerce Website",
    description:
      "An AI-assisted e-commerce storefront for Local Filipino Artisans, featuring personalized product recommendations, real-time inventory management, automated chat concierge, and secure payment processing integration.",
  },
  "iot-sensor-based-soil-moisture-and-humidity-detection": {
    name: "IoT Sensor Soil Moisture & Humidity Detection",
    description:
      "An automated real-time IoT environmental monitoring and analytics dashboard capturing climatic values (temperature, soil moisture, humidity) using Python Flask, MySQL, and Chart.js. A robotics-centered program that utilizes the use of microcontrollers for smart environmental detection.",
  },
};

function parseReadmeDescription(markdown: string): string {
  if (!markdown || markdown.trim().length === 0) return "";

  let clean = markdown.replace(/<[^>]+>/g, "");
  clean = clean.replace(/!\[.*?\]\(.*?\)/g, "");
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  clean = clean.replace(/```[\s\S]*?```/g, "");
  clean = clean.replace(/`([^`]+)`/g, "$1");
  clean = clean.replace(/^#+\s+.*/gm, "");
  clean = clean.replace(/\|[\s\S]*?\|/g, "");

  const lines = clean
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l.length > 20 &&
        !l.toLowerCase().startsWith("npm ") &&
        !l.toLowerCase().startsWith("yarn ") &&
        !l.toLowerCase().startsWith("git ") &&
        !l.toLowerCase().startsWith("pnpm ") &&
        !l.toLowerCase().includes("license") &&
        !l.toLowerCase().includes("table of contents") &&
        !l.toLowerCase().includes("getting started") &&
        !l.toLowerCase().includes("installation")
    );

  if (lines.length === 0) return "";

  const combined = lines.slice(0, 2).join(" ");
  return combined.length > 220 ? combined.slice(0, 217) + "..." : combined;
}

export function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchAllContributedRepos() {
      try {
        setLoading(true);
        const headers = { Accept: "application/vnd.github.v3+json" };

        const reposRes = await fetch(
          "https://api.github.com/users/jbueta/repos?type=all&sort=pushed&per_page=30",
          { headers, next: { revalidate: 3600 } }
        );

        let reposData: GithubRepo[] = [];
        if (reposRes.ok) {
          reposData = await reposRes.json();
        }

        const filteredRepos = reposData.filter((repo) => {
          const repoNameLower = repo.name.toLowerCase();
          return !EXCLUDED_REPOS.includes(repoNameLower);
        });

        const processedList: ProcessedProject[] = await Promise.all(
          filteredRepos.slice(0, 5).map(async (repo) => {
            const isOwner = repo.owner?.login.toLowerCase() === "jbueta";
            const tags =
              repo.topics && repo.topics.length > 0
                ? repo.topics
                : [repo.language || "TypeScript", "Next.js", "Tailwind CSS"];

            let extractedDescription = "";
            let hasReadme = false;

            try {
              const readmeRes = await fetch(
                `https://api.github.com/repos/${repo.owner?.login || "jbueta"}/${repo.name}/readme`,
                { headers, next: { revalidate: 3600 } }
              );

              if (readmeRes.ok) {
                const readmeData = await readmeRes.json();
                if (readmeData.content) {
                  const decodedContent = atob(readmeData.content.replace(/\n/g, ""));
                  extractedDescription = parseReadmeDescription(decodedContent);
                  hasReadme = true;
                }
              }
            } catch {
              // Fallback
            }

            const repoSlug = repo.name.toLowerCase();
            const customInfo = CUSTOM_TITLE_MAP[repoSlug];

            const displayName = customInfo?.name || repo.name.replace(/-/g, " ").replace(/_/g, " ");
            const finalDescription =
              customInfo?.description ||
              extractedDescription ||
              repo.description ||
              `Software project maintained by @${repo.owner?.login || "jbueta"} built with modern web architecture, clean modular code standards, and responsive user interfaces.`;

            return {
              id: repo.id,
              name: displayName,
              fullName: repo.full_name || repo.name,
              description: finalDescription,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              techStack: tags.slice(0, 4),
              updatedAt: new Date(repo.pushed_at || repo.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              role: isOwner ? "Owner" : "Collaborator",
              ownerName: repo.owner?.login || "jbueta",
              coDevelopers: isOwner ? ["jbueta"] : ["jbueta", repo.owner?.login || "MJTeopaco"],
              hasReadme,
            };
          })
        );

        if (processedList.length > 0) {
          setProjects(processedList);
        } else {
          setProjects(curatedProjects);
        }
      } catch (err) {
        console.warn("GitHub API error, using curated projects dataset:", err);
        setProjects(curatedProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchAllContributedRepos();
  }, []);

  const curatedProjects: ProcessedProject[] = [
    {
      id: 1,
      name: "StudioSprint: A Smart Workforce Optimization Platform for Startups",
      fullName: "MJTeopaco/indie-studio-saas",
      description:
        "A robust workforce optimization platform designed for startup tech organizations. StudioSprint integrates powerful resource allocation and workforce management tools with predictive machine learning algorithms using Graph Neural Networks and Critical Path Algorithm to optimize project timelines, resource allocation, and workflow management.",
      githubUrl: "https://github.com/MJTeopaco/indie-studio-saas",
      liveUrl: "https://indie-studio-saas.vercel.app",
      stars: 18,
      forks: 5,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Machine Learning"],
      updatedAt: "2026-08-20",
      role: "Collaborator",
      ownerName: "MJTeopaco",
      coDevelopers: ["jbueta", "MJTeopaco"],
      hasReadme: true,
    },
    {
      id: 2,
      name: "PLP Smart Attendance Monitoring System",
      fullName: "jbueta/plp-smart-attendance-monitoring-system",
      description:
        "Smart Entrance and Exit Monitoring PLP Students & Employee Attendance System for Flag Ceremonies with Entrance and Exit Analytics at PLP. Designed to utilize data from entrance and exit scans for institutional decision support of the institution. Features integrated real-time QR analytics monitoring system.",
      githubUrl: "https://github.com/jbueta/plp-smart-attendance-monitoring-system",
      stars: 24,
      forks: 6,
      techStack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
      updatedAt: "2026-08-15",
      role: "Owner",
      ownerName: "jbueta",
      coDevelopers: ["jbueta"],
      hasReadme: true,
    },
    {
      id: 3,
      name: "BAQ Physiotherapy Clinic Management System",
      fullName: "MJTeopaco/baq-physio-clinic",
      description:
        "A Comprehensive digital healthcare and physiotherapy clinic management platform for Bayt Al Qudra Physiotherapy and Physical Therapy Clinic, supporting patient scheduling, treatment tracking, digital intake forms, and automated consultation workflows.",
      githubUrl: "https://github.com/MJTeopaco/baq-physio-clinic",
      stars: 15,
      forks: 4,
      techStack: ["React", "Node.js", "Express", "Tailwind CSS"],
      updatedAt: "2026-07-28",
      role: "Collaborator",
      ownerName: "MJTeopaco",
      coDevelopers: ["jbueta", "MJTeopaco"],
      hasReadme: true,
    },
    {
      id: 4,
      name: "Lumora: AI Powered E-Commerce Website",
      fullName: "MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
      description:
        "An AI-assisted e-commerce storefront for Local Filipino Artisans, featuring personalized product recommendations, real-time inventory management, automated chat concierge, and secure payment processing integration.",
      githubUrl: "https://github.com/MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
      stars: 32,
      forks: 9,
      techStack: ["React", "Next.js", "Tailwind CSS", "OpenAI API"],
      updatedAt: "2026-07-10",
      role: "Collaborator",
      ownerName: "MJTeopaco",
      coDevelopers: ["jbueta", "MJTeopaco"],
      hasReadme: true,
    },
    {
      id: 5,
      name: "IoT Sensor Soil Moisture & Humidity Detection",
      fullName: "jbueta/IoT-sensor-based-soil-moisture-and-humidity-detection",
      description:
        "An automated real-time IoT environmental monitoring and analytics dashboard capturing climatic values (temperature, soil moisture, humidity) using Python Flask, MySQL, and Chart.js. A robotics-centered program that utilizes the use of microcontrollers for smart environmental detection.",
      githubUrl: "https://github.com/jbueta/IoT-sensor-based-soil-moisture-and-humidity-detection",
      stars: 21,
      forks: 5,
      techStack: ["Python", "Flask", "MySQL", "Chart.js"],
      updatedAt: "2026-06-18",
      role: "Owner",
      ownerName: "jbueta",
      coDevelopers: ["jbueta"],
      hasReadme: true,
    },
  ];

  const activeProjects = loading ? curatedProjects : projects;
  const currentProject = activeProjects[activeIndex] || activeProjects[0];

  return (
    <section id="projects" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            <span>LIVE GITHUB REST & GRAPHQL API</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
            Featured Projects & Contributions
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-2 font-sans">
            Interactive Highlight Carousel of owned repositories & collaborated applications.
          </p>
        </div>
      </BlurFade>

      {/* GitHub Contribution Heatmap Visual Component */}
      <BlurFade delay={0.2} inView className="mb-14">
        <ContributionGraph username="jbueta" />
      </BlurFade>

      {/* Hardware-Accelerated Ultra-Smooth Highlight Carousel Stage */}
      <BlurFade delay={0.3} inView>
        <div className="relative w-full flex flex-col items-center justify-center my-4">
          {/* Carousel Stage Track Container */}
          <div className="relative w-full max-w-3xl h-[240px] sm:h-[270px] flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center">
              {activeProjects.map((project, idx) => {
                const total = activeProjects.length;
                let offset = idx - activeIndex;

                if (offset < -1) offset += total;
                if (offset > 1) offset -= total;

                const isCenter = offset === 0;
                const isLeft = offset === -1 || (activeIndex === 0 && idx === total - 1);
                const isRight = offset === 1 || (activeIndex === total - 1 && idx === 0);

                if (!isCenter && !isLeft && !isRight) return null;

                let positionX = 0;
                if (isLeft) positionX = -190;
                if (isRight) positionX = 190;

                return (
                  <motion.div
                    key={project.id || idx}
                    initial={false}
                    animate={{
                      x: positionX,
                      scale: isCenter ? 1 : 0.85,
                      opacity: isCenter ? 1 : 0.5,
                      zIndex: isCenter ? 30 : 10,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "absolute w-[280px] sm:w-[350px] h-[210px] sm:h-[240px] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-colors duration-300 border-2 select-none",
                      isCenter
                        ? "border-blue-500 shadow-blue-500/20 bg-zinc-950 ring-2 ring-blue-500/20"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-900/90 opacity-60 hover:opacity-85"
                    )}
                  >
                    {/* Media Preview Banner */}
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-zinc-950 to-blue-950 p-5 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

                      {/* Top Role Badge */}
                      <div className="flex justify-between items-center z-10">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md",
                            project.role === "Owner"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                          )}
                        >
                          {project.role === "Owner" ? (
                            <Code2 className="w-3 h-3" />
                          ) : (
                            <GitPullRequest className="w-3 h-3" />
                          )}
                          {project.role}
                        </span>

                        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800">
                          {project.updatedAt}
                        </span>
                      </div>

                      {/* Center Card Title Icon */}
                      <div className="z-10 flex flex-col items-center text-center gap-2.5 my-auto">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-md flex items-center justify-center text-blue-400 shadow-lg">
                          <Code2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-white font-heading tracking-wide capitalize line-clamp-1">
                          {project.name}
                        </h4>
                      </div>

                      {/* Floating Bottom Stats */}
                      <div className="z-10 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
                        <span className="text-zinc-400 font-medium">
                          @{project.ownerName}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1 text-blue-400 font-semibold">
                            <GitFork className="w-3 h-3" />
                            {project.forks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Carousel Dots Navigation Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {activeProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  idx === activeIndex
                    ? "w-8 bg-blue-500 shadow-md shadow-blue-500/40"
                    : "w-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                )}
              />
            ))}
          </div>
        </div>
      </BlurFade>

      {/* Dynamic Typography Content Panel (Positioned Below Carousel for Active Project) */}
      <BlurFade delay={0.4} inView>
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id || activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-xl max-w-3xl mx-auto flex flex-col justify-between"
              >
                <div>
                  {/* Title & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading capitalize">
                        {currentProject.name}
                      </h3>
                      {currentProject.hasReadme && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                          README
                        </span>
                      )}
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border",
                        currentProject.role === "Owner"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                      )}
                    >
                      {currentProject.role === "Owner" ? (
                        <Code2 className="w-3.5 h-3.5" />
                      ) : (
                        <GitPullRequest className="w-3.5 h-3.5" />
                      )}
                      {currentProject.role}
                    </span>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans mb-6">
                    {currentProject.description}
                  </p>

                  {/* Contributors */}
                  {currentProject.coDevelopers && (
                    <div className="flex items-center gap-2 mb-6 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Contributors:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.coDevelopers.map((dev, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold"
                          >
                            @{dev}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-md"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>

                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/20"
                    >
                      <span>Live Application</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BlurFade>
    </section>
  );
}
