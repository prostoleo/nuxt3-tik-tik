<template>
	<div>
		<div videos class="flex flex-col gap-10 h-full">
			<!-- <pre>{{ topicPosts }}</pre> -->
			<div v-if="postsToShow?.length > 0" :key="$route?.fullPath">
				<!-- <pre>{{ posts }}</pre> -->
				<VideoCard v-for="post in postsToShow" :key="post._id" :post="post" />
			</div>
			<div v-else>
				<VideoNoResults :text="`no results found`" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';
	import { onBeforeRouteUpdate } from 'vue-router';
	import { IPost } from '~/models/models';

	import { allPostsQuery, topicPostsQuery } from '~~/utils/queries';

	const route = useRoute();
	// console.log('route: ', route);
	const topic = computed(() => route.query.topic);
	// const topic = ref(route.query.topic);

	const sanity = useSanity();

	const postsToShow = ref(null);

	const {
		data: posts,
		refresh,
	}: { data: Ref<IPost[]>; refresh: () => Promise<void> } = await useAsyncData(
		'allPosts',
		() => sanity.fetch(allPostsQuery),
		{
			watch: [route?.fullPath],
			initialCache: true,
		}
	);

	const {
		data: topicPosts,
		refresh: refreshTopic,
	}: // error: topicError,
	// pending: pendingError,
	// refresh: topicRefresh,
	{ data: Ref<IPost[]>; refresh: () => Promise<void> } = await useAsyncData(
		'topicPost',
		() => {
			/* console.log(
				'topicPostsQuery(route?.query?.topic): ',
				topicPostsQuery(route?.query?.topic)
			); */
			return sanity.fetch(topicPostsQuery(route?.query?.topic));
		},
		{
			watch: [route?.fullPath],
			initialCache: true,
		}
	);

	watch(
		topic,
		async (newVal, oldVal) => {
			if (newVal && newVal !== oldVal) {
				// console.log('refreshTopic: ', refreshTopic);
				await refreshTopic();

				postsToShow.value = topicPosts.value;
			} else {
				await refresh();
				postsToShow.value = posts.value;
			}
		},
		{
			immediate: true,
			flush: 'pre',
		}
	);
</script>

<style lang="scss" scoped>
	h1 {
		// $color: red;

		span {
			font-style: italic;
		}
	}
</style>
