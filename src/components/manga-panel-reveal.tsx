"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MangaPanelRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "none";
}

export function MangaPanelReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: MangaPanelRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0, filter: "blur(6px)" };
    if (direction === "up")    from.y =  50;
    if (direction === "left")  from.x = -60;
    if (direction === "right") from.x =  60;

    gsap.set(el, from);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1, filter: "blur(0px)", y: 0, x: 0,
          duration: 0.65, ease: "power3.out", delay,
        });
      },
    });

    return () => st.kill();
  }, { scope: ref });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
