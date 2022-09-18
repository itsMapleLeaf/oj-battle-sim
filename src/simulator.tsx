import { computed, signal } from "@preact/signals"
import { Shuffle } from "preact-feather"
import { definePlayer, Player } from "./player"
import { PlayerCard } from "./player-card"
import { SolidButton } from "./solid-button"
import { ThemeButton } from "./theme"

const attacker = signal(definePlayer())
const defender = signal(definePlayer())

function swap() {
	;[attacker.value, defender.value] = [defender.value, attacker.value]
}

const roll = () => Math.floor(Math.random() * 6) + 1

const asInt = (value: string) => {
	const number = Number(value)
	return Number.isFinite(number) ? Math.trunc(number) : 0
}

const count = <T,>(items: T[], predicate: (item: T) => boolean) =>
	items.reduce((count, item) => count + (predicate(item) ? 1 : 0), 0)

const countAverage = <T,>(items: T[], predicate: (item: T) => boolean) =>
	count(items, predicate) / items.length

function getRoundResult(
	attacker: Player,
	defender: Player,
	attackerBaseRoll: number,
	defenderBaseRoll: number,
) {
	const attackerRoll = attackerBaseRoll + asInt(attacker.atk.value)
	const defenderRoll = defenderBaseRoll + asInt(defender.def.value)

	const attackerDamage =
		defender.reaction.value === "defend"
			? Math.max(attackerRoll - defenderRoll, 1)
			: defenderRoll > attackerRoll
			? 0
			: attackerRoll

	if (attackerDamage >= asInt(defender.hp.value)) {
		return { attackerSurvived: true, defenderSurvived: false }
	}

	const defenderDamage =
		attacker.reaction.value === "defend"
			? Math.max(defenderRoll - attackerRoll, 1)
			: attackerRoll > defenderRoll
			? 0
			: defenderRoll

	if (defenderDamage >= asInt(attacker.hp.value)) {
		return { attackerSurvived: false, defenderSurvived: true }
	}

	return { attackerSurvived: true, defenderSurvived: true }
}

const results = computed(() => {
	const results = []

	for (let i = 0; i < 10_000; i++) {
		const firstRound = getRoundResult(
			attacker.value,
			defender.value,
			roll(),
			roll(),
		)

		if (!firstRound.defenderSurvived) {
			results.push(firstRound)
			continue
		}

		const secondRound = getRoundResult(
			defender.value,
			attacker.value,
			roll(),
			roll(),
		)

		results.push({
			attackerSurvived: secondRound.defenderSurvived,
			defenderSurvived: secondRound.attackerSurvived,
		})
	}

	return results
})

const attackerVictoryChance = computed(() =>
	countAverage(results.value, (result) => !result.defenderSurvived),
)
const attackerSurvivalChance = computed(() =>
	countAverage(results.value, (result) => result.attackerSurvived),
)
const defenderVictoryChance = computed(() =>
	countAverage(results.value, (result) => !result.attackerSurvived),
)
const defenderSurvivalChance = computed(() =>
	countAverage(results.value, (result) => result.defenderSurvived),
)

export function Simulator() {
	return (
		<main class="px-4 py-20">
			<div class="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
				<PlayerCard
					title="Attacker"
					player={attacker}
					victoryChance={attackerVictoryChance}
					survivalChance={attackerSurvivalChance}
				/>
				<section class="flex items-center gap-4">
					<SolidButton type="button" title="Swap" onClick={swap}>
						<Shuffle />
					</SolidButton>
					<ThemeButton />
				</section>
				<PlayerCard
					title="Defender"
					player={defender}
					victoryChance={defenderVictoryChance}
					survivalChance={defenderSurvivalChance}
				/>
			</div>
		</main>
	)
}
