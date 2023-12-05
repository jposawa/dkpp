import { ActorControl, ActorGrid, ActorSprite } from "./components";

import styles from "./App.module.scss";

function App() {
	return (
		<main className={styles.appMain}>
			<section className={styles.actorContainer}>
				<ActorSprite actor="lightningMage" />
        <ActorGrid id="gridLeftContainer" />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
