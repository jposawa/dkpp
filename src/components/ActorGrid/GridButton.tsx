import { useRecoilState } from "recoil";
import { Button, SlotMarker } from "..";

import styles from "./GridButton.module.scss";
import { currentSlotState, showMoveState } from "@/shared/state";

export type GridButton = {
	id?: string;
};

export const GridButton = ({ id }: GridButton) => {
	const [showMove, setShowMove] = useRecoilState(showMoveState);
	const [currentSlot, setCurrentSlot] = useRecoilState(currentSlotState);

	const setMoveTarget = () => {
		if (id) {
			setCurrentSlot(id);
			setShowMove(false);
		}
	};

	return (
		<Button
			id={id}
			title="Grid button"
			className={styles.gridButton}
			onClick={setMoveTarget}
			disabled={!showMove || currentSlot === id}
		>
			{showMove && currentSlot !== id && (
				<SlotMarker className={styles.floating} />
			)}
		</Button>
	);
};
