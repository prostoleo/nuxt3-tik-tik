<template>
	<header
		class="w-full flex justify-between items-center border-b-2 border-solid border-b-gray-200 py-2 px-4"
	>
		<!-- <div class="container mx-auto "> -->
		<NuxtLink to="/">
			<div class="w-24 md:(w-28)">
				<!-- <img class="cursor-pointer max-w-full" src="/tiktik-logo.png" /> -->
				<img class="cursor-pointer" :src="Logo" alt="TikTik logo" />
			</div>
		</NuxtLink>
		<!-- <i class="bi bi-archive"></i> -->

		<!-- <span class="material-symbols-outlined"></span> -->
		<!-- </div> -->
	</header>
</template>

<script setup lang="ts">
	// import  '*.png' from './index.d.ts';
	import Logo from '/tiktik-logo.png';

	const router = useRouter();
	// console.log('router: ', router);
</script>

<style lang="scss" scoped></style>
