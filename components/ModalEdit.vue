<script setup lang="ts">
const storeMain = useStoreMain()
const api = useStoreApi()
const emit = defineEmits(['close'])

const state = reactive({
  name: storeMain.state.user.first_name,
  description: storeMain.state.user.description,
  location: storeMain.state.user.location,
  file: storeMain.state.user.avatar ,
  // webSite: '',
  // dateOfBirth: '',
}) as any

function onFileUpload (event: any) {
  state.file = event.target.files[0]
  state.fileUrl = URL.createObjectURL(state.file)
}

async function editUser() {
  if (state.fileUrl){
    const formData = new FormData()
    formData.append('file', state.file)
    const { data: fileUploaded } = await api.ftch('/files', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    console.log(':postImg fileUploaded', fileUploaded)
    const { data: userUpdated } = await api.ftch(`/users/${storeMain.state.user.id}`, {
      method: 'PATCH',
      body: {
        avatar: fileUploaded.id,
        first_name: state.name,
        location: state.location,
        description: state.description
      }
    })
    console.log('userUpdated', userUpdated)
    state.fileUrl = ''
  } else {
    const { data: userUpdated } = await api.ftch(`/users/${storeMain.state.user.id}`, {
      method: 'PATCH',
      body: {
        first_name: state.name,
        location: state.location,
        description: state.description
      }
    })
    console.log('userUpdated', userUpdated)
  }
  storeMain.getUser()
  storeMain.state.showEdit = false
}

</script>

<template>
  <div class="flex flex-col min-h-screen w-full top-0 left-0 w-100vw z-999 modal items-center justify-center fixed">
    <div 
    class="bg-black flex flex-col h-screen w-full max-w-600px p-5 box-border items-start"
    lg="rounded-16px h-full"
    >
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-3 items-center">
          <MySvg icon="close" @click="emit('close')"/>
          <h1 class="text-hex-dbdddd text-15px" lg="tet-20px">Изменить профиль</h1>
        </div>
        <MyButton @click="editUser">Сохранить</MyButton>
      </div>
      <div class="flex flex-col mt-10px w-full gap-8 items-start relative">
        <div class=" flex flex-row gap-4 items-center relative">
          <BaseImg 
            v-if="!state.fileUrl"
            view="profile"
            :src="`https://mfvcni0p.directus.app/assets/${storeMain.state.user.avatar}.png`"
          />
          <BaseImg
            v-else
            :src="state.fileUrl"
            view="profile"
          />
          <label class="cursor-pointer bg-hex-00000080 rounded-1/2 p-2 left-7 bb absolute">
            <input 
              @change="onFileUpload" 
              class="hidden"
              type="file"
            >
            <MySvg
              icon="change"
            />
          </label>
        </div>
        <input 
          v-model="state.name"
          class= "bg-black input rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px box-border" 
          placeholder="Name" 
          type="text"
        >
        <textarea 
          v-model="state.description"
          class="bg-black rounded-5px h-80px text-hex-dbdddd text-left w-full pl-3 text-20px input box-border"
          placeholder="О себе"
        />
        <input 
          v-model="state.location"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px input box-border" 
          placeholder="Местоположение" 
          type="text"
        >
        <!-- <input 
          v-model="state.webSite"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px input box-border" 
          placeholder="Веб сайт" 
          type="text"
        >
        <input 
          v-model="state.dateOfBirth"
          class="bg-black rounded-5px h-30px text-hex-dbdddd w-full p-5 text-20px input box-border"
          type="date"
        > -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input {
    outline: 1px solid gray;
  }
  .input:focus {
    outline: 3px solid #07485B;
  }
  textarea {
    resize: none;
    /* outline: 1px solid gray; */
  }
  textarea:focus {
    outline: 3px solid #07485B;
  }
  /* input[type="date"] {
    
  } */
  /* ::-webkit-calendar-picker-indicator {
    background-color: #07485B;
    padding: 5px;
    border-radius: 5px;
    
    opacity: 0;
  } */
  /* .circle {
    background: rgba(0, 0, 0, 0.2);
  } */



</style>
