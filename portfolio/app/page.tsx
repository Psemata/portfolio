"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Mutex } from "async-mutex";

// Used to check if the element are placed correctly
import { OrbitControls } from "@react-three/drei";

// Custom types
import { CARD_BASE, CARD_CONFIG, CardType } from "@/config/cardconfig";
import { BoardAnimationHandle, Cell, Maze } from "@/types/board";
import { CardInfo } from "@/types/hand";

// Custom component - 3D Meshes
import Board from "@/components/game/3d/Board";
import Hand from "@/components/game/3d/Hand";

// This component is used as the Game Controller of the app => all the game logic will depart from here

const Scene = () => {
  // Mutex
  const [mutex, setMutex] = useState(new Mutex());

  // Maze configs
  // Generate the maze of the board
  const generateMaze = (
    rows: number,
    cols: number,
    treasures: number,
    ennemies: number
  ): Maze => {
    // Generate array for the maze full of walls
    const maze: Maze = {
      paths: Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => ({
          x,
          y,
          top: true,
          right: true,
          bottom: true,
          left: true,
          visited: false,
        }))
      ),
    };

    // Create an array of cells to be visited (to form the maze)
    const stack: Cell[] = [];
    let currentCell: Cell = maze.paths[0][0];
    currentCell.visited = true;

    stack.push(currentCell);

    // Visit "all" cells of the maze, but with creating the walls between them
    while (stack.length > 0) {
      currentCell = stack.pop()!;
      const { x, y } = currentCell;

      // Find the neighbors of the current cell
      const neighbors = [
        { cell: maze.paths[y - 1]?.[x], direction: "top" },
        { cell: maze.paths[y]?.[x + 1], direction: "right" },
        { cell: maze.paths[y + 1]?.[x], direction: "bottom" },
        { cell: maze.paths[y]?.[x - 1], direction: "left" },
      ];

      neighbors.sort(() => Math.random() - 0.5);

      // If the neighbors are alreay "visited", put on a wall
      for (const { cell, direction } of neighbors) {
        if (cell && !cell.visited) {
          // Wall creation within the maze
          switch (direction) {
            case "top": {
              currentCell.top = false;
              cell.bottom = false;
            }
            case "right": {
              currentCell.right = false;
              cell.left = false;
            }
            case "bottom": {
              currentCell.bottom = false;
              cell.top = false;
            }
            case "left": {
              currentCell.left = false;
              cell.right = false;
            }
          }
          cell.visited = true;
          stack.push(cell);
        }
      }
    }

    // Wall creation on the sides of the maze
    for (const row of maze.paths) {
      for (const cell of row) {
        if (cell.x === 0) {
          cell.left = true;
        }
        if (cell.y === 0) {
          cell.top = true;
        }
        if (cell.x === maze.paths[cell.y].length - 1) {
          cell.right = true;
        }
        if (cell.y === maze.paths.length - 1) {
          cell.bottom = true;
        }
      }
    }

    // Player creation
    const playerX = maze.paths[0].length - 1;
    const playerY = maze.paths.length - 1;
    maze.paths[playerX][playerY].player = true;

    //Exit creation
    if (
      !maze.paths[0][0].exit &&
      !maze.paths[0][0].treasure &&
      !maze.paths[0][0].ennemy &&
      !maze.paths[0][0].player
    ) {
      maze.paths[0][0].exit = true;
    }

    // Treasure creation
    for (let i = 0; i < treasures; i++) {
      const treasureX = Math.floor(Math.random() * cols);
      const treasureY = Math.floor(Math.random() * rows);

      if (
        !maze.paths[treasureX][treasureY].exit &&
        !maze.paths[treasureX][treasureY].treasure &&
        !maze.paths[treasureX][treasureY].ennemy &&
        !maze.paths[treasureX][treasureY].player
      ) {
        maze.paths[treasureX][treasureY].treasure = true;
      }
    }

    // Ennemy creation
    for (let i = 0; i < ennemies; i++) {
      const ennemyX = Math.floor(Math.random() * cols);
      const ennemyY = Math.floor(Math.random() * rows);
      if (
        !maze.paths[ennemyX][ennemyY].exit &&
        !maze.paths[ennemyX][ennemyY].treasure &&
        !maze.paths[ennemyX][ennemyY].ennemy &&
        !maze.paths[ennemyX][ennemyY].player
      ) {
        maze.paths[ennemyX][ennemyY].ennemy = true;
      }
    }

    return maze;
  };

  // Find the player in the maze
  const findPlayer = (): number[] => {
    let playerPos = [-1, -1];
    maze.current.paths.map((row) => {
      row.map((cell) => {
        if (cell.player) {
          playerPos = [cell.x, cell.y];
        }
      });
    });
    return playerPos;
  };

  // Refs
  // Board ref
  const boardRef = useRef<BoardAnimationHandle>(null);

  // Maze
  const maze = useRef(generateMaze(5, 5, 3, 3));

  // Animation
  // Movement of the board on the mouse movements
  useFrame((state, delta) => {
    boardRef.current!.boardMeshRef().position.z = THREE.MathUtils.lerp(
      boardRef.current!.boardMeshRef().position.z,
      (state.pointer.y * Math.PI) / 100,
      0.05
    );
    boardRef.current!.boardMeshRef().position.x = THREE.MathUtils.lerp(
      boardRef.current!.boardMeshRef().position.x,
      (state.pointer.x * Math.PI) / 100,
      0.05
    );
  });

  // Game functions
  // Play a card
  const onCardUsed = (actionType: CardType, index: number) => {
    // Position of the player (x is 1st and y is 2nd)
    const playerPosition = findPlayer();

    // TODO : Show dice result
    const diceThrow = Math.floor(Math.random() * 4 + 1);

    switch (actionType) {
      // TODO : CHECK FOR TREASURE INTERACTION, ENNEMY, EXIT
      case CardType.Forward: {
        let steps = 0;
        for (let i = 0; i < diceThrow; i++) {
          // End of the maze
          if (playerPosition[1] - i <= 0) {
            break;
          }
          // Wall
          if (
            maze.current.paths[playerPosition[1] - i][playerPosition[0]].top ||
            maze.current.paths[playerPosition[1] - i - 1][playerPosition[0]]
              .bottom
          ) {
            break;
          }
          // Ennemy
          if (
            maze.current.paths[playerPosition[1] - i - 1][playerPosition[0]]
              .ennemy
          ) {
            break;
          }
          // Otherwise, count possible steps
          steps++;
        }
        boardRef.current?.moveForward(steps, playerPosition);
        break;
      }
      case CardType.Backward: {
        let steps = 0;
        for (let i = 0; i < diceThrow; i++) {
          // End of the maze
          if (playerPosition[1] + i >= maze.current.paths.length - 1) {
            break;
          }
          // Wall
          if (
            maze.current.paths[playerPosition[1] + i][playerPosition[0]]
              .bottom ||
            maze.current.paths[playerPosition[1] + i + 1][playerPosition[0]].top
          ) {
            break;
          }
          // Ennemy
          if (
            maze.current.paths[playerPosition[1] + i + 1][playerPosition[0]]
              .ennemy
          ) {
            break;
          }
          // Otherwise, count possible steps
          steps++;
        }
        boardRef.current?.moveBackward(steps, playerPosition);
        break;
      }
      case CardType.Left: {
        let steps = 0;
        for (let i = 0; i < diceThrow; i++) {
          // End of the maze
          if (playerPosition[0] - i <= 0) {
            break;
          }
          // Wall
          if (
            maze.current.paths[playerPosition[1]][playerPosition[0] - i].left ||
            maze.current.paths[playerPosition[1]][playerPosition[0] - i - 1]
              .right
          ) {
            break;
          }
          // Ennemy
          if (
            maze.current.paths[playerPosition[1]][playerPosition[0] - i - 1]
              .ennemy
          ) {
            break;
          }
          // Otherwise, count possible steps
          steps++;
        }
        boardRef.current?.moveLeft(steps, playerPosition);
        break;
      }
      case CardType.Right: {
        let steps = 0;
        for (let i = 0; i < diceThrow; i++) {
          // End of the maze
          if (playerPosition[0] + i >= maze.current.paths[0].length - 1) {
            break;
          }
          // Wall
          if (
            maze.current.paths[playerPosition[1]][playerPosition[0] + i]
              .right ||
            maze.current.paths[playerPosition[1]][playerPosition[0] + i + 1]
              .left
          ) {
            break;
          }
          // Ennemy
          if (
            maze.current.paths[playerPosition[1]][playerPosition[0] + i + 1]
              .ennemy
          ) {
            break;
          }
          // Otherwise, count possible steps
          steps++;
        }

        boardRef.current?.moveRight(steps, playerPosition);
        break;
      }
      case CardType.Attack: {
        boardRef.current?.attack();
        break;
      }
    }
  };

  // Change the position of the player in the maze and update the maze
  const playerMovement = (mazeB: Maze, newPos: number[]): void => {
    mazeB.paths.map((row) => {
      row.map((cell) => {
        if (cell.player) {
          cell.player = false;
        }
      });
    });

    // y is the row, y is the col
    mazeB.paths[newPos[1]][newPos[0]].player = true;

    maze.current = mazeB;
  };

  const playerAttack = (): void => {};

  const playerShield = (): void => {};

  const playerHeal = (): void => {};

  return (
    <>
      <Board
        ref={boardRef}
        mutex={mutex}
        maze={maze.current}
        playerMovement={playerMovement}
        playerAttack={playerAttack}
        playerShield={playerShield}
        playerHeal={playerHeal}
      />
      <Hand mutex={mutex} onCardUsed={onCardUsed} />
    </>
  );
};

const Page = () => {
  return (
    <div className="h-screen">
      {/* Camera options */}
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 4.8, 3.3] }}
        shadows={true}
      >
        {/* Used to check if the element are placed correctly */}
        {/* <OrbitControls /> */}

        {/* Lights */}
        <ambientLight intensity={0.3} color={0xa3a3a3}></ambientLight>
        <directionalLight
          intensity={0.8}
          color={0xffffff}
          position={[0, 10, 0]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Scene and the game */}
        <Scene />
      </Canvas>
    </div>
  );
};

export default Page;
