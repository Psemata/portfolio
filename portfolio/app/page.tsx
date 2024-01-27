"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const Cube = () => {
  // Temp, faut trouver le bon type
  const mesh = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color={"brown"} />
    </mesh>
  );
};

const Page = () => {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={2}></ambientLight>
        <directionalLight position={[2, 1, 1]} />
        <Cube />
      </Canvas>
    </div>
  );
};

export default Page;
