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
    class="inset-0 z-999 modal fixed" 
    lg="flex flex-col h-full w-full w-100vw z-999 max-h-screen items-center justify-center"
  >
    <div 
      class=" bg-black flex flex-col h-100vh w-full  items-start box-border overflow-auto"
      lg="max-w-500px relative h-auto  max-h-600px rounded-16px "
    >
      <div class="rounded-16px w-full max-w-483.5px py-3 px-5 z-20 box-border header fixed">
        <MySvg  icon="close" @click="emit('close')"/>
      </div>
      <div class="flex flex-col mt-60px w-full px-5 items-start box-border">
        <News 
          :post="post"
          :socialInfo="false"
        />
        <SendComment 
          :id_post="id_post"  
          @dun="emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(1px);
  border-radius: 16px 0px 0px 0px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 0px 16px 16px 0px;
  
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 0px 16px 16px 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  
}

@media screen and (max-width: 600px) {
  ::-webkit-scrollbar {
    width: 1px;
  }
}

</style>
