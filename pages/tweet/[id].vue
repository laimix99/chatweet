<script lang="ts" setup>
// import { on } from 'events';

const route = useRoute();
const router = useRouter();
const storeMain = useStoreMain(); 
const api = useStoreApi()


const state = reactive({
  post: {},
})

async function getSelectedPost() {
  const {data} = await api.ftch(`/items/posts/${route.params.id}`, {
    method: 'get',
    query: {
      fields: ['*.*'],
    }
  })
  state.post = data
}

function back() {
  router.back()
  storeMain.state.comment = []
}

onMounted(() => {
  getSelectedPost()
  storeMain.getSelectedComment(route.params.id)
})
</script>

<template>
  <div 
    v-if="state.post && state.post.user_created && storeMain.state.comments" 
    class="flex flex-col w-full px-3 box-border"
  >
    <div
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="back()"
    >
      <MySvg
        icon="prev"
      />
      <span class="font-500 text-hex-dbdddd text-20px">Назад</span>
    </div>
    <News
      :post="state.post"
      class="post"
    />
    <div v-for="comment in storeMain.state.comments">
      <News
        :post="comment"
        :parent_id="route.params.id"
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
