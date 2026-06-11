"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/config/site.config";
import { AppProvider } from "./app-context";
import { TransitionRouter } from "./TransitionRouter";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { MenuOverlay } from "./MenuOverlay";
import { Cursor } from "./Cursor";
import { ScrollProgress } from "./ScrollProgress";
import { SectionNavigator } from "./SectionNavigator";
import { NoiseOverlay } from "./NoiseOverlay";

/** Keeps ScrollTrigger in sync with Lenis (must live inside <ReactLenis>) */
function LenisGsapBridge({ lenisRef }: { lenisRef: React.RefObject<LenisRef | null> }) {
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenisRef]);
  return null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  /* Re-measure scroll positions once everything (images, fonts) loaded */
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <AppProvider>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          duration: 1.15,
          smoothWheel: true,
          touchMultiplier: 1.3,
        }}
      >
        <LenisGsapBridge lenisRef={lenisRef} />
        <TransitionRouter>
          {siteConfig.features.preloader && <Preloader />}
          <Navbar />
          <MenuOverlay />
          {siteConfig.features.scrollProgress && <ScrollProgress />}
          {siteConfig.features.sectionNavigator && <SectionNavigator />}
          {children}
          {siteConfig.features.customCursor && <Cursor />}
          {siteConfig.features.noiseOverlay && <NoiseOverlay />}
        </TransitionRouter>
      </ReactLenis>
    </AppProvider>
  );
}
