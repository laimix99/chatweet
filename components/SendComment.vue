<script setup>


const props = defineProps({
  id_post: {
    type: Number,
  },
})

const storeMain = useStoreMain()
const api = useStoreApi()

const state = reactive({
  descriptionComment: '',
  parent: props.id_post
})

async function postComment() {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: state.descriptionComment,
        parent: state.parent,
        status: 'published',
      }
    })
    // getComment(comment.parent);
    // getPost()
    storeMain.getSelectedComment(props.id_post)
    state.descriptionComment = ''
    console.log(':postComment')
  }

  onMounted(() => {
    console.log(props.show_comment, 'состояние')
  })
// function addComment() {
//   if (!state.descriptionComment) {
//     return
//   }
//   const payloud = {
//     description: state.descriptionComment,
//     parent: state.parent,
//   }
//   storeMain.postComment(payloud)
//   state.descriptionComment = ''
//   storeMain.getComment(props.id_post)
// }

</script>

<template>
  <!-- <pre class="text-red-500">{{ id_post }}</pre> -->
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
        @keyup.enter="postComment()"
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
      <MyButton @click="postComment()">
        Поделиться
      </MyButton>
    </div>
  </div>
</template>

<style scoped>

</style>
