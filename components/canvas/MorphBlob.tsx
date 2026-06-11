"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useMouseRef, lerp, type SceneProps } from "./shared";

/**
 * "blob" hero — a liquid chrome metaball lit by procedural
 * studio lightformers (no external HDR files needed).
 */
export function MorphBlob({ progress, inView, accent }: SceneProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseRef();

  useFrame((state, delta) => {
    if (!inView.current) return;
    const p = progress.current;

    if (group.current) {
      group.current.rotation.y = lerp(
        group.current.rotation.y,
        mouse.current.x * 0.35 + p * 1.2,
        0.04
      );
      group.current.rotation.x = lerp(
        group.current.rotation.x,
        -mouse.current.y * 0.25,
        0.04
      );
      const scale = 1 - p * 0.25;
      group.current.scale.setScalar(lerp(group.current.scale.x, scale, 0.08));
      group.current.position.y = lerp(group.current.position.y, 0.2 + p * 1.4, 0.08);
    }
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.08;
    }
    state.camera.position.z = lerp(state.camera.position.z, 7 + p * 1.6, 0.08);
  });

  return (
    <>
      <group ref={group} position={[0, 0.2, 0]}>
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
          <mesh ref={mesh}>
            <icosahedronGeometry args={[1.7, 48]} />
            <MeshDistortMaterial
              color="#16161b"
              metalness={0.92}
              roughness={0.16}
              distort={0.42}
              speed={1.7}
            />
          </mesh>
        </Float>
      </group>

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            form="rect"
            intensity={9}
            position={[3.5, 2, 4]}
            scale={[4, 2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={5}
            position={[-4.5, 1.5, -2]}
            scale={[2.5, 5, 1]}
            color={accent}
          />
          <Lightformer
            form="ring"
            intensity={3}
            position={[0, -4, 2]}
            scale={[4, 4, 1]}
            color="#9aa0c8"
          />
        </group>
      </Environment>
    </>
  );
}
