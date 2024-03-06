import { Mutex } from "async-mutex";
import { Mesh } from "three";

// Board Config
// All board, maze and cell types for the board component

// Cell
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

// Maze
export interface Maze {
  paths: Cell[][];
}

// Board props given to the board
export interface BoardProps {  
  mutex: Mutex;
  maze: Maze;
  playerMovement: (maze: Maze, newPos: number[]) => void;
  playerAttack: () => void;
  playerShield: () => void;
  playerHeal: () => void;
}

// Ref handle for the board animation
export type BoardAnimationHandle = {
  boardMeshRef: () => Mesh;
  moveForward: (steps: number, playerPosition: number[]) => void;
  moveBackward: (steps: number, playerPosition: number[]) => void;
  moveLeft: (steps: number, playerPosition: number[]) => void;
  moveRight: (steps: number, playerPosition: number[]) => void;
  attack: () => void;
};
