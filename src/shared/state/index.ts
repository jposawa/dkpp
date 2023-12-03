import { atom } from "recoil";
import { PREFIX } from "../constants";

export const showMoveState = atom<boolean>({
	key: `${PREFIX}showMove`,
	default: false,
});

export const currentPositionState = atom<Record<string, number>>({
	key: `${PREFIX}currentPosition`,
	default: {},
});

export const currentSlotState = atom<string | null>({
	key: `${PREFIX}currentSlot`,
	default: "gridSlot3",
});
