import React from "react";
import Spritesheet from "react-responsive-spritesheet";

import styles from "./ActorSprite.module.scss";
import { AvailableActor, AvailableState, Sprite } from "@/shared/types";
import {
	ACTOR_STATES_SETTINGS,
	CONFIG,
	DEFAULT_STATE,
} from "@/shared/constants";
import { getSpriteStates } from "@/shared/utils";
import ReactResponsiveSpritesheet from "react-responsive-spritesheet";

export type ActorSpriteProps = {
	actor: AvailableActor;
  animationKey: AvailableState;
  spriteRef: React.RefObject<ReactResponsiveSpritesheet>;
	frameSize?: number;
	className?: string;
	style?: React.CSSProperties;
  onResize?: () => void;
};

/**
 * Component with basic animation handling
 * @param actor The actor key to know which sprite sheet file to seek
 * @param animationKey Define which animation will play by this actor
 * @param frameSize The quad size of each frame image
 * @param className (Optional) Classes to override
 * @param style (Optional) Direct style to override
 */
export const ActorSprite = ({
	actor,
  animationKey,
  spriteRef,
	frameSize = CONFIG.SPRITE.BASE_SIZE,
	className,
	style,
  onResize,
}: ActorSpriteProps) => {
	const spriteState = React.useMemo(
		() =>
			getSpriteStates(actor, {
				statesSettings: ACTOR_STATES_SETTINGS[actor],
			}) || DEFAULT_STATE.wandererMagician,
		[actor]
	);

	React.useEffect(() => {
		const sprite = spriteRef?.current as Sprite | null;

		if (sprite) {
			sprite.steps = spriteState[animationKey].steps;
			sprite.fps = spriteState[animationKey].steps;
			sprite.goToAndPlay(1);
		}
	}, [animationKey, spriteState, actor, spriteRef]);

	return (
		<span className={`${styles.actorContainer} ${className || ""}`}>
			<Spritesheet
				className={styles.actor}
				image={spriteState[animationKey].path}
				widthFrame={frameSize}
				heightFrame={frameSize}
				steps={spriteState[animationKey].steps}
				fps={spriteState[animationKey].steps}
				direction="forward"
				loop={animationKey !== "DEAD"}
				ref={spriteRef}
				isResponsive
				autoplay
				style={
					{
						...style,
						// Doing this because the Spritesheet element was throwing type error for React.CSSProperties type
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any
				}
        onResize={onResize}
			/>
		</span>
	);
};
