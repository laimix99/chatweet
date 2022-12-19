<script setup>
const storeMain = useStoreMain()

const state = reactive({
  descriptionComment: '',
  parent: props.id_post
})

const props = defineProps({
  id_post: {
    type: Number,
  }
})

function addComment() {
  if (!state.descriptionComment) {
    return
  }
  const payloud = {
    description: state.descriptionComment,
    parent: state.parent,
  }
  storeMain.postComment(payloud)
  state.descriptionComment = ''
  storeMain.getComment(props.id_post)
}

</script>

<template>
  <div class="flex flex-row w-full gap-4 items-center">
    <img src="" class="h-40px w-40px" alt="">
    <input 
      class=" h-auto bg-hex-191919 rounded-16px h-100px text-hex-dbdddd w-full py-3 pl-2"
      placeholder="Написать комментарий" 
      v-model="state.descriptionComment" 
      @keyup.enter="addComment()" 
      type="text"
    >
    <MySvg icon="send" @click="addComment()">ответить</MySvg>
  </div>
</template>

<style scoped>
input {
  border: 1px solid gray;
}
</style>
