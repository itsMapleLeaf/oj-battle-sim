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
						<StatInput v-model.number="attacker.hp" required placeholder="5" />
					</Field>
					<Field label="ATK">
						<StatInput v-model.number="attacker.atk" required placeholder="2" />
					</Field>
					<Field label="DEF">
						<StatInput v-model.number="attacker.def" required placeholder="0" />
					</Field>
					<Field label="EVD">
						<StatInput
							v-model.number="attacker.evd"
							required
							placeholder="-1"
						/>
					</Field>
				</div>
			</div>

			<div class="p-4 space-y-4 bg-white rounded-md shadow-md">
				<h1 class="text-lg">Defender Stats</h1>
				<div class="grid grid-flow-col gap-4">
					<Field label="HP">
						<StatInput v-model.number="defender.hp" required placeholder="7" />
					</Field>
					<Field label="ATK">
						<StatInput
							v-model.number="defender.atk"
							required
							placeholder="-1"
						/>
					</Field>
					<Field label="DEF">
						<StatInput
							v-model.number="defender.def"
							required
							placeholder="-1"
						/>
					</Field>
					<Field label="EVD">
						<StatInput
							v-model.number="defender.evd"
							required
							placeholder="-1"
						/>
					</Field>
				</div>
			</div>

			<Button type="submit">Simulate</Button>

			<pre>{{ attacker }}</pre>
			<pre>{{ defender }}</pre>
		</form>
	</main>
</template>

<script>
import StatInput from "./StatInput.vue"
import Field from "./Field.vue"
import Button from "./Button.vue"
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
		Button,
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
