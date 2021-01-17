import { count, randomInt } from "./common"

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

export type Reaction = "defend" | "evade"

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

export function getBattleResult(
	attacker: Fighter,
	defender: Fighter,
	attackerReaction: Reaction,
	defenderReaction: Reaction,
) {
	let wins: Array<"attacker" | "defender" | "nobody"> = []

	for (let i = 0; i < 100000; i++) {
		const round1 =
			defenderReaction === "defend"
				? getDefenseRoundResult(attacker, defender)
				: getEvadeRoundResult(attacker, defender)

		if (round1.defenderHealth <= 0) {
			wins.push("attacker")
			continue
		}

		const round2 =
			attackerReaction === "defend"
				? getDefenseRoundResult(defender, attacker)
				: getEvadeRoundResult(defender, attacker)

		wins.push(round2.defenderHealth <= 0 ? "defender" : "nobody")
	}

	return {
		attackerWinRate: count(wins, "attacker") / wins.length,
		defenderWinRate: count(wins, "defender") / wins.length,
		nobodyWinRate: count(wins, "nobody") / wins.length,
	}
}
