"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface GlyphMatrixProps {
  className?: string;
}

export function GlyphMatrix({ className }: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

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

    // Characters for matrix stream (katakana, latin, symbols)
    const chars = "01MJB<>/{};:_+=~#$@&%?!¥アカサタナハマヤラワ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Track drop Y coordinate per column
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    );

    const isDark = resolvedTheme === "dark";

    const draw = () => {
      // Trail effect with deep navy backdrop
      ctx.fillStyle = isDark ? "rgba(8, 13, 26, 0.08)" : "rgba(241, 245, 249, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glyph vs trail color (Royal / Sapphire Navy Blue)
        if (Math.random() > 0.95) {
          ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
        } else {
          ctx.fillStyle = isDark
            ? "rgba(59, 130, 246, 0.45)" // Royal blue in dark
            : "rgba(37, 99, 235, 0.35)"; // Sapphire blue in light
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
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-50 transition-opacity duration-500",
        className
      )}
    />
  );
}
