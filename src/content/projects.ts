/**
 * Project content and case-study copy.
 *
 * `stars` / `forks` are intentionally absent: they are injected at render time
 * from real GitHub data (see src/lib/github.ts). Anything we cannot verify —
 * download counts, revenue, user numbers — is not claimed here.
 */
export type ProjectRole = "Owner" | "Collaborator";

export type CaseStudy = {
  context: string;
  problem: string;
  constraints: string[];
  approach: string[];
  architecture: { label: string; value: string }[];
  outcome: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /** `owner/repo` on GitHub, when the project is public. */
  fullName?: string;
  /** Repo display URL; defaults to https://github.com/<fullName>. */
  repoUrl?: string;
  liveUrl?: string;
  previewImage: string;
  previewAlt: string;
  /**
   * Your own capture for the homepage case file, e.g. `/projects/lumora.png`.
   * Leave unset and the homepage renders a 16:10 placeholder frame instead.
   */
  screenshot?: string;
  screenshotAlt?: string;
  role: ProjectRole;
  owner: string;
  collaborators: string[];
  year: string;
  techStack: string[];
  caseStudy: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "studiosprint",
    name: "StudioSprint — Workforce Optimization Platform",
    tagline: "GNN critical path & predictive resource allocation",
    summary:
      "Workforce optimization platform for startup tech organizations, pairing resource allocation with predictive ML.",
    fullName: "MJTeopaco/indie-studio-saas",
    previewImage: "/projects/studiosprint.svg",
    previewAlt:
      "Illustrated dashboard preview of the StudioSprint workforce optimization platform",
    role: "Collaborator",
    owner: "MJTeopaco",
    collaborators: ["jbueta", "MJTeopaco"],
    year: "2026",
    techStack: ["Next.js", "TypeScript", "Tailwind", "ML"],
    caseStudy: {
      context:
        "StudioSprint targets small product teams that plan delivery by gut feel: work is assigned from memory, and schedule risk is discovered only after a deadline has slipped.",
      problem:
        "Teams need to see, before a sprint starts, which assignments overload the critical path — and which engineers would be idle if the plan changed.",
      constraints: [
        "Planning views had to stay responsive while the ML service recalculated schedules.",
        "Mixed experience levels meant the UI had to explain a recommendation, not just produce one.",
        "Scope was a student-collaboration build, so the stack used free-tier infrastructure only.",
      ],
      approach: [
        "Modelled tasks and assignments as a graph so critical-path traversal and load balancing share one data structure.",
        "Fed the graph into a prediction step that estimates task duration and flags over-allocated teammates.",
        "Built the planning surface in Next.js with typed API boundaries so the model output and the UI could not drift.",
        "Added explicit empty, loading and conflict states so a failed prediction reads as a warning rather than a broken screen.",
      ],
      architecture: [
        { label: "Interface", value: "Next.js App Router + TypeScript + Tailwind" },
        { label: "Planning core", value: "Critical path algorithm over a task graph" },
        { label: "Prediction", value: "Graph neural network for allocation and duration estimates" },
        { label: "Delivery", value: "Collaborative repo with MJTeopaco" },
      ],
      outcome: [
        "A working planning surface that explains why a schedule is at risk instead of only charting it.",
        "Reusable task-graph module that both the algorithm and the prediction step consume.",
        "Shipped as a collaboration; source and history are public on GitHub.",
      ],
    },
  },
  {
    slug: "plp-attendance",
    name: "PLP Smart Attendance Monitoring System",
    tagline: "Real-time QR gate terminal & institutional analytics",
    summary:
      "Entrance and exit monitoring for PLP students and employees, with flag-ceremony attendance and QR-based reporting.",
    fullName: "jbueta/plp-smart-attendance-monitoring-system",
    previewImage: "/projects/plp-attendance.svg",
    previewAlt:
      "Illustrated interface preview of the PLP smart attendance monitoring system",
    role: "Owner",
    owner: "jbueta",
    collaborators: ["jbueta"],
    year: "2026",
    techStack: ["PHP", "MySQL", "JavaScript", "Tailwind"],
    caseStudy: {
      context:
        "Institutional attendance was collected on paper and clipboard sign-in sheets, which made flag-ceremony reporting slow and impossible to audit afterwards.",
      problem:
        "The school needed a gate terminal that records a scan in under a second, and an office view that turns those scans into per-program attendance without manual tallying.",
      constraints: [
        "Scanning happens at the gate, so the terminal had to work on modest hardware.",
        "Staff needed printable summaries, not raw scan logs.",
        "Attendance data is personally identifying, so the schema separates the scan event from the person record.",
      ],
      approach: [
        "Built a QR scan terminal that resolves an ID to a person and records entry or exit with a timestamp.",
        "Kept the write path minimal so a scan never blocks on reporting queries.",
        "Added an institutional dashboard that aggregates attendance per event, program and date range.",
        "Supported flag-ceremony attendance as its own event type instead of overloading daily logs.",
      ],
      architecture: [
        { label: "Terminal", value: "Browser-based QR scanner with JavaScript" },
        { label: "Backend", value: "PHP request handlers with prepared SQL statements" },
        { label: "Data", value: "MySQL schema split across people, events and scan records" },
        { label: "Reporting", value: "Server-rendered summaries styled with Tailwind" },
      ],
      outcome: [
        "Replaced manual sign-in sheets with auditable, time-stamped scan records.",
        "Reports that previously required tallying are generated from the same data the gate records.",
        "Deployed for student and employee entrance/exit monitoring.",
      ],
    },
  },
  {
    slug: "baq-clinic",
    name: "BAQ Physiotherapy Clinic Management System",
    tagline: "Digital healthcare portal & rehab progress tracking",
    summary:
      "Clinic platform for Bayt Al Qudra Physiotherapy: scheduling, treatment tracking, digital intake and consultation workflows.",
    fullName: "MJTeopaco/baq-physio-clinic",
    previewImage: "/projects/baq-clinic.svg",
    previewAlt:
      "Illustrated interface preview of the BAQ physiotherapy clinic management system",
    role: "Collaborator",
    owner: "MJTeopaco",
    collaborators: ["jbueta", "MJTeopaco"],
    year: "2026",
    techStack: ["React", "Node.js", "Express", "Tailwind"],
    caseStudy: {
      context:
        "A physiotherapy clinic ran intake, scheduling and progress notes across paper forms and messaging apps, so a patient's history was scattered across three places.",
      problem:
        "The clinic needed one flow from intake form to session note to follow-up booking, without asking front-desk staff to learn a complex system.",
      constraints: [
        "Health information is sensitive: access had to be role-scoped, not shared by URL.",
        "Front desk staff work quickly between patients, so every form needed to be short.",
        "The build was a multi-developer collaboration with a shared API contract.",
      ],
      approach: [
        "Modelled patient, appointment, treatment plan and session note as separate entities with explicit links.",
        "Built digitised intake forms whose answers populate the treatment plan instead of being re-typed.",
        "Implemented role-aware views for front desk and clinicians over a shared Express API.",
        "Kept the component layer presentational so the same panel styles could be reused across workflows.",
      ],
      architecture: [
        { label: "Client", value: "React with Tailwind design system" },
        { label: "API", value: "Node.js + Express REST endpoints" },
        { label: "Domain", value: "Patients, appointments, treatment plans, session notes" },
        { label: "Access", value: "Role-scoped views for clinic staff and clinicians" },
      ],
      outcome: [
        "One continuous record per patient from intake through rehabilitation progress.",
        "Replaced repeated paper intake with structured, queryable data.",
        "Built collaboratively with MJTeopaco; source is public on GitHub.",
      ],
    },
  },
  {
    slug: "lumora",
    name: "Lumora — AI Powered E-Commerce Platform",
    tagline: "Filipino artisan marketplace with an OpenAI concierge",
    summary:
      "AI-assisted storefront for local Filipino artisans: recommendations, inventory visibility and an automated shopping concierge.",
    fullName: "MJTeopaco/Lumora_AI-Powered_E-Commerce_Website",
    previewImage: "/projects/lumora-ai.svg",
    previewAlt:
      "Illustrated storefront preview of the Lumora AI-powered e-commerce platform",
    role: "Collaborator",
    owner: "MJTeopaco",
    collaborators: ["jbueta", "MJTeopaco"],
    year: "2025",
    techStack: ["React", "Next.js", "Tailwind", "OpenAI"],
    caseStudy: {
      context:
        "Lumora is a storefront concept for local Filipino artisans, where shoppers arrive without knowing the maker or the product category they want.",
      problem:
        "A small catalogue still needs guided discovery, and an artisan cannot answer the same product question for every visitor.",
      constraints: [
        "The model API key cannot reach the browser.",
        "Recommendations must degrade gracefully when the AI endpoint is unavailable.",
        "Product data has to stay authoritative in the storefront, not in the model.",
      ],
      approach: [
        "Built the catalogue and cart as the source of truth, with AI strictly as a discovery layer on top.",
        "Kept OpenAI calls server-side behind a route boundary so no key ships to the client.",
        "Used a chat concierge to answer product questions with catalogue context supplied by the server.",
        "Designed the concierge panel to fall back to category browsing when a response fails.",
      ],
      architecture: [
        { label: "Storefront", value: "Next.js + React + Tailwind" },
        { label: "AI layer", value: "Server-side OpenAI requests with catalogue context" },
        { label: "Catalogue", value: "Product, artisan and inventory records" },
        { label: "Commerce", value: "Cart and checkout flow around the recommendation layer" },
      ],
      outcome: [
        "Guided discovery for a small artisan catalogue without a manual merchandising team.",
        "AI features that fail into a browsable storefront rather than an error page.",
        "Built collaboratively with MJTeopaco; source is public on GitHub.",
      ],
    },
  },
  {
    slug: "iot-soil-monitoring",
    name: "IoT Soil Moisture & Humidity Detection",
    tagline: "Microcontroller telemetry & real-time Flask dashboard",
    summary:
      "Environmental monitoring for agricultural plots: microcontroller sensors feeding a Python dashboard with live charts.",
    fullName: "jbueta/IoT-sensor-based-soil-moisture-and-humidity-detection",
    previewImage: "/projects/iot-sensor.svg",
    previewAlt:
      "Illustrated dashboard preview of the IoT soil moisture and humidity monitoring system",
    role: "Owner",
    owner: "jbueta",
    collaborators: ["jbueta"],
    year: "2026",
    techStack: ["Python", "Flask", "MySQL", "Chart.js"],
    caseStudy: {
      context:
        "Soil conditions were checked by hand, so irrigation decisions depended on when someone last walked the plot.",
      problem:
        "The project needed continuous moisture and humidity readings that a non-technical operator could read at a glance.",
      constraints: [
        "Sensor hardware is unreliable at the edges: readings arrive late or not at all.",
        "The dashboard had to run on a laptop, not a server rack.",
        "Historical readings needed to be queryable, not just displayed live.",
      ],
      approach: [
        "Wrote the sensor ingestion path so a missing reading creates a gap in the chart instead of a fake zero.",
        "Served the dashboard from Flask with server-rendered pages and Chart.js visualisations.",
        "Stored readings in MySQL so trends could be queried per sensor and date range.",
        "Kept the operator view to current values plus a short trend, with detail behind a second view.",
      ],
      architecture: [
        { label: "Sensors", value: "Microcontroller soil moisture and humidity probes" },
        { label: "Ingestion", value: "Python service writing timestamped readings" },
        { label: "Storage", value: "MySQL reading history" },
        { label: "Dashboard", value: "Flask + Chart.js real-time charts" },
      ],
      outcome: [
        "Replaced manual spot checks with a continuously updating environmental record.",
        "Missing sensor data is visible as a gap, so an outage is never mistaken for dry soil.",
        "Source is public on GitHub.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Repos that should never appear as a portfolio case file. */
export const EXCLUDED_REPOS = [
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
