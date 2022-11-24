<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'

const { files, open, reset } = useFileDialog()

const props = defineProps({
  color: {
    type: String
  }
})


const storeMain = useStoreMain();
const state = reactive({
  text: "",
  files: [] as any,
});


function postAdd() {
  if (!state.text || !state.files) {
    return
  }
  console.log("postAdd");
  const postPayload = {
    text: state.text,
    files: state.files
  };
  storeMain.postAdd(postPayload);
  state.text = "";
  state.files = []
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
    console.log(state.files)
  }
})

</script>

<template>
  <div class="flex flex-col w-full py-3 px-2 share items-center box-border">
    <!-- {{ storeMain?.authorDefault.name }} -->

    <div class="flex flex-row w-full gap-2 items-center">
      <BaseImg  
        :src="storeMain?.state.user.avatarUrl"
        view="avatar"
      />
      <input
        type="text"
        v-model="state.text"
        placeholder="Что нового ?"
        class="h-auto bg-hex-191919 h-100px text-hex-dbdddd w-full"
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
