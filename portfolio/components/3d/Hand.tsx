import React, { useRef } from "react";
import { Mesh } from "three";
import Card from "./Card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";

const generateRandomCard = () => {
  return Math.floor(Math.random() * 6);
};

const BasePos: [number, number, number][] = [
  [-0.24, 3.95, 3.06], // Left
  [-0.081, 3.95, 3.056], // Left middle
  [0.081, 3.95, 3.056], // Right middle
  [0.24, 3.95, 3.06], // Right
];

const BaseRot: [number, number, number][] = [
  [-1, 0, 0.05], // Left
  [-1, 0, 0], // Left middle
  [-1, 0, 0], // Right middle
  [-1, 0, -0.05], // Right
];

const HoverPos: [number, number, number][] = [
  [0, 0, 0], // Left
  [0, 0, 0], // Left middle
  [0, 0, 0], // Right middle
  [0, 0, 0], // Right
];

const HoverRot: [number, number, number][] = [
  [-1, 0, 0], // Left
  [-1, 0, 0], // Left middle
  [-1, 0, 0], // Right middle
  [-1, 0, 0], // Right
];

const Hand = React.forwardRef<Mesh>((props, ref) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Temp, for the animation to work --> Do better once animation work
  const refArray = [
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
  ];

  const HoverIn = contextSafe((index: number) => {
    console.log(refArray[index]);
    gsap.to(refArray[index].current?.position!, {
      x: HoverPos[index][0],
      y: HoverPos[index][1],
      z: HoverPos[index][2],
    });
  });

  const HoverOut = (index: number) => {};

  const Cards = [
    // Left
    <Card
      ref={refArray[0]}
      key={0}
      index={0}
      cardBase={CARD_BASE}
      cardConfig={CARD_CONFIG[generateRandomCard()]}
      position={BasePos[0]}
      rotation={BaseRot[0]}
      hoverIn={HoverIn}
      hoverOut={HoverOut}
    />,
    // Left Middle
    <Card
      ref={refArray[1]}
      key={1}
      index={1}
      cardBase={CARD_BASE}
      cardConfig={CARD_CONFIG[generateRandomCard()]}
      position={BasePos[1]}
      rotation={BaseRot[1]}
      hoverIn={HoverIn}
      hoverOut={HoverOut}
    />,
    // Right Middle
    <Card
      ref={refArray[2]}
      key={2}
      index={2}
      cardBase={CARD_BASE}
      cardConfig={CARD_CONFIG[generateRandomCard()]}
      position={BasePos[2]}
      rotation={BaseRot[2]}
      hoverIn={HoverIn}
      hoverOut={HoverOut}
    />,
    // Left Middle
    <Card
      ref={refArray[3]}
      key={3}
      index={3}
      cardBase={CARD_BASE}
      cardConfig={CARD_CONFIG[generateRandomCard()]}
      position={BasePos[3]}
      rotation={BaseRot[3]}
      hoverIn={HoverIn}
      hoverOut={HoverOut}
    />,
  ];

  return <>{Cards.map((card) => card)}</>;
});

export default Hand;
