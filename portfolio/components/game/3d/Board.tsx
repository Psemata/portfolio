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
import Table from "./Table";
import GameBoard from "./GameBoard";
import Player from "./Player";
import Enemy from "./Enemy";
import Chest from "./Chest";
import Exit from "./Exit";
import Torch from "./Torch";
import Bread from "./Bread";
import Coins from "./Coins";
import Mug from "./Mug";
import Parchment from "./Parchment";
import WallH from "./WallH";
import WallV from "./WallV";

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
      attack(side, playerPosition) {
        attack(side, playerPosition);
      },
    }));

    // GSAP
    const { contextSafe } = useGSAP();

    // Text management
    const [text, setText] = useState("");
    const currentAnim = useRef<gsap.core.Timeline>();
    const alreadyShown = useRef<number[]>([]);

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
    const PLAYER_POS_X = useRef(-(MAZE_WIDTH / 2) + MARGIN_X + 4 * CELL_WIDTH);
    const PLAYER_POS_Y = useRef(
      -(MAZE_HEIGHT / 2) + MARGIN_Y + 4 * CELL_HEIGHT
    );

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
          setText("The player cannot move forward");
          setTimeout(() => {
            closeText();
            props.mutex.release();
          }, 1750);
        } else {
          // Display the number of steps
          setText(steps.toString());
          // Set a timeout to wait a bit so the user can see the number of steps
          setTimeout(() => {
            closeText();
            const timelineMF = gsap.timeline();
            currentAnim.current = timelineMF;
            for (let i = 0; i < steps; i++) {
              currentAnim.current?.to(playerRef.current?.position!, {
                z: PLAYER_POS_Y.current - CELL_HEIGHT,
                onComplete: () => {
                  // If a treasure is encoutered
                  let treasure = false;
                  // Check if the pawn is interacting with a treasure
                  if (
                    treasureFlags.length > 0 &&
                    index < treasureFlags.length
                  ) {
                    const [treasureY, treasureX] = treasureFlags[index];
                    const currentY = playerPosition[0] - i - 1;
                    const currentX = playerPosition[1];

                    if (currentY === treasureY && currentX === treasureX) {
                      currentAnim.current?.pause();
                      treasure = true;
                      props.playerMovement(
                        props.maze,
                        [currentY, currentX],
                        true
                      );

                      // Get an info which have never been displayed
                      let randIndexQuote = Math.floor(
                        Math.random() * Informations.length
                      );
                      while (alreadyShown.current.includes(randIndexQuote)) {
                        randIndexQuote = Math.floor(
                          Math.random() * Informations.length
                        );
                      }
                      alreadyShown.current.push(randIndexQuote);

                      setText(Informations[randIndexQuote]);
                      index++;
                    }
                  }

                  // At the end of the animation
                  if (i === steps - 1) {
                    // Move the pawn and release the mutex
                    props.playerMovement(
                      props.maze,
                      [playerPosition[0] - steps, playerPosition[1]],
                      false
                    );
                    props.mutex.release();
                  }

                  // Check if this is the exit
                  if (
                    i === steps - 1 &&
                    playerPosition[0] - i - 1 === 0 &&
                    playerPosition[1] === 0 &&
                    exitFlag
                  ) {
                    setText(
                      "You've succeeded to escape the maze ! Congratulations !"
                    );
                    setTimeout(() => {
                      props.mutex.release();
                      props.playerExit();
                    }, 2000);
                  }

                  // Pause or continue animation based on the step count
                  if (i < steps - 1 && !treasure) {
                    currentAnim.current?.pause();
                    setTimeout(() => currentAnim.current?.play(), 500);
                  }
                },
              });
              PLAYER_POS_Y.current -= CELL_HEIGHT;
            }
            currentAnim.current?.play();
          }, 1750);
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

        if (steps === 0) {
          setText("The player cannot move backward");
          setTimeout(() => {
            closeText();
            props.mutex.release();
          }, 1750);
        } else {
          // Display the number of steps
          setText(steps.toString());
          // Set a timeout to wait a bit so the user can see the number of steps
          setTimeout(() => {
            closeText();
            const timelineMB = gsap.timeline();
            currentAnim.current = timelineMB;
            for (let i = 0; i < steps; i++) {
              currentAnim.current?.to(playerRef.current?.position!, {
                z: PLAYER_POS_Y.current + CELL_HEIGHT,
                onComplete: () => {
                  // If a treasure is encoutered
                  let treasure = false;
                  // Check if the pawn is interacting with a treasure
                  if (
                    treasureFlags.length > 0 &&
                    index < treasureFlags.length
                  ) {
                    const [treasureY, treasureX] = treasureFlags[index];
                    const currentY = playerPosition[0] + i + 1;
                    const currentX = playerPosition[1];

                    if (currentY === treasureY && currentX === treasureX) {
                      currentAnim.current?.pause();
                      treasure = true;
                      props.playerMovement(
                        props.maze,
                        [currentY, currentX],
                        true
                      );

                      // Get an info which have never been displayed
                      let randIndexQuote = Math.floor(
                        Math.random() * Informations.length
                      );
                      while (alreadyShown.current.includes(randIndexQuote)) {
                        randIndexQuote = Math.floor(
                          Math.random() * Informations.length
                        );
                      }
                      alreadyShown.current.push(randIndexQuote);

                      setText(Informations[randIndexQuote]);
                      index++;
                    }
                  }

                  // At the end of the animation
                  if (i === steps - 1) {
                    // Move the pawn and release the mutex
                    props.playerMovement(
                      props.maze,
                      [playerPosition[0] + steps, playerPosition[1]],
                      false
                    );
                    props.mutex.release();
                  }

                  // Check if this is the exit
                  if (
                    i === steps - 1 &&
                    playerPosition[0] + i + 1 === 0 &&
                    playerPosition[1] === 0 &&
                    exitFlag
                  ) {
                    setText(
                      "You've succeeded to escape the maze ! Congratulations !"
                    );
                    setTimeout(() => {
                      props.mutex.release();
                      props.playerExit();
                    }, 2000);
                  }

                  // Pause or continue animation based on the step count
                  if (i < steps - 1 && !treasure) {
                    currentAnim.current?.pause();
                    setTimeout(() => currentAnim.current?.play(), 500);
                  }
                },
              });
              PLAYER_POS_Y.current += CELL_HEIGHT;
            }

            currentAnim.current?.play();
          }, 1750);
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
          setText("The player cannot move left");
          setTimeout(() => {
            closeText();
            props.mutex.release();
          }, 1750);
        } else {
          // Display the number of steps
          setText(steps.toString());
          // Set a timeout to wait a bit so the user can see the number of steps
          setTimeout(() => {
            closeText();
            const timelineML = gsap.timeline();
            currentAnim.current = timelineML;
            for (let i = 0; i < steps; i++) {
              currentAnim.current?.to(playerRef.current?.position!, {
                x: PLAYER_POS_X.current - CELL_WIDTH,
                onComplete: () => {
                  // If a treasure is encoutered
                  let treasure = false;
                  // Check if the pawn is interacting with a treasure
                  if (
                    treasureFlags.length > 0 &&
                    index < treasureFlags.length
                  ) {
                    const [treasureY, treasureX] = treasureFlags[index];
                    const currentY = playerPosition[0];
                    const currentX = playerPosition[1] - i - 1;

                    if (currentY === treasureY && currentX === treasureX) {
                      currentAnim.current?.pause();
                      treasure = true;
                      props.playerMovement(
                        props.maze,
                        [currentY, currentX],
                        true
                      );

                      // Get an info which have never been displayed
                      let randIndexQuote = Math.floor(
                        Math.random() * Informations.length
                      );
                      while (alreadyShown.current.includes(randIndexQuote)) {
                        randIndexQuote = Math.floor(
                          Math.random() * Informations.length
                        );
                      }
                      alreadyShown.current.push(randIndexQuote);

                      setText(Informations[randIndexQuote]);
                      index++;
                    }
                  }

                  // At the end of the animation
                  if (i >= steps - 1) {
                    // Move the pawn and release the mutex
                    props.playerMovement(
                      props.maze,
                      [playerPosition[0], playerPosition[1] - steps],
                      false
                    );
                    props.mutex.release();
                  }

                  // Check if this is the exit
                  if (
                    i === steps - 1 &&
                    playerPosition[0] === 0 &&
                    playerPosition[1] - i - 1 === 0 &&
                    exitFlag
                  ) {
                    setText(
                      "You've succeeded to escape the maze ! Congratulations !"
                    );
                    setTimeout(() => {
                      props.mutex.release();
                      props.playerExit();
                    }, 2000);
                  }

                  // Pause or continue animation based on the step count
                  if (i < steps - 1 && !treasure) {
                    currentAnim.current?.pause();
                    setTimeout(() => currentAnim.current?.play(), 500);
                  }
                },
              });
              PLAYER_POS_X.current -= CELL_WIDTH;
            }
            currentAnim.current?.play();
          }, 1750);
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
          setText("The player cannot move right");
          setTimeout(() => {
            closeText();
            props.mutex.release();
          }, 1750);
        } else {
          // Display the number of steps
          setText(steps.toString());
          // Set a timeout to wait a bit so the user can see the number of steps
          setTimeout(() => {
            closeText();
            const timelineMR = gsap.timeline();
            currentAnim.current = timelineMR;
            for (let i = 0; i < steps; i++) {
              currentAnim.current?.to(playerRef.current?.position!, {
                x: PLAYER_POS_X.current + CELL_WIDTH,
                onComplete: () => {
                  // If a treasure is encoutered
                  let treasure = false;
                  // Check if the pawn is interacting with a treasure
                  if (
                    treasureFlags.length > 0 &&
                    index < treasureFlags.length
                  ) {
                    const [treasureY, treasureX] = treasureFlags[index];
                    const currentY = playerPosition[0];
                    const currentX = playerPosition[1] + i + 1;

                    if (currentY === treasureY && currentX === treasureX) {
                      currentAnim.current?.pause();
                      treasure = true;
                      props.playerMovement(
                        props.maze,
                        [currentY, currentX],
                        true
                      );

                      // Get an info which have never been displayed
                      let randIndexQuote = Math.floor(
                        Math.random() * Informations.length
                      );
                      while (alreadyShown.current.includes(randIndexQuote)) {
                        randIndexQuote = Math.floor(
                          Math.random() * Informations.length
                        );
                      }
                      alreadyShown.current.push(randIndexQuote);

                      setText(Informations[randIndexQuote]);
                      index++;
                    }
                  }

                  // At the end of the animation
                  if (i === steps - 1) {
                    // Move the pawn and release the mutex
                    props.playerMovement(
                      props.maze,
                      [playerPosition[0], playerPosition[1] + steps],
                      false
                    );
                    props.mutex.release();
                  }

                  // Check if this is the exit
                  if (
                    i === steps - 1 &&
                    playerPosition[0] === 0 &&
                    playerPosition[1] + i + 1 === 0 &&
                    exitFlag
                  ) {
                    setText(
                      "You've succeeded to escape the maze ! Congratulations !"
                    );
                    setTimeout(() => {
                      props.mutex.release();
                      props.playerExit();
                    }, 2000);
                  }

                  // Pause or continue animation based on the step count
                  if (i < steps - 1 && !treasure) {
                    currentAnim.current?.pause();
                    setTimeout(() => currentAnim.current?.play(), 500);
                  }
                },
              });
              PLAYER_POS_X.current += CELL_WIDTH;
            }

            currentAnim.current?.play();
          }, 1750);
        }
      }
    );

    // Attack the ennemy
    const attack = contextSafe((side: number, playerPosition: number[]) => {
      const timeLineAttack = gsap.timeline();

      switch (side) {
        // When there are no ennemies
        case -1:
          setText("There are no enemies to attack");
          setTimeout(() => {
            closeText();
            props.mutex.release();
          }, 1750);
          break;
        // Top
        case 0:
          timeLineAttack.to(playerRef.current?.position!, {
            z: PLAYER_POS_Y.current - CELL_HEIGHT / 2,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              // Get an info which have never been displayed
              let randIndexQuote = Math.floor(
                Math.random() * Informations.length
              );
              while (alreadyShown.current.includes(randIndexQuote)) {
                randIndexQuote = Math.floor(
                  Math.random() * Informations.length
                );
              }
              alreadyShown.current.push(randIndexQuote);
              // Display text informations
              setText(Informations[randIndexQuote]);

              const enemyPos = [playerPosition[0] - 1, playerPosition[1]];
              props.playerAttack(props.maze, enemyPos);
              props.mutex.release();
            },
          });
          break;
        // Right
        case 1:
          timeLineAttack.to(playerRef.current?.position!, {
            x: PLAYER_POS_X.current + CELL_WIDTH / 2,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              // Get an info which have never been displayed
              let randIndexQuote = Math.floor(
                Math.random() * Informations.length
              );
              while (alreadyShown.current.includes(randIndexQuote)) {
                randIndexQuote = Math.floor(
                  Math.random() * Informations.length
                );
              }
              alreadyShown.current.push(randIndexQuote);
              // Display text informations
              setText(Informations[randIndexQuote]);

              const enemyPos = [playerPosition[0], playerPosition[1] + 1];
              props.playerAttack(props.maze, enemyPos);
              props.mutex.release();
            },
          });
          break;
        // Bottom
        case 2:
          timeLineAttack.to(playerRef.current?.position!, {
            z: PLAYER_POS_Y.current + CELL_HEIGHT / 2,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              // Get an info which have never been displayed
              let randIndexQuote = Math.floor(
                Math.random() * Informations.length
              );
              while (alreadyShown.current.includes(randIndexQuote)) {
                randIndexQuote = Math.floor(
                  Math.random() * Informations.length
                );
              }
              alreadyShown.current.push(randIndexQuote);
              // Display text informations
              setText(Informations[randIndexQuote]);

              const enemyPos = [playerPosition[0] + 1, playerPosition[1]];
              props.playerAttack(props.maze, enemyPos);
              props.mutex.release();
            },
          });
          break;
        // Left
        case 3:
          timeLineAttack.to(playerRef.current?.position!, {
            x: PLAYER_POS_X.current - CELL_WIDTH / 2,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              // Get an info which have never been displayed
              let randIndexQuote = Math.floor(
                Math.random() * Informations.length
              );
              while (alreadyShown.current.includes(randIndexQuote)) {
                randIndexQuote = Math.floor(
                  Math.random() * Informations.length
                );
              }
              alreadyShown.current.push(randIndexQuote);
              // Display text informations
              setText(Informations[randIndexQuote]);

              const enemyPos = [playerPosition[0], playerPosition[1] - 1];
              props.playerAttack(props.maze, enemyPos);
              props.mutex.release();
            },
          });
          break;
      }
    });

    // Close the information text
    const closeText = contextSafe(() => {
      setText("");
    });

    return (
      <>
        {/* Information screen */}
        {text != "" && <InformationScreen text={text} closeText={closeText} />}
        {/* Meshes */}
        <mesh scale={props.scale} ref={meshRef}>
          {/* Table */}
          <Table position={[0, -2, -6]} rotation={[0, 1.57, 0]} scale={6} />
          <Table position={[0, -2, 0.3]} rotation={[0, 1.57, 0]} scale={6} />
          <Table position={[0, -2, 6]} rotation={[0, 1.57, 0]} scale={6} />
          {/* Board */}
          <GameBoard
            position={[0, 1.05, -2.1]}
            rotation={[1.57, 0, 0]}
            scale={3}
          />

          {/* Bread */}
          <Bread
            position={[-4.9, 1.8, -2.6]}
            rotation={[0, 0, 0]}
            scale={0.3}
          />

          {/* Coins */}
          <Coins
            position={[4, 0.8, -1.5]}
            rotation={[0, 3.2, 0]}
            scale={0.01}
          />

          {/* Mug */}
          <Mug
            position={[-1.5, 0.8, -3.5]}
            rotation={[0, 1.6, 0]}
            scale={0.65}
          />

          {/* Parchment */}
          <Parchment position={[5, 1, 1.4]} rotation={[0, 2.6, 0]} scale={6} />
          <Parchment
            position={[4.8, 1, 1.6]}
            rotation={[0, 2.6, 0]}
            scale={6}
          />

          {/* Torches & Light */}
          {/* Top side */}
          <Torch
            position={[-1.5, 1, -1.25]}
            rotation={[0, 0, 0]}
            scale={0.009}
          />
          <pointLight
            position={[-1.5, 1.3, -1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>
          <Torch position={[0, 1, -1.25]} rotation={[0, 0, 0]} scale={0.009} />
          <pointLight
            position={[0, 1.3, -1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>
          <Torch
            position={[1.7, 1, -1.25]}
            rotation={[0, 0, 0]}
            scale={0.009}
          />
          <pointLight
            position={[1.7, 1.3, -1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>

          {/* Bottom side */}
          <Torch
            position={[-1.5, 1, 1.25]}
            rotation={[0, 3.2, 0]}
            scale={0.009}
          />
          <pointLight
            position={[-1.5, 1.3, 1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>
          <Torch position={[0, 1, 1.25]} rotation={[0, 3.2, 0]} scale={0.009} />
          <pointLight
            position={[0, 1.3, 1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>
          <Torch
            position={[1.7, 1, 1.25]}
            rotation={[0, 3.2, 0]}
            scale={0.009}
          />
          <pointLight
            position={[1.7, 1.3, 1.25]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>

          {/* Left */}
          <Torch position={[2, 1, 0]} rotation={[0, -1.6, 0]} scale={0.009} />
          <pointLight
            position={[2, 1.3, 0]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>

          {/* Right */}
          <Torch position={[-2, 1, 0]} rotation={[0, 1.6, 0]} scale={0.009} />
          <pointLight
            position={[-2, 1.3, 0]}
            intensity={0.11}
            color={"#c56f28"}
          ></pointLight>

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
                  <WallH
                    key={`topWall-${cell.x}-${cell.y}`}
                    position={[
                      CELL_X_POS,
                      CELL_Z_POS,
                      CELL_Y_POS - CELL_HEIGHT / 2,
                    ]}
                    rotation={[0, 0, 0]}
                    scale={[1.38, 0.9, 1]}
                  />
                );
              }
              // Right Wall
              if (cell.right) {
                cells.push(
                  <WallV
                    key={`rightWall-${cell.x}-${cell.y}`}
                    position={[
                      CELL_X_POS + CELL_WIDTH / 2,
                      CELL_Z_POS - 0.0447,
                      CELL_Y_POS,
                    ]}
                    rotation={[0, -1.571, 0]}
                    scale={[1.6, 1.06186, 1.5]}
                  />
                );
              }
              // Bottom Wall
              if (cell.bottom) {
                cells.push(
                  <WallH
                    key={`bottomWall-${cell.x}-${cell.y}`}
                    position={[
                      CELL_X_POS,
                      CELL_Z_POS,
                      CELL_Y_POS + CELL_HEIGHT / 2,
                    ]}
                    rotation={[0, 3.147, 0]}
                    scale={[1.38, 0.9, 1]}
                  />
                );
              }
              // Left Wall
              if (cell.left) {
                cells.push(
                  <WallV
                    key={`leftWall-${cell.x}-${cell.y}`}
                    position={[
                      CELL_X_POS - CELL_WIDTH / 2,
                      CELL_Z_POS - 0.0447,
                      CELL_Y_POS,
                    ]}
                    rotation={[0, 1.571, 0]}
                    scale={[1.6, 1.06186, 1.5]}
                  />
                );
              }

              // Maze exit
              if (cell.exit) {
                cells.push(
                  <Exit
                    key={`exit`}
                    position={[CELL_X_POS - 0.22, CELL_Z_POS, CELL_Y_POS - 0.1]}
                    rotation={[0, 0.7, 0]}
                    scale={0.25}
                  />
                );
              }
              // Treasures
              if (cell.treasure) {
                cells.push(
                  <Chest
                    key={`treasure-${cell.x}-${cell.y}`}
                    position={[CELL_X_POS, CELL_Z_POS, CELL_Y_POS]}
                    rotation={[0, 0, 0]}
                    scale={0.25}
                  />
                );
              }
              // Ennemies
              if (cell.ennemy) {
                cells.push(
                  <Enemy
                    key={`ennemy-${cell.x}-${cell.y}`}
                    position={[CELL_X_POS, CELL_Z_POS - 0.16, CELL_Y_POS]}
                    rotation={[0, 0, 0]}
                    scale={7}
                  ></Enemy>
                );
              }

              // Player
              if (cell.player) {
                PLAYER_POS_X.current = CELL_X_POS;
                PLAYER_POS_Y.current = CELL_Y_POS;
                cells.push(
                  <Player
                    ref={playerRef}
                    key={`player`}
                    position={[
                      PLAYER_POS_X.current,
                      CELL_Z_POS,
                      PLAYER_POS_Y.current,
                    ]}
                    rotation={[0, 0, 0]}
                    scale={0.08}
                  />
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

Board.displayName = "Board";

export default Board;
