/**
 * Single source of truth for identity, links and SEO defaults.
 * Used by metadata, JSON-LD, the footer, the resume page and the contact form.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

export const NAV_LINKS = [
  { name: "Background", href: "/#background", section: "background" },
  { name: "Projects", href: "/#projects", section: "projects" },
  { name: "Arsenal", href: "/#stack", section: "stack" },
  { name: "Credentials", href: "/#credentials", section: "credentials" },
  { name: "Contact", href: "/#contact", section: "contact" },
] as const;
