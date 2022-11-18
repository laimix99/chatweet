<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'

const { files, open, reset } = useFileDialog()

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
  <div class="flex flex-col">
    <div class="flex top-0 right-0 z-99 fixed">
      <button @click="storeMain.clearStorege" class="bg-red-100 rounded-2 p-2 text-red-500"> clearStorage </button>
    </div>
    <div class="flex flex-col py-3 px-2 share items-center">
      <input
        type="text"
        v-model="state.text"
        placeholder="Что нового ?"
        class="h-auto bg-hex-191919 h-100px text-hex-dbdddd w-full"
        @keyup.enter="postAdd()"
      />
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
            />
          </div>
        </div>
        <MyButton @click="postAdd">
          Поделиться
        </MyButton>
      </div>

    </div>
    <div
      v-for="p in storeMain.posts"
      :key="p.id"
      class="flex flex-col px-2 news items-start relative"
    >
      <NuxtLink
        :to="`/tweet/${p.id}`"
        class="flex flex-col w-full items-center no-underline"
      >
        <News
          :post="p"
        />
      </NuxtLink>
      <MySvg 
        @click="storeMain.postDelete(p.id)" 
        class="top-6 right-2 absolute"
        icon="close"
      />
      <SocialInfo
        :date="p"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
.share {
  border-bottom: 1px solid #2f3335 ;
}
.news {
  border-bottom: 1px solid #2f3335 ;
}

/* h1, h2, span {
  font-family: 'Montserrat', sans-serif;
} */
</style>
