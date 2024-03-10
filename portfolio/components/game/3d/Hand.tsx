import React, { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Mesh } from "three";
import Card from "./Card";
import { CardInfo, HandProp } from "@/types/hand";

import { CardsPositions, UsePos, UseRot } from "@/config/handconst";
import { CARD_BASE, CARD_CONFIG } from "@/config/cardconfig";
import { ThreeEvent } from "@react-three/fiber";

const Hand = ({ mutex, onCardUsed }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Generating a number between 1 and 5 (for the card configuration) (1 and 5 included)
  const generateRandomCardConfig = () => {
    return Math.floor(Math.random() * 5);
  };

  // Generate a hand and their refs
  const generateRandomHand = (): CardInfo[] => {
    return [
      {
        cardBase: CARD_BASE,
        cardConfig: CARD_CONFIG[generateRandomCardConfig()],
      },
      {
        cardBase: CARD_BASE,
        cardConfig: CARD_CONFIG[generateRandomCardConfig()],
      },
      {
        cardBase: CARD_BASE,
        cardConfig: CARD_CONFIG[generateRandomCardConfig()],
      },
      {
        cardBase: CARD_BASE,
        cardConfig: CARD_CONFIG[generateRandomCardConfig()],
      },
    ];
  };

  // Hand of cards and their refs
  const [hand, setHand] = useState(generateRandomHand());
  // Refs on the cards
  const cardsRefs = useRef<Mesh[]>([]);

  // How many card left
  const cardQuantityIndex = hand.length - 1;

  // If a card has been clicked
  const [isClicked, setIsClicked] = useState(false);

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number, e: ThreeEvent<PointerEvent>) => {
    if (!isClicked) {
      e.stopPropagation();

      // Move the hovered card
      gsap.to(cardsRefs.current[index]?.position!, {
        x: CardsPositions[cardQuantityIndex].HoverPos[index][0],
        y: CardsPositions[cardQuantityIndex].HoverPos[index][1],
        z: CardsPositions[cardQuantityIndex].HoverPos[index][2],
      });
      // Rotate the hovered card
      gsap.to(cardsRefs.current[index]?.rotation!, {
        x: CardsPositions[cardQuantityIndex].HoverRot[index][0],
        y: CardsPositions[cardQuantityIndex].HoverRot[index][1],
        z: CardsPositions[cardQuantityIndex].HoverRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (cardsRefs.current[i] && i != index) {
          gsap.to(cardsRefs.current[i]?.position!, {
            x: CardsPositions[cardQuantityIndex].MoveHoverPos[i][0],
            y: CardsPositions[cardQuantityIndex].MoveHoverPos[i][1],
            z: CardsPositions[cardQuantityIndex].MoveHoverPos[i][2],
          });
        }
      }
    }
  });

  // Animation when the card is hovered out by the mouse
  const HoverOut = contextSafe((index: number, e: ThreeEvent<PointerEvent>) => {
    if (!isClicked) {
      e.stopPropagation();

      // Move the hovered card to its base position
      gsap.to(cardsRefs.current[index]?.position!, {
        x: CardsPositions[cardQuantityIndex].BasePos[index][0],
        y: CardsPositions[cardQuantityIndex].BasePos[index][1],
        z: CardsPositions[cardQuantityIndex].BasePos[index][2],
      });
      // Rotate the hovered card to it base rotation
      gsap.to(cardsRefs.current[index]?.rotation!, {
        x: CardsPositions[cardQuantityIndex].BaseRot[index][0],
        y: CardsPositions[cardQuantityIndex].BaseRot[index][1],
        z: CardsPositions[cardQuantityIndex].BaseRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (cardsRefs.current[i] && i != index) {
          gsap.to(cardsRefs.current[i]?.position!, {
            x: CardsPositions[cardQuantityIndex].BasePos[i][0],
            y: CardsPositions[cardQuantityIndex].BasePos[i][1],
            z: CardsPositions[cardQuantityIndex].BasePos[i][2],
          });
        }
      }
    }
  });

  // Animation and use of the card when the card is clicked
  const ClickOn = contextSafe((index: number, e: ThreeEvent<MouseEvent>) => {
    mutex.acquire().then(() => {
      if (!isClicked) {
        e.stopPropagation();

        setIsClicked(true);

        let nextPos = cardQuantityIndex - 1;

        gsap.to(cardsRefs.current[index]?.position!, {
          x: UsePos[0],
          y: UsePos[1],
          z: UsePos[2],
        });

        // TODO : Bug lors de l'utilisation de la première carte => les rotations ne sont pas bien appliquées

        // Move the other cards to their next base position
        let count = 0;

        for (let i = 0; i <= cardQuantityIndex; i++) {
          if (cardsRefs.current[i] && i != index) {
            gsap.to(cardsRefs.current[i]?.position!, {
              x: CardsPositions[nextPos].BasePos[count][0],
              y: CardsPositions[nextPos].BasePos[count][1],
              z: CardsPositions[nextPos].BasePos[count][2],
            });
            gsap.to(cardsRefs.current[i]?.rotation!, {
              x: CardsPositions[nextPos].BaseRot[count][0],
              y: CardsPositions[nextPos].BaseRot[count][1],
              z: CardsPositions[nextPos].BaseRot[count][2],
            });
            count++;
          }
        }

        gsap.to(cardsRefs.current[index]?.rotation!, {
          x: UseRot[0],
          y: UseRot[1],
          z: UseRot[2],
          onComplete: () => {
            // TODO : Shader animation
            // Play the card
            onCardUsed(hand[index].cardConfig.cardType, index);

            // Use the card and update the hand
            setHand(hand.filter((_, i) => i != index));

            // Update the cards references
            cardsRefs.current = cardsRefs.current?.filter((_, i) => i != index);

            // Allow the possibility to click again
            setIsClicked(false);

            // When all the cards are used, shuffle new cards
            if (hand.length <= 1) {
              cardsRefs.current = [];
              setHand(generateRandomHand());
            }
          },
        });
      }
    });
  });

  return (
    <>
      {hand.map((card, index) => (
        <Card
          ref={(cardElem) => (cardsRefs.current[index] = cardElem!)}
          key={index}
          index={index}
          cardBase={card.cardBase}
          cardConfig={card.cardConfig}
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
