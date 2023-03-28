<script setup>
import { onClickOutside } from '@vueuse/core'
const storeMain = useStoreMain(); 
const api = useStoreApi()

const target = ref()
onClickOutside(target, (event) => storeMain.state.showSeach = false)

const state = reactive({
  users: [],
  isMe:  computed(() => {
    return storeMain.state.user.id === props.follower.follower.id
  }),
})

async function getUserSearch(text) {
  const path = '/users';
  const options = {
    method: 'get',
    query: {
      filter: {
        first_name: text
      }
    },
  };
  const { data } = await api.ftch(path, options);
  state.users = data;
}
const nameText = ref('')

watch(
  () => nameText.value,
  (to, from) => {
    if(to) {
      getUserSearch(to)
    }
    // console.log(':to', to)
  }
)

onMounted(() => {
  // getUserSearch()
})
</script>

<template>
  <div v-if="state.users" ref="target" class="flex flex-col items-center w-full box-border py-4 px-2 gap-4 relative">
    <input 
      class="bg-hex-191919 w-full box-border rounded-16px py-10px px-20px text-hex-dbdddd w-full text-16px"
      type="text" 
      placeholder="Поиск пользователей"
      v-model="nameText"
      @click="storeMain.state.showSeach = true"
    >
    <MySvg
      icon="search"
      class="absolute right-5 top-5"
    />
    <div 
      v-if="storeMain.state.showSeach && state.users.length"
      class=" scroll flex flex-col items-start h-full max-h-150px bg-hex-191919 w-full py-2 px-2 border-1 gap-3 box-border border-gray-500 rounded-16px overflow-y-auto"
    >
      <div v-for="user in state.users" class="flex flex-row items-center py-2 px-2 gap-2 cursor-pointer text-red-500 hover:bg-black w-full box-border hover:rounded-16px">
        <NuxtLink
          :to="`/user/${user.id}`"
          class="flex flex-row gap-2 items-center no-underline"
          @click="storeMain.state.showSeach = false"
        >
          <BaseImg
            v-if="user.avatar"
            :src="`https://mfvcni0p.directus.app/assets/${user.avatar}.png`"
            view="avatar"
          />
          <NoPhoto
            v-else
            :name="user.first_name"
            view="avatar"
          />
          <div class="flex flex-col items-start">
            <h1 class="font-700 text-hex-dbdddd text-15px">{{ user.first_name }}</h1>
            <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ user.last_name }}</span>
          </div>
        </NuxtLink>
      </div>
      <div class="item error" v-if="nameText &&! state.users.length">
        <p class="font-700 text-hex-dbdddd text-15px">Такого пользователя не существует</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  outline: 1px solid gray;
}
input:focus {
  outline: 3px solid #07485B !important;
}
.scroll::-webkit-scrollbar {
  width: 10px;
  background-color: #191919;
  border-radius: 16px;
}

.scroll::-webkit-scrollbar-thumb {
  border-radius: 0px 10px 10px 0px;
  background-color: black;
}

.scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 16px;
  background-color: #191919;
}

</style>
