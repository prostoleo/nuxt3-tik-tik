<template>
	<aside>
		<div class="block m-2 ml-4 mt-3 xl:(hidden)" @click="toggleSidebar">
			<div v-if="showSidebar" class="cursor-pointer text-xl">
				<span class="mdi mdi-close-circle"></span>
			</div>
			<div v-else class="cursor-pointer text-xl">
				<span class="mdi mdi-menu"></span>
			</div>
		</div>

		<div v-if="showSidebar" class="sidebar-content">
			<div
				class="w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-200 p-3 xl:(border-0 w-400)"
			>
				<div class="border-gray-200 xl:(pb-4 border-b-2)">
					<NuxtLink class="block" to="/">
						<div
							class="flex items-center justify-center p-3 gap-2 font-semibold cursor-pointer text-accent rounded xl:(justify-start) hover:(bg-primary)"
						>
							<!-- <p class=""> -->
							<!-- <i class="bi bi-house-fill"></i> -->
							<span class="text-2xl mdi mdi-home"></span>
							<!-- </p> -->
							<span class="text-xl hidden xl:(block)">For you</span>
						</div>
					</NuxtLink>
				</div>
				<div v-if="!userProfile" class="px-2 py-4 hidden xl:(block)">
					<p class="text-gray-400">Log in to like and comment on videos</p>
					<div class="pr-4">Google login</div>
				</div>

				<SidebarDiscover />
				<SidebarSuggestedAccounts />
				<SidebarFooter />
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
	// const router = useRouter();
	const showSidebar = ref(true);

	const toggleSidebar = () => {
		// console.log(`click`);
		showSidebar.value = !showSidebar.value;
	};

	const userProfile = ref(false);
</script>

<style lang="scss" scoped></style>
