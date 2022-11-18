<script lang="ts" setup>
import { useObjectUrl } from '@vueuse/core'
import { shallowRef } from 'vue'

const file = shallowRef()
const url = useObjectUrl(file)

const storeMain = useStoreMain();
const state = reactive({
  text: "",
  files: [],
});
function postAdd() {
  if (state.text === '') {
    return
  }
  console.log("postAdd");
  const postPayload = {
    text: state.text,
  };
  state.text = "";
  storeMain.postAdd(postPayload);
}

const onFileChange = (event) => {
  file.value = event.target.files[0]
  console.log(file.value.name)
  return file.value.name
}
</script>

<template>
  <div class="flex flex-col">
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
          <input type="file" class="text-hex-dbdddd" @change="onFileChange"/>
          <a v-if="url" class="cursor-pointer mt-10px text-hex-dbdddd" :href="url">Open file</a>
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
