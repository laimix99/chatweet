<script setup>
  const storeMain = useStoreMain()
</script>

<template>
  <div class="flex flex-row mt-3 text-hex-dbdddd w-full opacity-40 gap-5 items-start">
    <h1 class="font-400 text-13px">Дата рождения: {{ storeMain.authorDefault.dateOfBirth }}</h1>
    <span class="cursor-pointer font-400 text-13px hover:underline ">40 подписчиков</span>
    <span class="cursor-pointer font-400 text-13px hover:underline">50 подписок</span>
  </div>
</template>