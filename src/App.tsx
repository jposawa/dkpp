import React from "react";
import Spritesheet from "react-responsive-spritesheet";

import styles from "./App.module.scss";

export type StateAttributes = {
	path: string;
	steps: number;
	imgWidth: number;
	imgHeight: number;
};

export type Sprite = {
	steps: number;
	fps: number;
};

function App() {
	const [loopCount, setLoopCount] = React.useState(0);
	const [currentState, setCurrentState] = React.useState("IDLE");
	const spriteRef = React.useRef(null);

	const STATE: Record<string, StateAttributes> = {
		IDLE: {
			path: "./assets/sprites/wandererMagician/Idle.png",
			steps: 8,
			imgWidth: 1024,
			imgHeight: 128,
		},
		DEAD: {
			path: "./assets/sprites/wandererMagician/Dead.png",
			steps: 4,
			imgWidth: 512,
			imgHeight: 128,
		},
		HURT: {
			path: "./assets/sprites/wandererMagician/Hurt.png",
			steps: 4,
			imgWidth: 512,
			imgHeight: 128,
		},
	};

	return (
		<main className={styles.appMain}>
			<div className={styles.actorContainer}>
				<h4>Sprite container</h4>

				<Spritesheet
					className={styles.actor}
					image={STATE[currentState].path}
					widthFrame={STATE[currentState].imgWidth / STATE[currentState].steps}
					heightFrame={STATE[currentState].imgHeight}
					steps={STATE[currentState].steps}
					fps={STATE[currentState].steps}
					direction="forward"
					loop={currentState !== "DEAD"}
					onEnterFrame={[
						{
							frame: 0,
							callback: () => {
								const sprite = spriteRef?.current as Sprite | null;
								let nextState = currentState;

								if (sprite) {
									if (loopCount === 4) {
										nextState = "HURT";
									} else if (loopCount === 5) {
										nextState = "DEAD";
									}

									if (sprite.steps !== STATE[nextState].steps) {
										sprite.steps = STATE[nextState].steps;
										sprite.fps = STATE[nextState].steps;
									}

									setCurrentState(nextState);
								}
							},
						},
					]}
					onLoopComplete={() => {
						setLoopCount(loopCount + 1);
					}}
					ref={spriteRef}
				/>
			</div>
		</main>
	);
}

export default App;
