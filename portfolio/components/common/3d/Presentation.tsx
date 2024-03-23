import { useRef } from "react";

import * as THREE from "three";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";
import Player from "@/components/game/3d/Player";
import Torch from "@/components/game/3d/Torch";
import Chest from "@/components/game/3d/Chest";
import Enemy from "@/components/game/3d/Enemy";
import Portrait from "./Portrait";

const PresentationText = () => {
  const { viewport } = useThree();

  // Function calculated to put to 0.2 at 1920, and at 0.1 with an iphone pro max
  const scale = viewport.width * 0.012 + 0.07;
  // Font of the text
  let font = "/fonts/Kanit/Kanit-Medium.ttf";
  // Positions of the text
  let positionFirst: THREE.Vector3 = new THREE.Vector3(-1.3, 1, 1);
  // Change the font of the text to make it more visible
  if (viewport.width < 8) {
    font = "/fonts/Kanit/Kanit-Bold.ttf";
    if (viewport.width < 3) {
      positionFirst = new THREE.Vector3(-1.1, 1, 1);
    }
  }

  return (
    <>
      {/* Content of the scene */}
      <Text
        position={positionFirst}
        scale={scale}
        anchorX="left"
        color="#CB8025"
        font={font}
      >
        Hi ! My name is {viewport.width < 3 ? "\n" : ""}Bruno Alexandre Da Cruz
        Costa.{"\n"}I&apos;m a game, fullstack & desktop developer{" "}
        {viewport.width < 3 ? "\n" : ""}based{" "}
        {viewport.width < 9 && viewport.width > 3 ? "\n" : ""}in Switzerland.
      </Text>
    </>
  );
};

const CardPhoto = () => {
  const { viewport } = useThree();

  // X coordinates function for the Card and the decorations
  const cardPositioningX = viewport.width * -0.2535 - 0.2545;
  const playerPositioningX = viewport.width * -0.3347 - 0.216;
  const treasurePositioningX = viewport.width * -0.2231 + 0.856;
  const ennemyPositioningX = viewport.width * -0.2231 + 1.156;

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
      <mesh ref={photoCard} position={[cardPositioningX, 1.3, 0]}>
        <Torch
          position={[-1.9, 0, -0.1]}
          rotation={[0, -1.6, 0]}
          scale={0.045}
        />
        <pointLight
          position={[-1.9, 1.3, -0.1]}
          intensity={1}
          color={"#c56f28"}
        ></pointLight>
        <Portrait position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.65}></Portrait>
      </mesh>

      {/* All the elements from the board game, decorating the exterior of the card */}
      {/* Player */}
      <Player
        position={[playerPositioningX, -0.6, 0.5]}
        rotation={[0, 0.5, 0]}
        scale={0.2}
      />

      {/* Treasure */}
      <Chest
        position={[treasurePositioningX, -0.6, 1]}
        rotation={[0, -0.3, 0]}
        scale={0.4}
      />

      {/* Ennemy */}
      <Enemy
        position={[ennemyPositioningX, -0.93, 0.1]}
        rotation={[0, 0, 0]}
        scale={15}
      />
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
        intensity={2}
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
