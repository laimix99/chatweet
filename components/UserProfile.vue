<script lang="ts" setup>
  const storeMain = useStoreMain()
  // console.log('автор',storeMain.state.user.name)
</script>

<template>
  <div class="flex flex-col w-full pb-3 profile items-center">
    <UserProfileInfo/>
    <div
      v-for="p in storeMain.state.posts"
      :key="p.id"
      class="flex flex-col w-full px-2 news items-start relative"
    >
      <News
        :post="p"
      />
      <MySvg 
        @click="storeMain.postDelete(p.id)" 
        class="top-6 right-2 absolute"
        icon="close"
      />
      <SocialInfo
        :date="p"
      />
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
