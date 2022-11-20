<script setup>
const storeMain = useStoreMain()
</script>

<template>
  <div class="flex flex-row min-h-screen bg-hex-191919 w-full">
    <div class="flex flex-col pl-10 w-1/5 gap-6 items-start ">
      <NuxtLink class="no-underline" to="/">Лента</NuxtLink>
      <NuxtLink class="no-underline" to="/profile" >Профиль</NuxtLink>
      <MyButton @click="storeMain.showModal = true" >
        Поделиться 
      </MyButton>
      <BaseModal 
        v-if="storeMain.showModal" 
        @close="storeMain.showModal = false"
        />
    </div>
    <div class="flex-grow w-3-5 content">
      <NuxtPage />
    </div>
    <div class="w-1/5">
      
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
html,
body,
#__nuxt {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  /* @apply font-sans; */
}
.modal {
  background: rgba(0, 0, 0, 0.4);
}

.br {
  outline: 1px solid red;
}
h1, h2, span, p, a, input, textarea {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}
.content {
  border-right: 1px solid #2f3335 ;
  border-left: 1px solid #2f3335;
}
input {
  border: none;
}
input:focus {
  outline: none;
  
}
</style>
