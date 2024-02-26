import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Card from "./Card";
import { HandProp } from "@/types/hand";

import { CardsPositions, UsePos, UseRot } from "@/config/handconst";

const Hand = ({ handInfos, handRefs, onCardUsed }: HandProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // How many card left
  const cardQuantityIndex = handInfos.length - 1;

  // If a card has been clicked
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

    gsap.to(handRefs[index].current?.position!, {
      x: UsePos[0],
      y: UsePos[1],
      z: UsePos[2],
    });

    // TODO : Bug lors de l'utilisation de la première carte => les rotations ne sont pas bien appliquées
    // TODO : Double click sur une carte de temps en temps

    // Move the other cards to their next base position
    let count = 0;

    for (let i = 0; i <= cardQuantityIndex; i++) {
      if (handRefs[i].current && i != index) {
        gsap.to(handRefs[i].current?.position!, {
          x: CardsPositions[nextPos].BasePos[count][0],
          y: CardsPositions[nextPos].BasePos[count][1],
          z: CardsPositions[nextPos].BasePos[count][2],
        });
        gsap.to(handRefs[i].current?.rotation!, {
          x: CardsPositions[nextPos].BaseRot[count][0],
          y: CardsPositions[nextPos].BaseRot[count][1],
          z: CardsPositions[nextPos].BaseRot[count][2],
        });
        count++;
      }
    }

    gsap.to(handRefs[index].current?.rotation!, {
      x: UseRot[0],
      y: UseRot[1],
      z: UseRot[2],
      onComplete: () => {
        // TODO : Shader animation, finally do card action

        // Destroy the card
        onCardUsed(index);
        isClicked = false;
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
