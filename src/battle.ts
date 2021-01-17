import { randomInt } from "./common"

export type Fighter = {
	readonly hp: number
	readonly atk: number
	readonly def: number
	readonly evd: number
}

type RoundResult = {
	readonly attackerRoll: number
	readonly defenderRoll: number
	readonly defenderHealth: number
}

const roll = () => randomInt(1, 6)

export function createStatGroup(): Fighter {
	return {
		hp: 5,
		atk: 0,
		def: 0,
		evd: 0,
	}
}

export function getDefenseRoundResult(
	attacker: Fighter,
	defender: Fighter,
): RoundResult {
	const attackerRoll = roll() + attacker.atk
	const defenderRoll = roll() + defender.def
	const defenderHealth = defender.hp - Math.max(attackerRoll - defenderRoll, 1)

	return {
		attackerRoll,
		defenderRoll,
		defenderHealth,
	}
}

export function getEvadeRoundResult(
	attacker: Fighter,
	defender: Fighter,
): RoundResult {
	const attackerRoll = roll() + attacker.atk
	const defenderRoll = roll() + defender.evd
	const defenderHealth =
		defender.hp - (defenderRoll > attackerRoll ? 0 : attackerRoll)

	return {
		attackerRoll,
		defenderRoll,
		defenderHealth,
	}
}
