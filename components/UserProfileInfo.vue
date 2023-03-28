<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
})
const storeMain = useStoreMain()
const api = useStoreApi()

const state = reactive({
  isMe:  computed(() => {
    return storeMain.state.user.id === props.user?.id
  }),
  followings: [],
  followers: [],
  subscriptionCheck: [],
  chechId: {},
  checkSubscription: computed(() => {
    return state.subscriptionCheck.length > 0
  }),
}) as any

async function getFollowing() {
  const { data } = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: [ '*.*' ],
      filter: {
        user:  { _eq: props.user.id},
      }
    }
  })
  // console.log('getFollowing', data)
  state.followings = data
}

async function getFollowers() {
  const {data} = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: [ '*.*' ],
      filter: {
        follower:  { _eq: props.user.id },
      }
    }
  })
  // console.log(':getFollowers', data)
  state.followers = data
}

async function getSubscriptionCheck () {
  const { data } = await api.ftch('/items/follows/', {
    method: 'get',
    query: {
      fields: ['*,*'],
      filter: {
        user: { _eq: storeMain.state.user.id },
        follower:  { _eq: props.user.id },
      }
    }
  })
  state.subscriptionCheck = data
  for (var obj of data) {
    state.chechId = obj
  }
//   console.log(':getSubscriptionCheck', state.subscriptionCheck)
}


async function postFollowing() {
  await api.ftch('/items/follows/', {
    method: 'post',
    body: {
      user: storeMain.state.user.id,
      follower: props.user.id
    }
  })
  // console.log(':postFollowing')
  getSubscriptionCheck()
  getFollowers()
  getFollowing()
}

async function deleteFollowing() {
  await api.ftch(`/items/follows/${state.chechId.id}`, {
    method: 'delete'
  })
  // console.log(':deleteFollowing')
  getSubscriptionCheck()
  getFollowers()
  getFollowing()
}

onMounted(() => {
  getFollowing()
  getFollowers()
  getSubscriptionCheck()
})
</script>

<template>
  <div v-if="props.user.id" class="flex flex-col w-full py-5 items-center profile">
    <div class="flex flex-row w-full items-center justify-between">
      <div class="flex flex-col w-full items-start">
        <div v-if="state.isMe">
          <BaseImg 
            v-if="user.avatar"
            view="profile"
            :src="`https://mfvcni0p.directus.app/assets/${user.avatar}.png`"
          />
          <NoPhoto
            v-else
            view="profile"
            :name="user.first_name"
          />
        </div>
        <div v-else>
          <BaseImg 
            v-if="user.avatar?.id"
            view="profile"
            :src="`https://mfvcni0p.directus.app/assets/${user.avatar?.id}.png`"
          />
          <NoPhoto
            v-else
            view="profile"
            :name="user.first_name"
          />
        </div>


        <h1 class=" font-700 mt-2 text-hex-dbdddd text-25px">{{ user.first_name }}</h1>
        <span class="font-400 text-hex-dbdddd opacity-40 text-13px">{{ user.last_name }}</span>
        <p class=" font-700 mt-2 text-hex-dbdddd text-15px">{{ user.description }}</p>
        <div 
          v-if="user.location"
          class="flex flex-row mt-2 items-center"
        >
          <MySvg
            icon="location"
          />
          <p class="font-700 text-hex-dbdddd  text-13px" >{{ user.location }}</p>
        </div>
      </div>
      <MyButton 
        v-if="state.isMe"
        @click="storeMain.state.showEdit = true"
      >
        Изменить профиль 
      </MyButton>
      <div v-else>
        <MyButton
          v-if="state.checkSubscription"
          @click="deleteFollowing"
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
      <ModalEdit
        v-if="storeMain.state.showEdit" 
        @close="storeMain.state.showEdit = false"
      />
    </div>
    <div class="flex flex-row flex-wrap mt-3 text-hex-dbdddd w-full opacity-40 gap-5 ju items-start">
      <NuxtLink 
        v-if="state.followings"
        :to="`${$route.path}/following`" 
        class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline"
      >
        {{ state.followings?.length }} читает
      </NuxtLink>
      <NuxtLink 
      v-if="state.followers"
        :to="`${$route.path}/followers`" 
        class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline"
      >
        {{ state.followers?.length }} читают 
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
 .profile {
  border-bottom: 1px solid #2f3335 ;
} 
</style>
