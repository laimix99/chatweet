<template>
  <div class="flex flex-col items-center ">
    <button class="bg-hex-07485B rounded-16px text-hex-dbdddd py-10px px-20px">
      <slot/>
    </button>
  </div>
</template>

<style scoped >
  button {
    border: none;
  }
</style>
