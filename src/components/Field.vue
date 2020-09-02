<template>
	<label class="space-y-1">
		<div class="text-sm">
			<slot name="label">
				{{ label }}
			</slot>
		</div>
		<slot></slot>
	</label>
</template>

<script>
export default {
	props: {
		label: String,
	},
}
</script>
