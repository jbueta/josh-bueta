#!/usr/bin/env node
/**
 * Regenerates src/content/github-snapshot.json from public GitHub data.
 *
 *   node scripts/sync-github.mjs
 *
 * Set GITHUB_TOKEN to raise the REST rate limit from 60 to 5000 req/hour.
 * The site uses this snapshot whenever the live sync in src/lib/github.ts
 * fails, so every number shown to a visitor is a real, dated value.
 */
import { writeFile } from "node:fs/promises";

const USERNAME = "jbueta";
const EXTERNAL_REPOS = [
  "MJTeopaco/indie-studio-saas",
  "MJTeopaco/baq-physio-clinic",
  "MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
];
const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "bueta-portfolio-sync",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

function parseContributions(html) {
  const totalMatch = html.match(
    /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
  );
  const cells = [
    ...html.matchAll(
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"[^>]*>[\s\S]*?<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g,
    ),
  ];
  const parsed = cells.map(([, date, level, tooltip]) => {
    const count = Number(tooltip.match(/(\d+)\s+contribution/)?.[1] ?? 0);
    return { date, level: Number(level), count };
  });
  if (!parsed.length) return null;

  // DOM order from GitHub is not chronological; sort so the graph can slice
  // real Sunday-to-Saturday weeks.
  const days = [...new Map(parsed.map((day) => [day.date, day])).values()].sort(
    (a, b) => a.date.localeCompare(b.date),
  );

  const total = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ""))
    : days.reduce((sum, day) => sum + day.count, 0);
  return { total, days: days.slice(-364) };
}

async function getJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    console.warn(`  skipped ${url} (HTTP ${res.status})`);
    return null;
  }
  return res.json();
}

function summarize(repo) {
  return {
    fullName: repo.full_name,
    name: repo.name,
    description: repo.description ?? null,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language ?? null,
    topics: (repo.topics ?? []).slice(0, 6),
    pushedAt: repo.pushed_at ?? repo.updated_at,
    createdAt: repo.created_at,
    archived: Boolean(repo.archived),
    isFork: Boolean(repo.fork),
  };
}

console.log(`Syncing GitHub data for ${USERNAME}...`);
const owned =
  (await getJson(
    `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&per_page=100`,
  )) ?? [];

const repos = [...owned.map(summarize)];
for (const fullName of EXTERNAL_REPOS) {
  const repo = await getJson(`https://api.github.com/repos/${fullName}`);
  if (repo) repos.push(summarize(repo));
}

let contributions = null;
try {
  const res = await fetch(
    `https://github.com/users/${USERNAME}/contributions`,
    { headers: { "User-Agent": HEADERS["User-Agent"] } },
  );
  if (res.ok) contributions = parseContributions(await res.text());
} catch (error) {
  console.warn("  contribution sync failed:", error.message);
}

const snapshot = {
  username: USERNAME,
  syncedAt: new Date().toISOString(),
  repos,
  contributions,
};

const out = new URL("../src/content/github-snapshot.json", import.meta.url);
await writeFile(out, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `Wrote ${repos.length} repos and ${
    contributions ? `${contributions.total} contributions` : "no contributions"
  } to src/content/github-snapshot.json`,
);
