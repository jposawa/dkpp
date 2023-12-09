import React from "react";
import { AvailableState, Character } from "@/shared/types";

import styles from "./CharacterActor.module.scss";
import { ActorSprite } from "..";
import ReactResponsiveSpritesheet from "react-responsive-spritesheet";
import { CONFIG } from "@/shared/constants";

export type CharacterActorProps = {
	character: Character;
	currentSlot: string;
	className?: string;
	style?: React.CSSProperties;
	inverseRender?: boolean;
};

export const CharacterActor = ({
	character,
	currentSlot,
	className,
	style,
	inverseRender = false,
}: CharacterActorProps) => {
	const {
		animator: { actorKey },
	} = character;
	const [currentState, setCurrentState] =
		React.useState<AvailableState>("IDLE");
	const [spritePosition, setSpritePosition] = React.useState({
		y: 0,
		x: 0,
	});
	const [animationTime, setAnimationTime] = React.useState<number | null>();
	const spriteRef = React.useRef<ReactResponsiveSpritesheet>(null);

	const handleResize = () => {
		setAnimationTime(0);
	};

	React.useEffect(() => {
		if (currentSlot) {
			const slotElement = document.getElementById(currentSlot);
			const gridElement = slotElement?.parentElement;
			const gridIndex = Number(currentSlot[currentSlot.length - 1]);

			if (slotElement && gridElement) {
				const {
					SPRITE: { OFFSET },
				} = CONFIG;
				const targetPosition = {
					x: gridElement.offsetLeft,
					y: gridElement.offsetTop,
				};

				const newPosition = {
					x: slotElement.offsetLeft + targetPosition.x + OFFSET.X,
					y: slotElement.offsetTop + targetPosition.y + OFFSET.Y,
				};

				setSpritePosition({
					y: newPosition.y,
					x: newPosition.x,
				});

				if (!animationTime) {
					setTimeout(() => {
						setAnimationTime(1000);
					}, 100);
				} else if (
					spritePosition?.x !== newPosition.x ||
					spritePosition?.y !== newPosition.y
				) {
					const sprite = spriteRef.current!;

					sprite.setDirection(gridIndex % 2 === 0 ? "rewind" : "forward");

					setCurrentState("WALK");
					setTimeout(() => {
						sprite.setDirection("forward");
						setCurrentState("IDLE");
					}, animationTime);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlot, animationTime]);

	return (
		<span
			className={`${styles.characterActor} ${className || ""} ${
				inverseRender ? styles.inverse : ""
			}`}
			style={
				{
					...style,
					top: spritePosition.y,
					left: spritePosition.x,
					"--animationTime": `${animationTime}ms`,
				} as React.CSSProperties
			}
		>
			<ActorSprite
				actor={actorKey}
				animationKey={currentState}
				onResize={handleResize}
				spriteRef={spriteRef}
			/>
		</span>
	);
};
