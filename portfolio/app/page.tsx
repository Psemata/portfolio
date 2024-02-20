"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh } from "three";

// Used to check if the element are placed correctly
import { OrbitControls } from "@react-three/drei";

// Custom mesh and their types
import Board, { Cell, Maze } from "@/components/3d/Board";
import Hand, { CardInfo } from "@/components/3d/Hand";
import { CARD_BASE, CARD_CONFIG } from "@/lib/cardconfig";

// This component is used as the Game Controller of the app => all the game logic will depart from here

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

// Hand configs
// Generating a number between 1 and 5 (for the card configuration)
const generateRandomCardConfig = () => {
  return Math.floor(Math.random() * 6);
};

// Generate a hand and their refs
const generateRandomHand = (): CardInfo[] => {
  const handInfos: CardInfo[] = [
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
    {
      cardBase: CARD_BASE,
      cardConfig: CARD_CONFIG[generateRandomCardConfig()],
    },
  ];

  return handInfos;
};

const Scene = () => {
  // Board animation
  const boardRef = useRef<Mesh>(null);

  // Maze Creation
  const [maze, setMaze] = useState(generateMaze(5, 5, 3, 3));

  // Hand of cards and their refs
  const [hand, setHand] = useState(generateRandomHand());
  const [refs, setRefs] = useState([
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
  ]);

  // When a card is used, remove the card from the hand
  const onCardUsed = (index: number) => {
    // Use the card and update the hand
    setHand(hand.filter((_, i) => i != index));
    setRefs(refs.filter((_) => _ != null));

    // Use the card on the board
    

    // Update the board
  };

  // Movement of the board on the mouse movements
  useFrame((state, delta) => {
    boardRef.current!.position.z = THREE.MathUtils.lerp(
      boardRef.current!.position.z,
      (state.pointer.y * Math.PI) / 100,
      0.05
    );
    boardRef.current!.position.x = THREE.MathUtils.lerp(
      boardRef.current!.position.x,
      (state.pointer.x * Math.PI) / 100,
      0.05
    );
  });

  return (
    <>
      <Board maze={maze} ref={boardRef} />
      <Hand handInfos={hand} handRefs={refs} onCardUsed={onCardUsed} />
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
