import React, { memo } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshProp } from "@/types/mesh";

const Player = React.forwardRef<Mesh, MeshProp>((props, ref) => {
  const gltf = useLoader(GLTFLoader, "/meshes/pawn/chess_pawn.glb");

  return (
    <group dispose={null}>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={props.position}
        rotation={props.rotation}
        scale={props.scale}
      ></primitive>
    </group>
  );
});

Player.displayName = "Player";

export default memo(Player);
