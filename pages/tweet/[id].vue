<script lang="ts" setup>
// import { on } from 'events';

const route = useRoute();
const router = useRouter();
const storeMain = useStoreMain(); 
function prev() {
  router.back()
  storeMain.state.post = []
}
// const tweet = computed(() => {
//   const tweet = storeMain.state.posts.find((post) => post.id == route.params.id)
//   return tweet
// });

onMounted(() => {
  // console.log('POST',storeMain.state.post.user_created)
  storeMain.getSelectedPost(route.params.id)
  storeMain.getSelectedComment(route.params.id)
  // storeMain.getSelectedComment(route.params.id)
})
</script>

<template>
  <div 
    v-if="storeMain.state.post && storeMain.state.post.user_created && storeMain.state.post.children" 
    class="flex flex-col w-full px-3 box-border"
  >
    <div
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="prev()"
    >
      <MySvg
        icon="prev"
      />
      <span class="font-500 text-hex-dbdddd text-20px">Назад</span>
    </div>
    <!-- <pre class="text-blue" >{{ storeMain.state.post.children }}</pre> -->
    <News
      :post="storeMain.state.post"
      class="post"
    />
    <div v-for="children in storeMain.state.children">
      <!-- <pre>{{ children }}</pre> -->
      <News
      :post="children"
      class="comment"
    />
    </div>
  </div>
</template>

<style scoped>
.post {
  border-bottom: 1px solid #2f3335 ;
}
.comment{ 
  border-bottom: 1px solid #2f3335 ;
}
</style>
