import React, { memo } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const Enemy = ({ position, rotation, scale }: MeshProp) => {
  const gltf = useLoader(GLTFLoader, "/meshes/pawn/pawn_chess_piece.glb");

  return (
    <group>
      <primitive
        object={gltf.scene.clone()}
        position={position}
        rotation={rotation}
        scale={scale}
      ></primitive>
    </group>
  );
};

export default memo(Enemy);