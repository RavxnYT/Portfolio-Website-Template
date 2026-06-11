"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
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
 * Footer — fixed behind the page; the content slides away to reveal it
 * (the "website lives under itself" effect). Rendered after <main>,
 * which must have `relative z-10 bg-background`.
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
        { yPercent: -22, autoAlpha: 0.4 },
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

  return (
    <>
      {/* transparent window through which the fixed footer shows */}
      <div ref={spacerRef} className="h-[88svh]" aria-hidden />

      <footer
        className="fixed bottom-0 left-0 right-0 z-0 flex h-[88svh] flex-col justify-between overflow-hidden"
        aria-label="Footer"
      >
        <div
          ref={innerRef}
          className="px-gutter flex h-full flex-col justify-between pb-6 pt-16"
        >
          {/* top: heading + back to top */}
          <div className="flex items-start justify-between gap-8">
            <h2 className="font-display text-display-md max-w-[16ch] uppercase">
              {footer.heading}
            </h2>
            <Magnetic strength={0.4}>
              <button
                onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
                data-cursor
                aria-label="Back to top"
                className="flex h-16 w-16 items-center justify-center rounded-full border border-line text-xl transition-colors duration-300 hover:border-accent hover:text-accent md:h-20 md:w-20"
              >
                ↑
              </button>
            </Magnetic>
          </div>

          {/* middle: columns */}
          <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-label mb-4 text-muted">Sitemap</p>
              <ul className="flex flex-col gap-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => navigate(item.href)}
                      className="link-line text-base"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label mb-4 text-muted">Socials</p>
              <ul className="flex flex-col gap-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line text-base"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label mb-4 text-muted">Contact</p>
              <a
                href={`mailto:${identity.email}`}
                className="link-line block text-base"
              >
                {identity.email}
              </a>
              <p className="mt-2.5 text-base text-muted">{identity.phone}</p>
            </div>
            <div>
              <p className="text-label mb-4 text-muted">
                {identity.location}
              </p>
              <p className="font-display text-2xl tabular-nums">
                <LocalTime />
              </p>
              <p className="text-label mt-2 text-muted">Local time</p>
            </div>
          </div>

          {/* bottom: giant name + legal */}
          <div>
            <div
              aria-hidden
              className="font-display pointer-events-none select-none whitespace-nowrap text-center text-[15vw] uppercase leading-[0.78] opacity-[0.92]"
            >
              {identity.name.split(" ")[0]}
              <Star className="mx-[1.5vw] inline-block text-[0.35em] text-accent" />
            </div>
            <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted md:flex-row">
              <span>
                © {new Date().getFullYear()} {identity.name}. All rights reserved.
              </span>
              <span>{footer.note}</span>
              <span>
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
                  <span className="text-foreground">{footer.developer.name}</span>
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
