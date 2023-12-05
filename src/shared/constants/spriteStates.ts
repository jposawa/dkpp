import { AvailableState, StateAttributes } from "../types";

export const DEFAULT_STATE_NAMES: AvailableState[] = [
	"IDLE",
	"DEAD",
	"HURT",
	"WALK",
	"RUN",
];

export const DEFAULT_STATE_SETTINGS: Record<
	AvailableState,
	Record<string, number>
> = {
	IDLE: {
		steps: 8,
	},
	DEAD: {
		steps: 4,
	},
	HURT: {
		steps: 4,
	},
	WALK: {
		steps: 7,
	},
	RUN: {
		steps: 8,
	},
};

export const ACTOR_STATES_SETTINGS = {
  wandererMagician: {
    IDLE: {
      steps: 8,
    },
    DEAD: {
      steps: 4,
    },
    HURT: {
      steps: 4,
    },
    WALK: {
      steps: 7,
    },
    RUN: {
      steps: 8,
    },
  },
  fireWizard: {
    IDLE: {
      steps: 7,
    },
    DEAD: {
      steps: 6,
    },
    HURT: {
      steps: 3,
    },
    WALK: {
      steps: 6,
    },
    RUN: {
      steps: 8,
    },
  },
  lightningMage: {
    IDLE: {
      steps: 7,
    },
    DEAD: {
      steps: 5,
    },
    HURT: {
      steps: 3,
    },
    WALK: {
      steps: 7,
    },
    RUN: {
      steps: 8,
    },
  },
}

// Ideally all the states would have the same number of steps
// or, at least, fewer changes
// TODO: Create a dynamic method to return this with less code repetition
export const DEFAULT_STATE: Record<
	string,
	Record<AvailableState, StateAttributes>
> = {
  wandererMagician: {
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
  },
};
