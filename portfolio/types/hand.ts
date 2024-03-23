import { Mutex } from "async-mutex";
import { CARD_CONFIG, CardType } from "@/config/cardconfig";
import { ThreeEvent } from "@react-three/fiber";

// Hand Config
// All hand and cards types for the Hand and Card components
type CardConfig = (typeof CARD_CONFIG)[number];

// Card
export interface CardProp {
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cardConfig: CardConfig;
  hoverIn: (index: number, e: ThreeEvent<PointerEvent>) => void;
  hoverOut: (index: number, e: ThreeEvent<PointerEvent>) => void;
  clickOn: (index: number, e: ThreeEvent<MouseEvent>) => void;
}

// Hand
export interface CardInfo {
  cardConfig: CardConfig;
}

// Hand props given to the hand
export interface HandProp {
  mutex: Mutex;
  scale: number;
  onCardUsed: (actionType: CardType, index: number) => void;
}

// Interface for the positions of the cards depending of their numbers
export interface CardsPosition {
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
