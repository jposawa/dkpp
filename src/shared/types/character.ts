import { CharacterAnimator } from ".";

export type SlotNumber = 0 | 1 | 2 | 3;

export type Character = {
	id: string;
	name: string;
	animator: CharacterAnimator;
  sheet?: CharacterSheet;
};

export type GroupCharacter = {
	character: Character;
	initialSlotNumber: SlotNumber | null;
	currentSlot: string;
	isPlayerGroup: boolean;
	position: {
		x: number;
		y: number;
	};
};

export type Item = {
	id: string;
	name: string;
	description: string;
	weight: string;
  quantity?: number;
};

export type Skill = {
	id: string;
	name: string;
	linkedAttribute: AttributeKey;
	level: number;
  hasAffinity?: boolean;
  description?: string;
};

export type Trait = {
	id: string;
	name: string;
	description: string;
	cost: number;
	level: number;
	maxLevel?: number;
};

export type Race = {
	id: string;
	name: string;
	description: string;
	traits: Trait[];
};

export type AttributeKey =
	| "fortitude"
	| "coordination"
	| "intelect"
	| "sagacity"
	| "willpower"
	| "presence";

export type Attribute = {
	key: AttributeKey;
	order: number;
	value: 1 | 2 | 3 | 4 | 5 | 6;
};

export type SecondaryAttribute = {
	current: number;
	limit?: number;
	finalLimit?: number;
	finalMultiplier?: number;
	limitBonus?: number;
};

export type SecondaryAttributeKey =
	| "wound"
	| "stress"
	| "resistance"
	| "capacity";

export type CharacterSheet = {
	race: Race;
	attributes: Record<AttributeKey, Attribute>;
	secondaryAttributes: Record<SecondaryAttributeKey, SecondaryAttribute>;
	skills: Record<Skill["id"], Skill>;
	traits: Record<Trait["id"], Trait>;
	inventory: Record<Item["id"], Item>;
	xp: {
    total: number;
		autoUsed: number;
		manualUsed: number;
	};
  portrait?: string;
  binding?: number;
  destiny?: number;
	userId?: string;
};
