"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MangaPanelReveal } from "@/components/manga-panel-reveal";
import {
  Sparkles,
  Cloud,
  Code,
  ExternalLink,
  Download,
  X,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  previewImage: string;
  pdfUrl: string;
  featured?: boolean;
}

/* ================================================================
   ACT. 04 — CREDENTIALS & TECHNICAL CERTIFICATIONS
   Asymmetric Manga Spread Layout:
   Instead of balanced 50/50 2-column grids, each certification domain
   uses an interlocking 12-column manga page spread where featured
   certifications span wider panels (7 or 8 cols) alongside narrower
   companion panels (5 or 4 cols) and vertical ink spine headers.
   ================================================================ */
export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const certCategories: {
    code: string;
    category: string;
    subtitle: string;
    icon: React.ReactNode;
    certs: CertItem[];
    spans: string[]; // Asymmetric 12-col spans per card
  }[] = [
    {
      code: "DOMAIN 01 // AI & LLMs",
      category: "AI, LLMs & Prompt Engineering",
      subtitle: "4 VERIFIED DATACAMP CREDENTIALS",
      icon: <Sparkles className="w-4 h-4" />,
      spans: [
        "lg:col-span-7",
        "lg:col-span-5",
        "lg:col-span-5",
        "lg:col-span-7",
      ],
      certs: [
        {
          title: "Prompt Engineering with OpenAI API",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          featured: true,
          description:
            "Mastered prompt engineering design patterns, system message optimization, zero-shot/few-shot prompting, and structured output formatting for GPT-4 and OpenAI endpoints.",
          skills: ["OpenAI API", "Prompt Engineering", "System Prompts", "GPT-4"],
          previewImage: "/certifications/prompt-engineering-with-openai-api.png",
          pdfUrl: "/certifications/prompt-engineering-with-openai-api.pdf",
        },
        {
          title: "Working with OpenAI API",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          description:
            "Specialized in OpenAI API authentication, chat completion pipelines, function calling, vector embeddings, and integrating AI endpoints into production web applications.",
          skills: ["OpenAI API", "Function Calling", "Embeddings", "JSON Mode"],
          previewImage: "/certifications/working-with-openai-api.png",
          pdfUrl: "/certifications/working-with-openai-api.pdf",
        },
        {
          title: "Working with Hugging Face",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          description:
            "Comprehensive training on Hugging Face Transformer architectures, Hub integration, tokenization workflows, fine-tuning models, and open-source NLP pipelines.",
          skills: ["Hugging Face", "Transformers", "PyTorch", "NLP Pipelines"],
          previewImage: "/certifications/working-with-hugging-face.png",
          pdfUrl: "/certifications/working-with-hugging-face.pdf",
        },
        {
          title: "LLMOps Concepts",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          featured: true,
          description:
            "Core principles of LLM lifecycle management, continuous evaluation, AI safety, prompt versioning, vector database orchestration, and model monitoring.",
          skills: ["LLMOps", "Model Monitoring", "Vector DB", "AI Lifecycle"],
          previewImage: "/certifications/llmops-concepts.png",
          pdfUrl: "/certifications/llmops-concepts.pdf",
        },
      ],
    },
    {
      code: "DOMAIN 02 // CLOUD INFRASTRUCTURE",
      category: "AWS Cloud & Infrastructure",
      subtitle: "5 VERIFIED CLOUD ARCHITECTURE CREDENTIALS",
      icon: <Cloud className="w-4 h-4" />,
      /* 5 cards in an unequal 3-row manga spread: (8 + 4), then (4 + 4 + 4) */
      spans: [
        "lg:col-span-8",
        "lg:col-span-4",
        "lg:col-span-4",
        "lg:col-span-4",
        "lg:col-span-4",
      ],
      certs: [
        {
          title: "AWS Cloud Practitioner",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          featured: true,
          description:
            "Core AWS cloud architecture fundamentals, IAM identity governance, VPC subnet networking, EC2 elastic compute, S3 storage buckets, and enterprise cloud infrastructure standards.",
          skills: ["AWS", "Cloud Architecture", "IAM", "VPC & EC2"],
          previewImage: "/certifications/aws-cloud-practitioner.png",
          pdfUrl: "/certifications/aws-cloud-practitioner.pdf",
        },
        {
          title: "AWS Cloud Technology & Services",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          description:
            "Deep dive into AWS Lambda, Amazon RDS databases, elastic load balancing, and high-availability cloud scaling.",
          skills: ["AWS Lambda", "Amazon RDS", "ELB", "Cloud Elasticity"],
          previewImage: "/certifications/aws-cloud-technology-and-services.png",
          pdfUrl: "/certifications/aws-cloud-technology-and-services.pdf",
        },
        {
          title: "AWS Security & Cost Management Concepts",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          description:
            "AWS security compliance, KMS data encryption, AWS Cost Explorer, Budgets, and cloud infrastructure resource optimization techniques.",
          skills: ["Cloud Security", "Cost Optimization", "AWS Budgets", "KMS"],
          previewImage:
            "/certifications/aws-security-and-cost-management-conepts.png",
          pdfUrl: "/certifications/aws-security-and-cost-management-conepts.pdf",
        },
        {
          title: "AWS Concepts",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          description:
            "Foundational cloud computing service models (IaaS, PaaS, SaaS), AWS shared responsibility model, cloud elasticity, and multi-region deployment patterns.",
          skills: ["Cloud Models", "IaaS / PaaS", "Shared Responsibility"],
          previewImage: "/certifications/aws-concepts.png",
          pdfUrl: "/certifications/aws-concepts.pdf",
        },
        {
          title: "Understanding Cloud Computing",
          issuer: "DataCamp · Data Engineering Pilipinas",
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
      code: "DOMAIN 03 // CORE ENGINEERING",
      category: "Software Engineering & Data Fundamentals",
      subtitle: "2 VERIFIED FOUNDATIONAL CREDENTIALS",
      icon: <Code className="w-4 h-4" />,
      /* Asymmetric 7/5 split instead of 50/50 */
      spans: ["lg:col-span-7", "lg:col-span-5"],
      certs: [
        {
          title: "Introduction to Python",
          issuer: "DataCamp · Data Engineering Pilipinas",
          date: "2026",
          featured: true,
          description:
            "Core Python programming syntax, control flow, functions, list comprehensions, data structures, and numerical scientific computing using NumPy.",
          skills: ["Python", "Data Structures", "NumPy", "Scripting"],
          previewImage: "/certifications/intro-to-python.png",
          pdfUrl: "/certifications/intro-to-python.pdf",
        },
        {
          title: "Introduction to Git",
          issuer: "DataCamp · Data Engineering Pilipinas",
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
      <section id="certifications" className="relative z-10 overflow-hidden">
        {/* Chapter opener */}
        <MangaPanelReveal direction="up">
          <div
            className="relative w-full overflow-hidden speed-lines"
            style={{ background: "var(--ink)", padding: "3.5rem 2rem 3rem" }}
          >
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span
                  className="font-manga text-[9px] tracking-[0.5em] px-3 py-1 inline-block mb-3 text-white slash-cut-right"
                  style={{ background: "var(--seido)" }}
                >
                  ACT. 04 // VERIFIED LICENSES
                </span>
                <h2
                  className="font-manga text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
                >
                  CREDENTIALS
                </h2>
                <p
                  className="font-manga tracking-[0.28em] text-white/50 mt-1"
                  style={{ fontSize: "clamp(0.8rem, 2vw, 1.35rem)" }}
                >
                  TECHNICAL CERTIFICATIONS &amp; SPECIALIZATIONS
                </p>
              </div>
              <div className="border-2 border-white/25 px-4 py-2 bg-white/5 self-start sm:self-end">
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/60 block">
                  TOTAL VERIFIED
                </span>
                <span className="font-manga text-lg tracking-[0.2em] text-white">
                  11 CERTIFICATIONS · CLICK ANY PANEL TO INSPECT
                </span>
              </div>
            </div>
            <div
              className="absolute right-4 bottom-0 font-manga leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(6rem, 18vw, 16rem)",
                color: "rgba(255,255,255,0.04)",
              }}
              aria-hidden="true"
            >
              04
            </div>
          </div>
        </MangaPanelReveal>

        {/* Asymmetric Multi-Panel Spreads per Category */}
        <div
          className="w-full"
          style={{
            background: "var(--ink)",
            padding: "var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--gutter) * 2)",
          }}
        >
          {certCategories.map((cat, ci) => (
            <MangaPanelReveal key={cat.category} direction="up" delay={ci * 0.05}>
              <div
                className="max-w-6xl mx-auto flex flex-col"
                style={{ gap: "var(--gutter)" }}
              >
                {/* Category Header Strip */}
                <div className="panel bg-[var(--ink)] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="p-1.5 text-white"
                      style={{ background: "var(--seido)" }}
                    >
                      {cat.icon}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.35em] text-white/50 block">
                        {cat.code}
                      </span>
                      <h3 className="font-manga text-base sm:text-lg tracking-[0.22em] text-white leading-none">
                        {cat.category.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/65 border border-white/25 px-2.5 py-0.5">
                    {cat.subtitle}
                  </span>
                </div>

                {/* Interlocking 12-Col Manga Panel Grid */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-12"
                  style={{ gap: "var(--gutter)" }}
                >
                  {cat.certs.map((cert, ci2) => {
                    const spanClass = cat.spans[ci2] || "lg:col-span-6";
                    return (
                      <div
                        key={ci2}
                        onClick={() => setSelectedCert(cert)}
                        className={cn(
                          spanClass,
                          "panel bg-[var(--paper)] p-5 sm:p-6 cursor-pointer group hover:bg-[var(--ink)] transition-colors duration-150 flex flex-col justify-between relative"
                        )}
                      >
                        {cert.featured && (
                          <div
                            className="absolute top-0 right-0 px-2.5 py-0.5 font-manga text-[8px] tracking-[0.35em] text-white"
                            style={{ background: "var(--seido)" }}
                          >
                            KEY SPECIALIZATION
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-3 flex-wrap gap-2 pr-20">
                            <span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))] group-hover:text-white/60">
                              {cert.issuer}
                            </span>
                            <span className="font-manga text-[10px] tracking-widest border border-[var(--ink)]/40 group-hover:border-white/30 px-2 py-0.5 text-[var(--ink)] group-hover:text-white shrink-0">
                              {cert.date}
                            </span>
                          </div>

                          <h4 className="font-manga text-lg sm:text-xl tracking-wide text-[var(--ink)] group-hover:text-white mb-2 flex items-start justify-between gap-2">
                            <span>{cert.title}</span>
                          </h4>

                          <p className="text-xs sm:text-[13px] text-[hsl(var(--muted-foreground))] group-hover:text-white/70 leading-relaxed font-sans mb-5">
                            {cert.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--ink)]/15 group-hover:border-white/20 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((s, si) => (
                              <span
                                key={si}
                                className="px-2 py-0.5 text-[10px] font-mono border border-[var(--ink)]/30 bg-white group-hover:bg-white/10 group-hover:border-white/30 text-[var(--ink)] group-hover:text-white"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-manga tracking-widest text-[var(--seido)] group-hover:text-white shrink-0">
                            <span>INSPECT CERTIFICATE</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MangaPanelReveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 cursor-zoom-out select-none"
                style={{ background: "rgba(10,10,10,0.95)" }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full z-[100000] panel max-h-[90vh] flex flex-col bg-[var(--paper)]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b-4 border-[var(--ink)] bg-[var(--ink)] text-white shrink-0">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 border-2 border-white/30"
                        style={{ background: "var(--seido)" }}
                      >
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-manga text-sm sm:text-base tracking-wide text-white">
                          {selectedCert.title.toUpperCase()}
                        </h3>
                        <p className="text-[10px] font-mono text-white/65">
                          {selectedCert.issuer} · {selectedCert.date}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCert(null)}
                      aria-label="Close"
                      className="p-2 border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-[var(--ink)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Image */}
                  <div className="relative bg-[var(--paper)] p-4 sm:p-6 flex items-center justify-center overflow-y-auto max-h-[60vh] screentone-fine">
                    <img
                      src={selectedCert.previewImage}
                      alt={selectedCert.title}
                      className="w-full h-auto object-contain border-2 border-[var(--ink)] shadow-2xl"
                    />
                  </div>
                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-t-4 border-[var(--ink)] bg-[var(--paper)] shrink-0">
                    <p className="text-[hsl(var(--muted-foreground))] max-w-md text-xs font-sans line-clamp-2">
                      {selectedCert.description}
                    </p>
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-manga tracking-widest text-xs text-white hover:opacity-85 transition-opacity w-full sm:w-auto justify-center border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]"
                      style={{ background: "var(--seido)" }}
                    >
                      <Download className="w-4 h-4" /> DOWNLOAD PDF
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
