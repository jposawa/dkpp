export const cloneObj = (baseObj: Array<unknown> | Record<never, unknown>) =>
	JSON.parse(JSON.stringify(baseObj));

export const capitalizeString = (baseString: string) => {
	const [firstCharacter] = baseString;

	return `${firstCharacter.toUpperCase()}${baseString
		.toLowerCase()
		.substring(1)}`;
};

export const isEqual = (valueA: unknown, valueB: unknown): boolean => {
	const strValueA = JSON.stringify(valueA);
	const strValueB = JSON.stringify(valueB);

	return strValueA === strValueB;
};
