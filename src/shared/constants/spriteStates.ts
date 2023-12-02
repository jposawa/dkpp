import { StateAttributes } from "../types";

export const STATE: Record<string, StateAttributes> = {
  IDLE: {
    path: "./assets/sprites/wandererMagician/Idle.png",
    steps: 8,
    imgWidth: 1024,
    imgHeight: 128,
  },
  DEAD: {
    path: "./assets/sprites/wandererMagician/Dead.png",
    steps: 4,
    imgWidth: 512,
    imgHeight: 128,
  },
  HURT: {
    path: "./assets/sprites/wandererMagician/Hurt.png",
    steps: 4,
    imgWidth: 512,
    imgHeight: 128,
  },
  WALK: {
    path: "./assets/sprites/wandererMagician/Walk.png",
    steps: 7,
    imgWidth: 512,
    imgHeight: 128,
  },
  RUN: {
    path: "./assets/sprites/wandererMagician/Run.png",
    steps: 8,
    imgWidth: 512,
    imgHeight: 128,
  },
};