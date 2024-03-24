import React, { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Mesh } from "three";
import Card from "./Card";
import { CardInfo, HandProp } from "@/types/hand";

import { CardsPositions, UsePos, UseRot } from "@/config/handconst";
import { CARD_CONFIG } from "@/config/cardconfig";
import { ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { Button, buttonVariants } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

const Hand = ({ mutex, scale, onCardUsed }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Generating a number between 1 and 5 (for the card configuration) (1 and 5 included)
  const generateRandomCardConfig = () => {
    return Math.floor(Math.random() * 5);
  };

  const generateRandomHand = (): CardInfo[] => {
    const initialHand: CardInfo[] = [];

    const indices = new Set<number>();
    while (indices.size < 4) {
      indices.add(generateRandomCardConfig());
    }

    indices.forEach((index) => {
      initialHand.push({ cardConfig: CARD_CONFIG[index] });
    });

    return initialHand;
  };

  // How many shuffle is possible
  const [shuffle, setShuffle] = useState<number>(5);

  // Hand of cards and their refs
  const [hand, setHand] = useState(generateRandomHand());
  // Refs on the cards
  const cardsRefs = useRef<Mesh[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  // How many card left
  const cardQuantityIndex = hand.length - 1;

  // If a card has been clicked
  const isClicked = useRef<boolean>(false);

  // Shuffle a new hand
  const shuffleHand = () => {
    cardsRefs.current = [];
    setHand(generateRandomHand());
  };

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!isClicked.current) {
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
    e.stopPropagation();
    if (!isClicked.current) {
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
    e.stopPropagation();
    mutex.acquire().then(() => {
      if (!isClicked.current) {
        isClicked.current = true;

        let nextPos = cardQuantityIndex - 1;

        gsap.to(cardsRefs.current[index]?.position!, {
          x: UsePos[0],
          y: UsePos[1],
          z: UsePos[2],
        });

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
            // Play the card
            onCardUsed(hand[index].cardConfig.cardType, index);

            // Update the cards references
            cardsRefs.current = cardsRefs.current?.filter(
              (_, i) => i !== index
            );

            // Use the card and update the hand
            setHand(hand.filter((_, i) => i !== index));

            // Allow the possibility to click again
            isClicked.current = false;

            // When all the cards are used, shuffle new cards
            if (hand.length <= 1) {
              shuffleHand();
            }
          },
        });
      }
    });
  });

  // Click on the button to do a new shuffle
  const manualShuffle = () => {
    shuffleHand();
    setShuffle(shuffle - 1);
  };

  return (
    <mesh scale={scale}>
      {shuffle > 0 && (
        <Html className="w-[100vw] h-[100vh] fixed inset-0 flex justify-center items-center pointer-events-none">
          <div ref={buttonRef} className="absolute -top-[48.5%] -left-[48.5%]">
            <Button
              className={cn(
                "gap-x-3 pointer-events-auto",
                buttonVariants({
                  variant: "secondary",
                  className:
                    "w-24 h-11 font-portfolioMedieval text-primary text-3xl",
                })
              )}
              onClick={manualShuffle}
            >
              {shuffle}
              <Shuffle className="h-8 w-8" />
            </Button>
          </div>
        </Html>
      )}
      {hand.map((card, index) => (
        <Card
          ref={(cardElem) => (cardsRefs.current[index] = cardElem!)}
          key={index}
          index={index}
          cardConfig={card.cardConfig}
          position={CardsPositions[cardQuantityIndex].BasePos[index]}
          rotation={CardsPositions[cardQuantityIndex].BaseRot[index]}
          hoverIn={HoverIn}
          hoverOut={HoverOut}
          clickOn={ClickOn}
        />
      ))}
    </mesh>
  );
};

export default Hand;
