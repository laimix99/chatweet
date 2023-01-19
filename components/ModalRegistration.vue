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
    class="flex flex-col bg-hex-07485B min-h-30px w-full py-1 bottom-15 justify-center items-center fixed"
    lg="min-h-50px w-full bottom-0"
  >
    <div class="flex flex-row w-full max-w-800px items-center justify-between">
      <h1 
        class="hidden"
        lg="block text-30px text-hex-dbdddd"
      >
        Присоединяйся 
      </h1>
      <div 
        class="flex flex-row w-full px-3 justify-between items-center"
        lg="flex flex-row gap-3 w-300px items-center"
      >
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
