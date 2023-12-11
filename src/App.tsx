import React from "react";
import { ActorControl, ActorGroup } from "./components";

import styles from "./App.module.scss";
import {
	mainGroupCharacter,
	mainCharacter,
	mockEnemyGroup,
} from "./shared/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	currentMainActorState,
	enemyGroupListState,
	playerGroupListState,
	turnCharactersListState,
} from "./shared/state";
import { cloneObj, getInitialSlot, isEqual } from "./shared/utils";
import { Character, GroupCharacter } from "./shared/types";

function App() {
	const currentMainActor = useRecoilValue(currentMainActorState);
	const [turnCharactersList, setTurnCharactersList] = useRecoilState(
		turnCharactersListState
	);
	const [playerGroupList, setPlayerGroupList] =
		useRecoilState(playerGroupListState);
	const [enemyGroupList, setEnemyGroupList] =
		useRecoilState(enemyGroupListState);

	React.useEffect(() => {
		const updatedCharacter = cloneObj(mainCharacter) as Character;
		updatedCharacter.animator.actorKey = currentMainActor;
		// const gridId = `gridContainer${
		// 	mainGroupCharacter.isPlayerGroup ? "Left" : "Right"
		// }_slot${mainGroupCharacter.initialSlotNumber}`;
		const updatedGroupCharacter = {
			...mainGroupCharacter,
			character: updatedCharacter,
		};
		const mainCharacterIndex = turnCharactersList.findIndex(
			(groupCharacter) => groupCharacter.character.id === updatedCharacter.id
		);
		const newTurnList = cloneObj(turnCharactersList) as GroupCharacter[];

		updatedGroupCharacter.currentSlot = getInitialSlot(updatedGroupCharacter, {
			supposedInitialSlot: newTurnList[mainCharacterIndex]?.currentSlot,
		});
		// updatedGroupCharacter.currentSlot =
		// 	newTurnList[mainCharacterIndex]?.currentSlot || gridId;
		newTurnList.splice(mainCharacterIndex, 1, updatedGroupCharacter);

		if (!isEqual(newTurnList, turnCharactersList)) {
			setTurnCharactersList(newTurnList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMainActor]);

	React.useEffect(() => {
		const enemyGroup: GroupCharacter[] = cloneObj(mockEnemyGroup);
		const playerGroup = turnCharactersList.filter((groupCharacter) => {
			if (groupCharacter.isPlayerGroup) {
				return true;
			}

			enemyGroup.push(groupCharacter);

			return false;
		});

		const updatedEnemyGroup = enemyGroup
			.map((groupCharacter, index) => {
				console.log(index);
				const initialSlot = getInitialSlot(groupCharacter, {
					gridIdOverride: groupCharacter.initialSlotNumber ?? index,
				});

				if (!groupCharacter) {
					return null;
				}

				return {
					...groupCharacter,
					currentSlot: initialSlot,
				};
			})
			.filter((groupCharacter) => !!groupCharacter) as GroupCharacter[];

		setPlayerGroupList(playerGroup);
		setEnemyGroupList(updatedEnemyGroup);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turnCharactersList]);

	return (
		<main className={styles.appMain}>
			<section className={styles.actorContainer}>
				<ActorGroup charactersList={playerGroupList} />
				<ActorGroup charactersList={enemyGroupList} side="right" />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
