<script lang="ts" setup>
const props = defineProps({
  src: { type: String },
  view: { type: String },
});
// const baseURL = 'https://mfvcni0p.directus.app/'
// const imgUrl = computed(() => {
//   // `${baseURL}/assets/${src}`
//   // return `${baseURL}/${props.src}`
//   return `${baseURL}/files/${props.src}`
// })
</script>

<template>
  <div class="flex">
    <img v-if="view === 'post'" :src="props.src" class="rounded-8px w-full max-w-200px" lg=" max-h-400px max-w-500px"/>
    <img v-if="view === 'avatar'" class="rounded-1/2 h-50px w-50px" :src="props.src" alt="">
    <img v-if="view === 'profile'" class="rounded-1/2 h-100px w-100px profile" :src="props.src" alt="">
    <img v-if="view === 'comment'" class="rounded-1/2 h-30px w-30px" :src="props.src" alt="">
  </div>
</template>

<style scoped>
  .profile {
    border: 3px solid black;
    
  }
</style>
