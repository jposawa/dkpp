import React from "react";
import { ActorControl, ActorGroup } from "./components";

import styles from "./App.module.scss";
import { mainGroupCharacter, mainCharacter } from "./shared/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	currentActorState,
	enemyGroupListState,
	playerGroupListState,
	turnCharactersListState,
} from "./shared/state";
import { cloneObj, isEqual } from "./shared/utils";
import { Character, GroupCharacter } from "./shared/types";

function App() {
	const currentActor = useRecoilValue(currentActorState);
	const [turnCharactersList, setTurnCharactersList] = useRecoilState(
		turnCharactersListState
	);
	const [playerGroupList, setPlayerGroupList] =
		useRecoilState(playerGroupListState);
	const [enemyGroupList, setEnemyGroupList] =
		useRecoilState(enemyGroupListState);

	React.useEffect(() => {
		const updatedCharacter = cloneObj(mainCharacter) as Character;
		updatedCharacter.animator.actorKey = currentActor;
		const gridId = `gridContainer${
			mainGroupCharacter.isPlayerGroup ? "Left" : "Right"
		}_slot${mainGroupCharacter.initialSlotNumber}`;
		const updatedGroupCharacter = {
			...mainGroupCharacter,
			character: updatedCharacter,
			currentSlot: mainGroupCharacter.currentSlot || gridId,
		};
		const mainCharacterIndex = turnCharactersList.findIndex(
			(groupCharacter) => groupCharacter.character.id === updatedCharacter.id
		);
		const newTurnList = cloneObj(turnCharactersList) as GroupCharacter[];

		newTurnList.splice(mainCharacterIndex, 1, updatedGroupCharacter);

		if (!isEqual(newTurnList, turnCharactersList)) {
			setTurnCharactersList(newTurnList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentActor]);

	React.useEffect(() => {
		const enemyGroup: GroupCharacter[] = [];
		const playerGroup = turnCharactersList.filter((groupCharacter) => {
			if (groupCharacter.isPlayerGroup) {
				return true;
			}

			enemyGroup.push(groupCharacter);

			return false;
		});

		setPlayerGroupList(playerGroup);
		setEnemyGroupList(enemyGroup);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turnCharactersList]);

	return (
		<main className={styles.appMain}>
			<section className={styles.actorContainer}>
				<ActorGroup charactersList={playerGroupList} />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
