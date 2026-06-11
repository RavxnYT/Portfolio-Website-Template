"use client";

import { useRef } from "react";
import { useRevealLines } from "@/lib/animations";
import { Star } from "./Star";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  /** Optional element rendered on the right side of the title row */
  aside?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  aside,
  className,
}: SectionHeadingProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useRevealLines(titleRef);

  return (
    <div className={cn("px-gutter", className)}>
      <div className="mb-6 flex items-center gap-3 text-label text-muted">
        <Star className="text-accent" />
        <span>
          {index} — {label}
        </span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2
          ref={titleRef}
          className="font-display text-display-lg max-w-[14ch] uppercase"
        >
          {title}
        </h2>
        {aside}
      </div>
    </div>
  );
}
