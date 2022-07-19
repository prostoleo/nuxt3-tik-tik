<template>
	<div>
		<div
			class="border-t-2 border-b-2 border-gray-200 bg-light-300 px-10 pb-28 lg:(pb-0) overflow-y-scroll"
		>
			<div class="h-72 lg:(h-lg)">
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
										class="flex gap-3 items-center p-2 font-semibold cursor-pointer"
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
			class="fixed absolute bottom-0 left-0 left-0 pb-2 px-2 md:(px-10) lg:(absolute)"
		>
			<form class="flex gap-4" @submit.prevent="addComment">
				<input
					class="bg-primary px-6 py-4 font-medium border-2 border-gray-100 w-64 md:(w-3xl) lg:(w-72) focus:(border-accent/50 outline-none) flex-1 rounded-lg"
					type="text"
					v-model.trim="newComment"
					placeholder="add comment"
				/>
				<button aria-label="submit comment" @click="addComment">
					<span>
						{{ isPostingComment ? 'Commenting..' : 'Comment' }}
					</span>
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
</script>

<style scoped></style>
