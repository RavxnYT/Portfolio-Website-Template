"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Draggable } from "@/lib/gsap";
import { useFadeUp } from "@/lib/animations";
import { testimonials } from "@/config/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Testimonials — an inertia slider you can throw around.
 * Snaps to cards, works with arrows too.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const [index, setIndex] = useState(0);

  useFadeUp(sectionRef);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let snapPoints: number[] = [];

    const build = () => {
      draggableRef.current?.kill();
      const slides = Array.from(track.children) as HTMLElement[];
      if (!slides.length) return;

      const minX = -(track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
      snapPoints = slides.map((s) => Math.max(minX, -s.offsetLeft));

      const [instance] = Draggable.create(track, {
        type: "x",
        inertia: true,
        edgeResistance: 0.82,
        bounds: { minX, maxX: 0 },
        snap: { x: (value) => gsap.utils.snap(snapPoints, value) },
        onThrowUpdate: updateIndex,
        onDragEnd: updateIndex,
      });
      draggableRef.current = instance;
    };

    function updateIndex() {
      const x = (gsap.getProperty(track, "x") as number) ?? 0;
      let closest = 0;
      let best = Infinity;
      snapPoints.forEach((p, i) => {
        const d = Math.abs(p - x);
        if (d < best) {
          best = d;
          closest = i;
        }
      });
      setIndex(closest);
    }

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      draggableRef.current?.kill();
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const clamped = gsap.utils.clamp(0, slides.length - 1, i);
    const minX = -(track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
    gsap.to(track, {
      x: Math.max(minX, -slides[clamped].offsetLeft),
      duration: 0.8,
      ease: "power3.out",
    });
    setIndex(clamped);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="Testimonials"
    >
      <SectionHeading
        index="07"
        label="Kind Words"
        title="Clients & collaborators"
        aside={
          <div className="flex items-center gap-3 pb-2">
            <button
              onClick={() => goTo(index - 1)}
              className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={() => goTo(index + 1)}
              className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        }
      />

      <div
        data-fade
        className="px-gutter mt-16 overflow-hidden"
        data-cursor-label="Drag"
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing md:gap-8"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[82vw] flex-col justify-between gap-10 rounded-3xl border border-line bg-surface p-8 select-none sm:w-[60vw] md:p-12 lg:w-[42vw]"
            >
              <blockquote className="relative">
                <span className="font-display pointer-events-none absolute -left-2 -top-8 text-7xl text-accent opacity-80 select-none">
                  &ldquo;
                </span>
                <p className="relative text-lg leading-relaxed md:text-2xl md:leading-relaxed">
                  {t.quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t border-line pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                  draggable={false}
                />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-label mt-1 text-muted">
                    {t.role}, {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* dots */}
        <div className="mt-8 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-400",
                i === index ? "w-8 bg-accent" : "w-1.5 bg-line hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
