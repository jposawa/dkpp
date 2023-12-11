import React from "react";
import { useRecoilState } from "recoil";
import { Button, SlotMarker } from "..";

import styles from "./GridButton.module.scss";
import {
	showMoveState,
	turnCharactersListState,
} from "@/shared/state";
import { cloneObj } from "@/shared/utils";
import { GroupCharacter } from "@/shared/types";
import { useTurnControl } from "@/shared/hooks";

export type GridButton = {
	id?: string;
};

export const GridButton = ({ id }: GridButton) => {
	const [showMove, setShowMove] = useRecoilState(showMoveState);
	const [turnCharactersList, setTurnCharactersList] = useRecoilState(
		turnCharactersListState
	);
  const { passTurn } = useTurnControl();

	const showMoveMarker = React.useMemo(() => {
		// console.log(turnCharactersList);
		const [turnCharacter] = turnCharactersList;
		const slotElement = document.getElementById(id!);
		const parentElement = slotElement?.parentElement;
		const sideId = `gridContainer${
			turnCharacter?.isPlayerGroup ? "Left" : "Right"
		}`;

		return (
			showMove &&
			turnCharacter?.currentSlot !== id &&
			parentElement?.id === sideId
		);
	}, [id, showMove, turnCharactersList]);

	const setMoveTarget = () => {
		if (id && showMoveMarker) {
			const currentSlotCharacterIndex = turnCharactersList.findIndex(
				(groupCharacter) => groupCharacter.currentSlot === id
			);

			const [turnCharacter] = turnCharactersList;
			const newTurnCharacter = cloneObj(turnCharacter) as GroupCharacter;
			const newTurnList = cloneObj(turnCharactersList) as GroupCharacter[];

			if (currentSlotCharacterIndex >= 0) {
				const currentSlotGroupCharacter =
					turnCharactersList[currentSlotCharacterIndex];
				newTurnList[currentSlotCharacterIndex] = {
					...currentSlotGroupCharacter,
					currentSlot: newTurnCharacter.currentSlot,
				};
			}

			newTurnCharacter.currentSlot = id;
			newTurnList[0] = newTurnCharacter;
			// newTurnList.shift();
			// newTurnList.push(newTurnCharacter);

			setTurnCharactersList(newTurnList);
			setShowMove(false);

      //TODO: Improve animation flow to trigger next turn
			setTimeout(() => {
				passTurn();
			}, 1000);
		}
	};

	return (
		<span id={id} className={styles.gridButton}>
			<span className={styles.background} />

			<Button
				title="Grid button"
				className={styles.interactiveButton}
				onClick={setMoveTarget}
				disabled={!showMoveMarker}
			>
				{showMoveMarker && <SlotMarker className={styles.floating} />}
			</Button>
		</span>
	);
};
