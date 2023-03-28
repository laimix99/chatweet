<script setup lang="ts">
const api = useStoreApi()
const storeMain = useStoreMain();

const props = defineProps({
  color: {
    type: String
  }
})

const state = reactive({
  text: "",
  file: null
}) as any

function onFileUpload (event: any) {
  state.file = event.target.files[0]
  state.fileUrl = URL.createObjectURL(state.file)
}

async function postAdd() {
  if (state.text.length === 0) return
  const postPayload = {
    description: state.text,
  }

  if(state.file) {
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
    postPayload.images = fileUploaded.id
  }
  
  storeMain.postPost(postPayload)
  state.text = "";
  state.fileUrl = ''
  storeMain.state.showModal = false
}

</script>

<template>
  <div class="flex flex-col w-full py-3 px-2 share items-start box-border">
    <div class="flex flex-row w-full gap-3 items-center">
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
        v-model="state.text"
        placeholder="Что нового ?"
        class="h-auto bg-hex-191919 h-100px text-hex-dbdddd w-full text-16px"
        :style="{background: props.color}"
        @keyup.enter="postAdd()"
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
      <div class="flex flex-col items-start">
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
      </div>
      <MyButton @click="postAdd">
        Поделиться
      </MyButton>
    </div>
  </div>
</template>

<style scoped>

</style>
