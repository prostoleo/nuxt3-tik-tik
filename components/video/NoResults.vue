<template>
	<div className="flex flex-col justify-center items-center h-full w-full">
		<p className="text-6xl">
			<!-- {{text === 'No comments yet' ? <span></span> : <MdOutlineVideocamOff />
			}} -->
			<span
				class="mdi mdi-comment-off"
				v-if="text.toLowerCase().includes('No comments yet'.toLowerCase())"
			></span>
			<span v-else class="mdi mdi-video-off"></span>
		</p>
		<p className="text-2xl text-center">{{ text }}</p>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		text: string;
	}>();
</script>

<style scoped></style>
