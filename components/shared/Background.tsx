"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.x = position[0] + Math.sin(t * 0.5 + position[0]) * 0.2;
      ref.current.position.y = position[1] + Math.cos(t * 0.4 + position[1]) * 0.2;
      ref.current.position.z = position[2] + Math.sin(t * 0.3 + position[2]) * 0.2;

      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={1.2} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#0d2f2f"
        emissive="#0f3d3d"
        emissiveIntensity={0.9}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

function FloatingShapes() {
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 25;
        const z = (Math.random() - 0.5) * 35;
        return <FloatingShape key={i} position={[x, y, z]} />;
      })}
    </>
  );
}

function RotatingStars() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

export default function Background() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 20], fov: 75 }} style={{ pointerEvents: "none" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />

      <RotatingStars />

      <OrbitControls
        enableZoom
        enableRotate
        enablePan
        minDistance={10}
        maxDistance={40}
      />
    </Canvas>
  );
}
