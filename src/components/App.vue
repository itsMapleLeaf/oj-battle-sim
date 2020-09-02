<template>
	<main class="px-4 py-20">
		<form
			class="flex flex-col w-full max-w-md mx-auto space-y-4"
			@submit.prevent
		>
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

			<button
				type="submit"
				class="px-3 py-2 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md"
			>
				Simulate
			</button>

			<pre>{{ attacker }}</pre>
			<pre>{{ defender }}</pre>
		</form>
	</main>
</template>

<script>
import StatInput from "./StatInput.vue"
import Field from "./Field.vue"
import { ref } from "vue"

function createStatGroup() {
	return {
		hp: 0,
		atk: 0,
		def: 0,
		evd: 0,
	}
}

export default {
	components: {
		StatInput,
		Field,
	},
	setup() {
		return {
			attacker: ref(createStatGroup()),
			defender: ref(createStatGroup()),
		}
	},
}
</script>
