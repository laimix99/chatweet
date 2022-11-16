<script lang="ts" setup>
const storeMain = useStoreMain();
const state = reactive({
  text: '',
  files: [],
});
function postAdd() {
  console.log('postAdd');
  const postPayload = {
    text: state.text,
  };
  state.text = '';
  storeMain.postAdd(postPayload);
}
</script>

<template>
  <div class="flex flex-col">
    <input
      type="text"
      v-model="state.text"
      placeholder="Enter text"
      @keyup.enter="postAdd()"
    />
    <div v-for="p in storeMain.posts" :key="p.id">
      <pre>{{ p }} </pre>
      <button @click="storeMain.postDelete(p.id)">delete post</button>
      Likes: {{ p.likes_count }}
      <button @click="storeMain.postLike(p.id)">Like</button>
      <button @click="storeMain.postDislike(p.id)">Dislike</button>
    </div>
  </div>
</template>
