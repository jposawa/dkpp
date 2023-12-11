import React from "react";
import { ActorControl, ActorGroup, TurnInfo } from "./components";

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
	turnCountState,
} from "./shared/state";
import {
	cloneObj,
	defineGroupSlots,
	getInitialSlot,
	isEqual,
} from "./shared/utils";
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
	const [turnCount, setTurnCount] = useRecoilState(turnCountState);

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
		if (turnCharactersList.length) {
			const enemyGroup: GroupCharacter[] = [];
			const playerGroup = turnCharactersList.filter((groupCharacter) => {
				if (groupCharacter.isPlayerGroup) {
					return true;
				}

				enemyGroup.push(groupCharacter);

				return false;
			});

			if (!enemyGroup.length) {
				enemyGroup.push(...(mockEnemyGroup as GroupCharacter[]));
			}

			if (turnCount === 0) {
				playerGroup.push({
					...mainGroupCharacter,
					initialSlotNumber: 1,
					character: {
						...mainCharacter,
						id: "alliedCharacter",
						animator: {
							...mainCharacter.animator,
							actorKey: "fireWizard",
						},
					},
				});
			}

			const updatedPlayerGroup = defineGroupSlots(playerGroup);
			const updatedEnemyGroup = defineGroupSlots(enemyGroup);

			setPlayerGroupList(updatedPlayerGroup);
			setEnemyGroupList(updatedEnemyGroup);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turnCharactersList]);

	React.useEffect(() => {
		if (turnCount === 0 && playerGroupList.length && enemyGroupList.length) {
			setTurnCharactersList([...playerGroupList, ...enemyGroupList]);
			setTurnCount(turnCount + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enemyGroupList, playerGroupList, turnCount]);

	return (
		<main className={styles.appMain}>
      <TurnInfo />

			<section className={styles.actorContainer}>
				<ActorGroup charactersList={playerGroupList} />
				<ActorGroup charactersList={enemyGroupList} side="right" />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
