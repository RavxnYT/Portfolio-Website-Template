"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { projects } from "@/config/content/projects";
import { siteConfig } from "@/config/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Star } from "@/components/ui/Star";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = projects.length + 1; // projects + end CTA panel

/**
 * Selected works — on desktop the list pins and scrolls horizontally.
 * Scroll distance is capped so you are not stuck scrubbing forever,
 * with arrows, skip, and a clickable progress bar for quick navigation.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  const scrollToProgress = useCallback(
    (targetProgress: number, duration = 0.85) => {
      const st = stRef.current;
      if (!st || !lenis) return;
      const clamped = gsap.utils.clamp(0, 1, targetProgress);
      const y = st.start + clamped * (st.end - st.start);
      lenis.scrollTo(y, { duration });
    },
    [lenis]
  );

  const goToSlide = useCallback(
    (index: number) => {
      const clamped = gsap.utils.clamp(0, SLIDE_COUNT - 1, index);
      scrollToProgress(clamped / (SLIDE_COUNT - 1));
    },
    [scrollToProgress]
  );

  const skipSection = useCallback(() => {
    const st = stRef.current;
    if (!st || !lenis) return;
    lenis.scrollTo(st.end + 4, { duration: 1.1 });
  }, [lenis]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

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

      const horizontalDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      /** Cap vertical scroll — full horizontal sweep in ~2.2 viewports, not the entire track length */
      const scrollDistance = () =>
        Math.min(horizontalDistance(), window.innerHeight * 2.2);

      const tween = gsap.to(track, {
        x: () => -horizontalDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => setPinned(self.isActive),
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveIndex(Math.round(self.progress * (SLIDE_COUNT - 1)));
          },
        },
      });

      stRef.current = tween.scrollTrigger ?? null;

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

    return () => {
      stRef.current = null;
      mm.revert();
    };
  }, []);

  /* Keyboard arrows while the showcase is pinned */
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(activeIndex + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned, activeIndex, goToSlide]);

  const isLastSlide = activeIndex >= SLIDE_COUNT - 1;

  return (
    <section id="work" ref={sectionRef} aria-label="Selected work">
      <SectionHeading
        index="02"
        label="Selected Work"
        title="Selected builds & launches"
        aside={
          <span className="text-label pb-2 text-muted">
            ({String(projects.length).padStart(2, "0")}) — Scroll or use controls
          </span>
        }
      />

      <div ref={pinRef} className="relative mt-12 lg:flex lg:h-screen lg:flex-col lg:justify-center">
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
                <span className="text-label text-muted">0{i + 1}</span>
                <h3 className="font-display text-3xl uppercase transition-colors duration-300 group-hover:text-accent md:text-4xl">
                  {project.title}
                </h3>
                <span className="text-label ml-auto shrink-0 text-muted">
                  {project.year}
                </span>
              </div>
            </TransitionLink>
          ))}

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

        {/* Desktop controls — visible while pinned */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden px-gutter transition-opacity duration-400 lg:block",
            pinned ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4">
            {/* Clickable progress bar */}
            <button
              type="button"
              aria-label="Scrub through projects"
              className="group relative h-2 w-full cursor-pointer rounded-full bg-line"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                scrollToProgress(ratio, 0.6);
              }}
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </button>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
                >
                  ←
                </button>
                <span className="text-label tabular-nums text-muted">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(SLIDE_COUNT).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex + 1)}
                  disabled={isLastSlide}
                  aria-label="Next project"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
                >
                  →
                </button>
              </div>

              <button
                type="button"
                onClick={skipSection}
                data-cursor
                className="rounded-full border border-line px-5 py-2.5 text-label transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
              >
                {isLastSlide ? "Continue ↓" : "Skip showcase ↓"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
