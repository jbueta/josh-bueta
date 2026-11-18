"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlyphMatrixProps {
  className?: string;
}

const CHARS =
  "ァアィイゥウェエォオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01<>/{}#$";
const FONT_SIZE = 16;

/**
 * Katakana ink-rain background.
 *
 * Old version ran an unbounded 60fps loop forever. Now it:
 * - renders nothing when the visitor prefers reduced motion,
 * - pauses on hidden tabs and on coarse pointers (mobile battery),
 * - caps devicePixelRatio at 2 and rewrites columns on resize,
 * - stops the loop entirely on unmount.
 */
export function GlyphMatrix({ className }: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let columns = 0;
    let drops: number[] = [];
    let frame = 0;
    let running = false;
    let resizeTimer = 0;

    const setup = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      columns = Math.max(1, Math.ceil(width / FONT_SIZE));
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -50),
      );
    };

    const draw = () => {
      if (!running) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Ink bleed trail.
      context.fillStyle = "rgba(255, 255, 255, 0.16)";
      context.fillRect(0, 0, width, height);
      context.font = `${FONT_SIZE}px monospace`;

      for (let index = 0; index < drops.length; index += 1) {
        const glyph = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        const x = index * FONT_SIZE;
        const y = drops[index] * FONT_SIZE;
        const roll = Math.random();

        if (roll > 0.97) {
          context.fillStyle = "#003087";
        } else if (roll > 0.9) {
          context.fillStyle = "#0a0a0a";
        } else {
          context.fillStyle = "rgba(10, 10, 10, 0.14)";
        }

        context.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) drops[index] = 0;
        drops[index] += 1;
      }

      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || coarsePointer) return;
      running = true;
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        if (running) {
          stop();
          start();
        }
      }, 150);
    };

    setup();
    start();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 opacity-60 transition-opacity duration-500",
        className,
      )}
    />
  );
}
