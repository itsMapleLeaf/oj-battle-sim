export function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max + 1 - min) + min)
}

export function count<T>(values: readonly T[], value: T): number {
	return values.reduce(
		(count, other) => (other === value ? count + 1 : count),
		0,
	)
}

export function mapValues<Input, OutputValue>(
	input: Input,
	getNewValue: (value: Input) => OutputValue,
): { [_ in keyof Input]: OutputValue } {
	const record = {} as { [_ in keyof Input]: OutputValue }
	for (const key in input) {
		record[key] = getNewValue(input[key] as any)
	}
	return record
}

export function omit<Input, Key extends keyof Input>(
	input: Input,
	keys: Key[],
): Omit<Input, Key> {
	const result = {} as Omit<Input, Key>
	for (const key in input) {
		if (!keys.includes(key as any)) {
			// @ts-expect-error
			result[key] = input[key]
		}
	}
	return result
}
