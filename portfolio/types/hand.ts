import { Mutex } from "async-mutex";
import { Mesh } from "three";
import { CARD_BASE, CARD_CONFIG, CardType } from "@/config/cardconfig";

// Hand Config
// All hand and cards types for the Hand and Card components
type CardBase = typeof CARD_BASE;
type CardConfig = (typeof CARD_CONFIG)[number];

// Card
export interface CardProp {
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cardBase: CardBase;
  cardConfig: CardConfig;
  hoverIn: (index: number) => void;
  hoverOut: (index: number) => void;
  clickOn: (index: number) => void;
}

// Hand
export interface CardInfo {
  cardBase: CardBase;
  cardConfig: CardConfig;
}

// Hand visibility
export interface CardVisibility {
  card: CardInfo;
  visibility: boolean;
}

// Hand props given to the hand
export interface HandProp {
  mutex: Mutex;
  handInfos: CardInfo[];
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
