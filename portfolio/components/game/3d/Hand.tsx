import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Mesh } from "three";
import Card from "./Card";
import { CardVisibility, HandProp } from "@/types/hand";

import { CardsPositions, UsePos, UseRot } from "@/config/handconst";

const Hand = ({ mutex, handInfos, onCardUsed }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Create an array of objects which manage which card is shown or not
  const generateVisibility = (): CardVisibility[] => {
    return handInfos.map((card, i) => {
      return { card: card, visibility: true };
    });
  };

  // Generate and array of refs for the card meshes
  const generateHandRef = () => {
    return [
      useRef<Mesh>(null),
      useRef<Mesh>(null),
      useRef<Mesh>(null),
      useRef<Mesh>(null),
    ];
  };

  // Visibility state
  const [cardsVis, setCardVis] = useState(generateVisibility());
  // Refs on the cards
  const cardsRefs = useRef(generateHandRef());

  // How many card left
  const cardQuantityIndex = cardsVis.length - 1;

  // If a card has been clicked
  const isClicked = useRef(false);

  // Animation when the card is hovered in by the mouse
  const HoverIn = contextSafe((index: number) => {
    if (!isClicked.current) {
      // Move the hovered card
      gsap.to(cardsRefs.current[index]?.current?.position!, {
        x: CardsPositions[cardQuantityIndex].HoverPos[index][0],
        y: CardsPositions[cardQuantityIndex].HoverPos[index][1],
        z: CardsPositions[cardQuantityIndex].HoverPos[index][2],
      });
      // Rotate the hovered card
      gsap.to(cardsRefs.current[index]?.current?.rotation!, {
        x: CardsPositions[cardQuantityIndex].HoverRot[index][0],
        y: CardsPositions[cardQuantityIndex].HoverRot[index][1],
        z: CardsPositions[cardQuantityIndex].HoverRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (cardsRefs.current[i]?.current && i != index) {
          gsap.to(cardsRefs.current[i]?.current?.position!, {
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
    if (!isClicked.current) {
      // Move the hovered card to its base position
      gsap.to(cardsRefs.current[index]?.current?.position!, {
        x: CardsPositions[cardQuantityIndex].BasePos[index][0],
        y: CardsPositions[cardQuantityIndex].BasePos[index][1],
        z: CardsPositions[cardQuantityIndex].BasePos[index][2],
      });
      // Rotate the hovered card to it base rotation
      gsap.to(cardsRefs.current[index]?.current?.rotation!, {
        x: CardsPositions[cardQuantityIndex].BaseRot[index][0],
        y: CardsPositions[cardQuantityIndex].BaseRot[index][1],
        z: CardsPositions[cardQuantityIndex].BaseRot[index][2],
      });

      // Move the other cards to move them apart from the hovered one
      for (let i = 0; i <= cardQuantityIndex; i++) {
        // If the card exist and is not the hovered one, move it to the correct position
        if (cardsRefs.current[i]?.current && i != index) {
          gsap.to(cardsRefs.current[i]?.current?.position!, {
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
    mutex.acquire().then(() => {
      if (!isClicked.current) {
        isClicked.current = true;

        let nextPos = cardQuantityIndex - 1;

        gsap.to(cardsRefs.current[index]?.current?.position!, {
          x: UsePos[0],
          y: UsePos[1],
          z: UsePos[2],
        });

        // TODO : Bug lors de l'utilisation de la première carte => les rotations ne sont pas bien appliquées

        // Move the other cards to their next base position
        let count = 0;

        for (let i = 0; i <= cardQuantityIndex; i++) {
          if (cardsRefs.current[i]?.current && i != index) {
            gsap.to(cardsRefs.current[i]?.current?.position!, {
              x: CardsPositions[nextPos].BasePos[count][0],
              y: CardsPositions[nextPos].BasePos[count][1],
              z: CardsPositions[nextPos].BasePos[count][2],
            });
            gsap.to(cardsRefs.current[i]?.current?.rotation!, {
              x: CardsPositions[nextPos].BaseRot[count][0],
              y: CardsPositions[nextPos].BaseRot[count][1],
              z: CardsPositions[nextPos].BaseRot[count][2],
            });
            count++;
          }
        }

        gsap.to(cardsRefs.current[index]?.current?.rotation!, {
          x: UseRot[0],
          y: UseRot[1],
          z: UseRot[2],
          onComplete: () => {
            // TODO : Shader animation
            // Play the card
            onCardUsed(cardsVis[index].card.cardConfig.cardType, index);

            // Update the cards visibility
            setCardVis(cardsVis.filter((_, i) => i != index));

            // Update the cards references
            cardsRefs.current = cardsRefs.current?.filter((_, i) => i != index);

            // Allow the possibility to click again
            isClicked.current = false;
          },
        });
      }
    });
  });

  return (
    <>
      {cardsVis.map(
        (cv, index) =>
          cv.visibility && (
            <Card
              ref={cardsRefs.current[index]}
              key={index}
              index={index}
              cardBase={cv.card.cardBase}
              cardConfig={cv.card.cardConfig}
              position={CardsPositions[cardQuantityIndex].BasePos[index]}
              rotation={CardsPositions[cardQuantityIndex].BaseRot[index]}
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
