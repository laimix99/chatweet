<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const storeMain = useStoreMain();
const tweet = computed(() => {
  return storeMain.state.posts.find((p: any) => p.id === route.params.id);
});
</script>

<template>
  <div class="flex flex-col w-full px-3 box-border">
    <div 
      class="cursor-pointer flex flex-row gap-3 items-center"
      @click="router.back()"
    >
      <MySvg
        icon="prev"
        
      />
      <span class="font-500 text-hex-dbdddd text-20px">Назад</span>
    </div>
    <pre>{{ tweet }}</pre>
    <!-- <News
      :post="tweet"
    /> -->
    <!-- <SocialInfo
      :date="tweet"
    /> -->
  </div>
</template>
