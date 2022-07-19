<template>
	<div class="w-full">
		<div class="flex gap-6 mb-4 items-center bg-white w-full md:(gap-10)">
			<div class="w-16 h-16 md:(w-32 h-32)">
				<img
					class="rounded-full w-full h-full"
					:src="user.image"
					:alt="`photo of ${user.userName}'s profile`"
				/>
			</div>
			<div class="flex flex-col justify-center">
				<p
					class="flex gap-1 items-center justify-center font-bold lowercase md:(text-3xl tracking-wider)"
				>
					{{ user.userName.replaceAll(` `, ``) }}
					<!-- <span></span> -->
				</p>
				<p class="capitalize text-gray-400 text-xs md:(text-xl)">
					{{ user.userName }}
				</p>
			</div>
		</div>

		<div>
			<div
				class="flex gap-10 mb-10 mt-10 border-b-2 border-gra-200 bg-white w-full"
			>
				<button
					class="text-xl font-semibold cursor-pointer mt-2 border-b-2 border-transparent"
					:class="{
						'border-dark-400': selectedTab === ITab.Videos,
						'text-gray-400': selectedTab !== ITab.Videos,
					}"
					@click="handleTab(ITab.Videos)"
				>
					{{ ITab.Videos }}
				</button>
				<button
					class="text-xl font-semibold cursor-pointer mt-2 border-b-2 border-transparent"
					:class="{
						'border-dark-400': selectedTab === ITab.Likes,
						'text-gray-400': selectedTab !== ITab.Likes,
					}"
					@click="handleTab(ITab.Likes)"
				>
					{{ ITab.Likes }}
				</button>
			</div>

			<div class="flex gap-6 flex-wrap justify-center">
				<div v-if="videoList.length > 0">
					<VideoCard v-for="post in videoList" :key="post._id" :post="post">
					</VideoCard>
				</div>
				<div v-else>
					<VideoNoResults :text="noResultsTextComp" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Ref, ComputedRef } from 'vue';
	import { IPost, ICommentData, ILikeData } from '~/models/models';
	import { IUser, useUserStore } from '~~/store/user';

	import { singleUserQuery } from '~~/utils/queries';

	interface IProfileData {
		body: {
			user: IUser;
			userVideos: IPost[];
			userLikedVideos: IPost[];
		};
	}

	const route = useRoute();
	const profileId = route.params.id;
	// console.log('profileId: ', profileId);
	// console.log('videoId: ', videoId);
	// const profilesQuery = singleUserQuery(profileId);
	// const sanity = useSanity();
	const userStore = useUserStore();

	const {
		data,
	}: {
		data: Ref<IProfileData>;
	} = await useFetch(`/api/user-profile`, {
		method: 'POST',
		body: {
			profileId,
		},
	});
	// console.log('data: ', data);

	const { user, userVideos, userLikedVideos } = data.value.body;
	// console.log('userVideos: ', userVideos);
	// pending: Ref<boolean>;
	// refresh: () => Promise<void>;
	// } = await useFetch(`/api/profile/${profileId}`);
	enum ITab {
		Videos = 'Videos',
		Likes = 'Liked',
	}

	const selectedTab = ref(ITab.Videos);
	const videoList = ref([]) as Ref<IPost[] | []>;
	/* const videoList = computed<ComputedRef<IPost[] | []>>(() => {
		if (selectedTab.value === ITab.Videos) {
			return userVideos;
		}
		if (selectedTab.value === ITab.Likes) {
			return userLikedVideos;
		}
	}); */

	function handleTab(tabVal: ITab.Likes | ITab.Videos) {
		if (tabVal === selectedTab.value) {
			return;
		}
		selectedTab.value = tabVal;
	}

	watch(
		selectedTab,
		(newVal, oldVal) => {
			if (newVal === ITab.Videos) {
				videoList.value = userVideos;
				return;
			} else if (newVal === ITab.Likes) {
				videoList.value = userLikedVideos;
			}
		},
		{
			immediate: true,
			flush: 'pre',
		}
	);

	const noResultsTextComp = computed(() => {
		if (selectedTab.value === ITab.Videos) {
			return `No Videos Yet`;
		} else if (selectedTab.value === ITab.Likes) {
			return `No Liked Videos Yet`;
		}
	});
</script>

<style scoped></style>
