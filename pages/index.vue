<script lang="ts" setup>
const storeMain = useStoreMain();
console.log('пост', storeMain.state.posts)
</script>

<template>
  <div class="flex flex-col">
    <div class="flex top-0 right-0 z-99 fixed">
      <button @click="storeMain.clearStorege" class="bg-red-100 rounded-2 p-2 text-red-500"> clearStorage </button>
    </div>
    <Share/>
    <div
      v-for="p in storeMain.state.posts"
      :key="p.id"
      class="flex flex-col px-2 news items-start relative"
    > 
      <News
        :post="p"
      />
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
