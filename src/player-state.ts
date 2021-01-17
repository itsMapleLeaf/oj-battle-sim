import { observable } from "micro-observables"
import type { Reaction } from "./battle"

export function createPlayer() {
	return {
		stats: {
			hp: observable("5"),
			atk: observable("0"),
			def: observable("0"),
			evd: observable("0"),
		},
		reaction: observable<Reaction>("defend"),
	}
}

export type Player = ReturnType<typeof createPlayer>
export type Stats = Player["stats"]
export type StatKey = keyof Stats
