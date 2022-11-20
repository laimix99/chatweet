<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="flex flex-col min-h-screen w-full top-0 left-0 w-100vw z-999 modal items-center justify-center absolute ">
    <div class=" bg-black flex flex-col rounded-16px w-full max-w-900px p-5 items-start">
      <MySvg icon="close" @click="emit('close')"/>
      <Share
        color="black"
      />
    </div>
  </div>
</template>
