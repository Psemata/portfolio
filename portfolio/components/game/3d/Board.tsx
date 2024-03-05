import React, { useImperativeHandle, useRef } from "react";
import { Mesh } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { BoardProps, BoardAnimationHandle } from "@/types/board";

import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  MAZE_WIDTH,
  MAZE_HEIGHT,
  CELL_WALL_HEIGHT,
} from "@/config/boardconst";

const Board = React.forwardRef<BoardAnimationHandle, BoardProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      boardMeshRef() {
        return meshRef.current!;
      },
      moveForward(steps, playerPosition) {
        console.log("fw");
        mf(steps, playerPosition);
      },
      moveBackward(steps, playerPosition) {
        console.log("bw");
        mb(steps, playerPosition);
      },
      moveLeft(steps, playerPosition) {
        console.log("l");
        ml(steps, playerPosition);
      },
      moveRight(steps, playerPosition) {
        console.log("r");
        mr(steps, playerPosition);
      },
      attack() {
        console.log("a");
      },
      shield() {
        console.log("s");
      },
      heal() {
        console.log("h");
      },
    }));

    // GSAP
    const { contextSafe } = useGSAP();

    // Component refs
    const meshRef = useRef<Mesh>(null);
    const playerRef = useRef<Mesh>(null);

    // Walls and cells infos
    // Maze's cell sizes
    const CELL_WIDTH = MAZE_WIDTH / props.maze.paths[0].length;
    const CELL_HEIGHT = MAZE_HEIGHT / props.maze.paths.length;

    // The maze margin
    const MARGIN_X = (BOARD_WIDTH - MAZE_WIDTH) / 2;
    const MARGIN_Y = (BOARD_HEIGHT - MAZE_HEIGHT) / 2;

    // Player position
    let PLAYER_POS_X = 0;
    let PLAYER_POS_Y = 0;

    // ANIMATIONS
    // Move forward animation
    const mf = contextSafe((steps: number, playerPosition: number[]) => {
      const timelineMF = gsap.timeline();

      for (let i = 0; i < steps; i++) {
        timelineMF.to(playerRef.current?.position!, {
          z: PLAYER_POS_Y - CELL_HEIGHT,
          onComplete: () => {
            if (i < steps - 1) {
              timelineMF.pause();
              setTimeout(() => timelineMF.play(), 500);
            } else {
              // y is the row, x is the col => x is 1st and y is 2nd
              props.playerMovement(props.maze, [
                playerPosition[0],
                playerPosition[1] - steps,
              ]);
            }
          },
        });
        PLAYER_POS_Y -= CELL_HEIGHT;
      }

      timelineMF.play();
    });
    // Move backward animation
    const mb = contextSafe((steps: number, playerPosition: number[]) => {
      const timelineMB = gsap.timeline();

      for (let i = 0; i < steps; i++) {
        timelineMB.to(playerRef.current?.position!, {
          z: PLAYER_POS_Y + CELL_HEIGHT,
          onComplete: () => {
            if (i < steps - 1) {
              timelineMB.pause();
              setTimeout(() => timelineMB.play(), 500);
            } else {
              // y is the row, x is the col => x is 1st and y is 2nd
              props.playerMovement(props.maze, [
                playerPosition[0],
                playerPosition[1] + steps,
              ]);
            }
          },
        });
        PLAYER_POS_Y += CELL_HEIGHT;
      }

      timelineMB.play();
    });
    // Move leftward animation
    const ml = contextSafe((steps: number, playerPosition: number[]) => {
      const timelineML = gsap.timeline();

      for (let i = 0; i < steps; i++) {
        timelineML.to(playerRef.current?.position!, {
          x: PLAYER_POS_X - CELL_WIDTH,
          onComplete: () => {
            if (i < steps - 1) {
              timelineML.pause();
              setTimeout(() => timelineML.play(), 500);
            } else {
              // y is the row, x is the col => x is 1st and y is 2nd
              props.playerMovement(props.maze, [
                playerPosition[0] - steps,
                playerPosition[1],
              ]);
            }
          },
        });
        PLAYER_POS_X -= CELL_WIDTH;
      }

      timelineML.play();
    });
    // Move rightward animation
    const mr = contextSafe((steps: number, playerPosition: number[]) => {
      const timelineMR = gsap.timeline();

      for (let i = 0; i < steps; i++) {
        timelineMR.to(playerRef.current?.position!, {
          x: PLAYER_POS_X + CELL_WIDTH,
          onComplete: () => {
            if (i < steps - 1) {
              timelineMR.pause();
              setTimeout(() => timelineMR.play(), 500);
            } else {
              // y is the row, x is the col => x is 1st and y is 2nd
              props.playerMovement(props.maze, [
                playerPosition[0] + steps,
                playerPosition[1],
              ]);
            }
          },
        });
        PLAYER_POS_X += CELL_WIDTH;
      }

      timelineMR.play();
    });

    return (
      <mesh ref={meshRef}>
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

            // The cell position
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
                  <boxGeometry
                    args={[CELL_WIDTH + 0.2, CELL_WALL_HEIGHT, 0.1]}
                  />
                  <meshStandardMaterial color={"white"} />
                </mesh>
              );
            }
            // Right Wall
            if (cell.right) {
              cells.push(
                <mesh
                  key={`rightWall-${cell.x}-${cell.y}`}
                  position={[
                    CELL_X_POS + CELL_WIDTH / 2,
                    CELL_Z_POS,
                    CELL_Y_POS,
                  ]}
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
                  <boxGeometry
                    args={[CELL_WIDTH + 0.2, CELL_WALL_HEIGHT, 0.1]}
                  />
                  <meshStandardMaterial color={"white"} />
                </mesh>
              );
            }
            // Left Wall
            if (cell.left) {
              cells.push(
                <mesh
                  key={`leftWall-${cell.x}-${cell.y}`}
                  position={[
                    CELL_X_POS - CELL_WIDTH / 2,
                    CELL_Z_POS,
                    CELL_Y_POS,
                  ]}
                >
                  <boxGeometry
                    args={[0.1, CELL_WALL_HEIGHT, CELL_HEIGHT + 0.2]}
                  />
                  <meshStandardMaterial color={"white"} />
                </mesh>
              );
            }

            // Maze exit
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
              PLAYER_POS_X = CELL_X_POS;
              PLAYER_POS_Y = CELL_Y_POS;
              cells.push(
                <mesh
                  ref={playerRef}
                  key={`player`}
                  position={[PLAYER_POS_X, CELL_Z_POS, PLAYER_POS_Y]}
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
  }
);

export default Board;
