import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const authorDefault = {
    id: '1',
    username: '@mike',
    name: 'Mike',
    avatarUrl: 'https://img.freepik.com/free-vector/man-shows-gesture-of-a-great-idea_10045-637.jpg?w=2000',
  } as any;

  const posts = useStorage('posts', [
    {
      id: '1',
      text: 'Hello World',
      files: [],
      author: authorDefault,
      created_at: 1,
      updated_at: 1,
      likes: [] as any,
      comments: [
        {
          id: '2',
          text: 'Hello Friend',
          author: authorDefault,
          created_at: 1,
          updated_at: 1,
        }
      ]
    },
  ]);


  function commentAdd(postId, comment: any) {
    console.log(':pocomentAddstAdd', comment);
    comment.id = Date.now().toString();
    comment.author = authorDefault;
    comment.created_at = Date.now();
    comment.updated_at = null;
    const postIndex = posts.value.findIndex((p: any) => p.id === postId);
    posts.value[postIndex].comments.push(comment)
  }

  function commentDelete(postId) {
    const postIndex = posts.value.findIndex((p: any) => p.id === postId);
    // posts.value[postIndex] = posts.value[postIndex].filter((p: any) => p.id !== postId);
  }

  function postAdd(post: any) {
    console.log(':postAdd', post);
    post.id = Date.now().toString();
    post.created_at = Date.now();
    post.updated_at = null;
    post.author = authorDefault;
    post.files = [];
    posts.value.unshift(post);
    post.likes = [];
    post.comments = []
  }

  function postDelete(postId) {
    console.log(':postDelete', postId);
    if (confirm('Удалить пост ?')) {
      posts.value = posts.value.filter((p: any) => p.id !== postId);
    }
  }

  // const likeIncreased = computed(() => {
  //   return likes.value.find((like) => like === MY_ID)
  // })
  function likeIncreased (postId: number) {
    const postFound = posts.value?.find((p: any) => p.id === postId);
    return postFound?.likes?.find((l: any) => l?.id === authorDefault.id) 
  }


  // function getPosts () {
  //   const { data } = await axios.get('/posts', { limit: -1 })
  //   posts.value = data
  // }

  function postLike(postId) {
    console.log(':postLike', postId);
    const postIndex = posts.value.findIndex((p: any) => p.id === postId);
    // await axios.post('/post/like', postId)
    // getPosts()
    if (likeIncreased(postId)) {
      posts.value[postIndex].likes = posts.value[postIndex].likes.filter((l: any) => l?.id !== authorDefault.id )
    } else {
      posts.value[postIndex].likes?.push(authorDefault)
    }

  }

  

  return {
    posts,
    postAdd,
    postDelete,
    postLike,
    likeIncreased,
    commentAdd,
    commentDelete,
  };
});
