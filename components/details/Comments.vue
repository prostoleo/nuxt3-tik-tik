<template>
	<div
		ref="wrapperEl"
		class="relative transform transition-transform duration-300 pb-28 lg:(pb-0)"
		:class="{
			'transform transition-transform duration-300 -translate-y-70/100':
				showCommentsComputed,
		}"
		@click.capture="handleWrapperClick"
	>
		<!-- @pointerleave="pointerOver = false"
		@pointerout="pointerOver = false"
		@pointerenter.prevent="pointerOver = true"
		@pointerover.prevent="pointerOver = true"
		@pointerdown.prevent="pointerOver = true" -->

		<!-- active:(transform transition-transform duration-300 -translate-y-70/100) hover:(transform transition-transform duration-300 -translate-y-70/100) -->
		<!-- :class="{
			'transform transition-transform duration-300 -translate-y-70/100':
				showCommentsComputed || show,
		}" -->
		<!-- @poinetleave.capture="pointerOver = false" -->
		<!-- @pointerover.capture="pointerOver = true" -->
		<div
			class="border-t-2 border-b-2 border-gray-200 bg-light-300 px-2 md:(px-10) pb-28 lg:(pb-0) overflow-y-scroll"
		>
			<div class="h-72 max-h-[75vh] lg:(h-lg max-h-full)">
				<template v-if="comments?.length" class="">
					<div v-for="(item, idx) in comments" :key="item.key">
						<template v-for="user in userStore.getAllUsers" :key="user._id">
							<div
								v-if="user._id === item.postedBy._id || item.postedBy?._ref"
								class="p-2 items-center"
							>
								<NuxtLink :to="`/profile/${user._id}`">
									<!-- rounded hover:(bg-primary) -->
									<div
										class="inline-flex gap-3 items-center p-2 font-semibold cursor-pointer"
									>
										<div class="w-8 h-8">
											<img
												class="rounded-full"
												:src="user.image"
												:alt="`photo of ${user.userName}'s profile`"
											/>
										</div>
										<div class="">
											<p class="flex gap-1 items-center font-bold lowercase">
												{{ user.userName.replaceAll(' ', '') }}
												<span></span>
											</p>
											<p class="capitalize text-gray-400 text-xs">
												{{ user.userName }}
											</p>
										</div>
									</div>
								</NuxtLink>
								<div>
									<p>{{ item.comment }}</p>
								</div>
							</div>
						</template>
					</div>
				</template>
				<template v-else="">
					<VideoNoResults text="No comments yet. Be the first one" />
				</template>
			</div>
		</div>
		<div
			v-if="userStore.getUser"
			class="absolute bottom-0 left-0 pb-2 px-2 md:(px-10) lg:(absolute)"
		>
			<form
				class="flex flex-wrap gap-2 md:(gap-4)"
				@submit.prevent="addComment"
			>
				<input
					class="bg-primary px-6 py-4 font-medium border-2 border-gray-100 w-64 max-w-60/100 md:(w-3xl) lg:(w-72) focus:(border-accent/50 outline-none) flex-1 rounded-lg"
					type="text"
					v-model.trim="newComment"
					placeholder="add comment"
				/>
				<button
					class="border-2 border-accent px-2 rounded-lg transition-colors hover:(bg-accent text-white)"
					aria-label="submit comment"
					@click="addComment"
				>
					{{ isPostingComment ? 'Commenting..' : 'Comment' }}
				</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { IComment, IPostedBy } from '~~/models/models';
	import { IUser, useUserStore } from '~~/store/user';

	const emit = defineEmits(['add-comment']);

	interface ICommentLocal {
		comment: string;
		// length?: number;
		_key: string;
		postedBy: IPostedBy;
	}

	const props = defineProps<{
		isPostingComment: boolean;
		comments: IComment[];
	}>();
	// comment: IComment;

	// const comments = ref([]);
	const userStore = useUserStore();

	const newComment = ref('');
	// const isCommenting = ref(false);

	function addComment() {
		emit('add-comment', newComment.value);
		newComment.value = '';
	}

	const pointerOver = ref(false);
	const showCommentsComputed = computed(
		() => process.client && window.innerWidth <= 1024 && pointerOver.value
	);
	// const show = ref(false);
	const wrapperEl = ref<HTMLDivElement | null>(null);

	function handleWrapperClick(event: Event) {
		console.log('event.target: ', event.target);
		if (
			!event?.target?.matches('input') &&
			!event?.target.matches('a') &&
			!event?.target?.matches('button')
		) {
			pointerOver.value = !pointerOver.value;
		}
	}
</script>

<style scoped></style>
