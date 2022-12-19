<script setup>
const storeMain = useStoreMain()

</script>

<template>
  <div class="flex flex-col w-full pt-2 gap-5 items-start">
    <div v-for="reader in storeMain.state.user.readers" class="flex flex-row w-full items-center justify-between">
      <div class="flex flex-row gap-2 items-center">
        <!-- <BaseImg
          :src="reader.avatarUrl"
          view="avatar"
        /> -->
        <div class="flex flex-col items-start">
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ reader.name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ reader.username }}</span>
        </div>
      </div>
      <MyButton
        view="blue"
      >
        Читать
      </MyButton>
    </div>
  </div>
</template>