// Card config
// Type of the card
export enum CardType {
  Attack,
  Forward,
  Backward,
  Left,
  Right,
}

// Config of the card type
export const CARD_CONFIG = [
  {
    cardType: CardType.Attack,
    frontTexture: "/meshes/card/CardAttack.glb"
  },
  {
    cardType: CardType.Forward,
    frontTexture: "/meshes/card/CardMoveTop.glb"
  },
  {
    cardType: CardType.Backward,
    frontTexture: "/meshes/card/CardMoveBottom.glb"
  },
  {
    cardType: CardType.Left,
    frontTexture: "/meshes/card/CardMoveLeft.glb"
  },
  {
    cardType: CardType.Right,
    frontTexture: "/meshes/card/CardMoveRight.glb"
  },
];
