<script setup>
const props = defineProps({
  comment: {
    type: Object,
    defoult: () => {}
  }
})
const storeMain = useStoreMain()
</script>

<template>
  <div class="flex flex-row w-full py-2 comment items-start" >
    <img class="rounded-1/2 w-30px" :src="comment.author.avatarUrl" alt="">
    <div class="flex flex-col pl-3 gap-2 items-start">
      <span class="text-hex-dbdddd text-14px" >{{ comment.author.name }}</span>
      <p class=" m-0 text-hex-dbdddd w-full max-w-400px text-16px">{{ comment.text }}</p>
    </div>
  </div>
  <!-- <button @click="storeMain.commentAdd(comment.id)">delete</button> -->
  <!-- <pre class="text-red-700" >{{comment}}</pre> -->
</template>

<style scoped>
  .comment {
    border-top: 1px solid gray;
  }
</style>
