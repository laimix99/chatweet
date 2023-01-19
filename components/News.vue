<script setup>
import { onClickOutside } from '@vueuse/core'
  const props = defineProps({
    post: {
      type: Object,
      default: () => {}
    },
    socialInfo: {
      type: Boolean,
      default: true,
    },
    parent_id: {
      type: String,
    }

  })
  
  const storeMain = useStoreMain()
  const api = useStoreApi()

  // const children = ref([])


  const state = reactive({
    isMine: computed(() => {
      return storeMain.state.user.id === props.post.user_created.id
    }),
    likes: [],
    comments: [],
    showComment: false,
    myLikes: computed(() => {
      return state.likes.filter((like) => {
        return like.user.id === storeMain.state.user.id
      })
    }),
    isLiked: computed(() => {
      return state.myLikes.length > 0
    })
  })

  async function getLikes() {
    const { data } = await api.ftch('/items/likes/', {
      method: 'get',
      query: {
        fields: [ '*.*' ],
        filter: {
          post:  { _eq: props.post.id },
        },
      }
    })
    state.likes = data
    console.log('getLikes', data)
  }


  async function like() {
    if (state.isLiked) return 
    await api.ftch('/items/likes', {
      method: 'post',
      body: {
        post: props.post.id,
        user: storeMain.state.user.id
      }
    })
    getLikes()
  }
  
  async function unLike() {
   await Promise.all(
    state.myLikes.map(async (like) => {
      await api.ftch(`/items/likes/${like.id}`, { method: 'delete' })
    })
    )
    getLikes(props.post.id)
  }

  async function getComment() {
    const { data } = await api.ftch('/items/posts', {
      method: 'get',
      query: {
        fields: ['*.*'],
        filter: {
          parent: {_eq: props.post.id},
          status: 'published'
        },
        limit: -1,
      }
    })
    console.log('getComment', data)
    state.comments = data
  }

  onMounted(() => {
    getLikes()
    getComment()
  })
</script>

<template>
  <div v-if="props.post" class="flex flex-col w-full px-2 box-border">
    <div class="flex flex-row w-full py-20px gap-3 relative items-start">
      <!-- <pre class="text-red-600">{{ post.id }}</pre> -->
      <BaseImg
        v-if="post.user_created.avatar"
        view="avatar"
        :src="`https://mfvcni0p.directus.app/assets/${post.user_created.avatar}.png`"
      />
      <NoPhoto
        v-else
        view="avatar"
        :name="post.user_created.first_name "
      />
      <div 
        class=" flex flex-col  items-start"
      >
        <NuxtLink 
          :to="`/user/${post.user_created?.id}`"
          class="flex flex-row gap-3 items-center no-underline" 
        >
          <h1 class="font-700 text-hex-dbdddd text-15px">{{ post.user_created.first_name }}</h1>
          <span class="font-400 text-hex-dbdddd opacity-40 text-15px">{{ post.user_created.last_name }}</span>
          <span class="font-400 text-hex-dbdddd opacity-40 text-14px">{{new Date(post.date_created).toLocaleDateString("en-US") }}</span>
        </NuxtLink>
        <NuxtLink 
          :to="`/tweet/${post.id}`"
          class="flex flex-col mt-10px gap-3 no-underline items-start"
        >
          <h2 class="font-500 text-hex-dbdddd text-left text-15px leading-10px" lg="text-18px">{{ post.description }}</h2>
          <div class="flex flex-row gap-2">
            <BaseImg
              v-if="post.images"
              :src="`https://mfvcni0p.directus.app/assets/${post.images?.id}.png`"
              view="post"
            />
          </div>
        </NuxtLink>
      </div>
      <MySvg 
        v-if="state.isMine"
        class="cursor-pointer right-0 absolute"
        icon="close"
        @click="storeMain.deletePost(post.id, parent_id)"
      />    
    </div>
    <div 
      v-if="props.socialInfo"
      class="cursor-pointer flex flex-row w-full pb-1 gap-5 justify-center items-center"
    >
      <div 
        class="flex flex-row gap-1 items-center"
        @click="state.showComment = !state.showComment"
      >
        <h1 
          class=" text-blue text-16px"
          :style="[state.comments?.length ? '' : 'display: none;']"
        >
          {{state.comments?.length }}
        </h1>
        <MySvg
          icon="comment"
        />
      </div>
      <div 
        class="flex flex-row gap-1 items-center"
        @click="state.isLiked ? unLike() : like()"
      >
        <h1
          class=" text-red text-16px"
          :style="[state.likes?.length ? '' : 'display: none;']"
        >
          {{ state.likes?.length }}
        </h1>
        <MySvg
          icon="like"
        />
      </div>
    </div>
    <ModalComment
      v-if="state.showComment"
      @close="state.showComment = false"
      :show_comment="state.showComment"
      :id_post="post.id"
      :post="post"
    />
  </div>
</template>

<style scoped>

</style>
