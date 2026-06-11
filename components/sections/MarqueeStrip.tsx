"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site.config";
import { Star } from "@/components/ui/Star";

/**
 * Infinite marquee that reacts to scroll velocity — it speeds up,
 * reverses with scroll direction and skews like it has inertia.
 */
export function MarqueeStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const target = useRef({ timeScale: 1, skew: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const parts = wrap.querySelectorAll("[data-marquee-part]");
    const tween = gsap.to(parts, {
      xPercent: -100,
      repeat: -1,
      duration: 26,
      ease: "none",
    });
    tweenRef.current = tween;

    /* Smoothly chase the target timescale/skew every tick */
    const tick = () => {
      const t = target.current;
      tween.timeScale(gsap.utils.interpolate(tween.timeScale(), t.timeScale, 0.08));
      t.skew = gsap.utils.interpolate(t.skew, 0, 0.08);
      gsap.set(wrap, { skewX: t.skew });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, []);

  useLenis(({ velocity }) => {
    const t = target.current;
    const v = gsap.utils.clamp(-12, 12, velocity);
    t.timeScale = v < 0 ? -1 - Math.abs(v) * 0.28 : 1 + Math.abs(v) * 0.28;
    t.skew = gsap.utils.clamp(-6, 6, -v * 0.45);
  });

  const items = siteConfig.marquee;

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-line py-5 md:py-7"
    >
      <div ref={wrapRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            data-marquee-part
            className="flex shrink-0 items-center"
          >
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
              >
                <span
                  className={
                    "font-display text-display-md whitespace-nowrap uppercase " +
                    (i % 2 === 1 ? "text-outline" : "")
                  }
                >
                  {item}
                </span>
                <Star className="shrink-0 text-[0.5em] text-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
