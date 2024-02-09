"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh } from "three";

// Used to check if the element are placed correctly
import { OrbitControls } from "@react-three/drei";

// Custom mesh
import Board from "@/components/3d/Board";
import Hand, { CardInfo } from "@/components/3d/Hand";
import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";

// This component is used as the Game Controller of the app => all the game logic will depart from here

// Generating a number between 1 and 5 (for the card configuration)
const generateRandomCardConfig = () => {
  return Math.floor(Math.random() * 6);
};

// Generate a hand and their refs
const generateRandomHand = (): CardInfo[] => {
  const handInfos: CardInfo[] = [
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
  ];

  return handInfos;
};

const Scene = () => {
  // Board animation
  const boardRef = useRef<Mesh>(null);

  // Hand of cards and their refs
  const [hand, setHand] = useState(generateRandomHand());
  const [refs, setRefs] = useState([
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
  ]);

  // When a card is used, remove the card from the hand
  const onHandChange = (index: number) => {
    setHand(hand.filter((_, i) => i != index));
    setRefs(refs.filter((_, i) => _ != null));
  };

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
      <Hand handInfos={hand} handRefs={refs} onHandChange={onHandChange} />
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
