import React from "react";
import { Mesh } from "three";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CardProp } from "@/types/hand";

// A card to be used in the game
const Card = React.forwardRef<Mesh, CardProp>((props, ref) => {
  const gltf = useLoader(GLTFLoader, props.cardConfig.frontTexture);

  return (
    <group dispose={null}>
      <primitive
        ref={ref}
        object={gltf.scene.clone()}
        position={props.position}
        rotation={props.rotation}
        scale={0.0315}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) =>
          props.hoverIn(props.index, e)
        }
        onPointerLeave={(e: ThreeEvent<PointerEvent>) =>
          props.hoverOut(props.index, e)
        }
        onClick={(e: ThreeEvent<MouseEvent>) => props.clickOn(props.index, e)}
      ></primitive>
    </group>
  );
});

Card.displayName = "Card";

export default Card;
