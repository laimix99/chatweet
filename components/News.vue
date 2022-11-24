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
  <div class="flex flex-row w-full py-20px items-start">
    <div class="w-2/9" lg="w-1/9">
      <img class=" rounded-1/2 h-50px w-50px" :src="post.author.avatarUrl" alt="">
    </div>
    <div 
      class=" flex flex-col w-7/9 items-start"
      lg="w-8/9"
    >
      <div class="flex flex-row gap-3 items-center" >
        <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.author.name }}</h1>
        <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ post.author.username }}</span>
        <span class="font-400 text-hex-dbdddd opacity-40 text-14px">{{new Date(post.created_at).toLocaleDateString("en-US") }}</span>
      </div>
      <NuxtLink 
        :to="`/tweet/${post.id}`"
        class="flex flex-col mt-10px gap-3 no-underline items-start"
      >
        <h2 class="font-500 text-hex-dbdddd text-left text-15px leading-10px" lg="text-18px">{{ post.text }}</h2>
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
</template>

<style scoped>

</style>
