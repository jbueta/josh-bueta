"use client";

import React from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  Cloud,
  Code,
  Terminal,
} from "lucide-react";

export function Certifications() {
  const certCategories = [
    {
      category: "Cloud Architecture & Infrastructure",
      icon: <Cloud className="w-5 h-5 text-blue-500" />,
      certs: [
        {
          title: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services",
          date: "2024",
          credentialId: "AWS-PSA-994821",
          skills: ["IAM", "VPC Architecture", "Serverless", "S3 & EC2"],
        },
        {
          title: "Google Cloud Digital Leader & Associate Cloud Engineer",
          issuer: "Google Cloud",
          date: "2023",
          credentialId: "GCP-ACE-772910",
          skills: ["GCP Infrastructure", "BigQuery", "Compute Engine", "GKE"],
        },
      ],
    },
    {
      category: "Web & Software Engineering Upskilling",
      icon: <Code className="w-5 h-5 text-sky-500" />,
      certs: [
        {
          title: "Meta Front-End Developer Specialization",
          issuer: "Meta / Coursera",
          date: "2023",
          credentialId: "META-FED-551029",
          skills: ["React", "State Management", "UI/UX Systems", "JavaScript ES6+"],
        },
        {
          title: "Full-Stack Web Development Bootcamp & Architecture",
          issuer: "FreeCodeCamp / Developer Guild",
          date: "2022",
          credentialId: "FCC-FS-102938",
          skills: ["Node.js", "Express", "MongoDB", "RESTful APIs"],
        },
      ],
    },
    {
      category: "DevOps & Security Upskilling",
      icon: <Terminal className="w-5 h-5 text-indigo-500" />,
      certs: [
        {
          title: "Docker & Kubernetes Containerization Specialist",
          issuer: "CNCF / Tech Academy",
          date: "2023",
          credentialId: "CNCF-DK-338291",
          skills: ["Docker Orchestration", "K8s Deployments", "CI/CD Pipelines"],
        },
      ],
    },
  ];

  return (
    <section id="certifications" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono tracking-widest text-blue-500 uppercase font-semibold mb-2">
            CREDENTIALS & UPSKILLING
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Technical Certifications
          </p>
        </div>
      </BlurFade>

      <div className="space-y-12">
        {certCategories.map((cat, catIdx) => (
          <BlurFade key={cat.category} delay={0.2 + catIdx * 0.1} inView>
            <div className="flex flex-col gap-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {cat.category}
                </h3>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.certs.map((cert, certIdx) => (
                  <div
                    key={certIdx}
                    className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                          {cert.issuer}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          Issued {cert.date}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-4">
                        ID: {cert.credentialId}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
