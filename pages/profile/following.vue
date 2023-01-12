<script setup>
const storeMain = useStoreMain()
const api = useStoreApi()
const route = useRoute();
const router = useRouter();

const state = reactive({
  followings: []
})

  async function getFollowing() {
    const { data } = await api.ftch('/items/follows/', {
      method: 'get',
      query: {
        fields: [ '*.*' ],
        filter: {
          user:  { _eq: storeMain.state.user.id },
        }
      }
    })
    state.followings = data
  }

onMounted(() => {
  getFollowing()
})
</script>

<template>
  <!-- <pre class="text-red-400">{{ state.followings }}</pre> -->
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
      v-for="follower in state.followings"
      :follower="follower"
    />
  </div>
</template>