"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a blend-mode dot that scales on interactive elements
 * and morphs into an accent badge when hovering [data-cursor-label].
 * Automatically disabled on touch devices.
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
    let visible = false;
    let rafId = 0;

    const LERP = 0.38;

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

      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        gsap.set(wrap, { x: currentX, y: currentY, autoAlpha: 1 });
        visible = true;
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target || typeof target.closest !== "function") return;
      const labelEl = target.closest("[data-cursor-label]");
      const hoverEl = target.closest("a, button, [data-cursor]");

      if (labelEl) {
        labelText.textContent = labelEl.getAttribute("data-cursor-label");
        gsap.to(labelWrap, { scale: 1, autoAlpha: 1, duration: 0.22, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.22, ease: "power2.out" });
      } else {
        gsap.to(labelWrap, { scale: 0.3, autoAlpha: 0, duration: 0.22, ease: "power2.out" });
        gsap.to(dot, { scale: hoverEl ? 2.8 : 1, duration: 0.22, ease: "power2.out" });
      }
    };

    const leaveWindow = () => {
      visible = false;
      gsap.to(wrap, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leaveWindow);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leaveWindow);
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
          className="h-3.5 w-3.5 rounded-full bg-white mix-blend-difference"
        />
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
