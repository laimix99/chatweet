<script lang="ts" setup>

const emit = defineEmits(['dun'])
const props = defineProps({
  id_post: {
    type: Number,
  },
}) 

const storeMain = useStoreMain()
const api = useStoreApi()

const state = reactive({
  text: '',
  parent: props.id_post
}) as any

function onFileUpload (event: any) {
  state.file = event.target.files[0]
  state.fileUrl = URL.createObjectURL(state.file)
}

async function postComment() {
  // if (state.text.length === 0) return
  if (state.fileUrl) {
    const formData = new FormData()
    formData.append('file', state.file)
    const { data: fileUploaded } = await api.ftch('/files', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    // console.log(':postImg fileUploaded', fileUploaded)
    await api.ftch('/items/posts', {
    method: 'post',
    body: {
      description: state.descriptionComment,
      parent: state.parent,
      status: 'published',
      images: fileUploaded.id
    }
  })
  } else {
    await api.ftch('/items/posts', {
      method: 'post',
      body: {
        description: state.descriptionComment,
        parent: state.parent,
        status: 'published',
      }
    })
  }
  storeMain.getSelectedComment(props.id_post)
  state.descriptionComment = ''
  state.fileUrl = ''
  // console.log(':postComment')
  emit('dun')
}

 
</script>

<template>
  <div class="flex flex-col w-full py-3 px-2 share items-start box-border">
    <div class="flex flex-row w-full gap-2 items-center">
      <BaseImg  
        v-if="storeMain.state.user.avatar"
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
      />
      <NoPhoto
        v-else
        :name="storeMain.state.user.first_name"
        view="avatar"
      />
      <input
        type="text"
        v-model="state.descriptionComment"
        placeholder="Что нового ?"
        class="bg-black h-auto h-100px text-hex-dbdddd w-full text-16px"
        @keyup.enter="postComment()"
      />
    </div>
    <div       
      v-if="state.fileUrl"
      class="flex flex-row mt-20px gap-2 relative"
    >
      <BaseImg
        :src="state.fileUrl"
        view="post"
      />
      <MySvg
        class="bg-hex-00000080 rounded-1/2 p-1 top-2 right-2 absolute"
        @click="state.fileUrl = ''"
        icon="close"
      />
    </div>
    <div class="flex flex-row mt-20px w-full items-start justify-between">
      <label class="cursor-pointer">
          <input
            @change="onFileUpload" 
            type="file"
            class="hidden"
          >
          <MySvg
            icon="add"
          />
        </label>
      <MyButton @click="postComment()">
        Поделиться
      </MyButton>
    </div>
  </div>
</template>

<style scoped>


</style>
