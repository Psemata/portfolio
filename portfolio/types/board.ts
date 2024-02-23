import { Mesh } from "three";

// Board Config
// All board, maze and cell types for the board component

export interface Cell {
  x: number;
  y: number;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
  exit?: boolean;
  treasure?: boolean;
  ennemy?: boolean;
  player?: boolean;
}

export interface Maze {
  paths: Cell[][];
}

export interface BoardProps {  
  maze: Maze;
  playerMovement: (maze: Maze, newPos: number[]) => void;
  playerAttack: (maze: Maze) => void;
  playerShield: (maze: Maze) => void;
  playerHeal: (maze: Maze) => void;
}

export type BoardAnimationHandle = {
  boardMeshRef: () => Mesh;
  moveForward: (steps: number, playerPosition: number[]) => void;
  moveBackward: (steps: number, playerPosition: number[]) => void;
  moveLeft: (steps: number, playerPosition: number[]) => void;
  moveRight: (steps: number, playerPosition: number[]) => void;
  attack: () => void;
  shield: () => void;
  heal: () => void;
};
