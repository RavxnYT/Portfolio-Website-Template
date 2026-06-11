"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { projects } from "@/config/content/projects";
import { siteConfig } from "@/config/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Star } from "@/components/ui/Star";

/**
 * Selected works — on desktop the list pins and scrolls horizontally
 * (scroll-jacked showcase); on mobile it falls back to a vertical stack.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    /* Mobile/tablet — simple staggered fade-up for the stacked cards */
    mm.add("(max-width: 1023px)", () => {
      const section = sectionRef.current;
      if (!section) return;
      const items = section.querySelectorAll("[data-fade-mobile]");
      gsap.set(items, { y: 48, autoAlpha: 0 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });
    });

    mm.add("(min-width: 1024px)", () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      /* Inner image parallax riding the horizontal scroll */
      track.querySelectorAll<HTMLElement>("[data-panel-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("[data-panel]") as HTMLElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} aria-label="Selected work">
      <SectionHeading
        index="02"
        label="Selected Work"
        title="Projects that ship and shine"
        aside={
          <span className="text-label pb-2 text-muted">
            ({String(projects.length).padStart(2, "0")}) — Drag your scroll
          </span>
        }
      />

      <div ref={pinRef} className="mt-12 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div
          ref={trackRef}
          className="px-gutter flex flex-col gap-16 lg:w-max lg:flex-row lg:items-center lg:gap-[5vw] lg:pr-[18vw]"
        >
          {projects.map((project, i) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              data-panel
              data-fade-mobile
              data-cursor-label="View"
              className="group block w-full shrink-0 lg:w-[52vw]"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] w-full sm:aspect-[16/11] lg:h-[62vh] lg:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-panel-img
                    src={project.cover}
                    alt={project.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full scale-[1.16] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.22]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="text-label absolute left-5 top-5 rounded-full bg-background/60 px-4 py-2 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-4 border-b border-line pb-5">
                <span className="text-label text-muted">
                  0{i + 1}
                </span>
                <h3 className="font-display text-3xl uppercase transition-colors duration-300 group-hover:text-accent md:text-4xl">
                  {project.title}
                </h3>
                <span className="text-label ml-auto shrink-0 text-muted">
                  {project.year}
                </span>
              </div>
            </TransitionLink>
          ))}

          {/* End-cap CTA panel */}
          <div
            data-fade-mobile
            className="flex w-full shrink-0 items-center justify-center lg:w-[36vw]"
          >
            <TransitionLink
              href="#contact"
              data-cursor-label="Say hi"
              className="group flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-6 rounded-2xl border border-line transition-colors duration-500 hover:bg-surface"
            >
              <Star className="spin-slow text-3xl text-accent" />
              <span className="font-display text-display-md text-center uppercase leading-none">
                Your project
                <br />
                <span className="text-outline">next?</span>
              </span>
              <span className="text-label text-muted">
                {siteConfig.contact.cta} ↗
              </span>
            </TransitionLink>
          </div>
        </div>

        {/* progress bar (desktop) */}
        <div className="px-gutter mt-10 hidden lg:block">
          <div className="h-px w-full bg-line">
            <div
              ref={barRef}
              className="h-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
