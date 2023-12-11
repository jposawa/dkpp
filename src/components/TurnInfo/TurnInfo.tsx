import React from "react";

import styles from "./TurnInfo.module.scss";
import { useRecoilValue } from "recoil";
import { turnCountState } from "@/shared/state";

export type TurnInfoProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const TurnInfo = ({ className, style }: TurnInfoProps) => {
	const turnCount = useRecoilValue(turnCountState);

	return (
		<section
			className={`${styles.turnInfo} ${className || ""}`}
			style={{ ...style }}
		>
			{turnCount >= 0 && (
				<span className={styles.turnNumber}>Turn: {turnCount}</span>
			)}
		</section>
	);
};
