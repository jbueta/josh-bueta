"use client";

import React, { useState } from "react";
import { PixelImage } from "@/registry/magicui/pixel-image";
import { BlurFade } from "@/registry/magicui/blur-fade";
import { HyperText } from "@/registry/magicui/hyper-text";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import {
  Mail,
  Download,
  Terminal,
  MapPin,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-start text-left">
        {/* Layout Container: Left Avatar aligned with MJB Logo & Right Typography Column */}
        <div className="flex flex-col lg:flex-row items-start justify-start gap-10 lg:gap-14 w-full">
          {/* Left Column: Scaled Profile Image with Locked Aspect Ratio */}
          <BlurFade delay={0.1} className="shrink-0 self-start">
            <PixelImage
              src="/avatar.jpg"
              alt="Mark Joshua Bueta"
              rows={4}
              cols={6}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 aspect-square rounded-3xl"
              onClick={() => setIsLightboxOpen(true)}
            />
          </BlurFade>

          {/* Right Column: Typography & Badges (Strictly Left-Aligned) */}
          <div className="flex flex-col items-start justify-start flex-1 text-left max-w-2xl">
            {/* Availability Status Badge (Aligned on the left of typography) */}
            <BlurFade delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono mb-5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                OPEN FOR INTERNSHIP OPPORTUNITIES & COLLABORATIONS
              </div>
            </BlurFade>

            {/* Meta Tags: Location & Specialization */}
            <BlurFade delay={0.3}>
              <div className="flex flex-wrap items-center justify-start gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Pasig City, Philippines</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <div className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Web Development & UI/UX Design</span>
                </div>
              </div>
            </BlurFade>

            {/* Main Heading with HyperText */}
            <BlurFade delay={0.4}>
              <h1 className="flex flex-wrap items-center justify-start gap-x-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-3">
                <span>Hi, I&apos;m</span>
                <HyperText
                  className="bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent font-extrabold"
                  as="span"
                  duration={900}
                >
                  Mark Joshua Bueta
                </HyperText>
              </h1>
            </BlurFade>

            {/* Role Subtitle */}
            <BlurFade delay={0.5}>
              <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                Web Developer and Aspiring Software Engineer
              </p>
            </BlurFade>

            {/* Bio Paragraph */}
            <BlurFade delay={0.6}>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                Frontend Developer and UI/UX designer dedicated to crafting intuitive, accessible digital experiences and building intelligent, human-centered web solutions that create meaningful impact for communities.
              </p>
            </BlurFade>

            {/* CTAs & Social Links (Left-Aligned) */}
            <BlurFade delay={0.7}>
              <div className="flex flex-wrap items-center justify-start gap-4">
                {/* Download CV CTA */}
                <a
                  href="/Mark_Joshua_Bueta_CV.pdf"
                  download="Mark_Joshua_Bueta_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/jbueta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="https://linkedin.com/in/jbueta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 transition-all duration-300 shadow-sm"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="mailto:joshua.bueta13@gmail.com"
                    aria-label="Email Contact"
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-300 shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Profile Image */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-zinc-950"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-blue-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src="/avatar.jpg"
                alt="Mark Joshua Bueta Full Avatar"
                className="w-full h-auto object-cover max-h-[80vh]"
              />
              <div className="p-4 bg-zinc-900 text-center border-t border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100">
                  Mark Joshua Bueta
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Web Developer & Software Engineer
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
