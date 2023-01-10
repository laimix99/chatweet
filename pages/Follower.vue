<script setup>

const state = reactive({
  tabs: [
    {name: 'Читаю', click: 'followings'},
    {name: 'Читатели', click: 'followers'},
  ],
  currentTab: ref('followings')
})

const route = useRoute();
const router = useRouter();

const storeMain = useStoreMain()

const setTab = (v) => {
  state.currentTab = v
  console.log('таб',state.currentTab)
} 
onMounted(() => {
  storeMain.getFollowing(storeMain.state.user.id)
  storeMain.getFollowers(storeMain.state.user.id)
})
</script>

<template>
  <div class="flex flex-col w-full px-2 pt-10px items-start box-border">
    <!-- <pre>{{ route }}</pre> -->
    <!-- <pre class="text-red-400">{{ router }}</pre> -->
    <!-- <pre class="text-red-500">{{ storeMain.state.followers }}</pre> -->
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
    <Followings 
      v-if="state.currentTab === 'followings'" 
      v-for="following in storeMain.state.followings"
      :follower="following"
      
    />
    <Followers  
      v-if="state.currentTab === 'followers'" 
      v-for="follower in storeMain.state.followers"
      :follower="follower"
    />
    <!-- <pre class="text-red-600">{{storeMain.state.followers}}</pre> -->
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
