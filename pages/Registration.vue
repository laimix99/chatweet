<script setup>
const state = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})
const router = useRouter()
const storeMain = useStoreMain()

function addUser(){
  const payloud = {
    first_name: state.first_name,
    email: state.email,
    password: state.password,
    last_name: state.last_name
  }
  storeMain.postUser(payloud)
  router.push({ path: '/auth' })
  state.first_name = ''
  state.email = ''
  state.password = ''
  state.last_name = ''
}
</script>

<template>
  <div class="flex flex-col w-full p-4 items-center box-border">
    <div class="flex flex-col w-full max-w-400px gap-3 items-center">
      <h1 class="text-hex-dbdddd text-40px">Регистрация</h1>
      <input 
        v-model="state.first_name" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"  
        placeholder="Имя"
        type="text"  
      >
      <input 
        v-model="state.last_name"
        type="text"
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"  
        placeholder="username"
      >
      <input 
        v-model="state.email" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"  
        type="email" 
        placeholder="Адрес электронной почты" 
      >
      <input 
        v-model="state.password" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"  
        type="text" 
        placeholder="Пароль"
      >
      <MyButton class="w-full" @click="addUser()">Зарегистрироваться</MyButton>
    </div>
  </div>
</template>

<style scoped>
  input {
    width: 100%;
    outline: 1px solid gray;
  }
  input:focus {
    outline: 3px solid #07485B;
  }
</style>
