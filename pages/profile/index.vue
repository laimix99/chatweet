<script setup>

const storeMain = useStoreMain()
const api = useStoreApi()

const state = reactive({
  post: []
})

async function getMyPosts() {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: { _null: true },
          user_created: { _eq: storeMain.state.user.id },
          status: 'published'
        },
        limit: -1,
        sort: ['-date_created'],
      }
    })
    state.post = data
    console.log("getMyPosts", data)
  }
onMounted(() => {
  // storeMain.getUser()
  getMyPosts()
  // storeMain.getPost()
  // storeMain.getMyPosts(storeMain.state.user.id)
  // storeMain.getUsers()
})
</script>

<template>
  <div class="flex flex-col w-full px-2 pb-3 box-border profile items-center">
    <!-- <pre>{{ storeMain.state.user.id }}</pre> -->
    <!-- <pre>{{ state.post }}</pre> -->
    <UserProfileInfo
      :user="storeMain.state.user"
    />
    <div
      v-for="p in state.post"
      :key="p.id"
      class="w-full news"
    > 
      <News 
        :post="p"
      />    
    </div>
  </div>
</template>

<style scoped>
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
