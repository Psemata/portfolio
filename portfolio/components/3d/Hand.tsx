import React, { useRef, useState } from "react";
import { Mesh } from "three";
import Card from "./Card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Custom elements
import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";
type CardBase = typeof CARD_BASE;
type CardConfig = (typeof CARD_CONFIG)[number];

export interface CardInfo {
  cardBase: CardBase;
  cardConfig: CardConfig;
}

export interface HandProp {
  handInfos: CardInfo[];
}

// Interface for the positions of the cards depending of their numbers
interface CardsPosition {
  // Base position of the cards
  BasePos: [number, number, number][];
  // Base rotation of the cards
  BaseRot: [number, number, number][];
  // Hover position of the cards
  HoverPos: [number, number, number][];
  // Hover rotation of the cards
  HoverRot: [number, number, number][];
  // Position of the other cards when one card is hovered
  MoveHoverPos: [number, number, number][];
}

// All the cards positions
const CardsPositions: CardsPosition[] = [
  // 1 Card
  {
    BasePos: [
      [-0.24, 3.95, 3.06], // Only card
    ],
    BaseRot: [
      [-1, 0, 0.05], // Only card
    ],
    HoverPos: [
      [-0.25, 4, 3], // Only card
    ],
    HoverRot: [
      [-1, 0, 0], // Only card
    ],
    MoveHoverPos: [
      [-0.25, 3.95, 3.06], // Only card
    ],
  },
  // 2 Cards
  {
    BasePos: [
      [-0.24, 3.95, 3.06], // Left
      [0.24, 3.95, 3.06], // Right
    ],
    BaseRot: [
      [-1, 0, 0.05], // Left
      [-1, 0, 0], // Right
    ],
    HoverPos: [
      [-0.25, 4, 3], // Left
      [0.085, 4, 3], // Right
    ],
    HoverRot: [
      [-1, 0, 0], // Left
      [-1, 0, 0], // Right
    ],
    MoveHoverPos: [
      [-0.25, 3.95, 3.06], // Left
      [0.083, 3.95, 3.056], // Right
    ],
  },
  // 3 Cards
  {
    BasePos: [
      [-0.1, 3.95, 3.06], // Left
      [0, 3.95, 3.056], // Middle
      [0.1, 3.95, 3.06], // Right
    ],
    BaseRot: [
      [-1, 0, 0.05], // Left
      [-1, 0, 0], // Middle
      [-1, 0, 0.05], // Right
    ],
    HoverPos: [
      [-0.25, 4, 3], // Left
      [-0.085, 4, 3], // Middle
      [0.085, 4, 3], // Right
    ],
    HoverRot: [
      [-1, 0, 0], // Left
      [-1, 0, 0], // Middle
      [-1, 0, 0], // Right
    ],
    MoveHoverPos: [
      [-0.25, 3.95, 3.06], // Left
      [-0.083, 3.95, 3.056], // Middle
      [0.083, 3.95, 3.056], // Right
    ],
  },
  // 4 Cards
  {
    BasePos: [
      [-0.24, 3.95, 3.06], // Left
      [-0.081, 3.95, 3.056], // Left middle
      [0.081, 3.95, 3.056], // Right middle
      [0.24, 3.95, 3.06], // Right
    ],
    BaseRot: [
      [-1, 0, 0.05], // Left
      [-1, 0, 0], // Left middle
      [-1, 0, 0], // Right middle
      [-1, 0, -0.05], // Right
    ],
    HoverPos: [
      [-0.25, 4, 3], // Left
      [-0.085, 4, 3], // Left middle
      [0.085, 4, 3], // Right middle
      [0.25, 4, 3], // Right
    ],
    HoverRot: [
      [-1, 0, 0], // Left
      [-1, 0, 0], // Left middle
      [-1, 0, 0], // Right middle
      [-1, 0, 0], // Right
    ],
    MoveHoverPos: [
      [-0.25, 3.95, 3.06], // Left
      [-0.083, 3.95, 3.056], // Left middle
      [0.083, 3.95, 3.056], // Right middle
      [0.25, 3.95, 3.06], // Right
    ],
  },
];

