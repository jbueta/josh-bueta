"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelImageProps {
  src: string;
  alt: string;
  rows?: number;
  cols?: number;
  className?: string;
}

export function PixelImage({
  src,
  alt,
  rows = 4,
  cols = 6,
  className,
}: PixelImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gridCells = React.useMemo(() => {
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ row: r, col: c, id: `${r}-${c}` });
      }
    }
    return cells;
  }, [rows, cols]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-900 group cursor-pointer select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isHovered ? "grayscale-0 scale-105" : "grayscale contrast-125"
        )}
      />

      {/* Grid Overlay Matrix */}
      <div
        className="absolute inset-0 grid pointer-events-none"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {gridCells.map((cell) => {
          const delay = (cell.row + cell.col) * 0.05;
          return (
            <motion.div
              key={cell.id}
              initial={false}
              animate={{
                opacity: isHovered ? 0 : 0.2,
                backgroundColor: isHovered ? "rgba(16, 185, 129, 0)" : "rgba(0,0,0,0.3)",
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? delay : (rows + cols - (cell.row + cell.col)) * 0.04,
              }}
              className="border-[0.5px] border-emerald-500/20 dark:border-emerald-400/20 backdrop-blur-[0.5px]"
            />
          );
        })}
      </div>

      {/* Ambient glow border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] tracking-widest font-mono text-emerald-400 uppercase font-semibold">
          GRID [4x6] PIXEL ACTIVE
        </span>
      </div>
    </div>
  );
}
