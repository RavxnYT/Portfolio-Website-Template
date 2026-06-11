"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";

/** Normalized mouse position (-1..1), updated outside React renders. */
export function useMouseRef(): RefObject<{ x: number; y: number }> {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return mouse;
}

/** Reads the theme accent + foreground colors from CSS variables. */
export function useThemeColors() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return { accent: "#D7FF3E", foreground: "#F2F1ED" };
    }
    const styles = getComputedStyle(document.documentElement);
    return {
      accent: styles.getPropertyValue("--accent").trim() || "#D7FF3E",
      foreground: styles.getPropertyValue("--foreground").trim() || "#F2F1ED",
    };
  }, []);
}

export interface SceneProps {
  /** 0 at hero top → 1 when hero scrolled away (mutable, read in useFrame) */
  progress: RefObject<number>;
  /** False when the hero is offscreen — scenes skip work */
  inView: RefObject<boolean>;
  accent: string;
  foreground: string;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
