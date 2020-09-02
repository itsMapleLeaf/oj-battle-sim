<!-- TODO: add min/max -->
<template>
	<input
		class="w-full px-3 py-2 text-center transition-colors duration-200 border-2 border-gray-300 rounded-md shadow-inner focus:outline-none focus:border-orange-500"
		v-bind="$attrs"
		:value="modelValue"
		@input="handleInput"
		@focus="$event.target.select()"
	/>
</template>

<script>
export default {
	props: {
		label: String,
		modelValue: Number,
	},

	setup(props, context) {
		return {
			handleInput(event) {
				context.emit("update:modelValue", Number(event.target.value) || 0)
			},
		}
	},
}
</script>
