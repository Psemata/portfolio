import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const GameBoard = ({ position, rotation, scale }: MeshProp) => {
  const gltf = useLoader(GLTFLoader, "/meshes/board/board.glb");

  return (
    <group>
      <primitive
        object={gltf.scene}
        position={position}
        rotation={rotation}
        scale={scale}
      ></primitive>
    </group>
  );
};

export default GameBoard;
