<script lang="ts" setup>
const storeMain = useStoreMain();
// console.log('пост', storeMain.state.posts)
onMounted(() => {
  storeMain.getPost()
  storeMain.getUser()
})
</script>

<template>
  <div class="flex flex-col">
    <Share/>
    <div
      v-for="p in storeMain.state.posts"
      :key="p.id"
      class="news"
    > 
    <!-- <pre>{{p}}</pre> -->
      <div class="flex flex-col w-full items-start relative">
        <News 
          :post="p"
        />  
        <MySvg 
          class="cursor-pointer top-6 right-2 absolute"
          icon="close"
          @click="storeMain.deletePost(p.id)"
        />    
      </div>
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
