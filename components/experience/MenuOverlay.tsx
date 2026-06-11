"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site.config";
import { getVisibleNavItems } from "@/lib/nav";
import { useApp } from "./app-context";
import { useTransitionNav } from "./TransitionRouter";

export function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useApp();
  const { navigate } = useTransitionNav();
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* Build the open/close timeline once */
  useEffect(() => {
    const root = rootRef.current!;
    const links = root.querySelectorAll("[data-menu-link]");
    const meta = root.querySelectorAll("[data-menu-meta]");

    gsap.set(root, { clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" });

    const tl = gsap.timeline({ paused: true });
    tl.set(root, { visibility: "visible" })
      .to(root, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "expo.inOut",
      })
      .fromTo(
        links,
        { yPercent: 130 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power4.out",
        },
        "-=0.35"
      )
      .fromTo(
        meta,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.5"
      );

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  /* Play / reverse on state change + scroll lock */
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (menuOpen) {
      lenis?.stop();
      tl.timeScale(1).play();
    } else {
      lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }, [menuOpen, lenis]);

  /* Esc closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    // tiny delay so the closing animation starts before the page moves
    setTimeout(() => navigate(href), 120);
  };

  const navItems = getVisibleNavItems();

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      className="fixed inset-0 z-[100] invisible bg-surface"
    >
      <div className="px-gutter flex h-full flex-col justify-between pb-10 pt-28">
        <nav className="flex flex-col">
          {navItems.map((item, i) => (
            <div key={item.href} className="overflow-hidden border-b border-line">
              <div data-menu-link className="will-change-transform">
                <button
                  onClick={() => go(item.href)}
                  className="group flex w-full items-baseline gap-5 py-3 text-left md:gap-8"
                >
                  <span className="text-label text-muted">
                    {item.index ?? "—"}
                  </span>
                  <span className="font-display text-display-lg uppercase transition-all duration-300 group-hover:translate-x-3 group-hover:text-accent">
                    {item.label}
                  </span>
                  <span className="ml-auto hidden text-2xl text-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent md:block">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-menu-meta>
            <p className="text-label mb-3 text-muted">Get in touch</p>
            <a
              href={`mailto:${siteConfig.identity.email}`}
              className="link-line font-display text-xl md:text-2xl"
            >
              {siteConfig.identity.email}
            </a>
          </div>

          <div data-menu-meta className="flex gap-6">
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-line text-label text-muted hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div data-menu-meta className="text-label text-muted">
            {siteConfig.identity.location}
          </div>
        </div>
      </div>
    </div>
  );
}
