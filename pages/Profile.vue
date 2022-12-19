<script setup>
const storeMain = useStoreMain()
onMounted(() => {
  // storeMain.getPost()
  storeMain.getMyPosts(storeMain.state.user.id)
})
</script>

<template>
  <div class="flex flex-col w-full px-2 box-border items-center">
    <UserProfile/>
  </div>
</template>