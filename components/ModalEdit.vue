<script setup lang="ts">
const { files, open, reset } = useFileDialog()
const storeMain = useStoreMain()
const api = useStoreApi()
const emit = defineEmits(['close'])

const state = reactive({
  // avatarUrl: '',
  name: storeMain.state.user.first_name,
  description: storeMain.state.user.description,
  location: storeMain.state.user.location,
  webSite: '',
  dateOfBirth: '',
})

const changeProfile = (id: any) => {
  // // if (state.name === '') {
  // //   return console.log('пусто сука')
  // // }
  // console.log(state);
  // storeMain.editUsers(state)
  // storeMain.state.showEdit = false
  const payloud = {
    name: state.name,
    description: state.description,
    location: state.location
  }
  storeMain.editUsers(id, payloud)
  storeMain.state.showEdit = false
}

const showAvatar = ref(true)
const openDialog = () => {
  open()
}
watch(() => files.value, (to) => {
  // console.log(to)
  if (to) {
    const filesLength = to.length
    const lastFile = to[filesLength - 1]
    const url = URL.createObjectURL(lastFile)
    // state.avatarUrl = url
    showAvatar.value = !showAvatar.value

    // console.log(state.files)
  }
})

</script>

<template>
  <div class="flex flex-col min-h-screen w-full top-0 left-0 w-100vw z-999 modal items-center justify-center fixed ">
    <div 
      class="bg-black flex flex-col h-screen w-full max-w-600px p-5 box-border items-start"
      lg="rounded-16px h-full"
    >
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-3 items-center">
          <MySvg icon="close" @click="emit('close')"/>
          <h1 class="text-hex-dbdddd text-15px" lg="tet-20px">Изменить профиль</h1>
        </div>
        <MyButton @click="changeProfile(storeMain.state.user.id)">Сохранить</MyButton>
      </div>
      <div class="flex flex-col mt-10px w-full gap-8 items-start relative">
        <div class="flex flex-row">
          <div class="flex flex-col h-full rounded-1/2 w-full max-w-40px max-h-40px p-1 top-7 left-7 items-center justify-center circle absolute">
            <MySvg
              title="Загрузить"
              @click="openDialog"
              icon="change"
            />
          </div>
          <BaseImg 

            view="profile"

          />
          <!-- <BaseImg
            v-if="state.avatarUrl"
            view="profile"
            :src="state.avatarUrl"
          /> -->
        </div>
        <input 
          v-model="state.name"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border" 
          placeholder="Name" 
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
          v-model="state.dateOfBirth"
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
  .circle {
    background: rgba(0, 0, 0, 0.2);
  }
</style>
