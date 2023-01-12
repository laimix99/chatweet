<script setup>
const storeMain = useStoreMain()
const api = useStoreApi()

const props = defineProps({
  follower: {
    type: Object,
    default: () => {}
  }
})

const state = reactive({
  isMe:  computed(() => {
    return storeMain.state.user.id === props.follower.user.id
  }),
  subscriptionCheck: [],
  chechId: {},
  checkSubscription: computed(() => {
    return state.subscriptionCheck.length > 0
  }),
})

async function getSubscriptionCheck () {
  const { data } = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: ['*,*'],
      filter: {
        user: { _eq: storeMain.state.user.id },
        follower:  { _eq: props.follower.user.id },
      }
    }
  })
  state.subscriptionCheck = data
  for (var obj of data) {
    state.chechId = obj
  }
  console.log(':getSubscriptionCheck', state.subscriptionCheck)
}

async function postFollowing() {
  await api.ftch('/items/follows/', {
    method: 'post',
    body: {
      user: storeMain.state.user.id,
      follower: props.follower.user.id
    }
  })
  console.log(':postFollowing')
  getSubscriptionCheck()
}

async function deleteFollowing() {
  await api.ftch(`/items/follows/${state.chechId.id}`, {
    method: 'delete'
  })
  console.log(':deleteFollowing')
  getSubscriptionCheck()

}

onMounted(() => {
  getSubscriptionCheck()
})
</script>

<template>
  <div  class="flex flex-col w-full pt-2 gap-5 items-start">
    <!-- <pre class="text-red-500"> user:{{ state.chechId }}</pre> -->
    <!-- <pre class="text-white">follower: {{ follower.user }}</pre> -->
    <!-- <pre class="text-green-500">{{ state.subscriptionCheck }}</pre> -->
    <div  class="flex flex-row w-full items-center justify-between">
      <NuxtLink
        :to="`/user/${follower.user.id}`"
        class="flex flex-row gap-2 items-center no-underline"
      >
        <BaseImg
          :src="`https://mfvcni0p.directus.app/assets/${follower.user.avatar}.png`"
          view="avatar"
        />
        <div class="flex flex-col items-start">
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ follower.user.first_name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ follower.user.last_name }}</span>
        </div>
      </NuxtLink>
      <h1 
        v-if="state.isMe"
        class="font-400 text-16px text-gray-500" 
      >
        Вы
      </h1>
      <div v-else >
        <MyButton 
          v-if="state.checkSubscription"
          @click="deleteFollowing()"
        >
          Не читать
        </MyButton>
        <MyButton 
          v-else 
          @click="postFollowing()"
        >
          Читать 
        </MyButton>
      </div>
    </div>
  </div>
</template>
