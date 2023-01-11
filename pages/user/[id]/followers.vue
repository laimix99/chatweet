<script setup>
const storeMain = useStoreMain()
const route = useRoute();
const router = useRouter();
const api = useStoreApi()

const state = reactive({
  followers: []
})


async function getFollowers() {
  const {data} = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: [ '*.*' ],
      filter: {
        follower:  { _eq: route.params.id },
      }
    }
  })
  state.followers = data
}


onMounted(() => {
  getFollowers()

})
</script>

<template>
  <div class="flex flex-col w-full px-2 items-start box-border">
    <!-- <pre>{{ route.params.id }}</pre> -->
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
      v-for="follower in state.followers"
      :follower="follower"
    />
  </div>
</template>