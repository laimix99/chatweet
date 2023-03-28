<script lang="ts" setup>
const storeMain = useStoreMain();
function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight

  if (position >= threshold) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.
  }
}

onMounted(() => {
  storeMain.getPost()
  storeMain.getUser()
})


</script>

<template>
  <div class="flex flex-col">
    <Share/>
    <div
      v-for="p in storeMain.state.posts"
      :key="p.id"
      class="news"
    > 
      <News 
        :post="p"
      />  
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
.share {
  border-bottom: 1px solid #2f3335 ;
}
.news {
  border-bottom: 1px solid #2f3335 ;
}
</style>
