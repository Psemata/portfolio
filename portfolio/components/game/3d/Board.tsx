import { useRouter } from "next/router";

import React, { useImperativeHandle, useRef, useState } from "react";

import { Mesh } from "three";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { BoardProps, BoardAnimationHandle } from "@/types/board";

import { Informations } from "@/config/informationconst";

import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  MAZE_WIDTH,
  MAZE_HEIGHT,
  CELL_WALL_HEIGHT,
} from "@/config/boardconst";
import InformationScreen from "./InformationScreen";

const Board = React.forwardRef<BoardAnimationHandle, BoardProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      boardMeshRef() {
        return meshRef.current!;
      },
      moveForward(steps, playerPosition, treasureFlags, exitFlag) {
        mf(steps, playerPosition, treasureFlags, exitFlag);
      },
      moveBackward(steps, playerPosition, treasureFlags, exitFlag) {
        mb(steps, playerPosition, treasureFlags, exitFlag);
      },
      moveLeft(steps, playerPosition, treasureFlags, exitFlag) {
        ml(steps, playerPosition, treasureFlags, exitFlag);
      },
      moveRight(steps, playerPosition, treasureFlags, exitFlag) {
        mr(steps, playerPosition, treasureFlags, exitFlag);
      },
      attack() {
        console.log("a");
        attack();
      },
    }));

    // GSAP
    const { contextSafe } = useGSAP();

    // Text management
    const [text, setText] = useState("");
    const currentAnim = useRef<gsap.core.Timeline>();

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
    const mf = contextSafe(
      (
        steps: number,
        playerPosition: number[],
        treasureFlags: number[][],
        exitFlag: boolean
      ) => {
        let index = 0;

        if (steps == 0) {
          props.mutex.release();
        } else {
          const timelineMF = gsap.timeline();
          currentAnim.current = timelineMF;
          for (let i = 0; i < steps; i++) {
            currentAnim.current?.to(playerRef.current?.position!, {
              z: PLAYER_POS_Y - CELL_HEIGHT,
              onComplete: () => {
                // If a treasure is encoutered
                let treasure = false;
                // Check if the pawn is interacting with a treasure
                if (treasureFlags.length > 0 && index < treasureFlags.length) {
                  const [treasureY, treasureX] = treasureFlags[index];
                  const currentY = playerPosition[1] - i - 1;
                  const currentX = playerPosition[0];

                  if (currentY === treasureY && currentX === treasureX) {
                    currentAnim.current?.pause();
                    treasure = true;
                    props.playerMovement(props.maze, [currentX, currentY]);
                    props.playerTreasure(props.maze, [currentY, currentX]);
                    setText(
                      Informations[
                        Math.floor(Math.random() * Informations.length)
                      ]
                    );
                    index++;
                  }
                }

                // At the end of the animation
                if (i === steps - 1) {
                  // Move the pawn and release the mutex
                  props.playerMovement(props.maze, [
                    playerPosition[0],
                    playerPosition[1] - steps,
                  ]);
                  props.mutex.release();
                }

                // Check if this is the exit
                if (
                  i === steps - 1 &&
                  playerPosition[1] - i - 1 === 0 &&
                  playerPosition[0] === 0 &&
                  exitFlag
                ) {
                  console.log("exit of the maze");
                  props.playerExit();
                }

                // Pause or continue animation based on the step count
                if (i < steps - 1 && !treasure) {
                  currentAnim.current?.pause();
                  setTimeout(() => currentAnim.current?.play(), 500);
                }
              },
            });
            PLAYER_POS_Y -= CELL_HEIGHT;
          }
          currentAnim.current?.play();
        }
      }
    );
    // Move backward animation
    const mb = contextSafe(
      (
        steps: number,
        playerPosition: number[],
        treasureFlags: number[][],
        exitFlag: boolean
      ) => {
        let index = 0;

        if (steps == 0) {
          props.mutex.release();
        } else {
          const timelineMB = gsap.timeline();
          currentAnim.current = timelineMB;
          for (let i = 0; i < steps; i++) {
            currentAnim.current?.to(playerRef.current?.position!, {
              z: PLAYER_POS_Y + CELL_HEIGHT,
              onComplete: () => {
                // If a treasure is encoutered
                let treasure = false;
                // Check if the pawn is interacting with a treasure
                if (treasureFlags.length > 0 && index < treasureFlags.length) {
                  const [treasureY, treasureX] = treasureFlags[index];
                  const currentY = playerPosition[1] + i + 1;
                  const currentX = playerPosition[0];

                  if (currentY === treasureY && currentX === treasureX) {
                    currentAnim.current?.pause();
                    treasure = true;
                    props.playerMovement(props.maze, [currentX, currentY]);
                    props.playerTreasure(props.maze, [currentY, currentX]);
                    setText(
                      Informations[
                        Math.floor(Math.random() * Informations.length)
                      ]
                    );
                    index++;
                  }
                }

                // At the end of the animation
                if (i === steps - 1) {
                  // Move the pawn and release the mutex
                  props.playerMovement(props.maze, [
                    playerPosition[0],
                    playerPosition[1] + steps,
                  ]);
                  props.mutex.release();
                }

                // Check if this is the exit
                if (
                  i === steps - 1 &&
                  playerPosition[1] + i + 1 === 0 &&
                  playerPosition[0] === 0 &&
                  exitFlag
                ) {
                  console.log("exit of the maze");
                  props.playerExit();
                }

                // Pause or continue animation based on the step count
                if (i < steps - 1 && !treasure) {
                  currentAnim.current?.pause();
                  setTimeout(() => currentAnim.current?.play(), 500);
                }
              },
            });
            PLAYER_POS_Y += CELL_HEIGHT;
          }

          currentAnim.current?.play();
        }
      }
    );
    // Move leftward animation
    const ml = contextSafe(
      (
        steps: number,
        playerPosition: number[],
        treasureFlags: number[][],
        exitFlag: boolean
      ) => {
        let index = 0;

        if (steps == 0) {
          props.mutex.release();
        } else {
          const timelineML = gsap.timeline();
          currentAnim.current = timelineML;
          for (let i = 0; i < steps; i++) {
            currentAnim.current?.to(playerRef.current?.position!, {
              x: PLAYER_POS_X - CELL_WIDTH,
              onComplete: () => {
                // If a treasure is encoutered
                let treasure = false;
                // Check if the pawn is interacting with a treasure
                if (treasureFlags.length > 0 && index < treasureFlags.length) {
                  const [treasureY, treasureX] = treasureFlags[index];
                  const currentY = playerPosition[1];
                  const currentX = playerPosition[0] - i - 1;

                  if (currentY === treasureY && currentX === treasureX) {
                    currentAnim.current?.pause();
                    treasure = true;
                    props.playerMovement(props.maze, [currentX, currentY]);
                    props.playerTreasure(props.maze, [currentY, currentX]);
                    setText(
                      Informations[
                        Math.floor(Math.random() * Informations.length)
                      ]
                    );
                    index++;
                  }
                }

                // At the end of the animation
                if (i >= steps - 1) {
                  // Move the pawn and release the mutex
                  props.playerMovement(props.maze, [
                    playerPosition[0] - steps,
                    playerPosition[1],
                  ]);
                  props.mutex.release();
                }

                // Check if this is the exit
                if (
                  i === steps - 1 &&
                  playerPosition[1] === 0 &&
                  playerPosition[0] - i - 1 === 0 &&
                  exitFlag
                ) {
                  console.log("exit of the maze");
                  props.playerExit();
                }

                // Pause or continue animation based on the step count
                if (i < steps - 1 && !treasure) {
                  currentAnim.current?.pause();
                  setTimeout(() => currentAnim.current?.play(), 500);
                }
              },
            });
            PLAYER_POS_X -= CELL_WIDTH;
          }

          currentAnim.current?.play();
        }
      }
    );
    // Move rightward animation
    const mr = contextSafe(
      (
        steps: number,
        playerPosition: number[],
        treasureFlags: number[][],
        exitFlag: boolean
      ) => {
        let index = 0;

        if (steps == 0) {
          props.mutex.release();
        } else {
          const timelineMR = gsap.timeline();
          currentAnim.current = timelineMR;
          for (let i = 0; i < steps; i++) {
            currentAnim.current?.to(playerRef.current?.position!, {
              x: PLAYER_POS_X + CELL_WIDTH,
              onComplete: () => {
                // If a treasure is encoutered
                let treasure = false;
                // Check if the pawn is interacting with a treasure
                if (treasureFlags.length > 0 && index < treasureFlags.length) {
                  const [treasureY, treasureX] = treasureFlags[index];
                  const currentY = playerPosition[1];
                  const currentX = playerPosition[0] + i + 1;

                  if (currentY === treasureY && currentX === treasureX) {
                    currentAnim.current?.pause();
                    treasure = true;
                    props.playerMovement(props.maze, [currentX, currentY]);
                    props.playerTreasure(props.maze, [currentY, currentX]);
                    setText(
                      Informations[
                        Math.floor(Math.random() * Informations.length)
                      ]
                    );
                    index++;
                  }
                }

                // At the end of the animation
                if (i === steps - 1) {
                  // Move the pawn and release the mutex
                  props.playerMovement(props.maze, [
                    playerPosition[0] + steps,
                    playerPosition[1],
                  ]);
                  props.mutex.release();
                }

                // Check if this is the exit
                if (
                  i === steps - 1 &&
                  playerPosition[1] === 0 &&
                  playerPosition[0] + i + 1 === 0 &&
                  exitFlag
                ) {
                  console.log("exit of the maze");
                  props.playerExit();
                }

                // Pause or continue animation based on the step count
                if (i < steps - 1 && !treasure) {
                  currentAnim.current?.pause();
                  setTimeout(() => currentAnim.current?.play(), 500);
                }
              },
            });
            PLAYER_POS_X += CELL_WIDTH;
          }

          currentAnim.current?.play();
        }
      }
    );

    // Attack the ennemy
    const attack = contextSafe(() => {
      props.mutex.release();
    });

    // Close the information text
    const closeText = () => {
      currentAnim.current?.play();
      setText("");
    };

    return (
      <>
        {/* Information screen */}
        {text != "" && <InformationScreen text={text} closeText={closeText} />}
        {/* Meshes */}
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
          {/* Maze */}
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
      </>
    );
  }
);

export default Board;
