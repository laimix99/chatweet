<script lang="ts" setup>
const props = defineProps({
  src: { type: String },
  view: { type: String },
});
</script>

<template>
  <div class="flex">
    <img v-if="view === 'post'" :src="props.src" class="rounded-8px max-h-400px max-w-500px"/>
    <img v-if="view === 'avatar'" class="rounded-1/2 w-40px" :src="props.src" alt="">
  </div>
</template>
