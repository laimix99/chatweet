<script setup>
import { onClickOutside } from '@vueuse/core'
  const props = defineProps({
    post: {
      type: Object,
      default: () => {}
    },
    socialInfo: {
      type: Boolean,
      default: true,
    },
  })
  const storeMain = useStoreMain()
  const target = ref()
  const showComment = ref(false)
  onClickOutside(target, (event) => showComment.value = false)
  onMounted(() => {
    storeMain.getComment(props.post.id)
  })
</script>

<template>
  <div ref="target" class="flex flex-col w-full px-2 box-border">
    <!-- <pre class="text-red-500">{{ post }}</pre> -->
    <div class="flex flex-row w-full py-20px gap-3 items-start">
      <BaseImg
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${post.user_created.avatar}.png`"
      />
      <div 
        class=" flex flex-col  items-start"
 
      >
        <NuxtLink 
          :to="`/user/${post.user_created?.id}`"
          class="flex flex-row gap-3 items-center no-underline" 
        >
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.user_created.first_name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ post.user_created.last_name }}</span>
          <span class="font-400 text-hex-dbdddd opacity-40 text-14px">{{new Date(post.date_created).toLocaleDateString("en-US") }}</span>
        </NuxtLink>
        <NuxtLink 
          :to="`/tweet/${post.id}`"
          class="flex flex-col mt-10px gap-3 no-underline items-start"
        >
          <h2 class="font-500 text-hex-dbdddd text-left text-15px leading-10px" lg="text-18px">{{ post.description }}</h2>
          <div class="flex flex-row gap-2">
            <BaseImg
              v-if="post.images"
              :src="`https://mfvcni0p.directus.app/assets/${post.images?.id}.png`"
              view="post"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
    <div 
      v-if="props.socialInfo"
      class="cursor-pointer flex flex-row w-full gap-1 justify-center items-center "
      @click="showComment = !showComment"
    >
    <h1 
      class=" text-blue text-16px"
      :style="[post.children?.length ? '' : 'display: none;']"
    >
      {{post.children?.length}}
    </h1>
      <MySvg
        icon="comment"
      />
    </div>
    <ModalComment
      v-if="showComment"
      @close="showComment = false"
      :id_post="post.id"
      :post="post"
    />
  </div>
</template>

<style scoped>

</style>
