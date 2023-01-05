<script setup>
import { onClickOutside } from '@vueuse/core'
const storeMain = useStoreMain()
const user = storeMain.state.user
onMounted(() => {
  storeMain.getUser()
})
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

</script>

<template>
  <div ref="target" v-if="isEmptyObj(storeMain.state.user)" class="flex flex-col w-full gap-2">
    <div class="flex flex-row rounded-16px w-full max-w-200px py-2 px-4 gap-2 user relative items-center box-border">
      <BaseImg
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
      />
      <div class="flex flex-col items-start">
        <h1 class="text-hex-dbdddd text-18px">{{storeMain.state.user.first_name}}</h1>
        <span class="text-hex-dbdddd text-15px">{{ storeMain.state.user.last_name }}</span>
      </div>
      <MySvg
        @click="showModal = !showModal"
        icon="more-horiz"
        class="cursor-pointer right-1 absolute"
      />
    </div>
    <div 
      v-if="showModal"
      class="bg-hex-191919 rounded-8px w-full max-w-200px py-2 px-1 exit box-border"
    >
      <h1 class="cursor-pointer text-hex-dbdddd py-1 text-15px hover:bg-hex-a79f9f1a ">Выйти из аккаунта</h1>
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
