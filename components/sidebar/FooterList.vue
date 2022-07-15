<template>
	<div class="flex flex-wrap gap-2 mt-5">
		<p
			class="text-gray-400 text-sm cursor-pointer hover:(underline)"
			v-for="item in items"
			:key="item"
		>
			{{ item }}
		</p>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		items: string[];
	}>();
</script>

<style scoped></style>
