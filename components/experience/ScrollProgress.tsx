"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (barRef.current) {
      gsap.set(barRef.current, { scaleX: progress });
    }
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-accent"
      />
    </div>
  );
}
