/**
 * Background content: education, student leadership and scholarships.
 * Extracted from the old inline arrays in `experience.tsx`.
 */
export const EDUCATION = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Pamantasan ng Lungsod ng Pasig",
  period: "2023 – Present",
  gwa: "1.25 – 1.60",
  honors: "President's / Dean's Lister",
  details:
    "Specialized in Software Engineering, Data Structures & Algorithms, and Parallel & Distributed Programming. Capstone Lead for an AI-assisted web platform. A student leader, goal-driven and committed to continuous improvement.",
  focusAreas: [
    "Software Engineering",
    "Data Structures & Algorithms",
    "Parallel & Distributed Computing",
    "AI-Assisted Web Capstone Lead",
  ],
} as const;

export type OrgPosition = {
  id: string;
  role: string;
  period: string;
  tag: string;
  description: string;
};

export const ORG_POSITIONS: OrgPosition[] = [
  {
    id: "liaison-officer",
    role: "Liaison Officer I",
    period: "2026 – 2027",
    tag: "CURRENT",
    description:
      "Appointed to represent the organization in official communications and strategic alignments with external partners.",
  },
  {
    id: "evp-external",
    role: "Executive Vice President — External Affairs",
    period: "2025 – 2026",
    tag: "EXECUTIVE",
    description:
      "Spearheaded institutional partnerships with external tech organizations across the majority of implemented student programs.",
  },
  {
    id: "evp-internal",
    role: "Executive Vice President — Internal Affairs",
    period: "2024 – 2025",
    tag: "EXECUTIVE",
    description:
      "Led internal operations and developed flagship programs aimed at empowering the College of Computer Studies community.",
  },
  {
    id: "cs-rep",
    role: "Freshmen CS Representative",
    period: "2023 – 2024",
    tag: "COUNCIL",
    description:
      "Elected freshmen representative advocating for the computer science student body.",
  },
];

export type Scholarship = {
  code: string;
  title: string;
  organization: string;
  period: string;
  description: string;
};

export const ACADEMIC_SCHOLARSHIPS: Scholarship[] = [
  {
    code: "SCHOLAR // 01",
    title: "CHED Merit Scholarship Program (CSMP)",
    organization: "StuFAPs NCR / CHED",
    period: "2023 – Present",
    description:
      "Full academic scholarship awarded to top science and technology undergraduate students demonstrating exceptional academic standing in STEM disciplines.",
  },
  {
    code: "SCHOLAR // 02",
    title: "Pasig City Scholar (PCS)",
    organization: "Pasig City Local Government",
    period: "2023 – Present",
    description:
      "Active city scholar recognized for academic excellence, youth leadership, and community development.",
  },
];

export const TECH_SCHOLARSHIPS: Scholarship[] = [
  {
    code: "GRANT // 01",
    title: "DataCamp Donates Scholarship",
    organization: "Data Engineering Pilipinas",
    period: "June 2026 – Present",
    description:
      "Full merit access to DataCamp data science, AI engineering, and cloud tracks.",
  },
  {
    code: "GRANT // 02",
    title: "Google Career Certificate Scholar",
    organization: "DTI & Google Philippines",
    period: "July 2026 – Present",
    description:
      "Merit-based national scholarship for professional IT and Cloud Certificate specialization.",
  },
];

/** The first entry is the current role, which the timeline highlights. */
export const CURRENT_ROLE_INDEX = 0;
