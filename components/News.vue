<script setup>
  const props = defineProps({
    post: {
      type: Object,
      default: () => {}
    }
  })
</script>

<template>
  <div class="flex flex-row w-full py-20px items-start">
    <div class="w-1/9">
      <img class=" rounded-1/2 h-50px w-50px" :src="post.author.avatarUrl" alt="">
    </div>
    <div class=" flex flex-col w-8/9 items-start">
      <div class="flex flex-row gap-3 items-center" >
        <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.author.name }}</h1>
        <span class="font-400 text-hex-dbdddd opacity-40">{{ post.author.username }}</span>
      </div>
      <div class="flex flex-col items-start">
        <h2 class="text-hex-dbdddd text-left text-18px leading-10px">{{ post.text }}</h2>
        <BaseImg
          src="https://api.psychologos.ru/storage/image/49c2q1cr.jpg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
