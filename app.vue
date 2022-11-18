<template>
  <div class="flex flex-row min-h-screen bg-hex-191919 w-full">
    <div class="flex flex-col w-1/5">
      <span class="text-hex-dbdddd pl-5">left navigation</span>
    </div>
    <div class="flex-grow  w-3-5 content">
      <NuxtPage />
    </div>
    <div class="w-1/5">
      
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
html,
body,
#__nuxt {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  /* @apply font-sans; */
}

.br {
  outline: 1px solid red;
}
h1, h2, span, p {
  font-family: 'Montserrat', sans-serif;
}
.content {
  border-right: 1px solid #2f3335 ;
  border-left: 1px solid #2f3335;
}
input {
  border: none;
}
input:focus {
  outline: none;
}
</style>
