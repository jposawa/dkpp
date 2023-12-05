import { AvailableActor } from "../types";

export * from "./spriteStates";

export const PREFIX = "dkpp_";

export const ACTOR_STATES = ["Idle", "Walk", "Run", "Hurt", "Dead"];

export const CONFIG = {
	SPRITE: {
		BASE_SIZE: 128,
		OFFSET: {
			X: 32, // Width / 4
			Y: 86, // (Height * 3 / 4) - 10
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
