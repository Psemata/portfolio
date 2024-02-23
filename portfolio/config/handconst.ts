import { CardsPosition } from "@/types/hand";

// Const values for the cards in the hand

// All the cards positions
export const CardsPositions: CardsPosition[] = [
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
      [0.083, 3.95, 3.06], // Right
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

// The position when the card is used
export const UsePos: [number, number, number] = [0, 4.2, 2.8];

// The rotation when the card is used
export const UseRot: [number, number, number] = [-1, 0, 0];