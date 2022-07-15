<template>
	<div>
		<div videos class="flex flex-col gap-10 h-full">
			<div v-if="posts.length > 0">
				<VideoCard v-for="post in posts" :key="post._id" :post="post" />
			</div>
			<div v-else>
				<VideoNoResults :text="`no results found`" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';
	import { IPost } from '~/models/models';

	import { allPostsQuery } from '~~/utils/queries';

	const sanity = useSanity();
	const { data: posts }: { data: Ref<IPost[]> } = await useAsyncData(
		'allPosts',
		() => sanity.fetch(allPostsQuery)
	);
	// console.log('data: ', data);
</script>

<style lang="scss" scoped>
	h1 {
		// $color: red;

		span {
			font-style: italic;
		}
	}
</style>
