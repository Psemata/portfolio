import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const Parchment = ({ position, rotation, scale }: MeshProp) => {
  const { scene } = useLoader(GLTFLoader, "/meshes/parchment/parchment.glb");
  const clone = useMemo(() => scene.clone(), [scene]);

  return (
    <group>
      <primitive
        object={clone}
        position={position}
        rotation={rotation}
        scale={scale}
      ></primitive>
    </group>
  );
};

export default Parchment;
