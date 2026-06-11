"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { getVisibleNavItems } from "@/lib/nav";
import { useApp } from "./app-context";
import { useTransitionNav } from "./TransitionRouter";
import { cn } from "@/lib/utils";

/** Pick the section whose body contains the viewport marker line */
function computeActiveSection(hrefs: string[]): string {
  const marker = window.innerHeight * 0.36;
  let fallback = hrefs[0] ?? "#home";
  let closestDist = Infinity;

  for (const href of hrefs) {
    const el = document.getElementById(href.replace("#", ""));
    if (!el) continue;

    const { top, bottom, height } = el.getBoundingClientRect();

    // Definitive match — marker sits inside this section
    if (top <= marker && bottom >= marker) {
      return href;
    }

    // Fallback for gaps / section edges
    const anchor = top + Math.min(160, height * 0.12);
    const dist = Math.abs(anchor - marker);
    if (dist < closestDist) {
      closestDist = dist;
      fallback = href;
    }
  }

  return fallback;
}

/**
 * Section navigator — always-visible jump links with active scroll tracking.
 * Desktop: slim rail on the right. Mobile: floating "Navigate" pill that expands.
 */
export function SectionNavigator() {
  const pathname = usePathname();
  const { ready, menuOpen } = useApp();
  const { scrollToHash } = useTransitionNav();
  const lenis = useLenis();
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const lockRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const items = useMemo(() => getVisibleNavItems(), []);
  const hrefs = useMemo(() => items.map((item) => item.href), [items]);

  const isHome = pathname === "/";

  const syncActive = useCallback(() => {
    if (lockRef.current) return;
    const next = computeActiveSection(hrefs);
    setActive((prev) => (prev === next ? prev : next));
  }, [hrefs]);

  /* Track active section from scroll position (not per-section triggers) */
  useLenis(syncActive);

  useEffect(() => {
    if (!isHome) return;
    syncActive();
    window.addEventListener("resize", syncActive);
    return () => window.removeEventListener("resize", syncActive);
  }, [isHome, syncActive]);

  /* Show the rail on home — animate once after preloader, instant on return visits */
  useEffect(() => {
    if (!ready || !isHome) return;

    const frame = requestAnimationFrame(() => {
      const el = rootRef.current;
      if (!el) return;

      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.35 }
        );
      } else {
        gsap.set(el, { autoAlpha: 1, x: 0 });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [ready, isHome]);

  /* Close mobile panel when full menu opens */
  useEffect(() => {
    if (menuOpen) setOpen(false);
  }, [menuOpen]);

  useEffect(
    () => () => {
      clearTimeout(lockTimerRef.current);
    },
    []
  );

  if (!isHome) return null;

  const go = (href: string) => {
    setOpen(false);
    setActive(href);
    lockRef.current = true;
    clearTimeout(lockTimerRef.current);

    const el = document.getElementById(href.replace("#", ""));

    if (el && lenis) {
      lenis.scrollTo(el, {
        duration: 1.35,
        onComplete: () => {
          lockRef.current = false;
          setActive(href);
        },
      });
    } else {
      scrollToHash(href);
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
        setActive(href);
      }, 1400);
    }
  };

  return (
    <>
      {/* Desktop rail */}
      <nav
        ref={rootRef}
        aria-label="Section navigation"
        className="pointer-events-none fixed right-6 top-1/2 z-[105] hidden -translate-y-1/2 opacity-0 xl:block"
      >
        <ul className="pointer-events-auto flex w-[13.5rem] flex-col gap-0.5 rounded-2xl border border-line bg-background/80 p-2 backdrop-blur-md">
          {items.map((item, i) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <button
                  onClick={() => go(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  data-cursor
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300",
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted hover:bg-surface/50 hover:text-foreground"
                  )}
                >
                  <span className="flex w-2 shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                        isActive ? "bg-accent" : "bg-muted"
                      )}
                    />
                  </span>
                  <span className="text-label leading-none tracking-[0.16em]">
                    {item.index ? `${item.index} — ${item.label}` : item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / tablet floating navigator */}
      <div className="fixed bottom-6 right-6 z-[105] xl:hidden">
        {open && (
          <div
            className="fixed inset-0 bg-background/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        <div className="relative">
          {open && (
            <nav
              aria-label="Section navigation"
              className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(82vw,18rem)] overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl backdrop-blur-md"
            >
              <div className="border-b border-line px-4 py-3">
                <p className="text-label text-muted">Go to section</p>
              </div>
              <ul className="max-h-[min(60svh,22rem)] overflow-y-auto p-2">
                {items.map((item, i) => {
                  const isActive = active === item.href;
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => go(item.href)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-300",
                          isActive
                            ? "bg-accent text-accent-contrast"
                            : "hover:bg-background"
                        )}
                      >
                        <span className="text-label opacity-70">
                          {item.index ?? "—"}
                        </span>
                        <span className="font-display text-lg uppercase">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close section navigator" : "Open section navigator"}
            data-cursor
            className={cn(
              "flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] backdrop-blur-md transition-all duration-300",
              open
                ? "border-accent bg-accent text-accent-contrast"
                : "border-line bg-background/85 text-foreground hover:border-accent hover:text-accent"
            )}
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-300",
                  open ? "rotate-0" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-300",
                  open ? "rotate-90" : "translate-y-[3px]"
                )}
              />
            </span>
            {open ? "Close" : "Navigate"}
          </button>
        </div>
      </div>
    </>
  );
}
