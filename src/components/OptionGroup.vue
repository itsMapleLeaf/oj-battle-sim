<template>
	<div
		class="flex flex-row overflow-hidden transition-colors duration-200 border-2 rounded-md focus-within:border-orange-500"
	>
		<label
			v-for="(option, index) of options"
			:key="index"
			:class="getLabelClass(option)"
		>
			<input
				type="radio"
				class="absolute opacity-0"
				:name="name"
				:value="option.value"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
			<span class="select-none">{{ option.text }}</span>
		</label>
	</div>
</template>

<script lang="ts">
import { PropType } from "vue"
type Option = { text: string; value: string }

export default {
	props: {
		name: String,
		options: {
			type: Array as PropType<Option[]>,
			required: true,
		},
		modelValue: String,
	},

	setup(props) {
		return {
			getLabelClass(option: Option) {
				return [
					"px-3 py-2 transition-colors duration-200 cursor-pointer",
					props.modelValue === option.value
						? "bg-orange-600 text-white"
						: "hover:bg-orange-200",
				]
			},
		}
	},
}
</script>
