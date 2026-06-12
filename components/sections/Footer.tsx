"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site.config";
import { useTransitionNav } from "@/components/experience/TransitionRouter";
import { Magnetic } from "@/components/ui/Magnetic";
import { Star } from "@/components/ui/Star";

function LocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: siteConfig.identity.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}

/**
 * Footer — fixed behind the page; main content slides away to reveal it.
 * Sized to fit within the viewport so nothing is clipped at the bottom.
 */
export function Footer() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { navigate } = useTransitionNav();
  const { identity, nav, socials, footer } = siteConfig;

  useEffect(() => {
    const spacer = spacerRef.current;
    const inner = innerRef.current;
    if (!spacer || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -12, autoAlpha: 0.5 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: spacer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Scroll room — matches footer height so the full block is reachable */}
      <div ref={spacerRef} className="min-h-svh" aria-hidden />

      <footer
        className="fixed inset-x-0 bottom-0 z-0 min-h-svh"
        aria-label="Footer"
      >
        <div
          ref={innerRef}
          className="px-gutter flex min-h-svh flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 md:pb-8 md:pt-14"
        >
          {/* top: heading + back to top */}
          <div className="flex shrink-0 items-start justify-between gap-6">
            <h2 className="font-display text-3xl uppercase sm:text-4xl md:text-display-md max-w-[16ch]">
              {footer.heading}
            </h2>
            <Magnetic strength={0.4}>
              <button
                onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
                data-cursor
                aria-label="Back to top"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-xl transition-colors duration-300 hover:border-accent hover:text-accent md:h-16 md:w-16"
              >
                ↑
              </button>
            </Magnetic>
          </div>

          {/* middle: columns — compact on small screens */}
          <div className="mt-8 grid shrink-0 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-10 lg:grid-cols-4 lg:gap-10">
            <div>
              <p className="text-label mb-3 text-muted md:mb-4">Sitemap</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => navigate(item.href)}
                      className="link-line text-left text-sm md:text-base"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label mb-3 text-muted md:mb-4">Socials</p>
              <ul className="flex flex-col gap-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line text-sm md:text-base"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label mb-3 text-muted md:mb-4">Contact</p>
              <a
                href={`mailto:${identity.email}`}
                className="link-line block break-all text-sm md:text-base"
              >
                {identity.email}
              </a>
              <p className="mt-2 text-sm text-muted md:mt-2.5 md:text-base">
                {identity.phone}
              </p>
            </div>
            <div>
              <p className="text-label mb-3 text-muted md:mb-4">
                {identity.location}
              </p>
              <p className="font-display text-xl tabular-nums md:text-2xl">
                <LocalTime />
              </p>
              <p className="text-label mt-1.5 text-muted md:mt-2">
                Local time
              </p>
            </div>
          </div>

          {/* bottom: wordmark + legal — always visible */}
          <div className="mt-auto shrink-0 pt-8 md:pt-10">
            <div
              aria-hidden
              className="font-display pointer-events-none select-none overflow-hidden text-center text-[clamp(2.75rem,11vw,7.5rem)] uppercase leading-[0.85] opacity-[0.92]"
            >
              {identity.logoText.replace(/®/g, "")}
              <Star className="mx-[0.08em] inline-block text-[0.32em] text-accent" />
            </div>
            <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-muted sm:text-xs md:mt-5 md:flex-row md:pt-5 md:text-sm">
              <span className="text-center md:text-left">
                © {new Date().getFullYear()} {identity.name}. All rights
                reserved.
              </span>
              <span className="text-center">{footer.note}</span>
              <span className="text-center md:text-right">
                Developed by{" "}
                {footer.developer.url ? (
                  <a
                    href={footer.developer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line text-foreground"
                  >
                    {footer.developer.name}
                  </a>
                ) : (
                  <span className="text-foreground">
                    {footer.developer.name}
                  </span>
                )}{" "}
                — {footer.developer.location}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
