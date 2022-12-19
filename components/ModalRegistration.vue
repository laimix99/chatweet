<script setup>
const storeMain = useStoreMain()
console.log('show', storeMain.state.user)

function isEmptyObj(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
</script>

<template>
  <div 
    v-if="isEmptyObj(storeMain.state.user)" 
    class="flex flex-col bg-hex-07485B min-h-50px w-full bottom-0 justify-center items-center absolute"
  >
    <div class="flex flex-row w-full max-w-800px items-center justify-between">
      <h1 class="text-hex-dbdddd text-30px">Присоединяйся</h1>
      <div class="flex flex-row gap-3 items-center">
        <NuxtLink to="/auth">
          <MyButton class="login">вход</MyButton>
        </NuxtLink>
        <NuxtLink to="registration">
          <button class=" border-hidden rounded-16px text-black py-10px px-20px">Зарегистрироваться</button>
        </NuxtLink>  
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  border: 1px solid white;
}
</style>
