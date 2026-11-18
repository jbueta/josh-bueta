import "server-only";
import snapshotData from "@/content/github-snapshot.json";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

/**
 * Real GitHub telemetry.
 *
 * - Live values are fetched server-side with a 1 hour revalidation window, so a
 *   visitor's IP never talks to GitHub and the REST rate limit is per-server.
 * - When a fetch fails, the committed snapshot (`scripts/sync-github.mjs`) is
 *   served instead of inventing numbers, and the UI labels which one it is.
 * - `GITHUB_TOKEN` is optional; without it the public endpoints are used.
 */

const REVALIDATE_SECONDS = 3600;
const OWNED_REPOS_URL = `https://api.github.com/users/${SITE.githubUsername}/repos?type=owner&sort=pushed&per_page=100`;

export type DatasetSource = "live" | "snapshot";

export type RepoStat = {
  fullName: string;
  stars: number;
  forks: number;
  pushedAt: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics: string[];
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionData = {
  total: number;
  days: ContributionDay[];
};

export type DatasetMeta = {
  source: DatasetSource;
  syncedAt: string;
};

export type GithubData = {
  /** Keyed by lowercased `owner/repo`. */
  repos: Record<string, RepoStat>;
  reposMeta: DatasetMeta;
  contributions: ContributionData | null;
  contributionsMeta: DatasetMeta;
};

type SnapshotRepo = {
  fullName: string;
  stars: number;
  forks: number;
  pushedAt: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics: string[];
};

type Snapshot = {
  username: string;
  syncedAt: string;
  repos: SnapshotRepo[];
  contributions: { total: number; days: ContributionDay[] } | null;
};

type GithubRepoResponse = {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  updated_at: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics?: string[];
};

const snapshot = snapshotData as unknown as Snapshot;

function isSnapshotRepo(
  repo: GithubRepoResponse | SnapshotRepo,
): repo is SnapshotRepo {
  return "fullName" in repo;
}

function toRepoStat(repo: GithubRepoResponse | SnapshotRepo): RepoStat {
  if (isSnapshotRepo(repo)) {
    return {
      fullName: repo.fullName,
      stars: repo.stars,
      forks: repo.forks,
      pushedAt: repo.pushedAt,
      homepage: repo.homepage,
      description: repo.description,
      language: repo.language,
      topics: repo.topics,
    };
  }

  return {
    fullName: repo.full_name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushedAt: repo.pushed_at ?? repo.updated_at,
    homepage: repo.homepage,
    description: repo.description,
    language: repo.language,
    topics: repo.topics ?? [],
  };
}

function snapshotRepos(): Record<string, RepoStat> {
  return Object.fromEntries(
    snapshot.repos.map((repo) => [repo.fullName.toLowerCase(), toRepoStat(repo)]),
  );
}

async function githubJson<T>(url: string): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "bueta-portfolio",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** Parses GitHub's public contribution calendar (no token required). */
export function parseContributionsHtml(html: string): ContributionData | null {
  const totalMatch = html.match(
    /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
  );

  const days: ContributionDay[] = [];
  const cellPattern =
    /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"[^>]*>[\s\S]*?<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(cellPattern)) {
    const [, date, level, tooltip] = match;
    const count = Number(tooltip.match(/(\d+)\s+contribution/)?.[1] ?? 0);
    days.push({ date, level: Number(level) as ContributionDay["level"], count });
  }

  if (days.length < 30) return null;

  const total = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ""))
    : days.reduce((sum, day) => sum + day.count, 0);

  return { total, days: days.slice(-364) };
}

async function fetchContributionsLive(): Promise<ContributionData | null> {
  try {
    const response = await fetch(
      `https://github.com/users/${SITE.githubUsername}/contributions`,
      {
        headers: { "User-Agent": "bueta-portfolio" },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["github-contributions"] },
      },
    );
    if (!response.ok) return null;
    return parseContributionsHtml(await response.text());
  } catch {
    return null;
  }
}

async function fetchReposLive(): Promise<Record<string, RepoStat> | null> {
  const owned = await githubJson<GithubRepoResponse[]>(OWNED_REPOS_URL);
  if (!owned) return null;

  const repos: Record<string, RepoStat> = {};
  for (const repo of owned) {
    const stat = toRepoStat(repo);
    if (stat.fullName) repos[stat.fullName.toLowerCase()] = stat;
  }

  // Curated case files owned by collaborators are fetched individually.
  const external = PROJECTS.map((project) => project.fullName)
    .filter((fullName): fullName is string => Boolean(fullName))
    .filter((fullName) => !(fullName.toLowerCase() in repos));

  for (const fullName of external) {
    const repo = await githubJson<GithubRepoResponse>(
      `https://api.github.com/repos/${fullName}`,
    );
    if (!repo) continue;
    const stat = toRepoStat(repo);
    if (stat.fullName) repos[stat.fullName.toLowerCase()] = stat;
  }

  return repos;
}

export async function getGithubData(): Promise<GithubData> {
  const fallback: GithubData = {
    repos: snapshotRepos(),
    reposMeta: { source: "snapshot", syncedAt: snapshot.syncedAt },
    contributions: snapshot.contributions,
    contributionsMeta: { source: "snapshot", syncedAt: snapshot.syncedAt },
  };

  try {
    const [repos, contributions] = await Promise.all([
      fetchReposLive(),
      fetchContributionsLive(),
    ]);

    const now = new Date().toISOString();

    return {
      repos: repos ?? fallback.repos,
      reposMeta: repos
        ? { source: "live", syncedAt: now }
        : fallback.reposMeta,
      contributions: contributions ?? fallback.contributions,
      contributionsMeta: contributions
        ? { source: "live", syncedAt: now }
        : fallback.contributionsMeta,
    };
  } catch {
    return fallback;
  }
}

const STAMP_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Deterministic across server and client (UTC, fixed locale). */
export function formatSyncStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  return STAMP_FORMAT.format(date).toUpperCase();
}
