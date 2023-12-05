import { capitalizeString } from "./index";
import { DEFAULT_STATE_SETTINGS } from "../constants";
import { AvailableState, StateAttributes } from "../types";

type getSpriteStatesOptions = {
	imgHeight?: number;
	statesSettings?: Record<AvailableState, Record<string, number>>;
	imgExtension?: "png" | "jpg";
};

export const getSpriteStates = (
	actorKey: string,
	options?: getSpriteStatesOptions
) => {
	const {
		imgHeight = 128,
		statesSettings = DEFAULT_STATE_SETTINGS,
		imgExtension = "png",
	} = options || {};
	const basePath = `./assets/sprites/${actorKey}`;
	const baseState = {
		imgHeight,
	};
	const spriteStates: Record<string, StateAttributes> = {};

	if (!Object.keys(statesSettings).length) {
		return null;
	}

	Object.entries(statesSettings).forEach(([stateKey, { steps }]) => {
		spriteStates[stateKey] = {
			...baseState,
			path: `${basePath}/${capitalizeString(stateKey)}.${imgExtension}`,
			steps,
			imgWidth: imgHeight * steps,
		};
	});

	return spriteStates;
};
