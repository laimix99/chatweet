<script lang="ts" setup>
const props = defineProps({
  src: { type: String },
});
</script>

<template>
  <div class="flex">
    <img :src="props.src" class="rounded-8px max-h-400px max-w-500px"/>
  </div>
</template>
