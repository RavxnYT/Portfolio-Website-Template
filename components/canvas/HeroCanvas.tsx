"use client";

import { Component, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/config/site.config";
import { ParticleField } from "./ParticleField";
import { MorphBlob } from "./MorphBlob";
import { Rings } from "./Rings";
import { GltfModel } from "./GltfModel";
import { useThemeColors } from "./shared";

/** Renders the blob if a custom model fails to load */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * The hero's 3D layer. Tracks hero scroll progress + visibility and
 * feeds them to the active scene variant as mutable refs (no re-renders).
 */
export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const inView = useRef(true);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const colors = useThemeColors();
  const { variant, modelPath, modelScale } = siteConfig.hero;

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.closest("section");
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
      onToggle: (self) => {
        inView.current = self.isActive;
      },
    });
    return () => st.kill();
  }, []);

  /* CSS gradient fallback for devices without WebGL */
  if (webgl === false) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 65% 35%, color-mix(in srgb, ${colors.accent} 14%, transparent), transparent)`,
        }}
      />
    );
  }

  const sceneProps = {
    progress,
    inView,
    accent: colors.accent,
    foreground: colors.foreground,
  };

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {webgl && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            {variant === "particles" && <ParticleField {...sceneProps} />}
            {variant === "blob" && <MorphBlob {...sceneProps} />}
            {variant === "rings" && <Rings {...sceneProps} />}
            {variant === "model" &&
              (modelPath ? (
                <ModelErrorBoundary fallback={<MorphBlob {...sceneProps} />}>
                  <GltfModel
                    {...sceneProps}
                    path={modelPath}
                    scale={modelScale}
                  />
                </ModelErrorBoundary>
              ) : (
                <MorphBlob {...sceneProps} />
              ))}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
