<template>
	<div class="flex flex-col border-b-2 border-gray-200 pb-6">
		<div>
			<div class="flex gap-3 p-2 cursor-pointer font-semibold rounded">
				<div class="w-10 h-10 md:(w-16 h-16)">
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
						<div class="flex items-center gap-2">
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
		</div>

		<div class="lg:(ml-20) flex gap-4 relative">
			<div
				class="rounded-3xl"
				@mouseover="isHover = true"
				@mouseleave="isHover = false"
			>
				<NuxtLink to="/">
					<video
						class="h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 md:(h-[400px]) lg:(w-[600px] h-[530px])"
						loop
						:src="post.video.asset.url"
					></video>
				</NuxtLink>
				<!-- <div v-if="isHover"></div> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { IPost } from '~~/models/models';

	defineProps<{
		post: IPost;
	}>();

	const isHover = ref(false);
	const playing = ref(false);
</script>

<style scoped></style>
