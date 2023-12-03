import { ActorSprite } from "./components";

import styles from "./App.module.scss";

function App() {
	return (
		<main className={styles.appMain}>
			<div className={styles.actorContainer}>
				<h4>Sprite container</h4>

				<ActorSprite actor="wandererMagician" />
			</div>
		</main>
	);
}

export default App;
