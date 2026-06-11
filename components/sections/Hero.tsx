"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site.config";
import { useApp } from "@/components/experience/app-context";
import { useTransitionNav } from "@/components/experience/TransitionRouter";
import { Star } from "@/components/ui/Star";
import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
});

/** Server-renderable split: each char in a masked span, ready for GSAP */
function KineticLine({
  text,
  outlined,
}: {
  text: string;
  outlined: boolean;
}) {
  return (
    <span className="block">
      {text.split("").map((ch, i) => (
        <span key={i} className="char-mask">
          <span
            className={cn("char", outlined && "text-outline")}
            aria-hidden
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { ready } = useApp();
  const { navigate } = useTransitionNav();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const { hero, identity } = siteConfig;

  /* Entrance — fires once the preloader lifts */
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(section.querySelectorAll(".char"), { y: 0 });
        gsap.set("[data-hero-fade]", { autoAlpha: 1, y: 0 });
        gsap.set(canvasWrapRef.current, { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(section.querySelectorAll(".char"), {
        y: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger: { each: 0.035, from: "start" },
      })
        .fromTo(
          canvasWrapRef.current,
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
          0.25
        )
        .fromTo(
          "[data-hero-fade]",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 },
          "-=1.1"
        );

      /* Scroll choreography — headline drifts up & fades as you leave */
      gsap.to(contentRef.current, {
        yPercent: -16,
        autoAlpha: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-label="Intro"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 68% 32%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)",
        }}
      />

      {/* 3D layer */}
      <div ref={canvasWrapRef} className="absolute inset-0 opacity-0">
        <HeroCanvas />
      </div>

      {/* content */}
      <div
        ref={contentRef}
        className="px-gutter relative z-10 flex h-full flex-col justify-end pb-10 pt-28"
      >
        <div
          data-hero-fade
          className="mb-8 flex items-center gap-3 opacity-0"
        >
          <span className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-label">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
            {identity.availability}
          </span>
        </div>

        <h1
          className="font-display text-display-xl relative uppercase"
          aria-label={hero.headline.join(" ")}
        >
          {hero.headline.map((line, i) => (
            <KineticLine
              key={i}
              text={line}
              outlined={i === hero.outlinedLine}
            />
          ))}
          <Star className="spin-slow absolute -right-2 top-0 hidden text-[0.16em] text-accent lg:block" />
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-fade
            className="max-w-md text-base leading-relaxed text-muted opacity-0 md:text-lg"
          >
            {hero.subline}
          </p>

          <div data-hero-fade className="flex items-center gap-8 opacity-0">
            <span className="text-label hidden text-muted lg:block">
              {identity.role}
            </span>
            <button
              onClick={() => navigate("#work")}
              className="group flex items-center gap-3"
              data-cursor
            >
              <span className="text-label">{hero.scrollHint}</span>
              <span className="relative h-12 w-px overflow-hidden bg-line">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_1.8s_ease-in-out_infinite] bg-accent" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
