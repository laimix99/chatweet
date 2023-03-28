<script setup>
import { onClickOutside } from '@vueuse/core'
const storeMain = useStoreMain()
const router = useRouter()
const target = ref()
const showModal = ref(false)
onClickOutside(target, (event) => showModal.value = false)

function isEmptyObj(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

function output () {
  router.push({ path: '/auth' })
  showModal.value = false
}

onMounted(() => {
  storeMain.getUser()
})
</script>

<template>
  <div 
    v-if="isEmptyObj(storeMain.state.user)" 
    ref="target" 
    class="flex flex-row right-0 bottom-20 z-30 gap-2 fixed" 
    lg="w-full max-w-200px bottom-10 left-50 flex flex-col"
  >
    <div 
      v-if="showModal"
      class="bg-hex-191919 rounded-8px w-full max-w-500px py-2 px-1 exit box-border"
      lg="max-w-200px"
    >
      <h1 
        @click="output" 
        class="cursor-pointer text-hex-dbdddd py-1 text-14px hover:bg-hex-a79f9f1a"
        lg="text-15px"
      >
        Выйти из аккаунта
      </h1>
    </div>
    <div 
      class="flex flex-row rounded-16px w-full max-w-100px user relative items-center box-border"
      lg="max-w-200px gap-2 py-2 px-4 "  
    >
      <BaseImg
        v-if="storeMain.state.user.avatar"
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
      />
      <NoPhoto
        v-else
        :name="storeMain.state.user.first_name"
        view="avatar"
      />
      <div class="flex flex-col items-start">
        <h1 class="hidden" lg="text-hex-dbdddd text-18px block">{{storeMain.state.user.first_name}}</h1>
        <span class="hidden" lg="text-hex-dbdddd text-18px block">{{ storeMain.state.user.last_name }}</span>
      </div>
      <MySvg
        @click="showModal = !showModal"
        icon="more-horiz"
        class="cursor-pointer right-1 absolute"
      />
    </div>
  </div>
</template>

<style scoped>
.user:hover {
  background: #a79f9f1a;
}
.exit {
  border: 1px solid rgba(172, 163, 163, 0.5);
}
</style>
