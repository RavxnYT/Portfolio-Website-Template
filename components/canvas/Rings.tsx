"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useMouseRef, lerp, type SceneProps } from "./shared";

/**
 * "rings" hero — a metallic gyroscope of orbital rings, each
 * spinning on its own axis. One ring glows in the accent color.
 */
export function Rings({ progress, inView, accent }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const mouse = useMouseRef();

  const rings = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        radius: 1.15 + i * 0.42,
        tilt: [
          Math.random() * Math.PI * 0.6 - 0.3,
          Math.random() * Math.PI * 0.6 - 0.3,
          0,
        ] as [number, number, number],
        speed: (0.12 + Math.random() * 0.25) * (i % 2 === 0 ? 1 : -1),
        accent: i === 2,
      })),
    []
  );

  useFrame((state, delta) => {
    if (!inView.current) return;
    const p = progress.current;

    rings.forEach((r, i) => {
      const mesh = ringRefs.current[i];
      if (!mesh) return;
      mesh.rotation.x += delta * r.speed;
      mesh.rotation.y += delta * r.speed * 0.7;
    });

    if (group.current) {
      group.current.rotation.y = lerp(
        group.current.rotation.y,
        mouse.current.x * 0.4,
        0.04
      );
      group.current.rotation.x = lerp(
        group.current.rotation.x,
        -mouse.current.y * 0.3 + p * 0.8,
        0.04
      );
      group.current.position.y = lerp(group.current.position.y, p * 1.2, 0.08);
    }
    state.camera.position.z = lerp(state.camera.position.z, 7 + p * 2.8, 0.08);
  });

  return (
    <>
      <group ref={group}>
        {rings.map((r, i) => (
          <mesh
            key={i}
            rotation={r.tilt}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
          >
            <torusGeometry args={[r.radius, 0.016, 16, 200]} />
            <meshStandardMaterial
              color={r.accent ? accent : "#d6d6dd"}
              metalness={0.88}
              roughness={0.22}
              emissive={r.accent ? accent : "#000000"}
              emissiveIntensity={r.accent ? 0.5 : 0}
            />
          </mesh>
        ))}
      </group>

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0.2, 0]}>
          <Lightformer
            form="rect"
            intensity={8}
            position={[4, 3, 4]}
            scale={[4, 2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[-4, -1, -3]}
            scale={[3, 4, 1]}
            color={accent}
          />
        </group>
      </Environment>
    </>
  );
}
