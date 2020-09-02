<template>
	<main class="px-4 py-20">
		<form class="flex flex-col w-full max-w-md mx-auto space-y-4">
			<div class="p-4 space-y-4 bg-white rounded-md shadow-md">
				<h1 class="text-lg">Attacker Stats</h1>
				<div class="grid grid-flow-col gap-4">
					<Field label="HP">
						<StatInput v-model="attacker.hp" />
					</Field>
					<Field label="ATK">
						<StatInput v-model="attacker.atk" />
					</Field>
					<Field label="DEF">
						<StatInput v-model="attacker.def" />
					</Field>
					<Field label="EVD">
						<StatInput v-model="attacker.evd" />
					</Field>
				</div>
			</div>

			<div class="p-4 space-y-4 bg-white rounded-md shadow-md">
				<h1 class="text-lg">Defender Stats</h1>
				<div class="grid grid-flow-col gap-4">
					<Field label="HP">
						<StatInput v-model="defender.hp" />
					</Field>
					<Field label="ATK">
						<StatInput v-model="defender.atk" />
					</Field>
					<Field label="DEF">
						<StatInput v-model="defender.def" />
					</Field>
					<Field label="EVD">
						<StatInput v-model="defender.evd" />
					</Field>
				</div>
			</div>

			<div class="p-4 space-y-1 bg-white rounded-md shadow-md" v-if="result">
				<p>
					Attacker wins <b>{{ percent(result.attackerWinRate) }}</b> of the
					time.
				</p>
				<p>
					Defender wins <b>{{ percent(result.defenderWinRate) }}</b> of the
					time.
				</p>
				<p>
					Both survive <b>{{ percent(result.nobodyWinRate) }}</b> of the time.
				</p>
			</div>
		</form>
	</main>
</template>

<script>
// @ts-check
import StatInput from "./StatInput.vue"
import Field from "./Field.vue"
import { ref, watch, reactive, computed, watchEffect } from "vue"
import { createStatGroup, getDefenseRoundResult } from "../battle"
import { count } from "../helpers"

export default {
	components: {
		StatInput,
		Field,
	},
	setup() {
		const attacker = reactive(createStatGroup())
		const defender = reactive(createStatGroup())
		const result = ref()

		watchEffect(function simulate() {
			let wins = []

			for (let i = 0; i < 10000; i++) {
				const round1 = getDefenseRoundResult(attacker, defender)
				if (round1.defenderHealth <= 0) {
					wins.push("attacker")
				} else {
					const round2 = getDefenseRoundResult(defender, attacker)
					wins.push(round2.defenderHealth <= 0 ? "defender" : "nobody")
				}
			}

			result.value = {
				attackerWinRate: count(wins, "attacker") / wins.length,
				defenderWinRate: count(wins, "defender") / wins.length,
				nobodyWinRate: count(wins, "nobody") / wins.length,
			}
		})

		/** @param {number} value */
		function percent(value) {
			return `${Math.round(value * 100)}%`
		}

		return {
			attacker,
			defender,
			result,
			percent,
		}
	},
}
</script>
