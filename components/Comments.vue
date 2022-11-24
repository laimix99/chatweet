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
  <div class="flex flex-row w-full py-2 pl-4 comment items-start" >
    <BaseImg
      :src="comment.author.avatarUrl"
      view="comment"
    />
    <div class="flex flex-col pl-3 gap-2 items-start">
      <span class="text-hex-dbdddd text-14px" >{{ comment.author.name }}</span>
      <p class=" m-0 text-hex-dbdddd w-full max-w-400px text-16px">{{ comment.text }}</p>
    </div>
  </div>
</template>

<style scoped>
  .comment {
    /* border-top: 1px solid gray; */
  }
</style>
