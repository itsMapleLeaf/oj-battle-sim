<template>
	<main class="px-4 py-20">
		<form class="flex flex-col w-full max-w-md mx-auto space-y-4">
			<div class="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
				<h1 class="text-lg">Attacker</h1>
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

				<OptionGroup
					class="self-start"
					name="attackerReaction"
					:options="[
						{ value: 'defend', text: 'Defend' },
						{ value: 'evade', text: 'Evade' },
					]"
					v-model="attackerReaction"
				/>
			</div>

			<button
				type="button"
				class="flex flex-col self-center p-2 space-y-4 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md hover:bg-orange-500"
				title="Switch"
				@click="switchFighters"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="w-8 h-8"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
					/>
				</svg>
			</button>

			<div class="flex flex-col p-4 space-y-4 bg-white rounded-md shadow-md">
				<h1 class="text-lg">Defender</h1>
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

				<OptionGroup
					class="self-start"
					name="defenderReaction"
					:options="[
						{ value: 'defend', text: 'Defend' },
						{ value: 'evade', text: 'Evade' },
					]"
					v-model="defenderReaction"
				/>
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

<script lang="ts">
import OptionGroup from "./OptionGroup.vue"
import StatInput from "./StatInput.vue"
import Field from "./Field.vue"
import { ref, watch, reactive, computed, watchEffect } from "vue"
import {
	createStatGroup,
	getDefenseRoundResult,
	getEvadeRoundResult,
} from "../battle"
import { count } from "../helpers"

type Reaction = "defend" | "evade"

export default {
	components: {
		OptionGroup,
		StatInput,
		Field,
	},
	setup() {
		const attacker = ref(createStatGroup())
		const attackerReaction = ref<Reaction>("defend")

		const defender = ref(createStatGroup())
		const defenderReaction = ref<Reaction>("defend")

		const result = ref<{
			attackerWinRate: number
			defenderWinRate: number
			nobodyWinRate: number
		}>()

		watchEffect(function simulate() {
			let wins = []

			for (let i = 0; i < 10000; i++) {
				const round1 =
					defenderReaction.value === "defend"
						? getDefenseRoundResult(attacker.value, defender.value)
						: getEvadeRoundResult(attacker.value, defender.value)

				if (round1.defenderHealth <= 0) {
					wins.push("attacker")
					continue
				}

				const round2 =
					attackerReaction.value === "defend"
						? getDefenseRoundResult(defender.value, attacker.value)
						: getEvadeRoundResult(defender.value, attacker.value)

				wins.push(round2.defenderHealth <= 0 ? "defender" : "nobody")
			}

			result.value = {
				attackerWinRate: count(wins, "attacker") / wins.length,
				defenderWinRate: count(wins, "defender") / wins.length,
				nobodyWinRate: count(wins, "nobody") / wins.length,
			}
		})

		function switchFighters() {
			;[
				attacker.value,
				defender.value,
				attackerReaction.value,
				defenderReaction.value,
			] = [
				defender.value,
				attacker.value,
				defenderReaction.value,
				attackerReaction.value,
			]
		}

		function percent(value: number) {
			return `${Math.round(value * 100)}%`
		}

		return {
			attacker,
			attackerReaction,
			defender,
			defenderReaction,
			result,
			percent,
			switchFighters,
		}
	},
}
</script>
