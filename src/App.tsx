import { ActorControl, ActorSprite } from "./components";

import styles from "./App.module.scss";

function App() {
	return (
		<main className={styles.appMain}>
			<section className={styles.actorContainer}>
				<ActorSprite actor="wandererMagician" />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
