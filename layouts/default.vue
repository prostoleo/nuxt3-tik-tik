<template>
	<div class="website-wrapper">
		<Navbar />
		<main class="flex gap-6 md:(gap-20)">
			<div class="h-[92vh] overflow-hidden xl:(overflow-auto)">
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
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.website-wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
