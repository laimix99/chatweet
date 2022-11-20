<script setup>
  const storeMain = useStoreMain()
  
</script>

<template>
  <div class="flex flex-col w-full pb-3 profile items-center">
   <div class="flex flex-row w-full items-center justify-between">
      <div class="flex flex-col w-full items-start">
        <BaseImg 
          view="profile"
          :src="storeMain.authorDefault.avatarUrl" 
        />
        <h1 class=" font-700 mt-2 text-hex-dbdddd text-25px">{{ storeMain.authorDefault.name }}</h1>
        <span class="font-400 text-hex-dbdddd opacity-40 text-13px">{{ storeMain.authorDefault.username }}</span>
        <p class=" font-700 mt-2 text-hex-dbdddd text-15px" >{{ storeMain.authorDefault.description }}</p>
        <div 
          class="flex flex-row mt-2 items-center"
        >
          <MySvg
            icon="location"
          />
          <p class="font-700 text-hex-dbdddd  text-13px" >{{ storeMain.authorDefault.location }}</p>
        </div>
        <a 
          class="mt-2 text-hex-07485B text-14px no-underline hover:underline "
          :href="storeMain.authorDefault.web_site"
        >
          {{ storeMain.authorDefault.web_site }}
        </a>
      </div>
      <MyButton 
        @click="storeMain.showEdit = true"
      >
        Изменить профиль 
      </MyButton>
      <ModalEdit
        v-if="storeMain.showEdit" 
        @close="storeMain.showEdit = false"
      />
    </div>
    <UserProfileInfo/>
  </div>
</template>

<style scoped>
.profile {
  border-bottom: 1px solid #2f3335 ;
}
</style>
