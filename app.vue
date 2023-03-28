<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()
const showMobileMenu = computed(() => {
  if (width.value > 1024) {
    return true
  } else {
    return false
  }
})

const showBottonPost = computed(() => {
  if (width.value > 1024) {
    return true
  } else {
    return false
  }
})

const storeMain = useStoreMain()
const route = useRoute();

onMounted(() => {
  storeMain.getUser()
})
</script>

<template>
  <div 
    class="flex-col-reverse flex flex-col  bg-hex-191919 w-full relative bg" 
    lg="flex flex-row items-start w-full"
  >
    <div 
      class="flex flex-row justify-center"
      lg="flex-col top-10 w-2/7 items-end pr-10 sticky items-start"
      :class="[ showMobileMenu ? '' : 'mobile-menu' ]"
    >
      <div 
        class="flex flex-row gap-2 items-center justify-center"
        lg="flex flex-col gap-2 items-start"
      >
        <NuxtLink 
          v-for="menu in storeMain.state.menu" 
          class="flex flex-row p-2 gap-2 items-center no-underline link"
          :to="menu.link"
        >
          <MySvg
            :icon="menu.icon"
          />
          <span 
            class="text-hex-dbdddd hidden" 
            lg="text-20px inline"
            :class="[route.path === menu.link ? 'font-700' : 'font-400']"
            
          >
            {{ menu.title }}
          </span>
        </NuxtLink>
        <MyButton 
          v-if="showBottonPost"
          @click="storeMain.state.showModal = true" 
          size="20" 
        >
          Поделиться 
        </MyButton>
        
        <MyButton
          v-else
          @click="storeMain.state.showModal = true"
        >
          <MySvg
            icon="add-post"
          />
        </MyButton>
      </div>
    </div>
    <ModalUser class="left-100"/>
    <div 
      class="flex flex-col min-h-screen w-full content"
      lg=" w-3/7"
    >
      <NuxtPage v-if="storeMain.state.user.id"/>
      <NuxtPage v-else page-key="auth" />
      <Auth/>
    </div>
    <div 
      class="hidden fixed right-0"
      lg="w-2/7 inline"  
    >
     <!-- <SearchUsers class="top-10"/> -->
    </div>
    <BaseModal 
      v-if="storeMain.state.showModal" 
      @close="storeMain.state.showModal = false"
    />
    <ModalRegistration/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
html,
body,
#__nuxt {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.modal {
  background: rgba(0, 0, 0, 0.4);
}

.br {
  outline: 1px solid red;
}
.bg {
  outline: 1px solid green;
}
h1, h2, span, p, a, input, textarea {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}
.content {
  border-right: 1px solid #2f3335 ;
  border-left: 1px solid #2f3335;
  // @apply hidden;
}
input {
  border: none;
}
input:focus {
  outline: none
}
.link:hover{
  background-color: rgba(151, 148, 148, 0.2);
  border-radius: 16px;
}
.mobile-menu {
  display: flex ;
  flex-direction: row;
  background: black;
  width: 100%;
  bottom: 0;
  z-index: 40;
  align-items: center;
  position: sticky;
  padding: 5px 0px ;
  
}
@media screen and (max-width: 1024px) {
  .content {
    border-right: none;
    border-left: none;
  }
}
</style>
