import { AvailableActor } from "../types";

export * from "./spriteStates";
export * from "./character";

export const PREFIX = "dkpp_";

export const ACTOR_STATES = ["Idle", "Walk", "Run", "Hurt", "Dead"];

export const CONFIG = {
	SPRITE: {
		BASE_SIZE: 128,
		OFFSET: {
			X: 20, // (Width / 32) * 5
			Y: 24, // (Height / 32) * 6
		},
	},
	DYNAMIC_STEPS: true,
  KEYBOARD_MOVEMENT: false,
};

export const ACTOR_NAMES: Record<AvailableActor, string> = {
  wandererMagician: "Magician",
  lightningMage: "Mage",
  fireWizard: "Wizard"
}
