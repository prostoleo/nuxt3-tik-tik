<template>
	<div class="w-full">
		<div
			class="flex gap-10 mb-10 mt-10 border-b-2 border-gra-200 bg-white w-full"
		>
			<button
				class="text-xl font-semibold cursor-pointer mt-2 border-b-2 border-transparent"
				:class="{
					'border-dark-400': selectedTab === ITab.IsVideos,
					'text-gray-400': selectedTab !== ITab.IsVideos,
				}"
				@click="handleTab(ITab.IsVideos)"
			>
				<!-- :aria-label="`View videos of ${user.userName}`" -->
				{{ ITab.IsVideos }}
			</button>
			<button
				class="text-xl font-semibold cursor-pointer mt-2 border-b-2 border-transparent"
				:class="{
					'border-dark-400': selectedTab === ITab.IsAccounts,
					'text-gray-400': selectedTab !== ITab.IsAccounts,
				}"
				@click="handleTab(ITab.IsAccounts)"
			>
				<!-- :aria-label="`View liked videos of ${user.userName}`" -->
				{{ ITab.IsAccounts }}
			</button>
		</div>

		<div
			v-if="selectedTab === ITab.IsVideos"
			class="flex flex-wrap gap-6 md:(mt-16 justify-start)"
		>
			<template v-if="data.body.videos?.length > 0">
				<VideoCard
					v-for="video in data.body.videos"
					:key="video._id"
					:post="video"
				/>
			</template>
			<template v-else>
				<VideoNoResults
					:text="`No video results for ${$route.params.searchTerm}`"
				/>
			</template>
		</div>
		<div v-else-if="selectedTab === ITab.IsAccounts" class="md:(mt-16)">
			<template v-if="searchedAccounts?.length > 0">
				<NuxtLink
					v-for="user in searchedAccounts"
					:key="user._id"
					:to="`/profile/${user._id}`"
				>
					<!-- rounded hover:(bg-primary) -->
					<div
						class="flex gap-3 items-center p-2 font-semibold cursor-pointer border-b-2 border-gray-200"
					>
						<div class="w-12 h-12">
							<img
								class="rounded-full"
								:src="user.image"
								:alt="`photo of ${user.userName}'s profile`"
							/>
						</div>
						<div class="mb-1">
							<p class="flex gap-1 items-center font-bold lowercase text-xl">
								{{ user.userName.replaceAll(' ', '') }}
								<span></span>
							</p>
							<p class="capitalize text-gray-400 text-sm">
								{{ user.userName }}
							</p>
						</div>
					</div>
				</NuxtLink>
			</template>
			<template v-else>
				<VideoNoResults
					:text="`No accounts results for ${$route.params.searchTerm}`"
				/>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { IUser, useUserStore } from '~~/store/user';
	import { IPost } from '~/models/models';
	import { Ref } from 'vue';

	interface ISearchData {
		body: {
			videos: IPost[];
		};
	}

	const route = useRoute();
	const searchTerm: any = route.params.searchTerm;
	// console.log('searchTerm: ', searchTerm);
	// console.log('profileId: ', profileId);
	// console.log('videoId: ', videoId);
	// const profilesQuery = singleUserQuery(profileId);
	// const sanity = useSanity();
	const userStore = useUserStore();

	const {
		data,
	}: {
		data: Ref<ISearchData>;
	} = await useFetch(`/api/search/${searchTerm}`, {
		method: 'POST',
		/* body: {
			searchTerm,
		}, */
	});

	// const dataToShow = ref(data)
	// console.log('data: ', data);
	// console.log('videos: ', videos);
	const searchedAccounts = userStore.getAllUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm.toLowerCase())
	);
	// console.log('searchedAccounts: ', searchedAccounts);

	enum ITab {
		IsAccounts = 'Accounts',
		IsVideos = 'Videos',
	}

	const selectedTab = ref(ITab.IsAccounts);
	const videoList = ref([]) as Ref<IPost[] | []>;

	function handleTab(tabVal: ITab.IsAccounts | ITab.IsVideos) {
		if (tabVal === selectedTab.value) {
			return;
		}
		selectedTab.value = tabVal;
	}
</script>

<style scoped></style>
