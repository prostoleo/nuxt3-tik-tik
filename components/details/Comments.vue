<template>
	<div
		class="border-t-2 border-b-2 border-gray-200 bg-light-300 pb-8 lg:(pb-0)"
	>
		<div class="overflow-y-auto lg:(h-md)">
			<div v-if="comments?.length">videos</div>
			<div v-else="">
				<VideoNoResults text="No comments yet. Be the first one" />
			</div>
		</div>

		<div
			v-if="userStore.getUser"
			class="absolute bottom-0 left-0 left-0 pb-2 px-2 md:(px-10)"
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
	import { useUserStore } from '~~/store/user';

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
