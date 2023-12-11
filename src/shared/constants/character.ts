import { Character, GroupCharacter } from "../types";

export const mainCharacter: Character = {
	id: "mainCharacter",
	name: "Proto Gonista",
	animator: {
		actorKey: "wandererMagician",
		currentState: "IDLE",
		id: "mainAnimator",
	},
};

export const mainGroupCharacter: GroupCharacter = {
	character: mainCharacter,
	initialSlotNumber: 3,
	currentSlot: "",
	position: {
		x: 0,
		y: 0,
	},
	isPlayerGroup: true,
};

export const mockEnemyCharacter: Character = {
	id: "enemy-01",
	name: "Main enemy",
	animator: {
		actorKey: "fireWizard",
		currentState: "IDLE",
		id: "enemy01Animator",
	},
};

export const mockEnemyGroupCharacter1: GroupCharacter = {
	character: mockEnemyCharacter,
	initialSlotNumber: null,
	currentSlot: "",
	isPlayerGroup: false,
	position: {
		x: 0,
		y: 0,
	},
};

export const mockEnemyGroupCharacter2: GroupCharacter = {
	character: {
		...mockEnemyCharacter,
		animator: { ...mockEnemyCharacter.animator, actorKey: "lightningMage" },
	},
	initialSlotNumber: null,
	currentSlot: "",
	isPlayerGroup: false,
	position: {
		x: 0,
		y: 0,
	},
};

export const mockEnemyGroup = [
	mockEnemyGroupCharacter1,
	0,
	mockEnemyGroupCharacter2,
];
