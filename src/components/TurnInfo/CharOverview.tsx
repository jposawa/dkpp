import React from "react";

import { Character } from "@/shared/types";

import styles from "./CharOverview.module.scss";

export type CharOverviewProps = {
	character: Character;
	className?: string;
	style?: React.CSSProperties;
};

export const CharOverview = ({
	character,
	className,
	style,
}: CharOverviewProps) => {
	return (
		<article
			className={`${styles.charOverview} ${className || ""}`}
			style={{ ...style }}
		>
			<img
        className={styles.charPortrait}
				alt="Turn character portrait"
				src={
					character.sheet?.portrait || "./assets/general/deoredrimEmblem.png"
				}
			/>
			<p className={styles.charName}>{character.name}</p>
		</article>
	);
};
