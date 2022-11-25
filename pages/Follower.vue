<script setup>

const state = reactive({
  tabs: [
    {name: 'Читатетли', click: 'readers'},
    {name: 'Читаю', click: 'read'},
  ],
  currentTab: ref('readers')
})
const setTab = (v) => {
  state.currentTab = v
  console.log('таб',state.currentTab)
} 
// const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="flex flex-col w-full px-2 pt-10px items-start box-border">
    <div 
      class="cursor-pointer flex flex-row pb-10px gap-3 items-center"
      @click="router.back()"
    >
      <MySvg
        icon="prev"
        
      />
      <span class="font-500 text-hex-dbdddd text-15px" lg="text-20px">Назад</span>
    </div>
    <div  class="flex flex-row w-full gap-10 items-center justify-center" lg="gap-50">
      <h1 
        v-for="tab in state.tabs"
        @click="setTab(tab.click)"
        class="cursor-pointer font-400 text-hex-dbdddd pb-5px text-15px"
        :class="[state.currentTab === tab.click ? 'tab_active ' : '']"
        lg="text-18px"
      >
        {{ tab.name }}
      </h1>
    </div>
    <Readers v-if="state.currentTab === 'readers'" />
    <Read  v-if="state.currentTab === 'read'" />
    <!-- <pre class="text-red-600">{{route}}</pre> -->
  </div>
</template>

<style scoped>
  .tab_active {
    border-bottom: 3px solid #07485B;
    color: #dbdddd;
    /* font-size: 700; */
    font-weight: 700;
  }
</style>
