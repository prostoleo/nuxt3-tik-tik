<template>
	<div class="borde-gray-200 pb-4 xl:(border-b-2)">
		<p class="m-3 font-semibold mt-4 hidden xl:(block) text-gray-500">
			SuggestedAccounts
		</p>

		<div v-if="users.length > 0">
			<div v-for="user in users.slice(0, 5)" :key="user._id">
				<NuxtLink :to="`/profile/${user._id}`">
					<div
						class="flex gap-3 items-center p-2 font-semibold cursor-pointer rounded hover:(bg-primary)"
					>
						<div class="w-8 h-8">
							<img
								class="rounded-full"
								:src="user.image"
								:alt="`photo of ${user.userName}'s profile`"
							/>
						</div>
						<div class="hidden xl:(block)">
							<p class="flex gap-1 items-center font-bold lowercase">
								{{ user.userName.replaceAll(` `, ``) }}
								<span></span>
							</p>
							<p class="capitalize text-gray-400 text-xs">
								{{ user.userName }}
							</p>
						</div>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { IUser, useUserStore } from '~~/store/user';
	// import { getRandomInt } from '~/utils/getRandomInt';

	const users = ref<IUser[] | []>([]);
	const userStore = useUserStore();
	const usersFetched = await userStore.fetchAllUsers();
	// console.log('usersFetched: ', usersFetched);
	users.value = userStore.getAllUsers;
	// console.log('users: ', users);

	const indexesOfSelectedAccounts = ref([]);

	const suggestedAccounts = computed(() => {
		const allAccountsMinusUsers = userStore.getAllUsers.filter(
			(acc: IUser) => acc._id !== userStore.getUser._id
		);

		/* if (allAccountsMinusUsers.length <= 4) {
			return allAccountsMinusUsers;
		}

		const randomAccounts = allAccountsMinusUsers.reduce((ranAccs, acc, index) => {
			let randomIndex = 0;

			do {
				randomIndex = getRandomInt(0, allAccountsMinusUsers.length)
			} while (!indexesOfSelectedAccounts.value.includes(randomIndex));

			indexesOfSelectedAccounts.value = [...indexesOfSelectedAccounts.value, randomIndex];

			
		}, []); */
	});
</script>

<style scoped></style>
