<script setup>

const storeMain = useStoreMain()
onMounted(() => {
  // storeMain.getPost()
  storeMain.getMyPosts(storeMain.state.user.id)
  // storeMain.getUser()
})
</script>

<template>
  <div class="flex flex-col w-full px-2 pb-3 box-border profile items-center">
    <UserProfileInfo
      :user="storeMain.state.user"
    />
    <div
      v-for="p in storeMain.state.myPost"
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
