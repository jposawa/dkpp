import React from "react";

import styles from "./ActorGroup.module.scss";
import { GroupCharacter } from "@/shared/types";
import { ActorGrid, CharacterActor } from "..";
import { capitalizeString } from "@/shared/utils";

export type ActorGroupProps = {
	charactersList: GroupCharacter[];
	side?: "left" | "right";
	className?: string;
	style?: React.CSSProperties;
};

export const ActorGroup = ({
	charactersList,
	side = "left",
	className,
	style,
}: ActorGroupProps) => {
	const gridId = `gridContainer${capitalizeString(side)}`;

	return (
		<article
			className={`${styles.actorGroup} ${className}`}
			style={{ ...style }}
		>
			{charactersList.map(({ character, currentSlot }, index) => (
				<CharacterActor
					key={`${character.id}${index}`}
					character={character}
					currentSlot={currentSlot}
				/>
			))}
			<ActorGrid id={gridId} />
		</article>
	);
};
