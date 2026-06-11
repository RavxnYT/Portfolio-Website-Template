"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site.config";
import { useApp } from "./app-context";
import { useTransitionNav } from "./TransitionRouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { ready, menuOpen, setMenuOpen } = useApp();
  const { navigate } = useTransitionNav();
  const barRef = useRef<HTMLElement>(null);
  const hidden = useRef(false);

  /* Hide on scroll down, reveal on scroll up */
  useLenis(({ scroll, direction }) => {
    if (menuOpen) return;
    const bar = barRef.current;
    if (!bar) return;
    const shouldHide = scroll > 140 && direction === 1;
    if (shouldHide !== hidden.current) {
      hidden.current = shouldHide;
      gsap.to(bar, {
        yPercent: shouldHide ? -130 : 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  });

  /* Entrance after preloader */
  useEffect(() => {
    if (!ready) return;
    const bar = barRef.current;
    if (!bar) return;
    gsap.fromTo(
      bar,
      { yPercent: -130 },
      { yPercent: 0, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );
  }, [ready]);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[110] -translate-y-[130%] mix-blend-difference"
    >
      <nav className="px-gutter flex h-20 items-center justify-between text-white">
        <button
          onClick={() => navigate("/")}
          className="font-display text-lg font-bold uppercase tracking-[0.18em]"
          aria-label="Back to home"
        >
          {siteConfig.identity.logoText}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="group flex items-center gap-3"
        >
          <span className="text-label hidden sm:block">
            {menuOpen ? "Close" : "Menu"}
          </span>
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span
              className={cn(
                "absolute h-px w-6 bg-white transition-all duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[4px] group-hover:-translate-y-[6px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-6 bg-white transition-all duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[4px] group-hover:translate-y-[6px]"
              )}
            />
          </span>
        </button>
      </nav>
    </header>
  );
}
