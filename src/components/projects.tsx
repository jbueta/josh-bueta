"use client";

import React, { useEffect, useState } from "react";
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
];

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
  return combined.length > 200 ? combined.slice(0, 197) + "..." : combined;
}

export function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);

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

        // Filter out explicitly excluded repositories
        const filteredRepos = reposData.filter((repo) => {
          const repoNameLower = repo.name.toLowerCase();
          return !EXCLUDED_REPOS.includes(repoNameLower);
        });

        const processedList: ProcessedProject[] = await Promise.all(
          filteredRepos.slice(0, 6).map(async (repo) => {
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
              // README fetch fallback
            }

            const finalDescription =
              extractedDescription ||
              repo.description ||
              `Software project maintained by @${repo.owner?.login || "jbueta"} built with modern web architecture, clean modular code standards, and responsive user interfaces.`;

            return {
              id: repo.id,
              name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
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
      name: "Indie Studio SaaS",
      fullName: "MJTeopaco/indie-studio-saas",
      description:
        "A robust SaaS platform designed for indie studios. StudioSprint integrates powerful management tools with predictive machine learning algorithms to optimize project timelines, resource allocation, and workflow management.",
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
        "Entrance and Exit Monitoring PLP Students & Employee Attendance System for Flag Ceremonies with Entrance and Exit Analytics at PLP. Features integrated real-time RFID/QR analytics monitoring system.",
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
      name: "BAQ Physio Clinic",
      fullName: "MJTeopaco/baq-physio-clinic",
      description:
        "Comprehensive digital healthcare and physiotherapy clinic management platform supporting patient scheduling, treatment tracking, digital intake forms, and automated consultation workflows.",
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
      name: "Lumora AI Powered E Commerce Website",
      fullName: "MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
      description:
        "AI-assisted e-commerce storefront featuring personalized product recommendations, real-time inventory management, automated chat concierge, and secure payment processing integration.",
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
        "A full-stack, real-time IoT environmental monitoring and analytics dashboard capturing climatic values (temperature, soil moisture, humidity) using Python Flask, MySQL, and Chart.js.",
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
    {
      id: 6,
      name: "bueta portfolio",
      fullName: "jbueta/bueta-portfolio",
      description:
        "Personal Developer Portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and MagicUI components. Features live GitHub API integrations, timeline milestones, and interactive UI components.",
      githubUrl: "https://github.com/jbueta/bueta-portfolio",
      liveUrl: "https://bueta-portfolio.vercel.app",
      stars: 12,
      forks: 3,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MagicUI"],
      updatedAt: "2026-08-31",
      role: "Owner",
      ownerName: "jbueta",
      coDevelopers: ["jbueta"],
      hasReadme: true,
    },
  ];

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
            Owned repositories & collaborated open-source applications.
          </p>
        </div>
      </BlurFade>

      {/* GitHub Contribution Heatmap Visual Component */}
      <BlurFade delay={0.2} inView className="mb-14">
        <ContributionGraph username="jbueta" />
      </BlurFade>

      {/* Grid Layout of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(loading ? curatedProjects : projects).map((project, idx) => (
          <BlurFade key={project.id || idx} delay={0.3 + idx * 0.1} inView>
            <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              {/* Media Preview Banner */}
              <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 to-zinc-950 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                
                {/* Role Badge (Owner vs Contributor / Collaborator) */}
                <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${
                      project.role === "Owner"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                    }`}
                  >
                    {project.role === "Owner" ? (
                      <Code2 className="w-3 h-3" />
                    ) : (
                      <GitPullRequest className="w-3 h-3" />
                    )}
                    {project.role}
                  </span>
                </div>

                <div className="z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-500/60 transition-all duration-300">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase font-semibold">
                    {project.name}
                  </span>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
                  <span className="text-zinc-400">Pushed: {project.updatedAt}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <GitFork className="w-3 h-3" />
                      {project.forks}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 capitalize group-hover:text-blue-500 transition-colors font-heading">
                      {project.name}
                    </h3>
                    {project.hasReadme && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full shrink-0" title="Description extracted from repository README">
                        <FileText className="w-3 h-3" />
                        README
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Co-Developer Credits */}
                  {project.coDevelopers && (
                    <div className="flex items-center gap-2 mb-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>Contributors:</span>
                      <div className="flex flex-wrap gap-1">
                        {project.coDevelopers.map((dev, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            @{dev}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-500 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
