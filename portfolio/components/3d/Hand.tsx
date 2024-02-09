import React, { useEffect, useLayoutEffect } from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes } from "three";
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
  handRefs: React.RefObject<Mesh>[];
  onHandChange: (index: number) => void;
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
      [0, 3.95, 3.06], // Only card
    ],
    BaseRot: [
      [-1, 0, 0], // Only card
    ],
    HoverPos: [
      [0, 4, 3], // Only card
    ],
    HoverRot: [
      [-1, 0, 0], // Only card
    ],
    MoveHoverPos: [
      [0, 3.95, 3.06], // Only card
    ],
  },
  // 2 Cards
  {
    BasePos: [
      [-0.085, 3.95, 3.06], // Left
      [0.085, 3.95, 3.06], // Right
    ],
    BaseRot: [
      [-1, 0, 0.03], // Left
      [-1, 0, -0.03], // Right
    ],
    HoverPos: [
      [-0.085, 4, 3], // Left
      [0.085, 4, 3], // Right
    ],
    HoverRot: [
      [-1, 0, 0], // Left
      [-1, 0, 0], // Right
    ],
    MoveHoverPos: [
      [-0.083, 3.95, 3.06], // Left
      [0.083, 3.95, 3.056], // Right
    ],
  },
  // 3 Cards
  {
    BasePos: [
      [-0.16, 3.95, 3.06], // Left
      [0, 3.95, 3.0565], // Middle
      [0.16, 3.95, 3.06], // Right
    ],
    BaseRot: [
      [-1, 0, 0.05], // Left
      [-1, 0, 0], // Middle
      [-1, 0, -0.05], // Right
    ],
    HoverPos: [
      [-0.18, 4, 3], // Left
      [0, 4, 3], // Middle
      [0.18, 4, 3], // Right
    ],
    HoverRot: [
      [-1, 0, 0], // Left
      [-1, 0, 0], // Middle
      [-1, 0, 0], // Right
    ],
    MoveHoverPos: [
      [-0.19, 3.95, 3.06], // Left
      [0, 3.95, 3.0565], // Middle
      [0.19, 3.95, 3.06], // Right
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

const Hand = ({ handInfos, handRefs, onHandChange }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // How many card left
  const cardQuantityIndex = handInfos.length - 1;

  let isClicked = false;

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number) => {
    if (!isClicked) {
      // Move the hovered card
      gsap.to(handRefs[index].current?.position!, {
        x: CardsPositions[cardQuantityIndex].HoverPos[index][0],
        y: CardsPositions[cardQuantityIndex].HoverPos[index][1],
        z: CardsPositions[cardQuantityIndex].HoverPos[index][2],
      });
      // Rotate the hovered card
      gsap.to(handRefs[index].current?.rotation!, {
        x: CardsPositions[cardQuantityIndex].HoverRot[index][0],
        y: CardsPositions[cardQuantityIndex].HoverRot[index][1],
        z: CardsPositions[cardQuantityIndex].HoverRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (handRefs[i].current && i != index) {
          gsap.to(handRefs[i].current?.position!, {
            x: CardsPositions[cardQuantityIndex].MoveHoverPos[i][0],
            y: CardsPositions[cardQuantityIndex].MoveHoverPos[i][1],
            z: CardsPositions[cardQuantityIndex].MoveHoverPos[i][2],
          });
        }
      }
    }
  });

  // Animation when the card is hovered out by the mouse
  const HoverOut = contextSafe((index: number) => {
    if (!isClicked) {
      // Move the hovered card to its base position
      gsap.to(handRefs[index].current?.position!, {
        x: CardsPositions[cardQuantityIndex].BasePos[index][0],
        y: CardsPositions[cardQuantityIndex].BasePos[index][1],
        z: CardsPositions[cardQuantityIndex].BasePos[index][2],
      });
      // Rotate the hovered card to it base rotation
      gsap.to(handRefs[index].current?.rotation!, {
        x: CardsPositions[cardQuantityIndex].BaseRot[index][0],
        y: CardsPositions[cardQuantityIndex].BaseRot[index][1],
        z: CardsPositions[cardQuantityIndex].BaseRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (handRefs[i].current && i != index) {
          gsap.to(handRefs[i].current?.position!, {
            x: CardsPositions[cardQuantityIndex].BasePos[i][0],
            y: CardsPositions[cardQuantityIndex].BasePos[i][1],
            z: CardsPositions[cardQuantityIndex].BasePos[i][2],
          });
        }
      }
    }
  });

  // Animation and use of the card when the card is clicked
  const ClickOn = contextSafe((index: number) => {
    isClicked = true;
    let nextPos = cardQuantityIndex - 1;
    console.log(nextPos);
    console.log(CardsPositions[nextPos])
    console.log(handRefs)

    gsap.to(handRefs[index].current?.position!, {
      x: UsePos[0],
      y: UsePos[1],
      z: UsePos[2],
    });
    
    /// MAKE THIS WORK

    // Move the other cards to move them apart from the hovered one
    for (let i = 0; i <= cardQuantityIndex; i++) {
      // If the card exist and is not the hovered one, move it to the correct position
      if (handRefs[i].current && i != index) {
        gsap.to(handRefs[i].current?.position!, {
          x: CardsPositions[nextPos].BasePos[i][0],
          y: CardsPositions[nextPos].BasePos[i][1],
          z: CardsPositions[nextPos].BasePos[i][2],
        });
      }
    }
    gsap.to(handRefs[index].current?.rotation!, {
      x: UseRot[0],
      y: UseRot[1],
      z: UseRot[2],
      onComplete: () => {
        // Destroy the card
        onHandChange(index);

        // TODO : Shader animation, finally do card action, animate the remaining cards to their new places
      },
    });
  });

  return (
    <>
      {handInfos.map((ci, index) => (
        <Card
          ref={handRefs[index]}
          key={index}
          index={index}
          cardBase={ci.cardBase}
          cardConfig={ci.cardConfig}
          position={CardsPositions[cardQuantityIndex].BasePos[index]}
          rotation={CardsPositions[cardQuantityIndex].BaseRot[index]}
          hoverIn={HoverIn}
          hoverOut={HoverOut}
          clickOn={ClickOn}
        />
      ))}
    </>
  );
};

export default Hand;
