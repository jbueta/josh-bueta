"use client";

import React from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  GraduationCap,
  Award,
  Users,
  Calendar,
  Building,
  CheckCircle2,
  Bookmark,
} from "lucide-react";

export function Experience() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science / Information Technology",
      institution: "Polytechnic / State University",
      period: "2020 – 2024",
      honors: "Magna Cum Laude",
      details:
        "Specialized in Software Engineering, Data Structures & Algorithms, and Distributed Cloud Architectures. Capstone Lead for an AI-assisted web platform.",
    },
  ];

  const affiliations = {
    academicScholarships: [
      {
        title: "DOST-SEI Merit Academic Scholar",
        organization: "Department of Science and Technology",
        period: "2020 – 2024",
        description:
          "Full academic scholarship awarded to top science and technology undergraduate students demonstrating exceptional academic standing in STEM disciplines.",
      },
    ],
    orgExperience: [
      {
        role: "Lead Software Developer & Tech VP",
        organization: "Computer Society / Developer Student Club",
        period: "2022 – 2024",
        description:
          "Spearheaded technical workshops on Next.js, React, and Git. Architected student portal systems serving over 3,000+ active university users.",
      },
      {
        role: "Frontend Engineer & Peer Mentor",
        organization: "University Hackathon Guild",
        period: "2021 – 2023",
        description:
          "Mentored junior developers, organized 48-hour inter-university hackathons, and competed in national software innovation challenges.",
      },
    ],
    techScholarships: [
      {
        title: "AWS Cloud Engineering Scholar",
        organization: "AWS Training & Certification Grant",
        period: "2023",
        description:
          "Completed intensive hands-on cloud architecture bootcamp covering Serverless, EC2, S3, IAM, and DevOps deployment pipelines.",
      },
      {
        title: "Google Cloud & Web Dev Accelerator Grant",
        organization: "Developer Student Community Fellowship",
        period: "2022",
        description:
          "Selected for merit-based training in scalable frontend web engineering and modern JavaScript application development.",
      },
    ],
  };

  return (
    <section id="experience" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-emerald-500 uppercase font-semibold mb-2">
            BACKGROUND & MILESTONES
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Education & Affiliations
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Education Column (4 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <BlurFade delay={0.2} inView>
            <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3>Education</h3>
            </div>
          </BlurFade>

          {education.map((edu, idx) => (
            <BlurFade key={idx} delay={0.3 + idx * 0.1} inView>
              <div className="relative p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {edu.institution}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {edu.degree}
                </h4>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
                  🏆 {edu.honors}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {edu.details}
                </p>
              </div>
            </BlurFade>
          ))}

          {/* Academic Scholarship Block */}
          <BlurFade delay={0.4} inView>
            <div className="flex items-center gap-2 mt-4 mb-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                <Award className="w-5 h-5" />
              </div>
              <h3>Academic Scholarships</h3>
            </div>
          </BlurFade>

          {affiliations.academicScholarships.map((schol, idx) => (
            <BlurFade key={idx} delay={0.5 + idx * 0.1} inView>
              <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
                <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                  <span>{schol.organization}</span>
                  <span className="text-cyan-500">{schol.period}</span>
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {schol.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {schol.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Affiliations Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Organization Experience */}
          <BlurFade delay={0.2} inView>
            <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Users className="w-5 h-5" />
              </div>
              <h3>Organization Experience</h3>
            </div>
          </BlurFade>

          <div className="flex flex-col gap-4">
            {affiliations.orgExperience.map((org, idx) => (
              <BlurFade key={idx} delay={0.3 + idx * 0.1} inView>
                <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:border-indigo-500/40 transition-all">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                    <span className="font-semibold text-indigo-500">{org.organization}</span>
                    <span>{org.period}</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {org.role}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {org.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Tech Scholarship Grants */}
          <BlurFade delay={0.4} inView>
            <div className="flex items-center gap-2 mt-4 mb-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3>Tech Scholarship Grants</h3>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {affiliations.techScholarships.map((grant, idx) => (
              <BlurFade key={idx} delay={0.5 + idx * 0.1} inView>
                <div className="h-full p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
                      <span>{grant.organization}</span>
                      <span className="text-purple-500 font-semibold">{grant.period}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {grant.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {grant.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
