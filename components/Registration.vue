<script setup>
const state = reactive({
  first_name: '',
  email: '',
  password: '',
})

const storeMain = useStoreMain()

function addUser(){
  const payloud = {
    first_name: state.first_name,
    email: state.email,
    password: state.password,
  }
  storeMain.postUser(payloud)
  state.first_name = ''
  state.email = ''
  state.password = ''
}
</script>

<template>
  <div class="flex flex-col w-full gap-3 items-center box-border">
    <h1>Зарегистрируйтесь </h1>
    <input 
      v-model="state.first_name" 
      class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"  
      type="text" 
      placeholder="Имя"
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
    <MyButton @click="addUser">Зарегистрироваться</MyButton>
  </div>
</template>

<style scoped>
  input {
    width: 100%;
    max-width: 600px;
    outline: 1px solid gray;
  }
  input:focus {
    outline: 3px solid #07485B;
  }
</style>
