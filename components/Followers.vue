<script setup>
const storeMain = useStoreMain()
const props = defineProps({
  follower: {
    type: Object,
    default: () => {}
  }
})
</script>
<template>
  <!-- <pre>{{ follower }}</pre> -->
  <div class="flex flex-col w-full pt-2 gap-5 items-start">
    <div  class="flex flex-row w-full items-center justify-between">
      <NuxtLink
        :to="`/user/${follower.user.id}`"
        class="flex flex-row gap-2 items-center no-underline"
      >
        <BaseImg
          :src="`https://mfvcni0p.directus.app/assets/${follower.user.avatar}.png`"
          view="avatar"
        />
        <div class="flex flex-col items-start">
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ follower.user.first_name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ follower.user.last_name }}</span>
        </div>
      </NuxtLink>
      <MyButton
        view="white"
      >
        Читать
      </MyButton>
    </div>
  </div>
</template>