"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { gallery } from "@/config/content/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";

const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

function GalleryColumn({
  col,
  onOpen,
}: {
  col: { item: GalleryItem; index: number }[];
  onOpen: (index: number) => void;
}) {
  return (
    <div data-column className="flex flex-col gap-4 md:gap-6">
      {col.map(({ item, index }) => (
        <button
          key={item.src}
          onClick={() => onOpen(index)}
          data-cursor-label="Open"
          className="group relative overflow-hidden rounded-xl"
          aria-label={`Open image: ${item.alt}`}
        >
          <div className={cn("w-full", ratioClass[item.ratio])}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
          </div>
          <span className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/20" />
        </button>
      ))}
    </div>
  );
}

/**
 * Gallery — masonry columns drifting at different speeds (parallax)
 * with a keyboard-friendly lightbox.
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  /* chunk into N columns, preserving order down each column */
  const chunk = (cols: number) => {
    const columns: { item: GalleryItem; index: number }[][] = Array.from(
      { length: cols },
      () => []
    );
    gallery.forEach((item, index) => columns[index % cols].push({ item, index }));
    return columns;
  };

  /* column parallax */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const speeds = [-7, 5, -4];
      gsap.utils.toArray<HTMLElement>("[data-column]").forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: -speeds[i % speeds.length] },
          {
            yPercent: speeds[i % speeds.length],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* lightbox open/close animation + scroll lock */
  useEffect(() => {
    if (lightbox === null) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    const el = lightboxRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        el.querySelector("img"),
        { scale: 0.92, y: 24 },
        { scale: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
    }
    return () => {
      lenis?.start();
    };
  }, [lightbox, lenis]);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + gallery.length) % gallery.length
      );
    },
    []
  );

  /* keyboard controls */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="overflow-hidden py-28 md:py-40"
      aria-label="Gallery"
    >
      <SectionHeading
        index="04"
        label="Visual Diary"
        title="Screenshots & snapshots"
        aside={
          <span className="text-label pb-2 text-muted">
            ({String(gallery.length).padStart(2, "0")}) — Click to expand
          </span>
        }
      />

      {/* 2 columns below lg, 3 columns from lg — full set in both */}
      <div className="px-gutter mt-16 grid grid-cols-2 gap-4 md:gap-6 lg:hidden">
        {chunk(2).map((col, ci) => (
          <GalleryColumn key={ci} col={col} onOpen={setLightbox} />
        ))}
      </div>
      <div className="px-gutter mt-16 hidden grid-cols-3 gap-6 lg:grid">
        {chunk(3).map((col, ci) => (
          <GalleryColumn key={ci} col={col} onOpen={setLightbox} />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={gallery[lightbox].alt}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-background/95 opacity-0 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div
            className="px-gutter relative flex max-h-[88svh] w-full max-w-5xl flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="max-h-[76svh] w-full rounded-xl object-contain"
            />
            <div className="flex items-center justify-between">
              <span className="text-label text-muted">
                {gallery[lightbox].alt}
              </span>
              <div className="flex items-center gap-5">
                <span className="text-label text-muted">
                  {lightbox + 1} / {gallery.length}
                </span>
                <button
                  onClick={() => step(-1)}
                  className="rounded-full border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={() => step(1)}
                  className="rounded-full border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Next image"
                >
                  →
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  className="rounded-full border border-line px-4 py-2 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Close lightbox"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
