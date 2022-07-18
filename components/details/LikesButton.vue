<template>
	<div class="gap-6">
		<div
			class="mt-4 inline-flex flex-col justify-center items-center cursor-pointer"
		>
			<div v-if="alreadyLiked">
				<span
					class="mdi mdi-heart-multiple bg-primary rounded-full text-lg text-accent block aspect-square !leading-none p-2 md:(text-2xl p-4)"
					@click="handleLike"
				></span>
			</div>
			<div v-else>
				<span
					class="mdi mdi-heart-multiple-outline bg-primary rounded-full text-lg text-accent block aspect-square !leading-none p-2 md:(text-2xl p-4)"
					@click="handleLike"
				></span>
			</div>
			<p class="font-semibold">{{ likes?.length || 0 }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ComputedRef } from 'vue';
	import { ILike } from '~~/models/models';
	import { useUserStore } from '~~/store/user';
	const props = defineProps<{
		likes: ILike[];
	}>();
	const emit = defineEmits(['toggle-like']);

	const alreadyLiked = ref(false);
	const userStore = useUserStore();

	function handleLike() {
		alreadyLiked.value = !alreadyLiked.value;
		emit('toggle-like', alreadyLiked);
	}

	const filterLikes: ComputedRef<ILike | ILike[]> = computed(() => {
		const arr: ILike | ILike[] = props?.likes?.filter(
			(item) => item?._ref === userStore?.getUser?._id
		);

		return arr;
	});

	watch([props.likes, filterLikes], () => {
		if (filterLikes?.value?.length > 0) {
			alreadyLiked.value = true;
		} else {
			alreadyLiked.value = false;
		}
	});
</script>

<style scoped></style>
