/**
 * Single source of truth for identity, links and SEO defaults.
 * Used by metadata, JSON-LD, the footer, the resume page and the contact form.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000";

export const SITE = {
  url: rawUrl.replace(/\/$/, ""),
  name: "Mark Joshua Bueta",
  shortName: "MJB",
  role: "Web Developer & Aspiring Software Engineer",
  headline: "Frontend Developer and UI/UX designer",
  email: "joshua.bueta13@gmail.com",
  location: "Pasig City, Philippines",
  school: "Pamantasan ng Lungsod ng Pasig",
  availability: "Open for internship & collaborations",
  github: "https://github.com/jbueta",
  githubUsername: "jbueta",
  linkedin: "https://linkedin.com/in/jbueta",
  /** The one canonical resume. `public/Bueta-Resume_Updated.pdf` was removed. */
  cv: "/Mark_Joshua_Bueta_CV.pdf",
  cvFileName: "Mark_Joshua_Bueta_CV.pdf",
  /** Bump when page copy changes; keeps `sitemap.xml` deterministic. */
  updated: "2026-11-18",
  description:
    "Portfolio of Mark Joshua Bueta (MJB) — computer science student, frontend developer and UI/UX designer in Pasig City. Case files on full-stack, AI-assisted and IoT systems, plus verified certifications.",
  keywords: [
    "Mark Joshua Bueta",
    "MJB",
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Next.js Portfolio",
    "TypeScript",
    "Pasig City",
  ],
} as const;

export type Act = {
  /** Chapter numeral. The arsenal is an `INT`erlude, not a numbered act. */
  code: string;
  name: string;
  href: string;
  section: string;
  interlude?: boolean;
};

/**
 * The chapter order of the whole portfolio, in one place.
 *
 * The rail, the navbar, the footer index and every chapter opener read from
 * this list, so the numerals can no longer drift apart. `01` is the hero and
 * is deliberately not part of the navbar's section links.
 */
export const ACTS: Act[] = [
  { code: "01", name: "Opening", href: "/#opening", section: "opening" },
  { code: "02", name: "Background", href: "/#background", section: "background" },
  { code: "03", name: "Projects", href: "/#projects", section: "projects" },
  { code: "INT", name: "Arsenal", href: "/#stack", section: "stack", interlude: true },
  { code: "04", name: "Credentials", href: "/#credentials", section: "credentials" },
  { code: "05", name: "Contact", href: "/#contact", section: "contact" },
];

/** Act label used by openers: `ACT. 04` / `INTERLUDE`. */
export function actKicker(code: string): string {
  return code === "INT" ? "INTERLUDE" : `ACT. ${code}`;
}

/** Chapter numeral for a section id, e.g. `stack` → `INT`. */
export function actCodeForSection(section: string | null): string {
  if (!section) return ACTS[0].code;
  return ACTS.find((act) => act.section === section)?.code ?? ACTS[0].code;
}

export const NAV_LINKS = ACTS.filter((act) => act.code !== "01").map(
  ({ name, href, section }) => ({ name, href, section }),
);
