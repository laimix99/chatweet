<script setup lang="ts">
  const props = defineProps({
    date: {
      type: Object,
      defoult: () => {}
    }
  })
  const storeMain = useStoreMain();
  const state = reactive({
    textComent: "",
  });

  function add() {
    if (state.textComent === '') {
      return
    }
    console.log("postAdd");
    const comentPayload = {
      text: state.textComent,
    };
    state.textComent = "";
    storeMain.commentAdd(props.date?.id,  comentPayload);
  }

  const showComents = ref(false)

  const clickComents = () => {
    showComents.value = !showComents.value
  }
</script>

<template>
  <div class="flex flex-col w-full py-2 items-start">
    <div class="flex flex-row w-full gap-10 items-center justify-center">
      <div class="cursor-pointer flex flex-row gap-2 items-center">
        <p :style="{color: date?.comments.length > 0 ? 'blue' : '#dbdddd'}" class="text-hex-dbdddd">{{ date?.comments.length }}</p>
        <MySvg
          class="coment"
          icon="coment"
          @click="clickComents"
          :style="{fill: date?.comments.length > 0 ? 'blue' : '#dbdddd'}"
        />
      </div>
      <div class="cursor-pointer flex flex-row gap-2 items-center">
        <p 
          :style="{color: storeMain.likeIncreased(date?.id) ? 'red': '#dbdddd'}"
          class="text-hex-dbdddd"
        >
          {{ date?.likes.length }}
        </p>
        <MySvg
          icon="like"
          @click="storeMain.postLike(date?.id)"
          :style="{
            fill: storeMain.likeIncreased(date?.id) ? 'red': 'none', 
            stroke: storeMain.likeIncreased(date?.id)
          }"
        />  
      </div>
    </div>
    <div
      v-if="showComents"
      class="flex flex-col w-full  items-center"
    >
      <Comments 
        v-for="c in props.date?.comments" 
        :comment="c"
        
      />
      <div class="flex flex-row w-full gap-2 items-center">
        <!-- <img class="rounded-1/2 w-40px" :src="date?.author.avatarUrl" alt=""> -->
        <BaseImg
          :src="date?.author.avatarUrl"
          view="avatar"
        />
        <input 
          type="text"
          v-model="state.textComent"
          class=" h-auto bg-hex-191919 rounded-16px h-100px text-hex-dbdddd w-full py-3 pl-2"
          placeholder="Написать комментарий"
          @keyup.enter="add()"
        >
        <MySvg
          icon="send"
          @click="add()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 1px solid gray;
}

</style>
