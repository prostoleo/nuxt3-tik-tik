<template>
	<div class="website-wrapper">
		<div class="m-auto overflow-hidden h-screen xl:(w-7xl)">
			<Navbar />
			<main class="flex gap-6 md:(gap-20)">
				<div class="h-[90vh] overflow-hidden xl:(overflow-y-auto)">
					<Sidebar />
				</div>
				<div
					class="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1 videos"
				>
					<slot />
				</div>
			</main>
			<footer>footer</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '~~/store/user';

	const userStore = useUserStore();
</script>

<style lang="scss" scoped>
	.website-wrapper > div {
		min-height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
