import React from "react";
import { useRecoilValue } from "recoil";
import Spritesheet from "react-responsive-spritesheet";

import styles from "./ActorSprite.module.scss";
import { AvailableActor, AvailableState, Sprite } from "@/shared/types";
import {
	ACTOR_STATES_SETTINGS,
	CONFIG,
	DEFAULT_STATE,
} from "@/shared/constants";
import { currentSlotState } from "@/shared/state";
import { getSpriteStates } from "@/shared/utils";

export type ActorSpriteProps = {
	actor: AvailableActor;
	frameSize?: number;
	className?: string;
	style?: React.CSSProperties;
};

export const ActorSprite = ({
	actor,
	frameSize = CONFIG.SPRITE.BASE_SIZE,
	className,
	style,
}: ActorSpriteProps) => {
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
	const [hasResized, setHasResized] = React.useState(false);
	const speedX = React.useMemo(() => {
		if (baseSpeedX !== 0) {
			const newSide = baseSpeedX / Math.abs(baseSpeedX);

			setSide(newSide);
		}
		return baseSpeedX * multSpeedX;
	}, [baseSpeedX, multSpeedX]);
	const spriteState = React.useMemo(
		() =>
			getSpriteStates(actor, {
				statesSettings: ACTOR_STATES_SETTINGS[actor],
			}) || DEFAULT_STATE.wandererMagician,
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

	// const updateState = React.useCallback(
	// 	(currentStateName: AvailableState, nextState: AvailableState) => {
	// 		const sprite = spriteRef?.current as Sprite | null;
	// 		if (sprite && nextState !== currentStateName) {
	// 			sprite.steps = spriteState[nextState].steps;
	// 			sprite.fps = spriteState[nextState].steps;
	// 			sprite.goToAndPlay(1);
	// 		}

	// 		return nextState;
	// 	},
	// 	[spriteState]
	// );

	const handleResize = () => {
		setAnimationTime(0);
		setHasResized(true);
	};

	React.useEffect(() => {
		const sprite = spriteRef?.current as Sprite | null;

		if (sprite) {
			sprite.steps = spriteState[currentState].steps;
			sprite.fps = spriteState[currentState].steps;
			sprite.goToAndPlay(1);
		}
	}, [currentState, spriteState, actor]);

	React.useEffect(() => {
		window.addEventListener("resize", handleResize);

		if (CONFIG.KEYBOARD_MOVEMENT) {
			window.addEventListener("keydown", keyDownEvent);
			window.addEventListener("keyup", keyUpEvent);
		}

		return () => {
			window.removeEventListener("resize", handleResize);

			if (CONFIG.KEYBOARD_MOVEMENT) {
				window.removeEventListener("keydown", keyDownEvent);
				window.removeEventListener("keyup", keyUpEvent);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (speedX !== 0) {
			setCurrentState(Math.abs(speedX) > 1 ? "RUN" : "WALK");
		} else {
			setCurrentState("IDLE");
		}
	}, [speedX]);

	React.useEffect(() => {
		if (currentSlot) {
			const slotElement = document.getElementById(currentSlot);
			const gridElement = document.getElementById("gridLeftContainer");

			if (slotElement && gridElement) {
				const {
					SPRITE: { OFFSET },
				} = CONFIG;
				const targetPosition = {
					x: gridElement.offsetLeft - OFFSET.X,
					y: gridElement.offsetTop - OFFSET.Y,
				};

				setSpritePosition({
					top: slotElement.offsetTop + targetPosition.y,
					left: slotElement.offsetLeft + targetPosition.x,
				});

				if (!animationTime) {
					setTimeout(() => {
						setAnimationTime(1000);
					}, 100);
				} else {
					const sprite = spriteRef.current! as Sprite;
					sprite.direction =
						slotElement.offsetLeft < targetPosition.x ? "forward" : "rewind";
					setCurrentState("WALK");
					setTimeout(() => {
						sprite.direction = "forward";
						setCurrentState("IDLE");
					}, animationTime);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlot]);

	React.useEffect(() => {
		if (hasResized) {
			if (currentSlot) {
				const slotElement = document.getElementById(currentSlot);
				const gridElement = document.getElementById("gridLeftContainer");

				if (slotElement && gridElement) {
					const {
						SPRITE: { OFFSET },
					} = CONFIG;

					setSpritePosition({
						top: slotElement.offsetTop + gridElement.offsetTop - OFFSET.Y,
						left: slotElement.offsetLeft + gridElement.offsetLeft - OFFSET.X,
					});

					setHasResized(false);
					setTimeout(() => {
						setAnimationTime(1000);
					}, 100);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasResized]);

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
				widthFrame={frameSize}
				heightFrame={frameSize}
				steps={spriteState[currentState].steps}
				fps={spriteState[currentState].steps}
				direction="forward"
				loop={currentState !== "DEAD"}
				ref={spriteRef}
				isResponsive
				autoplay
				style={
					{
						...style,
						"--side": side,
						// Doing this because the Spritesheet element was throwing type error for React.CSSProperties type
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

								setCurrentState(nextState);
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
