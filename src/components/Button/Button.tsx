import React from "react";
import { ButtonType } from "@/shared/types";

import styles from "./Button.module.scss";

export type ButtonProps = {
  id?: string;
  name?: string;
  title?: string;
	type?: ButtonType | undefined;
	children?: React.ReactNode;
	onClick?: (param1: never) => unknown;
	className?: string;
	style?: React.CSSProperties;
  disabled?: boolean;
};

export const Button = ({
  id,
  name,
  title,
	className,
	style,
	children,
	type = "button",
	onClick,
  disabled = false,
}: ButtonProps) => {
	return (
		<button
      id={id}
      name={name}
      title={title}
			type={type}
			onClick={onClick}
			className={`${styles.button} ${className}`}
			style={{ ...style }}
      disabled={disabled}
		>
			{children}
		</button>
	);
};
