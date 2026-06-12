"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor — always visible while the tab is open.
 * No pointerout hiding (that caused idle/disappearing cursor bugs).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelWrapRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-custom");
    return () => document.documentElement.classList.remove("cursor-custom");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current!;
    const dot = dotRef.current!;
    const labelWrap = labelWrapRef.current!;
    const labelText = labelTextRef.current!;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;
    let started = false;

    const LERP = 0.38;

    const show = () => {
      if (!started) {
        started = true;
        gsap.set(wrap, { autoAlpha: 1 });
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      gsap.set(wrap, { x: currentX, y: currentY });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const move = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!started) {
        currentX = targetX;
        currentY = targetY;
      }

      show();
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target || typeof target.closest !== "function") return;

      const labelEl = target.closest("[data-cursor-label]");
      const hoverEl = target.closest("a, button, [data-cursor]");

      gsap.killTweensOf([dot, labelWrap]);

      if (labelEl) {
        labelText.textContent = labelEl.getAttribute("data-cursor-label");
        gsap.to(labelWrap, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.22,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.22, ease: "power2.out" });
      } else {
        gsap.to(labelWrap, {
          scale: 0.3,
          autoAlpha: 0,
          duration: 0.22,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: hoverEl ? 2.8 : 1,
          duration: 0.22,
          ease: "power2.out",
        });
      }
    };

    /* Only hide when the tab is backgrounded — never on idle */
    const onVisibility = () => {
      if (document.hidden) {
        gsap.set(wrap, { autoAlpha: 0 });
        started = false;
      } else {
        show();
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.killTweensOf([dot, labelWrap, wrap]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0 will-change-transform"
      aria-hidden
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div
          ref={dotRef}
          className="relative flex h-4 w-4 items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full border border-foreground/70 bg-foreground/20 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
        </div>
        <div
          ref={labelWrapRef}
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-accent text-accent-contrast opacity-0"
        >
          <span
            ref={labelTextRef}
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          />
        </div>
      </div>
    </div>
  );
}
