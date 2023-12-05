export * from "./spriteUtils";

export const capitalizeString = (baseString: string) => {
	const [firstCharacter] = baseString;

	return `${firstCharacter.toUpperCase()}${baseString
		.toLowerCase()
		.substring(1)}`;
};
