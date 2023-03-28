<script setup>
const props = defineProps({
  id_post: {
    type: Number,
  },
  comments: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <div class="flex flex-col w-full py-2 gap-5 social-info">
    <div class="w-full" v-for="comment in props.comments">
      <Comments :post_id="id_post"  :comment="comment"/>
    </div>
    <SendComment :id_post="id_post"/>
  </div>
</template>

<style scoped>
.social-info {
  border-top: 0.5px solid #2f3335;
}
</style>
