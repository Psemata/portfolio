import React, { useEffect, useRef } from "react";

import { ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Mesh } from "three";

import { InformationTextProp } from "@/types/informationText";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);

const InformationScreen = ({ text, closeText }: InformationTextProp) => {
  // Animations ref
  const arrowRef = useRef<Mesh>(null);
  const informationRef = useRef<Mesh>(null);

  // GSAP
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    // Fade in animation
    if (text != "") {
      gsap.to(informationRef.current?.material!, {
        duration: 2,
        opacity: 0.4,
      });
    }

    if (isNaN(+text)) {
      // Down arrow ping animation
      gsap.to(arrowRef.current!.position, {
        y: 0.01,
        yoyo: true,
        duration: 1,
        repeat: -1,
      });
    }
  });

  // Fade out animation
  const fadeOut = contextSafe(() => {
    gsap.to(informationRef.current?.material!, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        closeText();
      },
    });
  });

  // Function used to trigger hover, but used only to stop the propagation on the card below
  const hoverInformation = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
  };

  // Click on the informations will close the information
  const clickInformation = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isNaN(+text)) {
      fadeOut();
    }
  };

  return (
    <mesh
      ref={informationRef}
      scale={1}
      position={[0, 4.2, 2.8]}
      rotation={[-1, 0, 0]}
      onPointerOver={(e) => hoverInformation(e)}
      onClick={(e) => clickInformation(e)}
    >
      <boxGeometry args={[10, 10, 0.001]} />
      <meshStandardMaterial color={0x000000} transparent={true} opacity={0} />
      <Text scale={0.018} position={[0, 0, 0.005]} anchorX="center">
        {text}
      </Text>
      {isNaN(+text) && (
        <mesh ref={arrowRef}>
          <Text
            scale={0.03}
            position={[0, -0.1, 0.001]}
            rotation={[0, 0, -1.58]}
          >
            {">"}
          </Text>
        </mesh>
      )}
    </mesh>
  );
};

export default InformationScreen;
