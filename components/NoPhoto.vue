<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String
    },
    view: {
      type: String,
    }
  })

  const state = reactive({
    name: ''
  })

  function firstLetter () {
    state.name = props.name[0]
  }

  onMounted(() => {
    firstLetter
  })
</script>

<template>
  <div class="flex flex-col " v-if="props.name">
    <div 
      v-if="props.view === 'avatar'"
      class="bg-gray flex flex-row rounded-1/2 h-50px w-50px justify-center items-center"
    >
      <h1 class="text-white">{{ props.name[0] }}</h1>
    </div>
  
    <div 
      v-if="props.view === 'profile'"
      class="bg-gray flex flex-row rounded-1/2 h-100px w-100px justify-center items-center profile"
    >
      <h1 class="text-white text-60px">{{ props.name[0] }}</h1>
    </div>
  </div>

</template>

<style scoped>
  .profile {
    border: 3px solid black;
    
  }
</style>
