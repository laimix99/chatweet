<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="flex flex-col min-h-screen w-full top-0 left-0 w-100vw z-999 modal items-center justify-center absolute ">
    <div class=" bg-black rounded-16px w-full max-w-900px p-5 items-center justify-center">
      <MySvg icon="close" @click="emit('close')"/>
      <Share
        color="black"
      />
    </div>
  </div>
</template>
