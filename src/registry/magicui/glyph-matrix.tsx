"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlyphMatrixProps {
  className?: string;
}

export function GlyphMatrix({ className }: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Full katakana block + manga symbols for Ace of Diamond rain
    const chars = "ァアィイゥウェエォオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01<>/{}#$";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Track drop Y coordinate per column
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    );

    const draw = () => {
      // Ink bleed trail — manga paper/ink feel (single light mode)
      ctx.fillStyle = "rgba(245, 240, 232, 0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const rand = Math.random();
        if (rand > 0.97) {
          // 3% accent — Seido Navy flash
          ctx.fillStyle = "#003087";
        } else if (rand > 0.90) {
          // 7% bright head glyph
          ctx.fillStyle = "#0a0a0a";
        } else {
          // 90% body glyph — faint ink
          ctx.fillStyle = "rgba(10, 10, 10, 0.14)";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-500",
        className
      )}
    />
  );
}
