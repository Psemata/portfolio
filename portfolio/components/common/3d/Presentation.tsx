import { useRef } from "react";

import * as THREE from "three";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

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
        color="#113946"
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
      <mesh ref={photoCard} position={[cardPositioningX, 1.2, 0]}>
        <boxGeometry args={[2.4, 4, 0.001]} />
        <meshStandardMaterial color={"tan"} />
      </mesh>

      {/* All the elements from the board game, decorating the exterior of the card */}
      {/* Player */}
      <mesh position={[playerPositioningX, -0.6, 0.5]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={"white"} />
      </mesh>

      {/* Treasure */}
      <mesh position={[treasurePositioningX, -0.6, 0.5]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={"white"} />
      </mesh>

      {/* Ennemy */}
      <mesh position={[ennemyPositioningX, -0.5, 0.3]}>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshStandardMaterial color={"white"} />
      </mesh>

      {/* Ground for shadows and into a shading */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[70, 0.0001, 70]} />
        <meshStandardMaterial color={0xbca380} />
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
