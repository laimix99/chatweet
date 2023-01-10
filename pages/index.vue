<script lang="ts" setup>
const storeMain = useStoreMain();
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
      <News 
        :post="p"
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
