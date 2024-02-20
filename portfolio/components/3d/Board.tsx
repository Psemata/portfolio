import React from "react";
import { Mesh } from "three";

// Board config
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

interface BoardProps {
  maze: Maze;
}

const Board = React.forwardRef<Mesh, BoardProps>((props, ref) => {
  // Size and position informations
  const BOARD_WIDTH = 5;
  const BOARD_HEIGHT = 3.2;
  const MAZE_WIDTH = BOARD_WIDTH * 0.83;
  const MAZE_HEIGHT = BOARD_HEIGHT * 0.83;

  const CELL_WALL_HEIGHT = 0.5;

  return (
    <mesh ref={ref}>
      {/* Table */}
      <mesh>
        <boxGeometry args={[15, 2, 10]} />
        <meshStandardMaterial color={"tan"} />
      </mesh>
      {/* Board */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[BOARD_WIDTH, 0.3, BOARD_HEIGHT]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
      {/* Maze placement */}
      {props.maze.paths.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          let cells = [];

          // Walls infos
          const CELL_WIDTH = MAZE_WIDTH / row.length;
          const CELL_HEIGHT = MAZE_HEIGHT / props.maze.paths.length;

          const MARGIN_X = (BOARD_WIDTH - MAZE_WIDTH) / 2;
          const MARGIN_Y = (BOARD_HEIGHT - MAZE_HEIGHT) / 2;

          const CELL_X_POS =
            -(MAZE_WIDTH / 2) + MARGIN_X + cellIndex * CELL_WIDTH;
          const CELL_Y_POS =
            -(MAZE_HEIGHT / 2) + MARGIN_Y + rowIndex * CELL_HEIGHT;
          const CELL_Z_POS = 1.2;

          // Top Wall
          if (cell.top) {
            cells.push(
              <mesh
                key={`topWall-${cell.x}-${cell.y}`}
                position={[
                  CELL_X_POS,
                  CELL_Z_POS,
                  CELL_Y_POS - CELL_HEIGHT / 2,
                ]}
              >
                <boxGeometry args={[CELL_WIDTH + 0.2, CELL_WALL_HEIGHT, 0.1]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }
          // Right Wall
          if (cell.right) {
            cells.push(
              <mesh
                key={`rightWall-${cell.x}-${cell.y}`}
                position={[CELL_X_POS + CELL_WIDTH / 2, CELL_Z_POS, CELL_Y_POS]}
              >
                <boxGeometry
                  args={[0.1, CELL_WALL_HEIGHT, CELL_HEIGHT + 0.2]}
                />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }
          // Bottom Wall
          if (cell.bottom) {
            cells.push(
              <mesh
                key={`bottomWall-${cell.x}-${cell.y}`}
                position={[
                  CELL_X_POS,
                  CELL_Z_POS,
                  CELL_Y_POS + CELL_HEIGHT / 2,
                ]}
              >
                <boxGeometry args={[CELL_WIDTH + 0.2, CELL_WALL_HEIGHT, 0.1]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }
          // Left Wall
          if (cell.left) {
            cells.push(
              <mesh
                key={`leftWall-${cell.x}-${cell.y}`}
                position={[CELL_X_POS - CELL_WIDTH / 2, CELL_Z_POS, CELL_Y_POS]}
              >
                <boxGeometry
                  args={[0.1, CELL_WALL_HEIGHT, CELL_HEIGHT + 0.2]}
                />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }

          if (cell.exit) {
            cells.push(
              <mesh
                key={`exit`}
                position={[CELL_X_POS, CELL_Z_POS, CELL_Y_POS]}
              >
                <boxGeometry args={[0.2, 0.1, 0.2]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }

          // Treasures
          if (cell.treasure) {
            cells.push(
              <mesh
                key={`treasure-${cell.x}-${cell.y}`}
                position={[CELL_X_POS, CELL_Z_POS, CELL_Y_POS]}
              >
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }

          // Ennemies
          if (cell.ennemy) {
            cells.push(
              <mesh
                key={`ennemy-${cell.x}-${cell.y}`}
                position={[CELL_X_POS, CELL_Z_POS, CELL_Y_POS]}
              >
                <coneGeometry args={[0.1, 0.5, 3]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }

          // Player
          if (cell.player) {
            cells.push(
              <mesh
                key={`player`}
                position={[CELL_X_POS, CELL_Z_POS, CELL_Y_POS]}
              >
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color={"white"} />
              </mesh>
            );
          }

          return cells.map((cell) => cell);
        })
      )}
    </mesh>
  );
});

export default Board;
