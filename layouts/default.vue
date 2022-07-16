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

<script setup lang="ts">
	import { useUserStore } from '~~/store/user';

	const userStore = useUserStore();

	/* const config = useRuntimeConfig();
	const userCookie = useCookie(config.public.USER_KEY);
	// const userCookie = useState('userCookie')
	userCookie.value = userCookie.value || null;
	console.log('userCookie: ', userCookie); */

	/* const { getUserCookie, setUserCookie, clearUserCookie } = useCookieUser();
	setUserCookie({ c: 7, leo: 999 });

	setTimeout(() => {
		clearUserCookie();
	}, 10000); */

	// userStore.setUserFromCookie(JSON.parse(unref(userCookie)));
</script>

<style lang="scss" scoped>
	.website-wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
