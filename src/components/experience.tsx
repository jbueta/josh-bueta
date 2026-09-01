"use client";

import React from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  GraduationCap,
  Award,
  Users,
  Building,
  ChevronRight,
  Briefcase,
} from "lucide-react";

export function Experience() {
  const education = [
    {
      id: "plp-cs",
      degree: "Bachelor of Science in Computer Science",
      institution: "Pamantasan ng Lungsod ng Pasig",
      period: "2023 – Present",
      honors: "President's / Dean's Lister (GWA: 1.25 – 1.60)",
      details:
        "Specialized in Software Engineering, Data Structures & Algorithms, and Parallel & Distributed Programming. Capstone Lead for an AI-assisted web platform. A student leader, goal-driven and committed to continuous improvement.",
    },
  ];

  const orgPositions = [
    {
      id: "cs-rep",
      role: "Freshmen Computer Science Representative",
      period: "2023 – 2024",
      description: "Freshmen representative of the computer science program.",
    },
    {
      id: "evp-internal",
      role: "Executive Vice President - Internal",
      period: "2024 – 2025",
      description:
        "Elected as the executive officer during sophomore year; led internal affairs and developed programs aimed at empowering the CCS community.",
    },
    {
      id: "evp-external",
      role: "Executive Vice President - External",
      period: "2025 – 2026",
      description:
        "Elected as the executive officer for external affairs; led the organization in building partnerships with external organizations across majority of implemented programs.",
    },
    {
      id: "liaison-officer",
      role: "Liaison Officer I",
      period: "2026 – 2027",
      description:
        "Appointed to represent the organization in communications between external partners.",
    },
  ];

  const academicScholarships = [
    {
      title: "CHED Merit Scholarship Program (CSMP) Awardee",
      organization: "StuFAPs NCR / CHED",
      period: "2023 – Present",
      description:
        "Full academic scholarship awarded to top science and technology undergraduate students demonstrating exceptional academic standing in STEM disciplines.",
    },
    {
      title: "Pasig City Scholar (PCS)",
      organization: "Pasig City Local Government",
      period: "2023 – Present",
      description:
        "Active scholar in Pasig City supporting academic excellence, youth leadership, and community development.",
    },
  ];

  const techScholarships = [
    {
      title: "DataCamp Donates Scholarship",
      organization: "Data Engineering Pilipinas",
      period: "June 2026 – Present",
      description:
        "Awarded full access to DataCamp data science and data engineering learning tracks sponsored by Data Engineering Pilipinas.",
    },
    {
      title: "Google Career Certificate Scholar",
      organization: "DTI & Google Philippines",
      period: "July 2026 – Present",
      description:
        "Merit-based scholarship granted by DTI and Google Philippines for professional IT and Cloud Certificate specialization.",
    },
  ];

  return (
    <section id="experience" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8 overflow-hidden">
      {/* Section Header */}
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-blue-500 uppercase font-semibold mb-2">
            BACKGROUND & MILESTONES
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
            Education, Experience & Scholarships
          </p>
        </div>
      </BlurFade>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* LEFT COLUMN (7 cols): Academic Experience & Organization Experience Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* 1. Academic Experience (Education) */}
          <div className="flex flex-col gap-6">
            <BlurFade delay={0.2} inView>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl font-heading">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3>Academic Experience</h3>
              </div>
            </BlurFade>

            {education.map((edu, idx) => (
              <BlurFade key={idx} delay={0.3} inView>
                <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:border-blue-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
                    <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
                      <Building className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      {edu.institution}
                    </span>
                    <span className="flex items-center gap-1 text-blue-500 font-semibold shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-heading">
                    {edu.degree}
                  </h4>
                  <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 border border-amber-500/20 font-mono">
                    🏆 {edu.honors}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {edu.details}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* 2. Organization Experience Timeline using UI Timeline Component */}
          <div className="flex flex-col gap-4">
            <BlurFade delay={0.4} inView>
              <div className="flex flex-col items-start gap-2 mb-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl font-heading">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3>Organization Experience</h3>
                </div>
                {/* Repositioned PLP Computer Society Badge directly below the header */}
                <span className="text-xs font-mono font-bold text-blue-500 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 self-start">
                  <Briefcase className="w-3.5 h-3.5" />
                  PLP Computer Society
                </span>
              </div>
            </BlurFade>

            {/* Custom UI Timeline Component */}
            <BlurFade delay={0.5} inView>
              <div className="p-4 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
                <Timeline activeIndex={3}>
                  {orgPositions.map((pos) => (
                    <TimelineItem key={pos.id}>
                      <TimelineDot />
                      <TimelineConnector />
                      <TimelineContent>
                        <TimelineHeader className="flex-col sm:flex-row items-start sm:items-center">
                          <TimelineTitle className="text-sm sm:text-base">{pos.role}</TimelineTitle>
                          <TimelineTime className="text-[11px] sm:text-xs">{pos.period}</TimelineTime>
                        </TimelineHeader>
                        <TimelineDescription className="text-xs sm:text-sm">{pos.description}</TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Scholarship Grants & Programs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <BlurFade delay={0.2} inView>
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl mb-1 font-heading">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                <Award className="w-5 h-5" />
              </div>
              <h3>Scholarship Grants</h3>
            </div>
          </BlurFade>

          {/* Academic Scholarships */}
          <div className="flex flex-col gap-4">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold text-sky-500 flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Academic Scholarships</span>
            </div>
            {academicScholarships.map((schol, idx) => (
              <BlurFade key={idx} delay={0.3 + idx * 0.1} inView>
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:border-sky-500/40 transition-all">
                  <div className="flex flex-wrap justify-between items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {schol.organization}
                    </span>
                    <span className="text-sky-500 font-semibold shrink-0">{schol.period}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-heading">
                    {schol.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {schol.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Tech Scholarship Grants */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold text-blue-500 flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Tech Scholarship Grants</span>
            </div>
            {techScholarships.map((grant, idx) => (
              <BlurFade key={idx} delay={0.5 + idx * 0.1} inView>
                <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:border-blue-500/40 transition-all">
                  <div className="flex flex-wrap justify-between items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {grant.organization}
                    </span>
                    <span className="text-blue-500 font-semibold shrink-0">{grant.period}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-heading">
                    {grant.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {grant.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
