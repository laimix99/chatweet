<script lang="ts" setup>
  const storeMain = useStoreMain()
  // console.log('автор',storeMain.state.user.name)
  onMounted(() => {
    storeMain.getPost()
    storeMain.getMyPosts(storeMain.state.user.id)
  })
</script>

<template>
  <div class="flex flex-col w-full pb-3 profile items-center">
    <UserProfileInfo/>
    <div
      v-for="p in storeMain.state.myPost"
      :key="p.id"
      class="w-full news"
    > 
    <!-- <pre class="text-white">{{storeMain.state.user}}</pre> -->
      <div class="flex flex-col w-full items-start relative">
        <News :post="p"/>
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
/* .profile {
  border-bottom: 1px solid #2f3335 ;
} */
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
