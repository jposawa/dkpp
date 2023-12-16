import React from "react";
import { useRecoilValue } from "recoil";

import { turnCharactersListState, turnCountState } from "@/shared/state";

import styles from "./TurnInfo.module.scss";
import { CharOverview } from ".";

export type TurnInfoProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const TurnInfo = ({ className, style }: TurnInfoProps) => {
	const turnCount = useRecoilValue(turnCountState);
	const turnCharactersList = useRecoilValue(turnCharactersListState);

	return (
		<section
			className={`${styles.turnInfo} ${className || ""}`}
			style={{ ...style }}
		>
			<div className={styles.charInfoContainer}>
				{turnCharactersList.map((groupCharacter, index) => {
					const { character } = groupCharacter;

					return <CharOverview key={`char${index}`} character={character} />;
				})}
			</div>

			{turnCount > 0 && (
				<span className={styles.turnNumber}>Turn: {turnCount}</span>
			)}
		</section>
	);
};
