import React from "react";

import styles from "./ActorGrid.module.scss";
import { GridButton } from ".";

export type ActorGridProps = {
	id?: string;
	slotNumber?: number;
	className?: string;
	style?: React.CSSProperties;
	inverseRender?: boolean;
};

export const ActorGrid = ({
	id,
	slotNumber = 4,
	className,
	style,
	inverseRender = false,
}: ActorGridProps) => {
	return (
		<div
			id={id}
			className={`${styles.actorGrid} ${className || ""} ${
				inverseRender ? styles.inverse : ""
			}`}
			style={{ ...style }}
		>
			{[...Array(slotNumber)].map((_, index) => (
				<GridButton id={`${id}_slot${index}`} key={`gridButton${index}`} />
			))}
		</div>
	);
};
