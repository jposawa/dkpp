export type StateAttributes = {
	path: string;
	steps: number;
	imgWidth: number;
	imgHeight: number;
};

export type SpriteDirection = "forward" | "rewind";

export type ButtonType = "button" | "submit" | "reset";

export type AvailableState = "IDLE" | "WALK" | "RUN" | "HURT" | "DEAD";

export type Sprite = {
	steps: number;
	fps: number;
	direction: SpriteDirection;
	goToAndPlay: (param1: number) => void;
};

export type AvailableActor =
	| "wandererMagician"
	| "lightningMage"
	| "fireWizard";

export type CharacterAnimator = {
	actorKey: AvailableActor;
	currentState: AvailableState;
	id: string;
};
