import React, { ReactElement, RefObject, useRef } from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes } from "three";
import Card from "./Card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";

// All the cards positions
const CardsPositions = [
  {
    Base4Pos: [
      [-0.24, 3.95, 3.06], // Left
      [-0.081, 3.95, 3.056], // Left middle
      [0.081, 3.95, 3.056], // Right middle
      [0.24, 3.95, 3.06], // Right
    ]
  },
  {},
  {},
  {}
];

// 4 Cards
const Base4Pos: [number, number, number][] = [
  [-0.24, 3.95, 3.06], // Left
  [-0.081, 3.95, 3.056], // Left middle
  [0.081, 3.95, 3.056], // Right middle
  [0.24, 3.95, 3.06], // Right
];

const Base4Rot: [number, number, number][] = [
  [-1, 0, 0.05], // Left
  [-1, 0, 0], // Left middle
  [-1, 0, 0], // Right middle
  [-1, 0, -0.05], // Right
];

const Hover4Pos: [number, number, number][] = [
  [-0.25, 4, 3], // Left
  [-0.085, 4, 3], // Left middle
  [0.085, 4, 3], // Right middle
  [0.25, 4, 3], // Right
];

const Hover4Rot: [number, number, number][] = [
  [-1, 0, 0], // Left
  [-1, 0, 0], // Left middle
  [-1, 0, 0], // Right middle
  [-1, 0, 0], // Right
];

const MoveHover4Pos: [number, number, number][] = [
  [-0.25, 3.95, 3.06], // Left
  [-0.083, 3.95, 3.056], // Left middle
  [0.083, 3.95, 3.056], // Right middle
  [0.25, 3.95, 3.06], // Right
];

// 3 Cards

// 2 Cards

// 1 Card

// Base position of the cards
const BasePos: [number, number, number][] = Base4Pos;

// Base rotation of the cards
const BaseRot: [number, number, number][] = Base4Rot;

// Hover position of the cards
const HoverPos: [number, number, number][] = Hover4Pos;

// Hover rotation of the cards
const HoverRot: [number, number, number][] = Hover4Rot;

// Position of the other cards when one card is hovered
const MoveHoverPos: [number, number, number][] = MoveHover4Pos;

const UsePos: [number, number, number] = [0, 4.2, 2.8];
const UseRot: [number, number, number] = [-1, 0, 0];

const Hand = React.forwardRef<Mesh>((props, ref) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number) => {
    // Move the hovered card
    gsap.to(refs[index].current?.position!, {
      x: HoverPos[index][0],
      y: HoverPos[index][1],
      z: HoverPos[index][2],
    });
    // Rotate the hovered card
    gsap.to(refs[index].current?.rotation!, {
      x: HoverRot[index][0],
      y: HoverRot[index][1],
      z: HoverRot[index][2],
    });

    // Move the other cards to move them apart from the hovered one
    for (let i = 0; i < 4; i++) {
      // If the card exist and is not the hovered one, move it to the correct position
      if (refs[i] != null && i != index) {
        gsap.to(refs[i].current?.position!, {
          x: MoveHoverPos[i][0],
          y: MoveHoverPos[i][1],
          z: MoveHoverPos[i][2],
        });
      }
    }
  });

  // Animation when the card is hovered out by the mouse
  const HoverOut = contextSafe((index: number) => {
    // Move the hovered card to its base position
    gsap.to(refs[index].current?.position!, {
      x: BasePos[index][0],
      y: BasePos[index][1],
      z: BasePos[index][2],
    });
    // Rotate the hovered card to it base rotation
    gsap.to(refs[index].current?.rotation!, {
      x: BaseRot[index][0],
      y: BaseRot[index][1],
      z: BaseRot[index][2],
    });

    // Move the other cards to move them apart from the hovered one
    for (let i = 0; i < 4; i++) {
      // If the card exist and is not the hovered one, move it to the correct position
      if (refs[i] != null && i != index) {
        gsap.to(refs[i].current?.position!, {
          x: BasePos[i][0],
          y: BasePos[i][1],
          z: BasePos[i][2],
        });
      }
    }
  });

  // Animation and use of the card when the card is clicked
  const ClickOn = contextSafe((index: number) => {
    gsap.to(refs[index].current?.position!, {
      x: UsePos[0],
      y: UsePos[1],
      z: UsePos[2],
    });
    gsap.to(refs[index].current?.rotation!, {
      x: UseRot[0],
      y: UseRot[1],
      z: UseRot[2],
    });

    // TODO : Delete the card and its ref, shader animation, wait on animation before deleting component, finally do card action, reorganize hand
  });

  // Generating a number between 1 and 5 (for the card configuration)
  const generateRandomCardConfig = () => {
    return Math.floor(Math.random() * 6);
  };

  // Generate a hand and their refs
  const generateRandomHand = (): [RefObject<Mesh>[], ReactElement[]] => {
    const refs = [
      useRef<Mesh>(null),
      useRef<Mesh>(null),
      useRef<Mesh>(null),
      useRef<Mesh>(null),
    ];

    const cards = [
      // Left
      <Card
        ref={refs[0]}
        key={0}
        index={0}
        cardBase={CARD_BASE}
        cardConfig={CARD_CONFIG[generateRandomCardConfig()]}
        position={BasePos[0]}
        rotation={BaseRot[0]}
        hoverIn={HoverIn}
        hoverOut={HoverOut}
        clickOn={ClickOn}
      />,
      // Left Middle
      <Card
        ref={refs[1]}
        key={1}
        index={1}
        cardBase={CARD_BASE}
        cardConfig={CARD_CONFIG[generateRandomCardConfig()]}
        position={BasePos[1]}
        rotation={BaseRot[1]}
        hoverIn={HoverIn}
        hoverOut={HoverOut}
        clickOn={ClickOn}
      />,
      // Right Middle
      <Card
        ref={refs[2]}
        key={2}
        index={2}
        cardBase={CARD_BASE}
        cardConfig={CARD_CONFIG[generateRandomCardConfig()]}
        position={BasePos[2]}
        rotation={BaseRot[2]}
        hoverIn={HoverIn}
        hoverOut={HoverOut}
        clickOn={ClickOn}
      />,
      // Left Middle
      <Card
        ref={refs[3]}
        key={3}
        index={3}
        cardBase={CARD_BASE}
        cardConfig={CARD_CONFIG[generateRandomCardConfig()]}
        position={BasePos[3]}
        rotation={BaseRot[3]}
        hoverIn={HoverIn}
        hoverOut={HoverOut}
        clickOn={ClickOn}
      />,
    ];

    return [refs, cards];
  };

  let [refs, hand] = generateRandomHand();

  return <>{hand.map((card) => card)}</>;
});

export default Hand;
