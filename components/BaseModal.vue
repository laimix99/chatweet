<script setup>
import { onClickOutside } from '@vueuse/core'
const storeMain = useStoreMain()
const target = ref()
onClickOutside(target, (event) => storeMain.state.showModal = false)

const emit = defineEmits(['close'])
</script>

<template>
  <div 
    class="inset-0 modal fixed" 
    lg="flex flex-col h-full w-full w-100vw z-999 max-h-screen items-center justify-center"
  >
    <div 
      ref="target"
      class=" bg-black flex flex-col min-h-100vh w-full p-5 items-start box-border br"
      lg="max-w-900px relative  min-h-100px rounded-16px"
    >
      <MySvg icon="close" @click="emit('close')"/>
      <Share
        color="black"
      />
    </div>
  </div>
</template>
