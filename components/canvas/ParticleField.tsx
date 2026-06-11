"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMouseRef, lerp, type SceneProps } from "./shared";

/**
 * "particles" hero — a slowly swirling galaxy of points with an
 * accent dust layer. Reacts to mouse and recedes on scroll.
 */
export function ParticleField({ progress, inView, accent, foreground }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseRef();

  const [main, sparks] = useMemo(() => {
    const COUNT = 4200;
    const SPARKS = 320;

    const make = (count: number, spread: number) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const radius = Math.pow(Math.random(), 0.65) * 4.4;
        const angle = Math.random() * Math.PI * 2 + radius * 0.85;
        const wobble = (Math.random() - 0.5) * spread * (1 - radius / 6);
        arr[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.35;
        arr[i * 3 + 1] = wobble;
        arr[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.35;
      }
      return arr;
    };

    return [make(COUNT, 1.6), make(SPARKS, 2.4)];
  }, []);

  useFrame((state, delta) => {
    if (!inView.current || !group.current) return;
    const g = group.current;
    const p = progress.current;

    g.rotation.y += delta * 0.045;
    g.rotation.x = lerp(g.rotation.x, mouse.current.y * 0.22 + p * 0.55 + 0.32, 0.04);
    g.rotation.z = lerp(g.rotation.z, mouse.current.x * 0.1, 0.04);
    g.position.y = lerp(g.position.y, -p * 1.6, 0.08);

    state.camera.position.z = lerp(state.camera.position.z, 7 + p * 2.4, 0.08);
  });

  return (
    <group ref={group} rotation={[0.32, 0, 0]}>
      <Points positions={main} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={foreground}
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points positions={sparks} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={accent}
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
