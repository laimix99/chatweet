<script setup>
const props = defineProps({
  post_id: {
    type: Number,
  },
  comment: {
    type: Object,
    dedefault: () => {},
  }
})
const storeMain = useStoreMain()
onMounted(() => {
// storeMain.getComment()
})
</script>

<template>
  <div class="flex flex-col px-5 ">
    <div class="flex flex-col pb-3 gap-4 comment relative">
      <div class="flex flex-row gap-2 items-center">
        <img src="" class="h-30px w-30px" alt="">
        <h1 class="text-hex-dbdddd text-16px">{{ comment.user_created.first_name }}</h1>
        <h1 class="text-hex-dbdddd text-16px" >{{ comment.user_created.last_name }}</h1>
      </div>
      <span  class="text-hex-dbdddd text-16px" >{{ comment.description }}</span>
      <MySvg
        icon="close"
        class="cursor-pointer top-0 right-0 absolute"
        @click="storeMain.deleteComment(comment.id, post_id)"
      />
    </div>
  </div>
</template>

<style scoped>
  h1 {
    font-size: 16px;
  }
  .comment {
    border-bottom: 0.5px solid #2f3335;
  }
</style>
