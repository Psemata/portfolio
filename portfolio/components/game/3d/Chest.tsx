import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const Chest = ({ position, rotation, scale }: MeshProp) => {
  const gltf = useLoader(GLTFLoader, "/meshes/chest/chest.glb");

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

export default Chest;
