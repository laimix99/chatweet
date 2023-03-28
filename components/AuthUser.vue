<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const api = useStoreApi()
const storeMain = useStoreMain()
const accessToken = ref(null)
const accessTokenExpires = ref(null)
const refreshToken = ref(null)
const state = reactive({
  email: '',
  password: '',
  loginLoading: false,
  user: null,
})
const router = useRouter();
async function login(user: any) {
    try {
      // console.log(':login')
      const { data } = await api.ftch('/auth/login', {
        method: 'post',
        body: {
          // mode: 'cookie',
          email: state.email,
          password: state.password,
        },
        credentials: 'include',
      })
      // console.log(':login data', data)
      api.saveTokens(data)
      router.push({ path: "/" });
    }
    catch (e: any) {
      // console.log(':login error', e)
      api.removeTokens()
    }
  }
async function logout() {
  try {
    // console.log(':logout start')
    const { data } = await api.ftch('/auth/logout', {
      method: 'post',
      body: {
        refresh_token: api.refreshToken,
      },
    })
    // console.log(':logout data', data)
    api.removeTokens()
    storeMain.state.user = []
  }
  catch (e: any) {
    console.log(':logout error', e)
    api.removeTokens()
  }
}
const { pause, resume, isActive } = useIntervalFn(() => {
  storeMain.getUser()
}, 3000, { immediate: true })
pause()
watch(
  () => api.accessToken,
  (to) => {
    if (to) {
      // console.log(':W api.accessToken', to)
      resume()
    }
    else {
      // console.log(':W api.accessToken', to)
      pause()
    }
  },
  {
    immediate: true,
  },
)
onMounted(() => {
  storeMain.getUser()
  // console.log("api",api.refreshToken)
})
</script>

<template>
  <div class="flex flex-col w-full p-4 gap-y-2 items-center content-start justify-start box-border">
    <h1
      v-if="!storeMain.state.user.id"
      class="font-bold text-hex-dbdddd text-40px"
    >
      Вход
    </h1>
    <div
      v-if="!storeMain.state.user.id"
      class="flex flex-col w-full max-w-400px p-2 gap-y-2"
    >
      <input 
        v-model="state.email" 
        type="email" 
        name="email" 
        autocomplete="on"
        placeholder="Email" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"
      >
      <input 
        v-model="state.password" 
        type="password" 
        placeholder="Password" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"
        @keyup.enter="login"
      >
        <MyButton class="w-full" @click="login">
          Вход
        </MyButton>
    </div>
    
    <div class="flex flex-row gap-x-2">
      <MyButton v-if="storeMain.state.user.id" @click="logout()">
        Выйти
      </MyButton>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply bg-hex-444 w-auto min-w-140px px-4;
}
pre {
  font-size: 11px;
}
.access{
  box-sizing: border-box;
  text-overflow: ellipsis; 
  overflow: hidden; 
  width: 100%; 
  white-space: nowrap;
}
input {
    width: 100%;
    outline: 1px solid gray;
  }
  input:focus {
    outline: 3px solid #07485B;
  }
</style>