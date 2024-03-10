// Card config
// Type of the card
export enum CardType {
  Attack,
  Forward,
  Backward,
  Left,
  Right,
}

// Base of the card
export const CARD_BASE = {
  mesh: "",
  backTexture: "",
};

// Config of the card type
export const CARD_CONFIG = [
  {
    cardType: CardType.Attack,
    frontTexture: "red",
    text: "You attack the nearest enemy.",
  },
  {
    cardType: CardType.Forward,
    frontTexture: "yellow",
    text: "You go forward of 1d4 cases",
  },
  {
    cardType: CardType.Backward,
    frontTexture: "yellow",
    text: "You go backward of 1d4 cases",
  },
  {
    cardType: CardType.Left,
    frontTexture: "yellow",
    text: "You go left of 1d4 cases",
  },
  {
    cardType: CardType.Right,
    frontTexture: "yellow",
    text: "You go right of 1d4 cases",
  },
];
