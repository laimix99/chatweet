<script setup>
  const storeMain = useStoreMain()
</script>

<template>
  <div class="flex flex-col w-full py-5 items-center profile">
    <div class="flex flex-row w-full items-center justify-between">
      <div class="flex flex-col w-full items-start">
        <BaseImg 
          view="profile"
          :src="storeMain.state.user.avatarUrl" 
        />
        <h1 class=" font-700 mt-2 text-hex-dbdddd text-25px">{{ storeMain.state.user.name }}</h1>
        <span class="font-400 text-hex-dbdddd opacity-40 text-13px">{{ storeMain.state.user.username }}</span>
        <p class=" font-700 mt-2 text-hex-dbdddd text-15px" >{{ storeMain.state.user.description }}</p>
        <div 
          class="flex flex-row mt-2 items-center"
        >
          <MySvg
            icon="location"
          />
          <p class="font-700 text-hex-dbdddd  text-13px" >{{ storeMain.state.user.location }}</p>
        </div>
        <a 
          class="mt-2 text-hex-07485B text-14px no-underline hover:underline "
          :href="storeMain.state.user.web_site"
        >
          {{ storeMain.state.user.web_site }}
        </a>
      </div>
      <MyButton 
        view="blue"
        @click="storeMain.state.showEdit = true"
      >
        Изменить профиль 
      </MyButton>
      <ModalEdit
        v-if="storeMain.state.showEdit" 
        @close="storeMain.state.showEdit = false"
      />
    </div>
    <div class="flex flex-row flex-wrap mt-3 text-hex-dbdddd w-full opacity-40 gap-5 items-start">
      <h1 class="font-400 text-13px">Дата рождения: {{ storeMain.state.user.dateOfBirth }}</h1>
      <NuxtLink to="/follower" class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline ">40 в читаемых</NuxtLink>
      <NuxtLink to="/follower" class="cursor-pointer font-400 text-hex-dbdddd text-13px no-underline hover:underline">50 читателей</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
 .profile {
  border-bottom: 1px solid #2f3335 ;
} 
</style>
