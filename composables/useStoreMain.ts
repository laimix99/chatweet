import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const state = reactive({
    user: useStorage('user', {
      id: '1',
      username: '@mike',
      name: 'Mike',
      avatarUrl: '',
      dateOfBirth: '',
      description: '',
      location: 'екатеринбург',
      web_site: '',
    }),
    posts: useStorage('posts', []),
    showModal: false,
    showEdit: false,
    menu: [
      {title: 'Лента', link: '/', icon: 'ribbon'},
      {title: 'Профиль', link: '/profile', icon: 'profile'},
    ],

  })

  function changeProfile(prof: any) {
    Object.keys(prof).forEach((key) => {
      if (prof[key]) {
        state.user[key] = prof[key]
        console.log('update key', key)
      }
    })
    console.log('changeProfile profile', state.user)
  }

  function clearStorege() {
    state.posts = []
  }
  function commentAdd(postId, comment: any) {
    console.log(':pocomentAddstAdd', comment);
    comment.id = Date.now().toString();
    comment.author = state.user;
    comment.created_at = Date.now();
    comment.updated_at = null;
    const postIndex = state.posts.findIndex((p: any) => p.id === postId);
    state.posts[postIndex].comments.push(comment)
  }

  function commentDelete(postId) {
    const postIndex = state.posts.findIndex((p: any) => p.id === postId);
    // posts.value[postIndex] = posts.value[postIndex].filter((p: any) => p.id !== postId);
  }

  function postAdd(post: any) {
    console.log(':postAdd', post);
    post.id = Date.now().toString();
    post.created_at = new Date();
    post.updated_at = null;
    post.author = state.user;
    state.posts.unshift(post);
    post.likes = [];
    post.comments = []
  }

  function postDelete(postId) {
    console.log(':postDelete', postId);
    // if (confirm('Удалить пост ?')) {
      state.posts = state.posts.filter((p: any) => p.id !== postId);
    // }
  }

  // const likeIncreased = computed(() => {
  //   return likes.value.find((like) => like === MY_ID)
  // })
  function likeIncreased (postId: number) {
    const postFound = state.posts.find((p: any) => p.id === postId);
    return postFound?.likes?.find((l: any) => l?.id === state.user.id) 
  }


  // function getPosts () {
  //   const { data } = await axios.get('/posts', { limit: -1 })
  //   posts.value = data
  // }

  function postLike(postId) {
    console.log(':postLike', postId);
    const postIndex = state.posts.findIndex((p: any) => p.id === postId);
    // await axios.post('/post/like', postId)
    // getPosts()
    if (likeIncreased(postId)) {
      state.posts[postIndex].likes = state.posts[postIndex].likes.filter((l: any) => l?.id !== state.user.id )
    } else {
      state.posts[postIndex].likes?.push(state.user)
    }

  }

  

  return {
    state,
    postAdd,
    postDelete,
    postLike,
    likeIncreased,
    commentAdd,
    commentDelete,
    clearStorege,
    changeProfile,
  };
});
