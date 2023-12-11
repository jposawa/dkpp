import React from "react";
import { useRecoilState } from "recoil";
import { turnCountState } from "../state";

export const useTurnControl = () => {
	const [turnCount, setTurnCount] = useRecoilState(turnCountState);

	/**
	 * @param {number} turnNumber (Optional) Override the sequence and set directly the turn count
	 */
	const passTurn = React.useCallback(
		(turnNumber?: number) => {
			setTurnCount(turnNumber ?? turnCount + 1);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[turnCount]
	);

	return React.useMemo(
		() => ({
			passTurn,
		}),
		[passTurn]
	);
};
