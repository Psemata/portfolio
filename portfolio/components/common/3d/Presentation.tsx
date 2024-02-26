import { useRef } from "react";

import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

const PresentationText = () => {
  return (
    <>
      {/* Content of the scene */}
      <Text position={[-1.8, 1.4, 1]} scale={0.2} anchorX="left" color="white">
        Hi ! My name is Bruno Alexandre Da Cruz Costa.
      </Text>
      <Text position={[-1.8, 1, 1]} scale={0.2} anchorX="left" color="white">
        I&apos;m a game/web fullstack/desktop developer based in Switzerland.
      </Text>
    </>
  );
};

const CardPhoto = () => {
  // Photo card animation
  const photoCard = useRef<Mesh>(null);

  // Rotation of the card depending on the mouse
  useFrame((state, delta) => {
    photoCard.current!.rotation.x = THREE.MathUtils.lerp(
      photoCard.current!.rotation.x,
      (state.pointer.y * Math.PI) / 50,
      0.05
    );
    photoCard.current!.rotation.y = THREE.MathUtils.lerp(
      photoCard.current!.rotation.y,
      (state.pointer.x * Math.PI) / 50,
      0.05
    );
  });

  return (
    <>
      {/* Myself in a card */}
      <mesh ref={photoCard} position={[-3.5, 1.2, 0]}>
        <boxGeometry args={[2.4, 4, 0.001]} />
        <meshStandardMaterial color={"tan"} />
      </mesh>
      {/* All the elements from the board game, decorating the exterior of the card */}
      <mesh position={[-4.5, -0.6, 0.5]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      <mesh position={[-2, -0.6, 0.5]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      <mesh position={[-1.7, -0.5, 0.3]}>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      {/* Ground for shadows and into a shading */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[50, 0.0001, 50]} />
        <meshStandardMaterial color={0xBCA380} />
      </mesh>
    </>
  );
};

const Presentation = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0.5, 10],
      }}
      shadows={true}
    >
      {/* Lights */}
      <ambientLight intensity={0.8} color={0xffffff} />
      <directionalLight
        intensity={0.5}
        color={0xffffff}
        position={[0, 5, 10]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        intensity={1.8}
        color={0xffffff}
        position={[0, 1, 0]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <PresentationText />
      <CardPhoto />
    </Canvas>
  );
};

export default Presentation;
