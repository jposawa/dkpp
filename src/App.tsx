import React from "react";
import Spritesheet from "react-responsive-spritesheet";
import { BASE_SPRITE_SIZE, STATE } from "./shared/constants";
import { Sprite } from "./shared/types";

import styles from "./App.module.scss";

function App() {
	const [loopCount, setLoopCount] = React.useState(0);
	const [currentState, setCurrentState] = React.useState("IDLE");
	const [deadStage, setDeadStage] = React.useState(0);
	const [shouldDie] = React.useState(false);
	const [baseSpeedX, setBaseSpeedX] = React.useState<number>(0);
	const [multSpeedX, setMultSpeedX] = React.useState<number>(1);
	const [side, setSide] = React.useState<number>(1);
	const spriteRef = React.useRef(null);
	const speedX = React.useMemo(() => {
		if (baseSpeedX !== 0) {
			const newSide = baseSpeedX / Math.abs(baseSpeedX);

			setSide(newSide);
		}
		return baseSpeedX * multSpeedX;
	}, [baseSpeedX, multSpeedX]);

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
		(currentStateName: string, nextState: string) => {
			const sprite = spriteRef?.current as Sprite | null;
			if (sprite && nextState !== currentStateName) {
				sprite.steps = STATE[nextState].steps;
				sprite.fps = STATE[nextState].steps;
				sprite.goToAndPlay(1);
			}

			return nextState;
		},
		[]
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

	// React.useEffect(() => {
	// 	const sprite = spriteRef?.current as Sprite | null;

	// 	if (sprite && sprite.steps !== STATE[currentState].steps) {
	// 		sprite.steps = STATE[currentState].steps;
	// 		sprite.fps = STATE[currentState].steps;
	// 	}
	// });

	return (
		<main className={styles.appMain}>
			<div className={styles.actorContainer}>
				<h4>Sprite container</h4>

				<Spritesheet
					className={styles.actor}
					image={STATE[currentState].path}
					widthFrame={BASE_SPRITE_SIZE}
					heightFrame={BASE_SPRITE_SIZE}
					steps={STATE[currentState].steps}
					fps={STATE[currentState].steps}
					direction="forward"
					loop={currentState !== "DEAD"}
					ref={spriteRef}
					style={
						{
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
		</main>
	);
}

export default App;
