export enum CardType {
  Attack,
  Shield,
  Heal,
  Forward,
  Backward,
  Left,
  Right,
}

export const CARD_BASE = {
  mesh: "",
  backTexture: "",
};

export const CARD_CONFIG = [
  {
    cardType: CardType.Attack,
    frontTexture: "red",
    text: "You attack your ennemy with 1d4 damage.",
  },
  {
    cardType: CardType.Shield,
    frontTexture: "blue",
    text: "You shield yourself from 1d4 damage.",
  },
  {
    cardType: CardType.Heal,
    frontTexture: "green",
    text: "You heal yourself from 1d4 damage",
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
