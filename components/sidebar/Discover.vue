<template>
	<div class="pb-6 xl:(border-b-2 border-gray-200)">
		<p class="font-semibold text-gray-500 m-3 mt-4 hidden xl:(block)">
			Popular topics
		</p>

		<div class="flex gap-3 flex-wrap">
			<NuxtLink
				v-for="item in topics"
				:key="item.name"
				:to="`/?topic=${item.name}`"
			>
				<div
					class="p-3 rounded flex items-center justify-center gap-2 cursor-pointer text-black xl:(border-2 border-gray-300 rounded-full) hover:(bg-primary)"
					:class="{
						'!border-accent !text-accent': route?.query?.topic === item.name,
					}"
				>
					<span
						icon
						:class="`font-bold text-2xl xl:(text-md) mdi ${item.icon}`"
					></span>
					<span class="font-medium text-md capitalize hidden xl:(block)">{{
						item.name
					}}</span>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { topics } from '~~/utils/constants';
	// import MenuIcon from 'vue-material-design-icons/Menu.vue';
	const route = useRoute();
</script>

<style scoped lang="scss">
	.nuxt-link-exact-active {
		span[icon] {
			@apply;
		}
	}
</style>
