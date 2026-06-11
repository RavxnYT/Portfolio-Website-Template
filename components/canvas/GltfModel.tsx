"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Center,
  useGLTF,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useMouseRef, lerp, type SceneProps } from "./shared";

/**
 * "model" hero — renders the customer's own .glb/.gltf file.
 * Put the file in /public/models and set hero.modelPath in the config,
 * e.g. "/models/product.glb"
 */
export function GltfModel({
  progress,
  inView,
  accent,
  path,
  scale = 1,
}: SceneProps & { path: string; scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseRef();
  const { scene } = useGLTF(path);

  useFrame((state, delta) => {
    if (!inView.current || !group.current) return;
    const p = progress.current;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      -mouse.current.y * 0.2 + p * 0.5,
      0.05
    );
    group.current.position.y = lerp(group.current.position.y, p * 1.4, 0.08);
    state.camera.position.z = lerp(state.camera.position.z, 7 + p * 2, 0.08);
  });

  return (
    <>
      <group ref={group} scale={scale}>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
          <Center>
            <primitive object={scene} />
          </Center>
        </Float>
      </group>

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            form="rect"
            intensity={8}
            position={[3, 2, 4]}
            scale={[4, 2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[-4, 1, -2]}
            scale={[2, 4, 1]}
            color={accent}
          />
        </group>
      </Environment>
    </>
  );
}
