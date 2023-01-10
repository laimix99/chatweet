<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const api = useStoreApi()
const storeMain = useStoreMain()
const accessToken = ref(null)
const accessTokenExpires = ref(null)
const refreshToken = ref(null)
const state = reactive({
  email: 'maksim.tchava@yandex.ru',
  password: 'Il3zuVyiHKzOCHegxOtEvyH0',
  loginLoading: false,
  user: null,
})
const router = useRouter();
// async function login() {
//   try {
//     console.log(':login')
//     const { data } = await api.ftch('/auth/login', {
//       method: 'post',
//       body: {
//         // mode: 'cookie',
//         email: state.email,
//         password: state.password,
//       },
//       credentials: 'include',
//     })
//     console.log(':login data', data)
//     api.saveTokens(data)
//     router.push({ path: "/" });
//   }
//   catch (e: any) {
//     console.log(':login error', e)
//     api.removeTokens()
//   }
// }
// function login() {
//   const payloud = {
//     email: state.email,
//     password: state.password
//   }
//   storeMain.login(payloud)
//   router.push({ path: "/" });
// }
async function login(user: any) {
    try {
      console.log(':login')
      const { data } = await api.ftch('/auth/login', {
        method: 'post',
        body: {
          // mode: 'cookie',
          email: state.email,
          password: state.password,
        },
        credentials: 'include',
      })
      console.log(':login data', data)
      api.saveTokens(data)
      router.push({ path: "/" });
    }
    catch (e: any) {
      console.log(':login error', e)
      api.removeTokens()
    }
  }
async function logout() {
  try {
    console.log(':logout start')
    const { data } = await api.ftch('/auth/logout', {
      method: 'post',
      body: {
        // mode: 'cookie',
        refresh_token: api.refreshToken,
      },
      // credentials: 'include',
    })
    console.log(':logout data', data)
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
      console.log(':W api.accessToken', to)
      resume()
    }
    else {
      console.log(':W api.accessToken', to)
      pause()
    }
  },
  {
    immediate: true,
  },
)
onMounted(() => {
  console.log(':onMounted')
  storeMain.getUser()
  console.log("api",api.refreshToken)
})
</script>

<template>
  <!-- <pre class="text-white">{{route}}</pre>
  <pre class="text-red">{{router}}</pre> -->

  <div class="flex flex-col w-full p-4 gap-y-2 items-center content-start justify-start box-border">
    <h1 class="font-bold text-hex-dbdddd text-40px">
      Вход
    </h1>
    <div
      class="flex flex-col w-full max-w-400px p-2 gap-y-2"
    >
      <input 
        v-model="state.email" 
        type="text" 
        placeholder="Email" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"
      >
      <input 
        v-model="state.password" 
        type="text" 
        placeholder="Password" 
        class="bg-hex-191919 rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"
        @keyup.enter="login()"
      >
      <!-- <NuxtLink class="w-full" to="/"> -->
        <MyButton class="w-full" @click="login()">
          Вход
        </MyButton>
      <!-- </NuxtLink> -->
    </div>
    <div>
      <pre class="text-white">{{ storeMain.state.user }}</pre>
    </div>
    <!-- <span class="font-semibold text-white">Tokens</span> -->
    <!-- <small class="text-white access">access: {{ api.accessToken || '-' }}</small> -->
    <!-- <small class="text-white">refresh: {{ api.refreshToken || '-' }}</small> -->

    <div class="flex flex-row gap-x-2">
      
      <!-- <button @click="api.breakTokens(true, false)">
        Breake Access Token
      </button>
      <button @click="api.breakTokens(false, true)">
        Breake Refresh Token
      </button>
      <button @click="api.breakTokens(true, true)">
        Breake All Tokens
      </button> -->
    </div>

    <div class="flex flex-row gap-x-2">
      <!-- <button @click="api.refreshTokens()">
        Refresh
      </button> -->
      <button @click="logout()">
        Logout
      </button>
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
    /* max-width: 400px; */
    outline: 1px solid gray;
  }
  input:focus {
    outline: 3px solid #07485B;
  }
</style>