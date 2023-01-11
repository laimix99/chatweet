<script setup>
const route = useRoute();
const router = useRouter();
const storeMain = useStoreMain()
const api = useStoreApi()

const state = reactive({
  posts: [],
  user: {}
})

function back() {
  storeMain.state.feedUser = []
  router.back()
}

async function getUser() {
  const { data } = await api.ftch(`/users/${route.params.id}/`,{
    method: 'get',
    query: {
      fields: ['*.*']
    }
  })
  console.log('getPostUser', data)
  state.user = data
}

async function getPost() {
  const { data } = await api.ftch('/items/posts', {
    method: 'get',
    query: {
      fields: ['*.*'],
      filter: {
        parent: { _null: true },
        user_created: { _eq: route.params.id },
        status: 'published'
      },
      limit: -1,
      sort: ['-date_created'],
    }
  })
  state.posts = data
  console.log("getPost", data)
}

onMounted(() => {
  // storeMain.getFeedUser(route.params.id)
  getUser()
  getPost()
})
</script>

<template>
  <div 
    v-if="state.user.id" 
    class="flex flex-col w-full px-2 items-start box-border"
  >
    <div
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="back()"
    >
      <MySvg
        icon="prev"
      />
      <span class="font-700 text-hex-dbdddd text-25px">{{ state.user.first_name }}</span>
    </div>
    <UserProfileInfo
      :user="state.user"
    />
    <div
      v-for="post in state.posts"
      :key="post.id"
      class="w-full news"
    > 
      <News 
        :post="post"
      />  
    </div>
  </div>
</template>

<style scoped>
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
