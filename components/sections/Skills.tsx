"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { skills } from "@/config/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Capabilities index — rows draw their divider lines as they enter
 * and inverse-highlight on hover.
 */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-skill-row]");
      rows.forEach((row) => {
        gsap.fromTo(
          row.querySelector("[data-row-line]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          }
        );
        gsap.fromTo(
          row.querySelector("[data-row-content]"),
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="Capabilities"
    >
      <SectionHeading
        index="05"
        label="Capabilities"
        title="Tools of the trade"
      />

      <div className="px-gutter mt-16">
        {skills.map((skill, i) => (
          <div key={skill.name} data-skill-row className="group relative">
            <div
              data-row-line
              className="h-px w-full origin-left bg-line"
            />
            <div
              data-row-content
              className="relative flex items-baseline gap-5 overflow-hidden py-5 md:gap-10 md:py-6"
            >
              <span className="text-label w-8 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl uppercase transition-all duration-300 group-hover:translate-x-3 group-hover:text-accent md:text-4xl">
                {skill.name}
              </h3>
              <span className="text-label ml-auto shrink-0 text-muted transition-colors duration-300 group-hover:text-foreground">
                {skill.category}
              </span>
              <span
                aria-hidden
                className="hidden shrink-0 text-xl text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block md:-translate-x-3"
              >
                ↗
              </span>
            </div>
          </div>
        ))}
        <div className="h-px w-full bg-line" />
      </div>
    </section>
  );
}
