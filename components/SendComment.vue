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
  <!-- <div class="flex flex-row w-full gap-4 items-center">
    <BaseImg
      view="avatar"
      :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
    />
    <input 
      class=" h-auto bg-hex-191919 rounded-16px h-100px text-hex-dbdddd w-full py-3 pl-2"
      placeholder="Написать комментарий" 
      v-model="state.descriptionComment" 
      @keyup.enter="addComment()" 
      type="text"
    >
    <MySvg icon="send" @click="addComment()">ответить</MySvg>
  </div> -->
  <div class="flex flex-col w-full py-3 px-2 share items-center box-border">
    <div class="flex flex-row w-full gap-2 items-center">
      <BaseImg  
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
      />
      <input
        type="text"
        v-model="state.descriptionComment"
        placeholder="Что нового ?"
        class="bg-black h-auto h-100px text-hex-dbdddd w-full"
        @keyup.enter="addComment()"
      />
    </div>
    <div class="flex flex-row mt-20px w-full items-start justify-between">
      <div class="flex flex-col items-start">
        <!-- <MySvg
          title="Загрузить"
          @click="openDialog"
          icon="add"
        /> -->
        <div class="flex flex-row mt-20px gap-2">
          <BaseImg
            v-for="(img, imgIndex) in state.files"
            :key="imgIndex"
            :src="img.url"
            view="post"
          />
        </div>
      </div>
      <MyButton @click="addComment()">
        Поделиться
      </MyButton>
    </div>
  </div>
</template>

<style scoped>

</style>
