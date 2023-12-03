import React from "react";

import styles from "./SlotMarker.module.scss";

export type SlotMarkerProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const SlotMarker = ({ className, style }: SlotMarkerProps) => {
	return (
		<span
			className={`${styles.slotMarker} ${className}`}
			style={{ ...style }}
		/>
	);
};
