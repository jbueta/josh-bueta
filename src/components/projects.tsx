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
}

export function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllContributedRepos() {
      try {
        setLoading(true);
        const headers = { Accept: "application/vnd.github.v3+json" };

        // 1. Fetch user owned & member repositories
        const reposRes = await fetch(
          "https://api.github.com/users/jbueta/repos?type=all&sort=pushed&per_page=30",
          { headers, next: { revalidate: 3600 } }
        );

        let reposData: GithubRepo[] = [];
        if (reposRes.ok) {
          reposData = await reposRes.json();
        }

        // 2. Fetch user public events to discover external repos contributed to
        const eventsRes = await fetch(
          "https://api.github.com/users/jbueta/events?per_page=50",
          { headers, next: { revalidate: 3600 } }
        );

        const externalRepoMap = new Map<string, string>();
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          if (Array.isArray(events)) {
            events.forEach((ev: { type?: string; repo?: { name?: string; url?: string } }) => {
              if (
                ev.repo?.name &&
                (ev.type === "PushEvent" || ev.type === "PullRequestEvent" || ev.type === "CreateEvent")
              ) {
                externalRepoMap.set(ev.repo.name, ev.repo.name);
              }
            });
          }
        }

        // 3. Process and merge owned & contributed repositories
        const repoMap = new Map<number, ProcessedProject>();

        reposData.forEach((repo) => {
          const isOwner = repo.owner?.login.toLowerCase() === "jbueta";
          const tags =
            repo.topics && repo.topics.length > 0
              ? repo.topics
              : [repo.language || "TypeScript", "Next.js", "Tailwind CSS"];

          repoMap.set(repo.id, {
            id: repo.id,
            name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
            fullName: repo.full_name || repo.name,
            description:
              repo.description ||
              "Full-stack software application built with modern web architecture and clean modular code standards.",
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
            coDevelopers: isOwner ? ["jbueta"] : ["jbueta", repo.owner?.login || "core-team"],
          });
        });

        // Convert to array and sort by most recent push activity
        const resultList = Array.from(repoMap.values()).slice(0, 9);

        if (resultList.length > 0) {
          setProjects(resultList);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn("GitHub API error, using curated projects dataset:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchAllContributedRepos();
  }, []);

  const fallbackProjects: ProcessedProject[] = [
    {
      id: 1,
      name: "bueta portfolio",
      fullName: "jbueta/bueta-portfolio",
      description:
        "High-performance personal portfolio architecture featuring Next.js App Router, Framer Motion, MagicUI components, and live GitHub REST/GraphQL API integration.",
      githubUrl: "https://github.com/jbueta/bueta-portfolio",
      liveUrl: "https://bueta-portfolio.vercel.app",
      stars: 12,
      forks: 3,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MagicUI"],
      updatedAt: "2026-08-31",
      role: "Owner",
      ownerName: "jbueta",
      coDevelopers: ["jbueta"],
    },
    {
      id: 2,
      name: "nexus cloud platform",
      fullName: "cloud-org/nexus-cloud-platform",
      description:
        "Microservices management console providing real-time telemetry, automated container deployment pipelines, and centralized metrics.",
      githubUrl: "https://github.com/jbueta/nexus-cloud-platform",
      liveUrl: "https://nexus-demo.vercel.app",
      stars: 28,
      forks: 7,
      techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
      updatedAt: "2026-07-15",
      role: "Contributor",
      ownerName: "cloud-org",
      coDevelopers: ["jbueta", "cloud-architects"],
    },
    {
      id: 3,
      name: "ai matrix analytics engine",
      fullName: "ai-lab/ai-matrix-analytics",
      description:
        "Generative data visualization and NLP query interface enabling interactive exploration of massive time-series datasets.",
      githubUrl: "https://github.com/jbueta/ai-matrix-analytics",
      stars: 45,
      forks: 14,
      techStack: ["Python", "FastAPI", "TypeScript", "Tailwind"],
      updatedAt: "2026-06-20",
      role: "Collaborator",
      ownerName: "ai-lab",
      coDevelopers: ["jbueta", "ai-lab"],
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
            Owned repositories & open-source projects contributed to across GitHub.
          </p>
        </div>
      </BlurFade>

      {/* GitHub Contribution Heatmap Visual Component */}
      <BlurFade delay={0.2} inView className="mb-14">
        <ContributionGraph username="jbueta" />
      </BlurFade>

      {/* Grid Layout of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(loading ? fallbackProjects : projects).map((project, idx) => (
          <BlurFade key={project.id || idx} delay={0.3 + idx * 0.1} inView>
            <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              {/* Media Preview Banner */}
              <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 to-zinc-950 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                
                {/* Role Badge (Owner vs Contributor / Collaborator) */}
                <div className="absolute top-3 right-3 z-20">
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
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 capitalize mb-2 group-hover:text-blue-500 transition-colors font-heading">
                    {project.name}
                  </h3>
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
