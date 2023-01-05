<script setup>
const route = useRoute();
const router = useRouter();
const storeMain = useStoreMain()
function prev() {
  router.back()
  storeMain.state.postUser = {}
  storeMain.state.postUserClick = []
}

onMounted(() => {
  storeMain.getPostUserClick(route.params.id)
  storeMain.getPostUser(route.params.id)
})
</script>

<template>
  <div v-if="storeMain.state.postUser" class="flex flex-col w-full px-2 items-start box-border">
    <div
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="prev()"
    >
      <MySvg
        icon="prev"
      />
      <span class="font-700 text-hex-dbdddd text-25px">{{ storeMain.state.postUser.first_name }}</span>
    </div>
    <UserProfileInfo
      :user="storeMain.state.postUser"
    />
    <div
      v-for="p in storeMain.state.postUserClick"
      :key="p.id"
      class="w-full news"
    > 
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
  <!-- <pre class="text-green-400">{{ storeMain.state.postUser }}</pre> -->
</template>

<style scoped>
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
