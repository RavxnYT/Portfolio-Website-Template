"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  prefersReducedMotion,
  useParallax,
  useRevealLines,
} from "@/lib/animations";
import type { Project } from "@/types/content";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Star } from "@/components/ui/Star";

export function CaseStudy({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useParallax(coverRef, 9);
  useRevealLines(summaryRef, { stagger: 0.07 });

  /* Entrance + scroll reveals */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(root.querySelectorAll(".char"), { y: 0 });
        gsap.set("[data-cs-fade]", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.timeline({ delay: 0.45 })
        .to(root.querySelectorAll(".char"), {
          y: 0,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.03,
        })
        .fromTo(
          "[data-cs-fade]",
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          "-=0.7"
        );

      /* body images clip-reveal as they enter */
      gsap.utils.toArray<HTMLElement>("[data-cs-img]").forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(12% 6% 12% 6% round 16px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 78%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <section className="px-gutter pb-12 pt-36 md:pt-44">
        <div data-cs-fade className="mb-8 flex flex-wrap items-center gap-3 text-label text-muted opacity-0">
          <TransitionLink href="/#work" className="link-line text-foreground">
            ← All work
          </TransitionLink>
          <span className="mx-2">/</span>
          <span>{project.category}</span>
          <Star className="text-accent" />
          <span>{project.year}</span>
        </div>

        <h1
          className="font-display text-display-xl uppercase"
          aria-label={project.title}
        >
          {project.title.split("").map((ch, i) => (
            <span key={i} className="char-mask">
              <span className="char" aria-hidden>
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </h1>
      </section>

      {/* Cover */}
      <section className="px-gutter">
        <div className="overflow-hidden rounded-2xl">
          <div className="h-[62svh] w-full md:h-[78svh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={coverRef}
              src={project.cover}
              alt={project.title}
              className="h-full w-full scale-[1.12] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Meta grid */}
      <section className="px-gutter mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
        <div className="grid grid-cols-2 content-start gap-8 lg:col-span-5 lg:grid-cols-1">
          {[
            ["Client", project.client],
            ["Year", project.year],
            ["Category", project.category],
            ["Services", project.services.join(", ")],
          ].map(([label, value]) => (
            <div key={label} data-cs-fade className="border-t border-line pt-4 opacity-0">
              <p className="text-label mb-2 text-muted">{label}</p>
              <p className="text-base md:text-lg">{value}</p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-7">
          <p
            ref={summaryRef}
            className="font-display text-2xl leading-snug md:text-3xl md:leading-snug"
          >
            {project.summary}
          </p>
        </div>
      </section>

      {/* Body — paragraphs interleaved with images */}
      <section className="px-gutter mt-20 flex flex-col gap-16 md:mt-28 md:gap-24">
        {project.description.map((paragraph, i) => (
          <div key={i} className="grid gap-12 lg:grid-cols-12">
            <p
              className={
                "max-w-xl text-base leading-relaxed text-muted md:text-lg " +
                (i % 2 === 0
                  ? "lg:col-span-6 lg:col-start-1"
                  : "lg:col-span-6 lg:col-start-7")
              }
            >
              {paragraph}
            </p>
            {project.images[i] && (
              <div
                data-cs-img
                className={
                  "overflow-hidden " +
                  (i % 2 === 0
                    ? "lg:col-span-5 lg:col-start-8"
                    : "lg:col-span-5 lg:col-start-1 lg:row-start-1")
                }
              >
                <div className="aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.images[i]}
                    alt={`${project.title} — detail ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Next project */}
      <section className="mt-28 border-t border-line md:mt-40">
        <TransitionLink
          href={`/work/${nextProject.slug}`}
          data-cursor-label="Next"
          className="group px-gutter relative block overflow-hidden py-24 text-center md:py-36"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={nextProject.cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-label relative mb-6 text-muted">Next project</p>
          <p className="font-display text-display-lg relative uppercase transition-colors duration-300 group-hover:text-accent">
            {nextProject.title}
          </p>
        </TransitionLink>
      </section>
    </div>
  );
}
