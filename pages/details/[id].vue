<template>
	<div>
		<div v-if="!postDetails">Oopsy</div>
		<div
			v-if="postDetails"
			class="flex w-full h-full absolute left-0 top-0 bottom-0 bg-white flex-wrap lg:(flex-wrap)"
		>
			<!-- <pre>{{ postDetails }}</pre> -->
			<div
				class="relative flex-2 w-full lg:(w-75/100) flex justify-center items-center"
			>
				<div
					class="absolute inset-0 bg-blurred-img-my bg-no-repeat bg-cover filter blur-lg"
				></div>
				<NuxtLink
					class="absolute top-6 left-2 lg:(left-6) flex gap-6 z-50 p-1 bg-white opacity-60 rounded-full hover:(opacity-100)"
					to="/"
				>
					<span class="mdi mdi-close mdi-36px leading-none"></span>
				</NuxtLink>
				<div class="relative">
					<div class="lg:(h-screen) h-[60vh]">
						<video
							ref="videoRef"
							class="h-full cursor-pointer"
							loop
							:src="postDetails.video.asset.url"
							@click="onVideoClick"
						></video>
					</div>

					<div
						class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					>
						<template v-if="!playing">
							<button class="p-1 bg-white rounded-xl" @click="onVideoClick">
								<span class="mdi mdi-play text-6xl lg:(text-8xl)"></span>
							</button>
						</template>
						<!-- <template v-if="playing">
							<button class="p-2 bg-white rounded-xl" @click="onVideoClick">
								<span class="mdi mdi-pause text-6xl lg:(text-8xl)"></span>
							</button>
						</template> -->
					</div>
					<div
						class="absolute bottom-5 right-5 lg:(right-10 bottom-10) rounded-full p-1 bg-white opacity-50 filter drop-shadow-sm cursor-pointer hover:(opacity-100)"
					>
						<template v-if="isVideoMuted">
							<button
								class=""
								aria-label="turn on volume"
								@click="isVideoMuted = false"
							>
								<span
									class="mdi mdi-volume-off text-black text-2xl lg:(text-4xl)"
								></span>
							</button>
						</template>
						<template v-else>
							<button
								class=""
								aria-label="turn off volume"
								@click="isVideoMuted = true"
							>
								<span
									class="mdi mdi-volume-high text-black text-2xl lg:(text-4xl)"
								></span>
							</button>
						</template>
					</div>
				</div>
			</div>

			<div
				class="relative flex-grow flex-shrink-0 w-full h-full bg-white lg:(w-25/100)"
			>
				<div class="mt-10 lg:(mt-20)">
					<div class="flex gap-3 p-2 cursor-pointer font-semibold rounded">
						<div class="w-16 h-16 md:(w-20 h-20)">
							<NuxtLink class="block w-full h-full" to="/">
								<img
									:src="post.postedBy.image"
									class="block w-full h-full object-cover rounded-full aspect-square"
									:alt="`photo of ${post.postedBy.userName}'s profile`"
								/>
								<!-- width="62" -->
								<!-- height="62" -->
							</NuxtLink>
						</div>
						<div>
							<NuxtLink to="/">
								<div class="flex flex-col gap-2 mt-3">
									<p
										class="flex gap-2 items-center font-bold text-primary md:(text-md)"
									>
										{{ post.postedBy.userName }}
										<!-- goberfified icon -->
									</p>
									<p
										class="capitalize font-medium text-xs text-gray-500 hidden md:(block)"
									>
										{{ post.postedBy.userName }}
									</p>
								</div>
							</NuxtLink>
						</div>
					</div>

					<p class="px-10 text-gray-600 text-lg">{{ postDetails.caption }}</p>

					<div class="mt-10 px-10">
						<!-- <pre>{{ userStore?.getUser?._id }}</pre> -->
						<template v-if="userStore?.getUser?._id">
							<DetailsLikesButton
								:likes="post.likes"
								@toggle-like="handleLike"
							/>
						</template>
						<DetailsComments />
						<!-- <Comments/> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';
	import { IPost } from '~/models/models';
	import { useUserStore } from '~~/store/user';

	import { postDetailQuery } from '~~/utils/queries';

	// type error: Ref<any>AsyncData<DataT> = {
	// 	data: Ref<DataT>;
	// 	pending: Ref<boolean>;
	// 	refresh: () => Promise<void>;
	// 	error: Ref<any>;
	// };
	type LikeData = {
		userId: Ref<string> | string;
		postId: Ref<string> | string;
		like: Ref<boolean> | boolean;
	};

	const route = useRoute();
	const videoId = ref(route?.params?.id);
	// console.log('videoId: ', videoId);
	const detailQuery = postDetailQuery(videoId.value);
	const sanity = useSanity();
	const userStore = useUserStore();

	const {
		data: postDetails,
		pending,
		refresh,
	}: {
		data: Ref<IPost>;
		pending: Ref<boolean>;
		refresh: () => Promise<void>;
		error: Ref<any>;
	} = await useAsyncData('singlePost', () =>
		sanity.fetch(detailQuery).then((data) => data[0])
	);

	const post = ref(postDetails);

	const videoRef = ref<HTMLVideoElement>(null);
	const playing = ref(false);
	const isVideoMuted = ref(false);

	function onVideoClick(): void {
		if (!process.client) return;

		if (playing.value) {
			videoRef?.value?.pause();

			playing.value = false;
		} else {
			videoRef?.value?.play();
			playing.value = true;
		}
	}

	watch([post, isVideoMuted], () => {
		if (videoRef?.value) {
			videoRef.value.muted = isVideoMuted.value;
		}
	});

	watch(
		// route.params,
		videoId,
		(newVal, oldVal) => {
			// console.log({ newVal, oldVal });
			// if (newVal?.id && newVal?.id !== oldVal?.id) {
			if (newVal && newVal !== oldVal) {
				refresh();
			}
		},
		{
			immediate: true,
		}
	);

	async function handleLike(like: Ref<boolean>) {
		if (userStore.getUser) {
			const rawUser = toRaw(userStore.getUser);
			// console.log('rawUser: ', rawUser);

			const likeData: LikeData = {
				userId: rawUser._id,
				postId: post.value._id,
				like: unref(like),
			};

			const { data, error } = await useFetch(`/api/like`, {
				method: 'PUT',
				body: {
					likeData: likeData,
				},
			});

			post.value = { ...post.value, likes: data.value.body.likes };
		}
	}
</script>

<style scoped></style>
