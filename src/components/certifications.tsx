"use client";

import React, { useState } from "react";
import { BlurFade } from "@/registry/magicui/blur-fade";
import {
  Sparkles,
  Cloud,
  Code,
  ExternalLink,
  Eye,
  Download,
  X,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  previewImage: string;
  pdfUrl: string;
}

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const certCategories: {
    category: string;
    icon: React.ReactNode;
    certs: CertItem[];
  }[] = [
    {
      category: "AI, LLMs & Prompt Engineering (DataCamp Scholarship)",
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
      certs: [
        {
          title: "Prompt Engineering with OpenAI API",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Mastered prompt engineering design patterns, system message optimization, zero-shot/few-shot prompting, and structured output formatting for GPT-4 and OpenAI endpoints.",
          skills: ["OpenAI API", "Prompt Engineering", "System Prompts", "GPT-4"],
          previewImage: "/certifications/prompt-engineering-with-openai-api.png",
          pdfUrl: "/certifications/prompt-engineering-with-openai-api.pdf",
        },
        {
          title: "Working with OpenAI API",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Specialized in OpenAI API authentication, chat completion pipelines, function calling, vector embeddings, and integrating AI endpoints into production web applications.",
          skills: ["OpenAI API", "Function Calling", "Embeddings", "JSON Mode"],
          previewImage: "/certifications/working-with-openai-api.png",
          pdfUrl: "/certifications/working-with-openai-api.pdf",
        },
        {
          title: "Working with Hugging Face",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Comprehensive training on Hugging Face Transformer architectures, Hugging Face Hub integration, tokenization workflows, fine-tuning models, and open-source NLP pipelines.",
          skills: ["Hugging Face", "Transformers", "PyTorch", "NLP Pipelines"],
          previewImage: "/certifications/working-with-hugging-face.png",
          pdfUrl: "/certifications/working-with-hugging-face.pdf",
        },
        {
          title: "LLMOps Concepts",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Core principles of Large Language Model lifecycle management (LLMOps), continuous evaluation, AI safety, prompt versioning, vector database orchestration, and model monitoring.",
          skills: ["LLMOps", "Model Monitoring", "Vector DB", "AI Lifecycle"],
          previewImage: "/certifications/llmops-concepts.png",
          pdfUrl: "/certifications/llmops-concepts.pdf",
        },
      ],
    },
    {
      category: "AWS Cloud & Infrastructure Architecture (DataCamp Scholarship)",
      icon: <Cloud className="w-5 h-5 text-blue-500" />,
      certs: [
        {
          title: "AWS Cloud Practitioner",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Core AWS cloud architecture fundamentals, IAM identity governance, VPC subnet networking, EC2 elastic compute, S3 storage buckets, and enterprise cloud infrastructure standards.",
          skills: ["AWS", "Cloud Architecture", "IAM", "VPC & EC2"],
          previewImage: "/certifications/aws-cloud-practitioner.png",
          pdfUrl: "/certifications/aws-cloud-practitioner.pdf",
        },
        {
          title: "AWS Cloud Technology & Services",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Deep dive into Amazon Web Services core ecosystem including serverless compute (AWS Lambda), Amazon RDS databases, elastic load balancing, and high-availability cloud scaling.",
          skills: ["AWS Lambda", "Amazon RDS", "ELB", "Cloud Elasticity"],
          previewImage: "/certifications/aws-cloud-technology-and-services.png",
          pdfUrl: "/certifications/aws-cloud-technology-and-services.pdf",
        },
        {
          title: "AWS Security & Cost Management Concepts",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "AWS security compliance, KMS data encryption at rest and in transit, AWS Cost Explorer, Budgets, and cloud infrastructure resource optimization techniques.",
          skills: ["Cloud Security", "Cost Optimization", "AWS Budgets", "KMS"],
          previewImage: "/certifications/aws-security-and-cost-management-conepts.png",
          pdfUrl: "/certifications/aws-security-and-cost-management-conepts.pdf",
        },
        {
          title: "AWS Concepts",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Foundational cloud computing service models (IaaS, PaaS, SaaS), AWS shared responsibility security model, cloud elasticity, and multi-region deployment patterns.",
          skills: ["Cloud Models", "IaaS / PaaS", "Shared Responsibility"],
          previewImage: "/certifications/aws-concepts.png",
          pdfUrl: "/certifications/aws-concepts.pdf",
        },
        {
          title: "Understanding Cloud Computing",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Overview of enterprise cloud adoption strategies, multi-cloud management, cloud scalability, containerization basics, and modern DevOps infrastructure paradigms.",
          skills: ["Cloud Strategy", "Multi-Cloud", "DevOps", "Scalability"],
          previewImage: "/certifications/understanding-cloud-computing.png",
          pdfUrl: "/certifications/understanding-cloud-computing.pdf",
        },
      ],
    },
    {
      category: "Software Engineering & Data Fundamentals (DataCamp Scholarship)",
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      certs: [
        {
          title: "Introduction to Python",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Core Python programming syntax, control flow, functions, list comprehensions, data structures, and numerical scientific computing using NumPy.",
          skills: ["Python", "Data Structures", "NumPy", "Scripting"],
          previewImage: "/certifications/intro-to-python.png",
          pdfUrl: "/certifications/intro-to-python.pdf",
        },
        {
          title: "Introduction to Git",
          issuer: "DataCamp • Data Engineering Pilipinas",
          date: "2026",
          description:
            "Distributed version control workflows, branching and merging strategies, commit history inspection, merge conflict resolution, and collaborative Git development.",
          skills: ["Git", "Version Control", "Branching", "GitHub"],
          previewImage: "/certifications/intro-to-git.png",
          pdfUrl: "/certifications/intro-to-git.pdf",
        },
      ],
    },
  ];

  return (
    <>
      <section id="certifications" className="py-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-xs font-mono tracking-widest text-blue-500 uppercase font-semibold mb-2">
              DATACAMP DONATES SCHOLARSHIP CREDENTIALS
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
              Technical Certifications & Specializations
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mt-2 font-sans">
              Click any certification card to inspect the official certificate preview and download credentials.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-14">
          {certCategories.map((cat, catIdx) => (
            <BlurFade key={cat.category} delay={0.2 + catIdx * 0.1} inView>
              <div className="flex flex-col gap-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                    {cat.category}
                  </h3>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.certs.map((cert, certIdx) => (
                    <div
                      key={certIdx}
                      onClick={() => setSelectedCert(cert)}
                      className="group relative p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Header metadata */}
                        <div className="flex justify-between items-start mb-2 font-mono">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {cert.issuer}
                          </span>
                          <span className="text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                            {cert.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-heading group-hover:text-blue-500 transition-colors flex items-center justify-between gap-2">
                          <span>{cert.title}</span>
                          <Eye className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                          {cert.description}
                        </p>
                      </div>

                      {/* Skills Badges & Click Indicator */}
                      <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col gap-3">
                        <div className="flex flex-wrap gap-1.5 font-mono">
                          {cert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-blue-500 group-hover:underline font-semibold">
                          <span>Click to Preview Certificate</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Lightbox Preview Modal for Selected Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out select-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-zinc-950 flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {selectedCert.issuer} • Issued {selectedCert.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close Preview"
                  className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Preview Stage */}
              <div className="relative bg-zinc-900/90 p-4 sm:p-6 flex items-center justify-center max-h-[70vh] overflow-y-auto">
                <img
                  src={selectedCert.previewImage}
                  alt={`${selectedCert.title} Certificate`}
                  className="w-full h-auto object-contain rounded-xl border border-zinc-800 shadow-2xl"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-zinc-900 border-t border-zinc-800 font-mono text-xs">
                <p className="text-zinc-400 max-w-md line-clamp-1 font-sans">
                  {selectedCert.description}
                </p>

                <div className="flex items-center gap-3 ml-auto">
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
