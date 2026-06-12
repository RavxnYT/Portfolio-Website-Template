"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { services } from "@/config/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Services — sticky stacking cards. Each new card slides over the
 * previous one, which scales back and dims like a deck of paper.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector<HTMLElement>("[data-card-inner]");
        const next = cards[i + 1];
        if (!inner || !next) return;

        gsap.set(inner, { transformOrigin: "50% 0%" });

        gsap.fromTo(
          inner,
          { scale: 1, opacity: 1, y: 0 },
          {
            scale: 0.96,
            opacity: 0.88,
            y: -8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: next,
              // Keep the active card full until the next one is well into view
              start: "top 68%",
              // Finish the handoff just before the next card pins
              end: "top 18%",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="Services"
    >
      <SectionHeading
        index="03"
        label="What we do"
        title="What I build for clients"
      />

      <div className="px-gutter mt-16 flex flex-col gap-[12vh]">
        {services.map((service, i) => (
          <div
            key={service.title}
            data-service-card
            className="sticky"
            style={{ top: `calc(12svh + ${i * 1.6}rem)` }}
          >
            <div
              data-card-inner
              className={cn(
                "relative grid min-h-[58svh] content-between gap-10 overflow-hidden rounded-3xl border border-line p-8 will-change-transform md:p-14 lg:grid-cols-2 lg:content-center",
                service.highlight
                  ? "bg-accent text-accent-contrast"
                  : "bg-surface"
              )}
            >
              <div className="relative z-10 flex flex-col gap-6">
                <span
                  className={cn(
                    "text-label",
                    service.highlight ? "opacity-70" : "text-muted"
                  )}
                >
                  ( 0{i + 1} )
                </span>
                <h3 className="font-display text-display-md max-w-[12ch] uppercase">
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "max-w-md text-base leading-relaxed md:text-lg",
                    service.highlight ? "opacity-80" : "text-muted"
                  )}
                >
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap content-center gap-3 self-center">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                      service.highlight
                        ? "border-accent-contrast/30 hover:bg-accent-contrast hover:text-accent"
                        : "border-line hover:border-accent hover:text-accent"
                    )}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* watermark index */}
              <span
                aria-hidden
                className={cn(
                  "font-display pointer-events-none absolute -bottom-8 right-4 select-none text-[10rem] leading-none opacity-[0.05] md:text-[16rem]",
                  service.highlight && "opacity-[0.08]"
                )}
              >
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
