import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentActorState, showMoveState } from "@/shared/state";
import { Button } from "@/components";

import styles from "./ActorControl.module.scss";
import { ACTOR_NAMES } from "@/shared/constants";
import { AvailableActor } from "@/shared/types";

export type ActorControlProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const ActorControl = ({ className, style }: ActorControlProps) => {
	const [showMove, setShowMove] = useRecoilState(showMoveState);
	const setCurrentActor = useSetRecoilState(currentActorState);

	const moveToggle = () => {
		setShowMove(!showMove);
	};

	const handleActorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {
			target: { value },
		} = event;

		setCurrentActor(value as AvailableActor);
	};

	return (
		<section
			className={`${styles.actorControl} ${className}`}
			style={{ ...style }}
		>
			<Button onClick={moveToggle}>{showMove && "Cancel "}Move</Button>

			<p>
				<select title="Choose your actor" onChange={handleActorChange}>
					{Object.entries(ACTOR_NAMES).map(([actorKey, actorName]) => (
						<option key={actorKey} value={actorKey}>
							{actorName}
						</option>
					))}
				</select>
			</p>
		</section>
	);
};
