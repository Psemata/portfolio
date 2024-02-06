import React from "react";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";

type CardBase = typeof CARD_BASE;
type CardConfig = (typeof CARD_CONFIG)[number];

interface CardProp {
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cardBase: CardBase;
  cardConfig: CardConfig;
  hoverIn: (index: number) => void;
  hoverOut: (index: number) => void;
  clickOn: (index: number) => void;
}

const Card = React.forwardRef<Mesh, CardProp>((props, ref) => {
  const cardAction = () => {
    // TODO : Faire fonctionner la carte pour le jeu
    console.log("Ceci est une action");
    props.clickOn(props.index);
  };

  return (
    <mesh
      position={props.position}
      rotation={props.rotation}
      scale={0.4}
      ref={ref}
      onPointerEnter={(e) => props.hoverIn(props.index)}
      onPointerLeave={(e) => props.hoverOut(props.index)}
      onClick={(e) => cardAction()}
    >
      <boxGeometry args={[0.4, 0.6, 0.001]} />
      <meshStandardMaterial color={props.cardConfig.frontTexture} />
      <Text position={[0, 0, 0.001]} scale={0.02} anchorX="center">
        {props.cardConfig.text}
      </Text>
    </mesh>
  );
});

export default Card;
