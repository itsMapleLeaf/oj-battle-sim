<template>
	<button
		type="button"
		:class="[
			'px-3 py-2 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md',
			faded ? 'opacity-50' : 'hover:bg-orange-700',
		]"
	>
		<slot />
	</button>
</template>

<script>
export default {
	props: { faded: Boolean },
}
</script>
