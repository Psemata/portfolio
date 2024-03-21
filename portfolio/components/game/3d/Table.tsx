import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF } from "@react-three/drei";

export default function Table() {
  const gltf = useLoader(GLTFLoader, "/meshes/wooden_table.glb");

  return <primitive object={gltf.scene}></primitive>;
}
