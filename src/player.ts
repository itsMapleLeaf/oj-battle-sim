import { signal } from "@preact/signals"

export type Player = ReturnType<typeof definePlayer>
type Reaction = "defend" | "evade"

export const definePlayer = () => ({
	hp: signal("5"),
	atk: signal("0"),
	def: signal("0"),
	evd: signal("0"),
	reaction: signal<Reaction>("defend"),
})
