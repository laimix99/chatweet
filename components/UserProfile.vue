<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
})
  const storeMain = useStoreMain()
  onMounted(() => {
    storeMain.getPost()
  })
</script>

<template>
  <div class="flex flex-col w-full pb-3 profile items-center">
    <UserProfileInfo/>
    <pre class="text-white">{{storeMain.state.user}}</pre>
  </div>
</template>

<style scoped>
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
