export type StateAttributes = {
	path: string;
	steps: number;
	imgWidth: number;
	imgHeight: number;
};

export type Sprite = {
	steps: number;
	fps: number;
	goToAndPlay: (param1: number) => void;
};
