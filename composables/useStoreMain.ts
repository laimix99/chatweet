import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStoreMain = defineStore('counter', () => {
  const authorDefault = {
    id: '1',
    username: '@mike',
    name: 'Mike',
    avatarUrl: null,
  };

  const posts = useStorage('posts', [
    {
      id: '1',
      text: 'hello',
      files: [],
      author: authorDefault,
      created_at: 1,
      updated_at: 1,
      likes_count: 0,
    },
  ]);

  function postAdd(post: any) {
    console.log(':postAdd', post);
    post.id = Date.now().toString();
    post.created_at = Date.now();
    post.updated_at = null;
    post.author = authorDefault;
    post.files = [];
    posts.value.unshift(post);
    post.likes_count = 0;
  }

  function postDelete(postId) {
    console.log(':postDelete', postId);
    posts.value = posts.value.filter((p: any) => p.id !== postId);
  }

  function postLike(postId) {
    console.log(':postLike', postId);
    const postFound = posts.value.find((p: any) => p.id === postId);
    if (postFound) {
      postFound.likes_count += 1;
    }
  }

  function postDislike(postId) {
    console.log(':postDislike', postId);
    const postFound = posts.value.find((p: any) => p.id === postId);
    if (postFound) {
      postFound.likes_count -= 1;
    }
  }

  return {
    posts,
    postAdd,
    postDelete,
    postLike,
    postDislike,
  };
});
