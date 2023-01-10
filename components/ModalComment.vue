<script setup>
const emit = defineEmits(['close'])
const props = defineProps({
  id_post: {
    type: Number,
  },
  post: {
    type: Object,
    default: {}
  },
})
</script>

<template>
  <div 
    class="inset-0 modal fixed" 
    lg="flex flex-col h-full w-full w-100vw z-999 max-h-screen items-center justify-center"
  >
    <div 
      class=" bg-black flex flex-col min-h-100vh w-full p-5 items-start box-border "
      lg="max-w-900px relative  min-h-100px rounded-16px"
    >
      <MySvg icon="close" @click="emit('close')"/>
      <News 
        :post="post"
        :socialInfo="false"
      />

      <SendComment 
        :id_post="id_post"  
      />
    </div>
  </div>
</template>
