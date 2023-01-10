<!-- <template><h1>following {{ $route.params.id }}</h1></template> -->

<script setup>
const storeMain = useStoreMain()
const route = useRoute();
const router = useRouter();
onMounted(() => {
  storeMain.getFollowing(route.params.id)
})
</script>

<template>
  <!-- <pre>{{$route.params.id}}</pre> -->
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
    <Followings
    v-for="follower in storeMain.state.followings"
    :follower="follower"
    />
  </div>
</template>
