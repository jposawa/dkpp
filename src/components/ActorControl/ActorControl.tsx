import React from "react";
import { useRecoilState } from "recoil";
import { showMoveState } from "@/shared/state";
import { Button } from "@/components";

import styles from "./ActorControl.module.scss";

export type ActorControlProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const ActorControl = ({ className, style }: ActorControlProps) => {
	const [showMove, setShowMove] = useRecoilState(showMoveState);

	const moveToggle = () => {
		setShowMove(!showMove);
	};

	return (
		<section
			className={`${styles.actorControl} ${className}`}
			style={{ ...style }}
		>
			<Button onClick={moveToggle}>{showMove && "Cancel "}Move</Button>
		</section>
	);
};
