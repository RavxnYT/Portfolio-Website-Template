"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface RevealLinesOptions {
  stagger?: number;
  start?: string;
  delay?: number;
}

/**
 * Splits an element's text into masked lines that slide up into view
 * when scrolled to. Auto re-splits on resize/font-load (SplitText 3.13+).
 */
export function useRevealLines(
  ref: RefObject<HTMLElement | null>,
  options: RevealLinesOptions = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !el.isConnected) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: options.stagger ?? 0.08,
            delay: options.delay ?? 0,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? "top 82%",
              once: true,
            },
          }),
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

interface FadeUpOptions {
  selector?: string;
  y?: number;
  start?: string;
  stagger?: number;
}

/**
 * Batch fade-up reveal for all `[data-fade]` descendants of a scope.
 */
export function useFadeUp(
  scopeRef: RefObject<HTMLElement | null>,
  options: FadeUpOptions = {}
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const selector = options.selector ?? "[data-fade]";
    const items = scope.querySelectorAll(selector);
    if (!items.length) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { y: options.y ?? 48, autoAlpha: 0 });
      ScrollTrigger.batch(items, {
        start: options.start ?? "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: options.stagger ?? 0.08,
          }),
      });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Subtle parallax on an image inside an overflow-hidden wrapper. */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  amount = 10
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
}
