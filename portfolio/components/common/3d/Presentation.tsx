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

  // Font of the text
  let font = "/fonts/Kanit/Kanit-Medium.ttf";

  // Function calculated to put to 0.2 at 1920, and at 0.1 with an iphone pro max
  const scale = viewport.width * 0.012 + 0.07;
  // Function calculated to move the text along specific places
  const textPositioningX = viewport.width * -0.0869 + 0.1388;

  // Positions of the text
  let position: THREE.Vector3 = new THREE.Vector3(textPositioningX, 1, 1);
  // Max width of the text
  let width = viewport.width * 1.9;

  // Change the font of the text to make it more visible
  if (viewport.width < 8) {
    width = viewport.width * 3;
    font = "/fonts/Kanit/Kanit-Bold.ttf";
    if (viewport.width < 5) {
      width = viewport.width * 4;
    }
  }

  return (
    <>
      {/* Content of the scene */}
      <Text
        position={position}
        scale={scale}
        anchorX={"left"}
        color={"#CB8025"}
        font={font}
        fontSize={viewport.height / 7}
        maxWidth={width}
      >
        Hi ! My name is Bruno Alexandre Da Cruz Costa. I&apos;m a game,
        fullstack & desktop developer based in Switzerland.
      </Text>
    </>
  );
};

const CardPhoto = () => {
  const { viewport } = useThree();

  // X coordinates function for the Card and the decorations
  const cardPositioningX = viewport.width * -0.2535 - 0.2545;

  const playerPositioningX = viewport.width * -0.21722265321855 - 2.202792862684;
  const playerPositioningY = viewport.width * -0.077579519 + 0.68471683;

  const treasurePositioningX = viewport.width * -0.1784328937 + 0.1548487197;
  const treasurePositioningY = viewport.width * -0.0698967434 + 0.5574900707;
  
  const ennemyPositioningX = viewport.width * -0.1939487975 + 0.7117920866;
  const ennemyPositioningY = viewport.width * -0.0744763382 + 0.3033281606;

  const portraitScale = viewport.width * 0.03491 + 0.4219;

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
      <mesh
        ref={photoCard}
        position={[cardPositioningX, 1.3, 0]}
        scale={portraitScale}
      >
        <Torch
          position={[1.85, 0, -0.1]}
          rotation={[0, 1.6, 0]}
          scale={0.045}
        />
        <pointLight
          position={[1.85, 1.3, -0.1]}
          intensity={1}
          color={"#c56f28"}
        ></pointLight>
        <Portrait
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.65}
        ></Portrait>
      </mesh>

      <mesh scale={portraitScale}>
        {/* All the elements from the board game, decorating the exterior of the card */}
        {/* Player */}
        <Player
          position={[playerPositioningX, playerPositioningY, 0.5]}
          rotation={[0, 0.5, 0]}
          scale={0.2}
        />

        {/* Treasure */}
        <Chest
          position={[treasurePositioningX, treasurePositioningY, 1]}
          rotation={[0, -0.3, 0]}
          scale={0.4}
        />

        {/* Ennemy */}
        <Enemy
          position={[ennemyPositioningX, ennemyPositioningY, 0.1]}
          rotation={[0, 0, 0]}
          scale={15}
        />
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
