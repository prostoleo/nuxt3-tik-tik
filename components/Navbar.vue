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
		<div @click="handleLogout">search</div>

		<div>
			<template v-if="userComputed">
				<div>
					{{ userStore.getUser.userName }}
					<img :src="userStore.getUser.image" />
				</div>
			</template>
			<template v-else>
				<div>
					<GoogleLogin
						:clientId="config.public.GOOGLE_API_CLIENT_ID"
						:callback="handleLogin"
						:error="userStore.handleError"
					/>
				</div>
			</template>
		</div>
		<!-- <span class="material-symbols-outlined"></span> -->
		<!-- </div> -->
	</header>
</template>

<script setup lang="ts">
	import { IGoogleResponse } from '~/store/user';
	import { useUserStore } from '~/store/user';
	import {
		useSanityClient,
		// clientSanity as sanityClient,
	} from '~/utils/sanityClient';
	import {
		GoogleLogin,
		googleLogout,
		decodeCredential,
	} from 'vue3-google-login';
	// import  '*.png' from './index.d.ts';
	import Logo from '/tiktik-logo.png';
	// console.log('GoogleLogin: ', GoogleLogin);
	// console.log('GoogleLogin: ', GoogleLogin);
	// console.log('sanityClient: ', sanityClient);
	// console.log('clientSanity: ', clientSanity);

	const config = useRuntimeConfig();

	const { getUserCookie, setUserCookie, clearUserCookie } = useCookieUser();
	// console.log('userCookie: ', userCookie);
	// console.log('getUserCookie.: ', getUserCookie);

	// const sanity = useSanity();
	// console.log('sanity: ', sanity);
	const userStore = useUserStore();
	const userComputed = computed(() => userStore.getUser);
	const clientSanity = useSanityClient(config);
	// console.log('clientSanity: ', clientSanity);

	watch(
		getUserCookie,
		(newVal) => {
			console.log('newVal: ', newVal);
			console.log(typeof newVal);
			if (newVal) {
				console.log(`newVal truthy - setUser`);
				userStore.setUserFromCookieUser(newVal);
			} else {
				console.log(`newVal falsy - clearUser`);
				userStore.clearUser();
			}
		},
		{
			immediate: true,
		}
	);

	async function handleLogin(googleResponse: IGoogleResponse) {
		try {
			const user = await userStore.createOrGetUser(googleResponse);
			const rawUser = toRaw(user);
			console.log('rawUser: ', rawUser);

			const { data, error } = await useFetch(`/api/auth`, {
				method: 'POST',
				body: {
					user: rawUser,
				},
			});
			console.log('data: ', data);

			if (data.value.statusCode !== 200) {
				throw new Error(`ошибка`);
			}

			// userStore.setIsLoginTrue();
			setUserCookie(rawUser);
		} catch (error) {
			userStore.setIsLoginFalse();
			// userStore.$state.isLogin = false;
		}
	}

	async function handleLogout() {
		await googleLogout();

		userStore.clearUser();
		clearUserCookie();
	}

	function handleError(error: any) {}
</script>

<style lang="scss" scoped></style>
