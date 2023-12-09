import { atom } from "recoil";
import { PREFIX } from "../constants";
import { AvailableActor, GroupCharacter } from "../types";

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

export const currentMainActorState = atom<AvailableActor>({
	key: `${PREFIX}currentMainActor`,
	default: "wandererMagician",
});

export const turnCharactersListState = atom<GroupCharacter[]>({
	key: `${PREFIX}turnCharactersList`,
	default: [],
});

export const playerGroupListState = atom<GroupCharacter[]>({
	key: `${PREFIX}playerGroupList`,
	default: [],
});

export const enemyGroupListState = atom<GroupCharacter[]>({
	key: `${PREFIX}enemyGroupList`,
	default: [],
});

export const isWaitingPlayerTurnState = atom<boolean>({
	key: `${PREFIX}isWaitingPlayerTurn`,
	default: false,
});
