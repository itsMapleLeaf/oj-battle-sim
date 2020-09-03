export function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max + 1 - min) + min)
}

export function count<T>(values: readonly T[], value: T): number {
	return values.reduce(
		(count, other) => (other === value ? count + 1 : count),
		0,
	)
}
