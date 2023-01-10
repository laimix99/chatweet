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
