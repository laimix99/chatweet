<script setup>
  const props = defineProps({
    post: {
      type: Object,
      default: () => {}
    }
  })
  const storeMain = useStoreMain()
</script>

<template>
  <!-- <NuxtLink
      :to="`/tweet/${post.id}`"
      class="flex flex-col w-full items-center no-underline"
    > -->
  <div class="flex flex-row w-full py-20px items-start">
      <div class="w-1/9">
        <img class=" rounded-1/2 h-50px w-50px" :src="post.author.avatarUrl" alt="">
      </div>
      <div class=" flex flex-col w-8/9 items-start">
        <div class="flex flex-row gap-3 items-center" >
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.author.name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40">{{ post.author.username }}</span>
        </div>
        <NuxtLink 
          :to="`/tweet/${post.id}`"
          class="flex flex-col mt-10px gap-3 no-underline items-start"
        >
          <h2 class="text-hex-dbdddd text-left text-18px leading-10px">{{ post.text }}</h2>
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
  <!-- </NuxtLink> -->
</template>

<style scoped>

</style>
