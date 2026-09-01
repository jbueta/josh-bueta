"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "h1",
  startOnView = false,
  animateOnHover = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(children.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);

  const handleAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    iterationCount.current = 0;

    const totalSteps = children.length;
    const interval = duration / (totalSteps * 2);

    const timer = setInterval(() => {
      if (iterationCount.current < children.length) {
        setDisplayText((prev) =>
          prev.map((char, i) => {
            if (char === " ") return " ";
            if (i <= iterationCount.current) {
              return children[i];
            }
            return alphabets[Math.floor(Math.random() * alphabets.length)];
          })
        );
        iterationCount.current += 0.5;
      } else {
        setDisplayText(children.split(""));
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, interval);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnimation();
    }, delay);
    return () => clearTimeout(timer);
  }, [children, delay]);

  return (
    <Component
      ref={elementRef}
      onMouseEnter={() => animateOnHover && handleAnimation()}
      className={cn("overflow-hidden inline-flex cursor-pointer select-none", className)}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.1 }}
            className={cn(letter === " " ? "whitespace-pre" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
