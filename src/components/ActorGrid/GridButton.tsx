import React from "react";
import { useRecoilState } from "recoil";
import { Button, SlotMarker } from "..";

import styles from "./GridButton.module.scss";
import { showMoveState, turnCharactersListState } from "@/shared/state";
import { cloneObj } from "@/shared/utils";
import { GroupCharacter } from "@/shared/types";

export type GridButton = {
	id?: string;
};

export const GridButton = ({ id }: GridButton) => {
	const [showMove, setShowMove] = useRecoilState(showMoveState);
	const [turnCharactersList, setTurnCharactersList] = useRecoilState(
		turnCharactersListState
	);

	const showMoveMarker = React.useMemo(() => {
		const [turnCharacter] = turnCharactersList;
		const slotElement = document.getElementById(id!);
		const parentElement = slotElement?.parentElement;
		const sideId = `gridContainer${
			turnCharacter?.isPlayerGroup ? "Left" : "Right"
		}`;

		return (
			showMove &&
			turnCharacter.currentSlot !== id &&
			parentElement?.id === sideId
		);
	}, [id, showMove, turnCharactersList]);

	const setMoveTarget = () => {
		if (id && showMoveMarker) {
			const [turnCharacter] = turnCharactersList;
			const newTurnCharacter = cloneObj(turnCharacter) as GroupCharacter;
			newTurnCharacter.currentSlot = id;
			const newTurnList = cloneObj(turnCharactersList) as GroupCharacter[];

			newTurnList.shift();
			newTurnList.push(newTurnCharacter);

			setTurnCharactersList(newTurnList);
			setShowMove(false);
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
