<script setup>
const emit = defineEmits(['close'])
const storeMain = useStoreMain()

const state = reactive({
  name: '',
  description: '',
  location: '',
  webSite: '',
  date: '',
})

const changeProfile = () => {
  const userInfo = {
    name: state.name,
    description: state.description,
    location: state.location,
    webSite: state.webSite,
    date: state.date,
  }
  console.log(userInfo);
  storeMain.changeProfile(userInfo)
  storeMain.showEdit = false
}

</script>

<template>
  <div class="flex flex-col min-h-screen w-full top-0 left-0 w-100vw z-999 modal items-center justify-center absolute ">
    <div class=" bg-black flex flex-col rounded-16px w-full max-w-600px p-5 items-start ">
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-3 items-center">
          <MySvg icon="close" @click="emit('close')"/>
          <h1 class="text-hex-dbdddd text-20px">Изменить профиль</h1>
        </div>
        <MyButton @click="changeProfile">Сохранить</MyButton>
      </div>
      <div class="flex flex-col w-full gap-4 items-start">
        <BaseImg 
          view="profile"
          :src="storeMain.authorDefault.avatarUrl" 
        />
        <input 
          v-model="state.name"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border" 
          :placeholder="storeMain.authorDefault.name" 
          type="text"
        >
        <textarea 
          v-model="state.description"
          class="bg-black rounded-5px h-80px text-hex-dbdddd text-left w-full pl-3 text-20px box-border"
          placeholder="О себе"
        />
        <input 
          v-model="state.location"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border" 
          placeholder="Местоположение" 
          type="text"
        >
        <input 
          v-model="state.webSite"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border" 
          placeholder="Веб сайт" 
          type="text"
        >
        <input 
          v-model="state.date"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border"
          type="date"
          
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
  input {
    outline: 1px solid gray;
  }
  input:focus {
    outline: 3px solid #07485B;
  }
  textarea {
    resize: none;
    /* outline: 1px solid gray; */
  }
  textarea:focus {
    outline: 3px solid #07485B;
  }
  input[type="date"] {
    
  }
  ::-webkit-calendar-picker-indicator {
    background-color: #07485B;
    padding: 5px;
    border-radius: 5px;
    
    /* opacity: 0; */
  }
</style>
