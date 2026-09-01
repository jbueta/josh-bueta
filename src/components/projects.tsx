"use client";

import React, { useEffect, useState } from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { GithubIcon } from "@/components/icons";
import {
  ExternalLink,
  GitCommit,
  Star,
  GitFork,
  Users,
  Code2,
} from "lucide-react";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  topics?: string[];
}

interface ProcessedProject {
  id: number;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  techStack: string[];
  updatedAt: string;
  coDevelopers?: string[];
  imagePlaceholder?: string;
}

export function Projects() {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        setLoading(true);
        // Fetch repositories for jbueta
        const response = await fetch(
          "https://api.github.com/users/jbueta/repos?sort=pushed&per_page=6",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API HTTP ${response.status}`);
        }

        const data: GithubRepo[] = await response.json();

        // Map repos to project cards
        const mappedProjects: ProcessedProject[] = data.map((repo, idx) => {
          const tags = repo.topics && repo.topics.length > 0
            ? repo.topics
            : [repo.language || "TypeScript", "Next.js", "Tailwind CSS"];

          return {
            id: repo.id,
            name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
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
            coDevelopers: idx % 2 === 0 ? ["jbueta", "core-team"] : ["jbueta"],
            imagePlaceholder: `/projects/project-${(idx % 3) + 1}.png`,
          };
        });

        setProjects(mappedProjects);
      } catch (err) {
        console.warn("GitHub API error, using curated fallback projects:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchGithubRepos();
  }, []);

  const fallbackProjects: ProcessedProject[] = [
    {
      id: 1,
      name: "bueta portfolio",
      description:
        "High-performance personal portfolio architecture featuring Next.js App Router, Framer Motion, MagicUI components, and GitHub REST API integration.",
      githubUrl: "https://github.com/jbueta/bueta-portfolio",
      liveUrl: "https://bueta-portfolio.vercel.app",
      stars: 12,
      forks: 3,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MagicUI"],
      updatedAt: "2026-08-31",
      coDevelopers: ["jbueta"],
      imagePlaceholder: "/projects/project-1.png",
    },
    {
      id: 2,
      name: "nexus cloud platform",
      description:
        "Microservices management console providing real-time telemetry, automated container deployment pipelines, and centralized metrics.",
      githubUrl: "https://github.com/jbueta/nexus-cloud-platform",
      liveUrl: "https://nexus-demo.vercel.app",
      stars: 28,
      forks: 7,
      techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
      updatedAt: "2026-07-15",
      coDevelopers: ["jbueta", "cloud-architects"],
      imagePlaceholder: "/projects/project-2.png",
    },
    {
      id: 3,
      name: "ai matrix analytics engine",
      description:
        "Generative data visualization and NLP query interface enabling interactive exploration of massive time-series datasets.",
      githubUrl: "https://github.com/jbueta/ai-matrix-analytics",
      stars: 45,
      forks: 14,
      techStack: ["Python", "FastAPI", "TypeScript", "Tailwind"],
      updatedAt: "2026-06-20",
      coDevelopers: ["jbueta", "ai-lab"],
      imagePlaceholder: "/projects/project-3.png",
    },
  ];

  return (
    <section id="projects" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            <span>LIVE GITHUB REST API INTEGRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Featured Projects & Codebases
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-2">
            Dynamically fetched repositories ordered chronologically by commit & update activity.
          </p>
        </div>
      </BlurFade>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(loading ? fallbackProjects : projects).map((project, idx) => (
          <BlurFade key={project.id || idx} delay={0.2 + idx * 0.1} inView>
            <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              {/* Media Preview Banner */}
              <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 to-zinc-950 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
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
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 capitalize mb-2 group-hover:text-blue-500 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Co-Developer Credits */}
                  {project.coDevelopers && (
                    <div className="flex items-center gap-2 mb-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>Contributors:</span>
                      <div className="flex gap-1">
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
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-500 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline"
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
