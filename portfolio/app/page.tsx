"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh } from "three";

{
  /* Used to check if the element are placed correctly */
}
import { OrbitControls } from "@react-three/drei";

// Custom mesh
import Board from "@/components/3d/Board";
import Hand from "@/components/3d/Hand";

const Scene = () => {
  // Board animation
  // Rotation
  const boardRef = useRef<Mesh>(null);

  // useFrame((state, delta) => {
  //   boardRef.current!.rotation.y = THREE.MathUtils.lerp(
  //     boardRef.current!.rotation.y,
  //     (state.pointer.x * Math.PI) / 200,
  //     0.05
  //   );
  //   boardRef.current!.rotation.x = THREE.MathUtils.lerp(
  //     boardRef.current!.rotation.x,
  //     (state.pointer.y * Math.PI) / 200,
  //     0.05
  //   );
  // });

  // Movement
  useFrame((state, delta) => {
    boardRef.current!.position.z = THREE.MathUtils.lerp(
      boardRef.current!.position.z,
      (state.pointer.y * Math.PI) / 50,
      0.05
    );
    boardRef.current!.position.x = THREE.MathUtils.lerp(
      boardRef.current!.position.x,
      (state.pointer.x * Math.PI) / 50,
      0.05
    );
  });

  return (
    <>
      <Board ref={boardRef} />
      <Hand />
    </>
  );
};

const Page = () => {
  return (
    <div className="h-screen">
      {/* Camera options */}
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 4.8, 3.3] }}
        shadows={true}
      >
        {/* Used to check if the element are placed correctly */}
        {/* <OrbitControls /> */}

        <ambientLight intensity={0.3} color={0xa3a3a3}></ambientLight>
        <directionalLight
          intensity={0.8}
          color={0xffffff}
          position={[0, 10, 0]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Page;
