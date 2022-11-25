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
      readers: [
        {name: 'Макс', username: '@max', id: '', avatarUrl: 'https://n1s1.elle.ru/e9/2b/bf/e92bbf78184a1168e43d2f60db7c6b8b/728x946_1_8c05a11722cb53c974cc0a44167425a5@800x1040_0xc35dbb80_13873213741517414727.jpg'},
        {name: 'Рома', username: '@roma', id: '', avatarUrl: 'https://beautyhack.ru/assets/images/december/dzhejmi-dornan.jpg'},
        {name: 'Сергей', username: '@serg', id: '', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HofNC4aXPw-GY6_E3PgyNcLiyITmdwwRiCDvz4rdT2qdtkvK8m6YK61zzv8WnawwFJo&usqp=CAU'},
        {name: 'Анатолий', username: '@anat', id: '', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3YYSEHExD_2tlgSLzpK2u1zdkBIj1vxdBOFenLs1pOFbUQEL2pvFgKNnhP3ITnSJYAIQ&usqp=CAU'},
        {name: 'Илья', username: '@iluxa', id: '', avatarUrl: 'https://ledysoveti.com.ua/wp-content/uploads/2017/01/rejting-samyh-krasivyh-muzhchin-3.jpg'},
      ],
      read: [
        {name: 'Дима', username: '@dim', id: '', avatarUrl: '' },
        {name: 'Света', username: '@sveta', id: '', avatarUrl: '' },
        {name: 'ДЖамал', username: '@dg', id: '', avatarUrl: '' },
      ],
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