const UsePos: [number, number, number] = [0, 4.2, 2.8];
const UseRot: [number, number, number] = [-1, 0, 0];

const Hand = ({ handInfos }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Refs of the cards
  const refs = [
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
  ];

  // State of the cards, if they were used or not
  const lives = [
    useState<boolean>(true),
    useState<boolean>(true),
    useState<boolean>(true),
    useState<boolean>(true),
  ];

  // Return the number of usable cards
  const checkCards = (): number => {
    let quantityAlive = 0;
    lives.forEach((life) => {
      if (life[0]) quantityAlive++;
    });
    return quantityAlive - 1;
  };

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number) => {
    const quantityAlive = checkCards();

    // Move the hovered card
    gsap.to(refs[index].current?.position!, {
      x: CardsPositions[quantityAlive].HoverPos[index][0],
      y: CardsPositions[quantityAlive].HoverPos[index][1],
      z: CardsPositions[quantityAlive].HoverPos[index][2],
    });
    // Rotate the hovered card
    gsap.to(refs[index].current?.rotation!, {
      x: CardsPositions[quantityAlive].HoverRot[index][0],
      y: CardsPositions[quantityAlive].HoverRot[index][1],
      z: CardsPositions[quantityAlive].HoverRot[index][2],
    });

    // Move the other cards to move them apart from the hovered one
    for (let i = 0; i < 4; i++) {
      // If the card exist and is not the hovered one, move it to the correct position
      if (lives[i][0] && i != index) {
        gsap.to(refs[i].current?.position!, {
          x: CardsPositions[quantityAlive].MoveHoverPos[i][0],
          y: CardsPositions[quantityAlive].MoveHoverPos[i][1],
          z: CardsPositions[quantityAlive].MoveHoverPos[i][2],
        });
      }
    }
  });

  // Animation when the card is hovered out by the mouse
  const HoverOut = contextSafe((index: number) => {
    const quantityAlive = checkCards();

    // Move the hovered card to its base position
    gsap.to(refs[index].current?.position!, {
      x: CardsPositions[quantityAlive].BasePos[index][0],
      y: CardsPositions[quantityAlive].BasePos[index][1],
      z: CardsPositions[quantityAlive].BasePos[index][2],
    });
    // Rotate the hovered card to it base rotation
    gsap.to(refs[index].current?.rotation!, {
      x: CardsPositions[quantityAlive].BaseRot[index][0],
      y: CardsPositions[quantityAlive].BaseRot[index][1],
      z: CardsPositions[quantityAlive].BaseRot[index][2],
    });

    // Move the other cards to move them apart from the hovered one
    for (let i = 0; i < 4; i++) {
      // If the card exist and is not the hovered one, move it to the correct position
      if (lives[i][0] && i != index) {
        gsap.to(refs[i].current?.position!, {
          x: CardsPositions[quantityAlive].BasePos[i][0],
          y: CardsPositions[quantityAlive].BasePos[i][1],
          z: CardsPositions[quantityAlive].BasePos[i][2],
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
      onComplete: () => {
        // Destroy the card
        lives[index][1](false);

        // REMOVE CARD FROM PARENT, THIS WILL ALLOW THE DIFFERENT ARRAYS TO WORK AND THE LIVES ARRAY WILL BE DISCARDED
      },
    });

    // TODO : Delete the card and its ref, shader animation, wait on animation before deleting component, finally do card action, reorganize hand
  });

  return (
    <>
      {handInfos.map(
        (ci, index) =>
          lives[index][0] && (
            <Card
              ref={refs[index]}
              key={index}
              index={index}
              cardBase={ci.cardBase}
              cardConfig={ci.cardConfig}
              position={CardsPositions[checkCards()].BasePos[index]}
              rotation={CardsPositions[checkCards()].BaseRot[index]}
              hoverIn={HoverIn}
              hoverOut={HoverOut}
              clickOn={ClickOn}
            />
          )
      )}
    </>
  );
};

export default Hand;
