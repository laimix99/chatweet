<script lang="ts" setup>
const storeMain = useStoreMain()
const api = useStoreApi()
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
})

const state= reactive({
  followings: [],
  followers: []
})

const isMe = computed(() => {
  return storeMain.state.user.id === props.user?.id
})

// function read() {
//   storeMain.postFollowing(props.user.id)
// }
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
  console.log('getFollowing', data)
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
  console.log(':getFollowers', data)
  state.followers = data
}

onMounted(() => {
  getFollowing()
  getFollowers()
})
</script>

<template>
  <div v-if="props.user.id" class="flex flex-col w-full py-5 items-center profile">
    <div class="flex flex-row w-full items-center justify-between">
      <div class="flex flex-col w-full items-start">
        <BaseImg 
          v-if="isMe"
          view="profile"
          :src="`https://mfvcni0p.directus.app/assets/${user.avatar}.png`"
        />
        <BaseImg 
          v-else
          view="profile"
          :src="`https://mfvcni0p.directus.app/assets/${user.avatar?.id}.png`"
        />
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
        <!-- <a 
          class="mt-2 text-hex-07485B text-14px no-underline hover:underline "
          :href="storeMain.state.user.web_site"
        >
          {{ storeMain.state.user.web_site }}
        </a> -->
      </div>
      <MyButton 
        v-if="isMe"
        @click="storeMain.state.showEdit = true"
      >
        Изменить профиль 
      </MyButton>
      <MyButton
        v-else
        @click="storeMain.postFollowing(props.user.id)"
      >
        Читать
      </MyButton>
      <ModalEdit
        v-if="storeMain.state.showEdit" 
        @close="storeMain.state.showEdit = false"
      />
    </div>
    <div class="flex flex-row flex-wrap mt-3 text-hex-dbdddd w-full opacity-40 gap-5 items-start">
      <!-- <h1 class="font-400 text-13px">Дата рождения: {{ storeMain.state.user.dateOfBirth }}</h1> -->
      <NuxtLink 
        v-if="state.followings"
        :to="`${$route.path}/following`" 
        class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline"
      >
        {{ state.followings?.length }} в читаемых
      </NuxtLink>
      <NuxtLink 
      v-if="state.followers"
        :to="`${$route.path}/followers`" 
        class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline"
      >
        {{ state.followers?.length }} читателей
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
 .profile {
  border-bottom: 1px solid #2f3335 ;
} 
</style>
