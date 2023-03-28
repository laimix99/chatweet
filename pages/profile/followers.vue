<script setup>
const storeMain = useStoreMain()
const api = useStoreApi()
const route = useRoute();
const router = useRouter();

const state = reactive({
  followers: []
})

async function getFollowers() {
  const {data} = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: [ '*.*' ],
      filter: {
        follower:  { _eq: storeMain.state.user.id },
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
  <div v-if="storeMain.state.user.id" class="flex flex-col w-full px-2 items-start box-border">
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