<template>
  <div class="flex flex-col border-b-2 border-gray-200 pb-6" v-if="post">
    <div>
      <div class="flex gap-3 p-2 cursor-pointer font-semibold rounded">
        <div class="w-10 h-10 md:(w-16 h-16)">
          <NuxtLink
            class="block w-full h-full"
            :to="`/profile/${post?.postedBy?._id}`"
          >
            <img
              :src="post?.postedBy?.image"
              class="block w-full h-full object-cover rounded-full aspect-square"
              :alt="`photo of ${post?.postedBy?.userName}'s profile`"
            />
            <!-- width="62" -->
            <!-- height="62" -->
          </NuxtLink>
        </div>
        <div>
          <NuxtLink :to="`/profile/${post?.postedBy?._id}`">
            <div class="flex items-center gap-2">
              <p
                class="flex gap-2 items-center font-bold text-primary md:(text-md)"
              >
                {{ post?.postedBy?.userName }}
                <!-- goberfified icon -->
              </p>
              <p
                class="capitalize font-medium text-xs text-gray-500 hidden md:(block)"
              >
                {{ post?.postedBy?.userName }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="lg:(ml-20) flex gap-4 relative">
      <div
        class="rounded-3xl relative"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <NuxtLink :to="`/details/${post?._id}`">
          <video
            ref="videoRef"
            class="h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 md:(h-[400px]) lg:(w-[600px] h-[530px])"
            loop
            :src="post?.video?.asset?.url"
          ></video>
        </NuxtLink>
        <div
          v-if="isHover"
          class="absolute bottom-6 cursor-pointer left-50/100 transform -translate-x-1/2 flex gap-10 md:() lg:(justify-between)"
        >
          <template v-if="playing">
            <button aria-label="pause video" @click="onVideoPress">
              <span
                class="mdi mdi-pause text-black text-2xl lg:(text-4xl)"
              ></span>
            </button>
          </template>
          <template v-else>
            <button aria-label="play video" @click="onVideoPress">
              <span
                class="mdi mdi-play text-black text-2xl lg:(text-4xl)"
              ></span>
            </button>
          </template>
          <template v-if="isVideoMuted">
            <button aria-label="turn on volume" @click="isVideoMuted = false">
              <span
                class="mdi mdi-volume-off text-black text-2xl lg:(text-4xl)"
              ></span>
            </button>
          </template>
          <template v-else>
            <button aria-label="turn off volume" @click="isVideoMuted = true">
              <span
                class="mdi mdi-volume-high text-black text-2xl lg:(text-4xl)"
              ></span>
            </button>
          </template>
        </div>
        <!-- <div v-if="isHover">
					<template v-if="playing">
						<button>
							<span
								class="mdi mdi-pause text-black text-2xl lg:(text-4xl)"
							></span>
						</button>
					</template>
					<template v-else-if="!playing">
						<button>
							<span
								class="mdi mdi-play text-black text-2xl lg:(text-4xl)"
							></span>
						</button>
					</template>
					
				</div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPost } from '~~/models/models';

defineProps<{
  post: IPost;
}>();

const videoRef = ref<HTMLVideoElement>(null);

const isHover = ref(false);
const playing = ref(false);
const isVideoMuted = ref(false);

onMounted(() => {
  // console.log('videoRef: ', videoRef);
});

function onVideoPress(): void {
  if (!process.client) return;

  if (playing.value) {
    videoRef?.value?.pause();

    playing.value = false;
  } else {
    videoRef?.value?.play();
    playing.value = true;
  }
}

watch(isVideoMuted, () => {
  if (videoRef?.value) {
    videoRef.value.muted = isVideoMuted.value;
  }
});
</script>

<style scoped></style>
