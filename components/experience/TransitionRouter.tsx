"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site.config";

interface TransitionContextValue {
  /** Navigate with a curtain-wipe transition. Accepts paths or #hashes. */
  navigate: (href: string) => void;
  scrollToHash: (hash: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionRouter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const covering = useRef(false);
  const pendingHash = useRef<string | null>(null);

  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const l = lenisRef.current;
    if (l) l.scrollTo(el as HTMLElement, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const coverAndPush = useCallback(
    (href: string) => {
      if (covering.current) return;
      covering.current = true;
      const overlay = overlayRef.current!;
      if (prefersReducedMotion()) {
        gsap.set(overlay, { display: "flex", yPercent: 0, opacity: 1 });
        router.push(href);
        return;
      }
      gsap.set(overlay, { display: "flex", yPercent: 100, opacity: 1 });
      gsap.set(brandRef.current, { autoAlpha: 0, y: 24 });
      const tl = gsap.timeline();
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.65,
        ease: "expo.inOut",
      })
        .to(
          brandRef.current,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.25"
        )
        .add(() => router.push(href));
    },
    [router]
  );

  const navigate = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        if (pathname !== "/") {
          pendingHash.current = href;
          coverAndPush("/");
        } else {
          scrollToHash(href);
        }
        return;
      }
      if (href === pathname) {
        lenisRef.current?.scrollTo(0, { duration: 1.2 });
        return;
      }
      coverAndPush(href);
    },
    [pathname, coverAndPush, scrollToHash]
  );

  /* Runs whenever the route actually changed */
  useEffect(() => {
    if (covering.current) {
      const overlay = overlayRef.current!;
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.65,
          ease: "expo.inOut",
          delay: 0.15,
          onComplete: () => {
            gsap.set(overlay, { display: "none", yPercent: 100 });
            covering.current = false;
            if (pendingHash.current) {
              const hash = pendingHash.current;
              pendingHash.current = null;
              setTimeout(() => scrollToHash(hash), 60);
            }
          },
        });
      });
    } else {
      // back/forward navigation — just resync scroll measurements
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [pathname, scrollToHash]);

  return (
    <TransitionContext.Provider value={{ navigate, scrollToHash }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[150] hidden items-center justify-center bg-surface"
      >
        <span
          ref={brandRef}
          className="font-display text-2xl uppercase tracking-[0.3em]"
        >
          {siteConfig.identity.logoText}
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

export function useTransitionNav(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransitionNav must be used within <TransitionRouter>");
  return ctx;
}
