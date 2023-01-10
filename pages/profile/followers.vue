<script setup>
const storeMain = useStoreMain()
const route = useRoute();
const router = useRouter();

onMounted(() => {
  storeMain.getFollowers(storeMain.state.user.id)
})
</script>

<template>
  <div class="flex flex-col w-full px-2 items-start box-border">
    <div
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="router.back()"
    >
      <MySvg
        icon="prev"
      />
      <span class="font-500 text-hex-dbdddd text-20px">Назад</span>
    </div>
    <Followers
      v-for="follower in storeMain.state.followers"
      :follower="follower"
    />
  </div>
</template>