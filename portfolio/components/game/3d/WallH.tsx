import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const WallH = ({ position, rotation, scale }: MeshProp) => {
  const gltf = useLoader(GLTFLoader, "/meshes/wall/Wall 1.glb");

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

export default WallH;
