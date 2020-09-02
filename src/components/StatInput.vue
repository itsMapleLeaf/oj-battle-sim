<template>
	<input
		class="w-full px-3 py-2 text-center transition-colors duration-200 border-2 border-gray-300 rounded-md shadow-inner focus:outline-none focus:border-orange-500"
		v-bind="$attrs"
		:value="modelValue"
		@input="handleInput"
		@focus="selectAll($event.target)"
	/>
</template>

<script>
import { selectAll } from "../helpers"

export default {
	props: {
		label: String,
		modelValue: [String, Number],
		modelModifiers: {
			default: () => ({ number: false }),
		},
	},

	setup(props, context) {
		return {
			selectAll,
			handleInput(event) {
				let value = event.target.value

				if (props.modelModifiers.number) {
					value = Number(value) || 0
				}

				context.emit("update:modelValue", value)
			},
		}
	},
}
</script>
