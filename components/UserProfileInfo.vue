<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
})
const isMe = computed(() => {
  return storeMain.state.user.id === props.user?.id
})
  const storeMain = useStoreMain()
  onMounted(() => {
  })
</script>

<template>
  <div class="flex flex-col w-full py-5 items-center profile">
    <div class="flex flex-row w-full items-center justify-between">
      <!-- <pre class="text-white">{{user}}</pre> -->
      <div class="flex flex-col w-full items-start">
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
      </div>
      <div class="flex flex-col">
        <!-- <pre class="text-red-400">{{ storeMain.state.user.id }}</pre> -->
        <!-- <pre class="text-green-400"> {{ params }}</pre> -->
      </div>
      <MyButton 
        v-if="isMe"
        @click="storeMain.state.showEdit = true"
      >
        Изменить профиль 
      </MyButton>
      <MyButton
        v-else
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
      <!-- <NuxtLink to="/follower" class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline ">40 в читаемых</NuxtLink>
      <NuxtLink to="/follower" class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline">50 читателей</NuxtLink> -->
    </div>
  </div>
</template>

<style scoped>
 .profile {
  border-bottom: 1px solid #2f3335 ;
} 
</style>
