<script setup>
import { onClickOutside } from '@vueuse/core'
  const props = defineProps({
    post: {
      type: Object,
      default: () => {}
    }
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
  <!-- <pre class="text-red">{{post}}</pre> -->
  <div ref="target" class="flex flex-col w-full px-2 box-border">
    <div class="flex flex-row w-full py-20px items-start">
      <div class="w-2/9" lg="w-1/9">
        <img class=" rounded-1/2 h-50px w-50px" alt="">
      </div>
      <div 
        class=" flex flex-col w-7/9 items-start"
        lg="w-8/9"
      >
        <div class="flex flex-row gap-3 items-center" >
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.user_created.first_name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ post.user_created.last_name }}</span>
          <span class="font-400 text-hex-dbdddd opacity-40 text-14px">{{new Date(post.date_created).toLocaleDateString("en-US") }}</span>
        </div>
        <NuxtLink 
          :to="`/tweet/${post.id}`"
          class="flex flex-col mt-10px gap-3 no-underline items-start"
        >
          <h2 class="font-500 text-hex-dbdddd text-left text-15px leading-10px" lg="text-18px">{{ post.description }}</h2>
          <div class="flex flex-row gap-2">
            <BaseImg
              v-for="(file, fileIndex) in post.files"
              :key="fileIndex"
              :src="file.url"
              view="post"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
    <div 
      class="cursor-pointer flex flex-row w-full gap-1 justify-center items-center"
      @click="showComment = !showComment"
    >
    <h1 
      class=" text-blue text-16px"
     
    >
      <!-- {{post.children.length}} -->
    </h1>
      <MySvg
        icon="comment"
      />
    </div>
    <SocialInfo
      v-if="showComment"
      :id_post="post.id"
      :comments="post.children"
    />
  </div>
</template>

<style scoped>

</style>
