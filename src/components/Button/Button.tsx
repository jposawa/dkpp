import React from "react";
import { ButtonType } from "@/shared/types";

import styles from "./Button.module.scss";

export type ButtonProps = {
	type?: ButtonType | undefined;
	children?: React.ReactNode;
	onClick?: () => unknown;
	className?: string;
	style?: React.CSSProperties;
};

export const Button = ({
	className,
	style,
	children,
	type = "button",
	onClick,
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${styles.button} ${className}`}
			style={{ ...style }}
		>
			{children}
		</button>
	);
};
