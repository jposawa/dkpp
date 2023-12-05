import { ActorControl, ActorGrid, ActorSprite } from "./components";

import styles from "./App.module.scss";
import { useRecoilValue } from "recoil";
import { currentActorState } from "./shared/state";

function App() {
	const currentActor = useRecoilValue(currentActorState);

	return (
		<main className={styles.appMain}>
			<section className={styles.actorContainer}>
				<ActorSprite actor={currentActor} />
				<ActorGrid id="gridLeftContainer" />
			</section>

			<ActorControl />
		</main>
	);
}

export default App;
