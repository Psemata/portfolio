import React from "react";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

import { CardProp } from "@/types/hand";

// A card to be used in the game
const Card = React.forwardRef<Mesh, CardProp>((props, ref) => (
  <mesh
    ref={ref}
    scale={0.4}
    position={props.position}
    rotation={props.rotation}
    onPointerEnter={(e) => props.hoverIn(props.index)}
    onPointerLeave={(e) => props.hoverOut(props.index)}
    onClick={(e) => props.clickOn(props.index)}
  >
    <boxGeometry args={[0.4, 0.6, 0.001]} />
    <meshStandardMaterial color={props.cardConfig.frontTexture} />
    <Text position={[0, 0, 0.001]} scale={0.02} anchorX="center">
      {props.cardConfig.text}
    </Text>
  </mesh>
));

export default Card;
