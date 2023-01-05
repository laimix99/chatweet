<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import path from 'path';

const { files, open, reset } = useFileDialog()

const props = defineProps({
  color: {
    type: String
  }
})

const api = useStoreApi()
const storeMain = useStoreMain();
const state = reactive({
  text: "",
  files: [] as any,
  // user_created: 'df2dd819-90fa-4b5a-bcba-aa2616777c3c',
});


function postAdd() {
  if (!state.text || !state.files) {
    return
  }
  const postPayload = {
    description: state.text,
    // files: state.files
    // user_created: state.user_created
  }
  storeMain.postPost(postPayload)
  state.text = "";
  // state.files = []
  storeMain.state.showModal = false
}
const openDialog = () => {
  open()
}
watch(() => files.value, (to) => {
  console.log(to)
  if (to) {
    const filesLength = to.length
    const lastFile = to[filesLength - 1]
    const url = URL.createObjectURL(lastFile)
    state.files.push({ url: url, file: lastFile })
    console.log('file', state.files)
  }
})

</script>

<template>
  <div class="flex flex-col w-full py-3 px-2 share items-center box-border">
    <div class="flex flex-row w-full gap-2 items-center">
      <BaseImg  
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
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
    <div class="flex flex-row mt-20px w-full items-start justify-between">
      <div class="flex flex-col items-start">
        <MySvg
          title="Загрузить"
          @click="openDialog"
          icon="add"
        />
        <div class="flex flex-row mt-20px gap-2">
          <BaseImg
            v-for="(img, imgIndex) in state.files"
            :key="imgIndex"
            :src="img.url"
            view="post"
          />
        </div>
      </div>
      <MyButton @click="postAdd">
        Поделиться
      </MyButton>
    </div>
  </div>
</template>
