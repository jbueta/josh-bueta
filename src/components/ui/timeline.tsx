"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex?: number;
}

export function Timeline({
  children,
  className,
  activeIndex,
  ...props
}: TimelineProps) {
  return (
    <div
      className={cn("relative flex flex-col space-y-6", className)}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{ isActive?: boolean; isLast?: boolean }>,
            {
              isActive: activeIndex !== undefined ? index <= activeIndex : true,
              isLast: index === React.Children.count(children) - 1,
            }
          );
        }
        return child;
      })}
    </div>
  );
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineItem({
  children,
  className,
  isActive,
  isLast,
  ...props
}: TimelineItemProps) {
  return (
    <div
      className={cn("relative flex items-start group", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{ isActive?: boolean; isLast?: boolean }>,
            {
              isActive,
              isLast,
            }
          );
        }
        return child;
      })}
    </div>
  );
}

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineDot({
  className,
  isActive = true,
  isLast, // Destructured to prevent passing unknown DOM prop to div
  ...props
}: TimelineDotProps) {
  return (
    <div
      className={cn(
        "z-10 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 shrink-0 mt-0.5",
        isActive
          ? "bg-blue-600 border-blue-500 shadow-md shadow-blue-500/30 dark:bg-blue-500 dark:border-blue-400"
          : "bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full transition-transform duration-300",
          isActive ? "bg-white dark:bg-zinc-950 scale-100" : "bg-transparent scale-0"
        )}
      />
    </div>
  );
}

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineConnector({
  className,
  isActive = true,
  isLast = false,
  ...props
}: TimelineConnectorProps) {
  if (isLast) return null;
  return (
    <div
      className={cn(
        "absolute left-[9px] top-6 bottom-0 w-[2px] -mb-6 transition-colors duration-300",
        isActive
          ? "bg-gradient-to-b from-blue-500 to-indigo-500/40 dark:from-blue-500 dark:to-indigo-500/30"
          : "bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}

interface TimelineSubProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineContent({
  children,
  className,
  isActive, // Destructured to prevent passing unknown DOM prop to div
  isLast, // Destructured to prevent passing unknown DOM prop to div
  ...props
}: TimelineSubProps) {
  return (
    <div className={cn("ml-4 flex-1 pb-2", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineHeader({
  children,
  className,
  isActive, // Destructured
  isLast, // Destructured
  ...props
}: TimelineSubProps) {
  return (
    <div
      className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface TimelineTimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineTime({
  children,
  className,
  dateTime,
  isActive, // Destructured
  isLast, // Destructured
  ...props
}: TimelineTimeProps) {
  return (
    <time
      dateTime={dateTime}
      className={cn(
        "text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 order-last sm:order-last",
        className
      )}
      {...props}
    >
      {children}
    </time>
  );
}

interface TimelineTextProps extends React.HTMLAttributes<HTMLElement> {
  isActive?: boolean;
  isLast?: boolean;
}

export function TimelineTitle({
  children,
  className,
  isActive, // Destructured
  isLast, // Destructured
  ...props
}: TimelineTextProps) {
  return (
    <h4
      className={cn(
        "text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors font-heading",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TimelineDescription({
  children,
  className,
  isActive, // Destructured
  isLast, // Destructured
  ...props
}: TimelineTextProps) {
  return (
    <p
      className={cn(
        "text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1 font-sans",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
