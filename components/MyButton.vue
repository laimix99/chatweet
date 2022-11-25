<script setup>
const props = defineProps({
  size: {
    type: String
  },

})
</script>

<template>
  <button 
    class="bg-hex-07485B rounded-16px text-hex-dbdddd py-10px px-20px whitespace-nowrap hover:bg-hex-073644 "
    :style="{ fontSize: props.size + 'px', }"
  >
    <slot/>
  </button>  
</template>

<style scoped >
  button {
    border: none;
    /* background: #073644; */
    /* background: #a5a0a0; */
  }
  
</style>
