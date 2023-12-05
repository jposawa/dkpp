export type StateAttributes = {
	path: string;
	steps: number;
	imgWidth: number;
	imgHeight: number;
};

export type ButtonType = "button" | "submit" | "reset";

export type AvailableState = "IDLE" | "WALK" | "RUN" | "HURT" | "DEAD";

export type Sprite = {
	steps: number;
	fps: number;
  direction: "forward" | "rewind";
	goToAndPlay: (param1: number) => void;
};

export type AvailableActor = "wandererMagician" | "lightningMage" | "fireWizard";
