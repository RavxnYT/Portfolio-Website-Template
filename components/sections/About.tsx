"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  prefersReducedMotion,
  useFadeUp,
  useParallax,
  useRevealLines,
} from "@/lib/animations";
import { about } from "@/config/content/about";
import { SectionHeading } from "@/components/ui/SectionHeading";

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: value,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = String(Math.round(counter.v));
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <div data-fade className="flex flex-col gap-2 border-t border-line pt-5">
      <span className="font-display text-5xl md:text-6xl">
        <span ref={numRef}>0</span>
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="text-label text-muted">{label}</span>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useRevealLines(introRef, { stagger: 0.1 });
  useRevealLines(bodyRef, { stagger: 0.05 });
  useParallax(imgRef, 8);
  useFadeUp(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="About"
    >
      <SectionHeading index="01" label={about.label} title="Code-first, detail-obsessed" />

      <div className="px-gutter mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Sticky portrait */}
        <div className="lg:col-span-5">
          <div
            data-fade
            className="relative overflow-hidden rounded-2xl lg:sticky lg:top-28"
            data-cursor
          >
            <div className="aspect-[4/5] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={about.portrait}
                alt={about.portraitAlt}
                loading="lazy"
                className="h-full w-full scale-[1.15] object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
            <span className="text-label absolute bottom-4 left-4 rounded-full bg-background/70 px-4 py-2 backdrop-blur">
              {about.portraitAlt}
            </span>
          </div>
        </div>

        {/* Copy + stats */}
        <div className="flex flex-col justify-between gap-14 lg:col-span-7">
          <div>
            <p
              ref={introRef}
              className="font-display text-2xl leading-snug md:text-4xl md:leading-snug"
            >
              {about.intro}
            </p>
            <p
              ref={bodyRef}
              className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {about.body}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {about.stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
