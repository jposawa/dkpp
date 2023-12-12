import { capitalizeString } from "./index";
import { DEFAULT_STATE_SETTINGS } from "../constants";
import { AvailableState, GroupCharacter, StateAttributes } from "../types";

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

export const getInitialSlot = (
	groupCharacter: GroupCharacter,
	options: {
		gridIdOverride?: number;
		supposedInitialSlot?: string;
	} = {}
) => {
	const { gridIdOverride, supposedInitialSlot } = options;
	const gridNumber = groupCharacter.initialSlotNumber ?? gridIdOverride;
	const gridId = `gridContainer${
		groupCharacter.isPlayerGroup ? "Left" : "Right"
	}_slot${gridNumber}`;

	const initialSlot =
		groupCharacter.currentSlot || supposedInitialSlot || gridId;

	return initialSlot;
};

export const defineGroupSlots = (group: GroupCharacter[]) => {
	const updatedGroup = group.map((groupCharacter, index) => {
		if (!groupCharacter) {
			return null;
		}

		return {
			...groupCharacter,
			currentSlot: getInitialSlot(groupCharacter, {
				gridIdOverride: groupCharacter.initialSlotNumber ?? index,
			}),
		};
	});

	return updatedGroup.filter(
		(groupCharacter) => !!groupCharacter
	) as GroupCharacter[];
};
