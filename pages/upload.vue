<template>
	<div
		class="flex justify-center w-full h-full absolute left-0 top-20 mb-10 pt-10 lg:(pt-20) bg-warm-gray-100"
	>
		<div
			class="bg-white rounded-lg flex gap-6 flex-wrap justify-center items-center p-14 pt-6 w-7/10 justify-around xl:(h-[80vh])"
		>
			<div>
				<div>
					<p class="text-2xl font-bold">Upload video</p>
					<p class="text-md text-gray-400 mt-1">Post video to your account</p>
				</div>
				<div
					class="border-4 border-dashed bourder-gray-200 rounded-xl flex flex-col justify-center items-center mt-10 outline-none w-[260px] h-[460px] p-6 cursor-pointer hover:(border-red-300) bg-gray-100"
				>
					<p v-if="isLoading">Uploading...</p>
					<div v-else>
						<div v-if="videoAsset">
							<video
								:src="videoAsset.url"
								loop
								controls
								class="rounded-xl h-[450px] mt-16 bg-black"
							></video>
						</div>
						<div v-else>
							<label class="cursor-pointer" for="uploadVideo">
								<div class="flex flex-col items-center justify-center h-full">
									<div class="flex flex-col items-center justify-center">
										<p class="font-bold text-xl">
											<span
												class="mdi mdi-cloud-upload text-gray-300 text-6xl"
											></span>
										</p>
										<p class="text-xl font-semibold">Upload video</p>
									</div>
									<p class="text-gray-400 text-center text-sm mt-10 leading-8">
										MP4 or WebM or ogg <br />
										720x1280 or higher <br />
										Up to 10 minutes <br />
										Less than 2GB
									</p>
									<p
										class="bg-accent text-white mt-10 rounded text-center text-md font-medium p-2 w-52 outline-none"
									>
										Select file
									</p>
									<input
										id="uploadVideo"
										ref="inputFileEl"
										type="file"
										name="upload-video"
										class="w-0 h-0"
										@change="uploadVideo"
									/>
								</div>
							</label>
						</div>
						<p
							class="text-center text-red-400 font-semibold mt-4 text-xl w-[250px]"
							v-if="wrongFileType"
						>
							Please select a video file
						</p>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-3 pb-10">
				<label for="captionInput" class="font-medium">Caption</label>
				<input
					id="captionInput"
					type="text"
					v-model="caption"
					class="rounded outline-none border-2 border-gray-200 p-2"
				/>
				<label for="selectInput" class="font-medium">Choose a Category</label>
				<select
					id="selectInput"
					v-model="selectedCategory"
					class="rounded outline-none border-2 border-gray-200 p-2 capitalize cursor-pointer lg:(p-4)"
				>
					<option
						v-for="topic in topics"
						:key="topic.name"
						class="capitalize bg-white outline-transparent text-gray-700 hover:(bg-slate-300)"
						:value="topic.name"
					>
						{{ topic.name }}
					</option>
				</select>
				<div class="flex gap-6 mt-10">
					<button
						class="border-gra-300 border-2 font-medium p-2 rounded w-28 lg:(w-44)"
						type="button"
					>
						Discard
					</button>
					<button
						class="bg-accent text-white border-transparent border-2 font-medium p-2 rounded w-28 lg:(w-44)"
						type="button"
						@click="handlePost"
					>
						Post
					</button>
					<!-- <button></button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { SanityAssetDocument } from '@sanity/client';
	import { useSanityClient } from '~~/utils/sanityClient';
	import { useUserStore } from '~~/store/user';
	import { topics } from '~~/utils/constants';

	const config = useRuntimeConfig();
	const userStore = useUserStore();
	// const client = useSanityClient(config);
	const sanity = useSanity();
	// console.log('sanity: ', sanity.client.assets.upload);

	const isLoading = ref(false);
	const videoAsset = ref<SanityAssetDocument | undefined>();
	const wrongFileType = ref(false);
	const inputFileEl = ref<HTMLInputElement>(null);

	const caption = ref('');
	const selectedCategory = ref(topics[0].name);
	const savingPost = ref(false);

	async function uploadVideo() {
		// try {
		// console.log('inputFileEl?.value: ', inputFileEl?.value);
		// const selectedFile = event.target.files[0];
		const selectedFile = inputFileEl?.value?.files[0];
		const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

		if (fileTypes.includes(selectedFile.type)) {
			console.log(`include`);
			// client.assets
			sanity.client.assets
				.upload('file', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((data) => {
					console.log('data: ', data);
					videoAsset.value = data;
					isLoading.value = false;
				});
			/* .catch((err) => {
						console.log(err);
					}); */
		} else {
			console.log(`error`);
			isLoading.value = false;
			wrongFileType.value = true;
		}
		// }
		/* catch (error) {
			console.log(error);
		} */
	}

	const router = useRouter();

	async function handlePost() {
		try {
			if (
				!caption?.value ||
				!videoAsset?.value?._id ||
				!selectedCategory?.value
			) {
				return;
			}

			savingPost.value = true;

			const userData = toRaw(userStore.getUser);
			console.log('userData: ', userData);

			const document = {
				_type: 'post',
				caption: caption.value,
				video: {
					_type: 'file',
					asset: {
						_type: 'reference',
						_ref: videoAsset?.value?._id,
					},
				},
				userId: userData?._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userData?._id,
				},
				topic: selectedCategory?.value,
			};

			const { data, error } = await useFetch(`/api/post`, {
				method: 'POST',
				body: {
					document: document,
				},
			});
			console.log('data: ', data);

			if (error.value) {
				throw new Error(data.value.responseBody);
			}

			router.push('/');
		} catch (error) {
			console.log(error);
		}
	}
</script>

<style scoped></style>
