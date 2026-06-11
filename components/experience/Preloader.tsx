"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { useApp } from "./app-context";
import { siteConfig } from "@/config/site.config";

export function Preloader() {
  const { setReady } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const root = rootRef.current!;
    document.documentElement.classList.add("overflow-hidden");

    const finish = () => {
      document.documentElement.classList.remove("overflow-hidden");
      setReady(true);
      ScrollTrigger.refresh();
    };

    if (prefersReducedMotion()) {
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: () => {
          root.style.display = "none";
          finish();
        },
      });
      return;
    }

    const counter = { value: 0 };
    const counterEl = counterRef.current!;

    const tl = gsap.timeline();
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
      },
    })
      .to(barRef.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
      .to(centerRef.current, {
        yPercent: -130,
        autoAlpha: 0,
        duration: 0.6,
        ease: "expo.in",
        delay: 0.15,
      })
      .add(finish, "-=0.1")
      .to(frontRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "expo.inOut",
      })
      .to(
        backRef.current,
        { yPercent: -100, duration: 0.85, ease: "expo.inOut" },
        "-=0.72"
      )
      .set(root, { display: "none" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[250]" aria-hidden>
      {/* accent flash layer behind the front panel */}
      <div ref={backRef} className="absolute inset-0 bg-accent" />
      <div
        ref={frontRef}
        className="absolute inset-0 flex flex-col justify-between bg-background px-gutter py-8"
      >
        <div className="flex items-center justify-between text-label text-muted">
          <span className="text-foreground">{siteConfig.identity.logoText}</span>
          <span>Portfolio © {new Date().getFullYear()}</span>
        </div>

        <div ref={centerRef} className="flex flex-col items-center gap-8">
          <span
            ref={counterRef}
            className="font-display text-display-xl tabular-nums leading-none"
          >
            000
          </span>
          <div className="h-px w-44 overflow-hidden bg-line">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-label text-muted">
          <span>Loading experience</span>
          <span>{siteConfig.identity.location}</span>
        </div>
      </div>
    </div>
  );
}
