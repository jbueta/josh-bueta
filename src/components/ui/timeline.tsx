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
        "z-10 flex items-center justify-center w-4 h-4 rounded-none border-2 transition-all duration-300 shrink-0 mt-0.5",
        isActive
          ? "bg-[var(--seido)] border-[var(--ink)]"
          : "bg-[var(--paper)] border-[var(--ink)]/40",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-none transition-transform duration-300",
          isActive ? "bg-white scale-100" : "bg-transparent scale-0"
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
        "absolute left-[7px] top-5 bottom-0 w-[2px] -mb-6 transition-colors duration-300",
        isActive
          ? "bg-[var(--ink)]/35"
          : "bg-[var(--ink)]/15",
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
        "text-xs font-manga tracking-widest text-[var(--ink)] order-last sm:order-last",
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
        "text-base font-manga tracking-wide text-[var(--ink)] group-hover:text-[var(--seido)] transition-colors",
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
        "text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mt-1 font-sans",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
