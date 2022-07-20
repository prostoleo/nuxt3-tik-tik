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
		<div class="relative">
			<form
				class="absolute md:static top-10 -left-20 bg-white inline-flex items-center"
				@submit.prevent="handleSearch"
			>
				<input
					type="text"
					v-model.trim="searchQuery"
					class="bg-primary p-3 font-medium border-2 border-gray-100 rounded-lg focus:(border-accent/50 outline-transparent) md:(top-0)"
					placeholder="Search accounts and videos"
				/>
				<button
					aria-label="Search accounts and videos"
					class="right-6 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
				>
					<span class="mdi mdi-magnify"></span>
				</button>
			</form>
		</div>

		<div>
			<template v-if="userComputed">
				<div class="flex gap-5 items-center md:(gap-10)">
					<NuxtLink to="/upload">
						<button
							class="border-2 px-2 text-md font-semibold flex items-center gap-2 md:(px-4)"
						>
							<span class="mdi mdi-plus text-xl"></span>
							<span class="hidden md:(block)">Upload</span>
						</button>
					</NuxtLink>
					<!-- {{ userStore.getUser.userName }} -->
					<template v-if="userStore.getUser.image">
						<NuxtLink class="block w-full h-full" to="/">
							<img
								:src="userStore.getUser.image"
								class="block w-full h-full object-cover rounded-full aspect-square w-10 h-10 cursor-pointer"
								:alt="`photo of ${userStore.getUser.userName}'s profile`"
							/>
							<!-- width="62" -->
							<!-- height="62" -->
						</NuxtLink>
					</template>
					<button class="px-2" type="button" @click="handleLogout">
						<span class="mdi mdi-logout text-red-400 text-2xl"></span>
					</button>
					<!-- <img  :src="userStore.getUser.image" /> -->
				</div>
			</template>
			<template v-else>
				<div>
					<GoogleLogin
						ref="googleLoginEl"
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

	const googleLoginEl = ref(null);
	onMounted(() => {
		// console.log('googleLoginEl: ', googleLoginEl);
		console.log('googleLoginEl.value.$el: ', googleLoginEl.value.$el);

		/* nextTick(() => {
			console.log('googleLoginEl: ', googleLoginEl);
		}); */
		if (process.client) {
			/* const gBtnWrapper = document
				.querySelector('.api-loading')
				.classList.remove('api-loading'); */
			googleLoginEl.value.$el.classList.remove('api-loading');
		}
	});

	const config = useRuntimeConfig();

	const { getUserCookie, setUserCookie, clearUserCookie } = useCookieUser();
	const userStore = useUserStore();
	const userComputed = computed(() => userStore.getUser);
	const clientSanity = useSanityClient(config);

	watch(
		getUserCookie,
		(newVal) => {
			// console.log('newVal: ', newVal);
			// console.log(typeof newVal);
			if (newVal) {
				// console.log(`newVal truthy - setUser`);
				userStore.setUserFromCookieUser(newVal);
			} else {
				// console.log(`newVal falsy - clearUser`);
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
			// console.log('rawUser: ', rawUser);

			const { data, error } = await useFetch(`/api/auth`, {
				method: 'POST',
				body: {
					user: rawUser,
				},
			});
			// console.log('data: ', data);

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

	// function handleError(error: any) {}
	const searchQuery = ref('');

	const router = useRouter();

	function handleSearch() {
		if (searchQuery.value.length > 0) {
			router.push(`/search/${searchQuery.value}`);
		}
	}
</script>

<style lang="scss" scoped></style>
