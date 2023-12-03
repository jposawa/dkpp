import { atom } from "recoil";
import { PREFIX } from "../constants";

export const showMoveState = atom<boolean>({
	key: `${PREFIX}showMove`,
	default: false,
});
