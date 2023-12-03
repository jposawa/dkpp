import React from "react";
import { useRecoilValue } from "recoil";
import Spritesheet from "react-responsive-spritesheet";

import styles from "./ActorSprite.module.scss";
import {
	AvailableActor,
	AvailableState,
	Sprite,
	StateAttributes,
} from "@/shared/types";
import { STATE, CONFIG } from "@/shared/constants";
import { currentSlotState } from "@/shared/state";

export type ActorSpriteProps = {
	actor: AvailableActor;
	className?: string;
	style?: React.CSSProperties;
};

export const ActorSprite = ({ actor, className, style }: ActorSpriteProps) => {
	const [loopCount, setLoopCount] = React.useState(0);
	const [currentState, setCurrentState] =
		React.useState<AvailableState>("IDLE");
	const [deadStage, setDeadStage] = React.useState(0);
	const [shouldDie] = React.useState(false);
	const [baseSpeedX, setBaseSpeedX] = React.useState<number>(0);
	const [multSpeedX, setMultSpeedX] = React.useState<number>(1);
	const [side, setSide] = React.useState<number>(1);
	const spriteRef = React.useRef(null);
	const [spritePosition, setSpritePosition] = React.useState({
		top: 0,
		left: 0,
	});
	const [animationTime, setAnimationTime] = React.useState<number | null>();
	const speedX = React.useMemo(() => {
		if (baseSpeedX !== 0) {
			const newSide = baseSpeedX / Math.abs(baseSpeedX);

			setSide(newSide);
		}
		return baseSpeedX * multSpeedX;
	}, [baseSpeedX, multSpeedX]);
	const spriteState = React.useMemo(
		() => STATE[actor] as Record<AvailableState, StateAttributes>,
		[actor]
	);
	const currentSlot = useRecoilValue(currentSlotState);

	const updateSpeedX = (baseSpeed = 0) => {
		setBaseSpeedX(baseSpeed);
	};

	const updateMultiSpeedX = (shouldMultiply = false) => {
		setMultSpeedX(shouldMultiply ? 1.5 : 1);
	};

	const keyDownEvent = (event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowRight":
				updateSpeedX(1);
				break;

			case "ArrowLeft":
				updateSpeedX(-1);
				break;

			case "Shift":
				updateMultiSpeedX(event.shiftKey);
				break;
		}
	};

	const keyUpEvent = (event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowRight":
				updateSpeedX(0);
				break;

			case "ArrowLeft":
				updateSpeedX(0);
				break;

			case "Shift":
				updateMultiSpeedX(event.shiftKey);
				break;
		}
	};

	const updateState = React.useCallback(
		(currentStateName: AvailableState, nextState: AvailableState) => {
			const sprite = spriteRef?.current as Sprite | null;
			if (sprite && nextState !== currentStateName) {
				sprite.steps = spriteState[nextState].steps;
				sprite.fps = spriteState[nextState].steps;
				sprite.goToAndPlay(1);
			}

			return nextState;
		},
		[spriteState]
	);

	React.useEffect(() => {
		window.addEventListener("keydown", keyDownEvent);
		window.addEventListener("keyup", keyUpEvent);

		return () => {
			window.removeEventListener("keydown", keyDownEvent);
			window.addEventListener("keyup", keyUpEvent);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (speedX !== 0) {
			setCurrentState((currentStateName) =>
				updateState(currentStateName, Math.abs(speedX) > 1 ? "RUN" : "WALK")
			);
		} else {
			setCurrentState((currentStateName) =>
				updateState(currentStateName, "IDLE")
			);
		}
	}, [speedX, updateState]);

	React.useEffect(() => {
		if (currentSlot) {
			const slotElement = document.getElementById(currentSlot);
			const gridElement = document.getElementById("gridLeftContainer");

			if (slotElement && gridElement) {
				setSpritePosition({
					top: slotElement.offsetTop + gridElement.offsetTop - 86,
					left: slotElement.offsetLeft + gridElement.offsetLeft - 32,
				});

				if (!animationTime) {
					setTimeout(() => {
						setAnimationTime(1000);
					}, 100);
				} else {
					setCurrentState((currentStateName) =>
						updateState(currentStateName, "WALK")
					);
					setTimeout(() => {
						setCurrentState((currentStateName) =>
							updateState(currentStateName, "IDLE")
						);
					}, animationTime);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlot]);

	return (
		<div
			className={`${styles.actorContainer} ${className || ""}`}
			style={
				currentSlot
					? ({
							top: spritePosition.top,
							left: spritePosition.left,
							"--animationTime": `${animationTime}ms`,
          } as React.CSSProperties)
					: {}
			}
		>
			<Spritesheet
				className={styles.actor}
				image={spriteState[currentState].path}
				widthFrame={CONFIG.SPRITE.BASE_SIZE}
				heightFrame={CONFIG.SPRITE.BASE_SIZE}
				steps={spriteState[currentState].steps}
				fps={spriteState[currentState].steps}
				direction="forward"
				loop={currentState !== "DEAD"}
				ref={spriteRef}
				style={
					{
						...style,
						"--side": side,
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any
				}
				onEnterFrame={[
					{
						frame: 0,
						callback: () => {
							const sprite = spriteRef?.current as Sprite | null;
							let nextState = currentState;

							if (sprite) {
								if (deadStage === 1) {
									nextState = "HURT";
								} else if (deadStage === 2) {
									nextState = "DEAD";
								}

								// if (sprite.steps !== STATE[nextState].steps) {
								// 	sprite.steps = STATE[nextState].steps;
								// 	sprite.fps = STATE[nextState].steps;
								// }

								setCurrentState((currentStateName) =>
									updateState(currentStateName, nextState)
								);
							}
						},
					},
				]}
				onLoopComplete={() => {
					setLoopCount(loopCount + 1);
					if (shouldDie) {
						setDeadStage(2);
					}
				}}
			/>
		</div>
	);
};
