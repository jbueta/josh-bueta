"use client";

import React from "react";

export function HalftoneOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] screentone-fine"
      style={{ opacity: 0.028, animation: "halftone-breathe 6s ease-in-out infinite" }}
    />
  );
}
